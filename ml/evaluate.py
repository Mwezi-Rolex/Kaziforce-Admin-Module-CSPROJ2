"""Evaluate every Part A model and the Part B detector; write ml/reports/metrics.json.

EVERY number in the output comes from this script. Nothing is typed by hand.
The test split is created here by re-reading the fixed split definition saved by
ml/train.py (same seed), so the test rows are never used for fitting.

Plain-language caveat (also in ml/README.md): these metrics measure fit to the
SYNTHETIC generator in ml/generate_data.py. They are NOT a measure of real-world
moderation performance, because the training data is synthetic (live data is
under NDA, proposal §1.5.2).
"""

from __future__ import annotations

import json
from pathlib import Path

import joblib
import numpy as np
import pandas as pd
from sklearn.metrics import accuracy_score, confusion_matrix, f1_score, precision_recall_fscore_support

import anomaly as anomaly_mod
import train as train_mod
from features import build_features

HERE = Path(__file__).parent
DATA_CSV = HERE / "data" / "flags.csv"
MODELS_PATH = HERE / "models" / "models.joblib"
ANOMALY_PATH = HERE / "models" / "anomaly_model.joblib"
REPORT_PATH = HERE / "reports" / "metrics.json"

DISCLAIMER = (
    "These metrics measure fit to the synthetic data generator in ml/generate_data.py. "
    "They are NOT a measure of real-world moderation performance: live platform data is "
    "under NDA and was never used."
)


def _task_metrics(y_true, y_pred, labels) -> dict:
    precision, recall, f1, support = precision_recall_fscore_support(
        y_true, y_pred, labels=labels, zero_division=0
    )
    return {
        "accuracy": round(float(accuracy_score(y_true, y_pred)), 4),
        "macro_f1": round(float(f1_score(y_true, y_pred, labels=labels, average="macro", zero_division=0)), 4),
        "per_class": {
            label: {
                "precision": round(float(precision[i]), 4),
                "recall": round(float(recall[i]), 4),
                "f1": round(float(f1[i]), 4),
                "support": int(support[i]),
            }
            for i, label in enumerate(labels)
        },
        # rows = true label, columns = predicted label (same order as `labels`)
        "confusion_matrix": {
            "labels": list(labels),
            "matrix": confusion_matrix(y_true, y_pred, labels=labels).tolist(),
        },
    }


def main() -> None:
    df = pd.read_csv(DATA_CSV)
    _, _, test = train_mod.split_data(df)
    artifacts = joblib.load(MODELS_PATH)
    model_version = next(iter(artifacts.values()))["version"]

    X_test = build_features(test)
    report: dict = {
        "model_version": model_version,
        "generated_by": "ml/evaluate.py",
        "disclaimer": DISCLAIMER,
        "data": {
            "generator_seed": train_mod.SEED,
            "n_total": int(len(df)),
            "n_test": int(len(test)),
            "severity_label_noise_rate": 0.15,
            "action_label_noise_rate": 0.12,
            "note": "labels are the noisy observed labels from the generator",
        },
        "part_a": {},
        "part_b": {},
    }

    for task, label_col, order in [
        ("severity", "severity_noisy", ["Low", "Medium", "High"]),
        ("suggested_action", "action_noisy", ["approve", "reject", "escalate"]),
    ]:
        key_prefix = "severity" if task == "severity" else "action"
        y_true = test[label_col]
        report["part_a"][task] = {}
        for name in ["random_forest", "logistic_regression", "majority_baseline", "keyword_rule_baseline"]:
            model = artifacts[f"{key_prefix}__{name}"]["pipeline"]
            y_pred = model.predict(X_test)
            report["part_a"][task][name] = _task_metrics(y_true, y_pred, order)
            print(f"[evaluate] {task:16s} {name:22s} test accuracy = {report['part_a'][task][name]['accuracy']:.4f} "
                  f"macro-F1 = {report['part_a'][task][name]['macro_f1']:.4f}")

    # Part B — anomaly recovery
    windows = pd.read_csv(anomaly_mod.WINDOWS_CSV)
    anomaly_artifact = joblib.load(ANOMALY_PATH)
    scored = anomaly_mod.score_windows(anomaly_artifact, windows)
    injected = scored["is_injected_anomaly"] == 1
    predicted = scored["predicted_anomaly"] == 1
    tp = int((injected & predicted).sum())
    fp = int((~injected & predicted).sum())
    fn = int((injected & ~predicted).sum())
    precision = tp / (tp + fp) if (tp + fp) else 0.0
    recall = tp / (tp + fn) if (tp + fn) else 0.0
    report["part_b"] = {
        "model_version": anomaly_artifact["version"],
        "method": "IsolationForest",
        "features": anomaly_artifact["features"],
        "contamination": 0.06,
        "injected_anomalies": int(injected.sum()),
        "total_windows": int(len(scored)),
        "recovered": tp,
        "precision": round(float(precision), 4),
        "recall": round(float(recall), 4),
        "false_positives": fp,
        "missed": fn,
    }
    print(f"[evaluate] Part B anomaly recovery: {tp}/{int(injected.sum())} injected, "
          f"precision={precision:.4f}, recall={recall:.4f}")

    REPORT_PATH.parent.mkdir(parents=True, exist_ok=True)
    REPORT_PATH.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    print(f"[evaluate] wrote {REPORT_PATH}")


if __name__ == "__main__":
    main()
