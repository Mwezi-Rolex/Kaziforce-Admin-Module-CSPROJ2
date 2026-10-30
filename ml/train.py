"""Train the Part A models and persist them to ml/models/.

Models (per task: severity and suggested_action):
  * Random Forest           — required model
  * Logistic Regression     — comparison
  * Majority baseline       — comparison (DummyClassifier, most_frequent)
  * Keyword-rule baseline   — comparison (deterministic rules, no fitting)

Discipline followed from AGENTS.md / BRIEF.md:
  * the train / validation / test split happens BEFORE any fitting;
  * the validation set is used only to pick the Random Forest configuration;
  * the test set is touched once, in ml/evaluate.py;
  * no metric is ever typed by hand — ml/evaluate.py writes them from data.

The model only ever suggests. It never changes a flag, an account or a setting.
"""

from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path

import joblib
import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.dummy import DummyClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

from features import CATEGORICAL_FEATURES, NUMERIC_FEATURES, KeywordRuleClassifier, build_features

MODEL_VERSION = "severity-action-rf-1.0.0"
SEED = 20261030

HERE = Path(__file__).parent
DATA_CSV = HERE / "data" / "flags.csv"
MODELS_DIR = HERE / "models"
SPLITS_JSON = HERE / "data" / "splits.json"


def _preprocessor() -> ColumnTransformer:
    return ColumnTransformer(
        transformers=[
            ("cat", OneHotEncoder(handle_unknown="ignore"), CATEGORICAL_FEATURES),
            ("num", StandardScaler(), NUMERIC_FEATURES),
        ]
    )


def _rf_pipeline() -> Pipeline:
    return Pipeline(
        [
            ("prep", _preprocessor()),
            (
                "clf",
                RandomForestClassifier(
                    n_estimators=300,
                    max_depth=12,
                    min_samples_leaf=4,
                    class_weight="balanced",
                    random_state=SEED,
                    n_jobs=-1,
                ),
            ),
        ]
    )


def _logreg_pipeline() -> Pipeline:
    return Pipeline(
        [
            ("prep", _preprocessor()),
            (
                "clf",
                LogisticRegression(max_iter=2000, class_weight="balanced", random_state=SEED),
            ),
        ]
    )


def split_data(df: pd.DataFrame) -> tuple[pd.DataFrame, pd.DataFrame, pd.DataFrame]:
    """Stratified 60/20/20 split on the combined noisy label, fixed seed.

    Returned in the order (train, validation, test). Called once, before any fit.
    """
    combined = df["severity_noisy"].astype(str) + "|" + df["action_noisy"].astype(str)
    train_val, test = train_test_split(df, test_size=0.20, random_state=SEED, stratify=combined)
    combined_train = train_val["severity_noisy"].astype(str) + "|" + train_val["action_noisy"].astype(str)
    train, val = train_test_split(train_val, test_size=0.25, random_state=SEED, stratify=combined_train)  # 0.25 * 0.8 = 0.20
    return train.reset_index(drop=True), val.reset_index(drop=True), test.reset_index(drop=True)


def main() -> None:
    MODELS_DIR.mkdir(parents=True, exist_ok=True)
    df = pd.read_csv(DATA_CSV)
    train, val, test = split_data(df)

    X_train, X_val = build_features(train), build_features(val)
    artifacts: dict = {}
    summary: dict = {"model_version": MODEL_VERSION, "trained_at": datetime.now(timezone.utc).isoformat(), "tasks": {}}

    for task, label_col, fit_col in [
        ("severity", "severity_noisy", "severity"),
        ("action", "action_noisy", "suggested_action"),
    ]:
        y_train = train[label_col]
        models = {
            "random_forest": _rf_pipeline(),
            "logistic_regression": _logreg_pipeline(),
            "majority_baseline": DummyClassifier(strategy="most_frequent"),
            "keyword_rule_baseline": KeywordRuleClassifier(task),
        }
        task_summary = {}
        for name, model in models.items():
            model.fit(X_train, y_train)
            val_acc = float(model.score(X_val, val[label_col]))
            task_summary[name] = {"validation_accuracy": round(val_acc, 4)}
            artifacts[f"{task}__{name}"] = {"version": MODEL_VERSION, "pipeline": model, "classes": list(model.classes_)}
            print(f"[train] {task:9s} {name:22s} validation accuracy = {val_acc:.4f}")
        summary["tasks"][task] = task_summary

    joblib.dump(artifacts, MODELS_DIR / "models.joblib")
    SPLITS_JSON.parent.mkdir(parents=True, exist_ok=True)
    SPLITS_JSON.write_text(
        json.dumps(
            {
                "seed": SEED,
                "model_version": MODEL_VERSION,
                "n_total": int(len(df)),
                "n_train": int(len(train)),
                "n_validation": int(len(val)),
                "n_test": int(len(test)),
                "test_index": test.index.tolist(),
            },
            indent=2,
        )
        + "\n",
        encoding="utf-8",
    )
    (MODELS_DIR / "train_summary.json").write_text(json.dumps(summary, indent=2) + "\n", encoding="utf-8")
    print(f"[train] saved {len(artifacts)} model pipelines to {MODELS_DIR / 'models.joblib'} (version {MODEL_VERSION})")


if __name__ == "__main__":
    main()
