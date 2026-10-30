"""Shared feature construction for the moderation suggestion model.

Kept in one place so training, evaluation and the serving API cannot drift.
The feature schema here is the contract the FastAPI /predict endpoint validates.
"""

from __future__ import annotations

import numpy as np
import pandas as pd

# Numeric features fed to the models.
NUMERIC_FEATURES = [
    "reporter_history",
    "account_age_days",
    "prior_flags_account",
    "text_length",
    "has_url",
    "has_phone",
    "has_currency",
    "uppercase_ratio",
    "exclamation_count",
    "payment_keyword_hits",
    "abuse_keyword_hits",
    "spam_keyword_hits",
    "fraud_keyword_hits",
    "word_count",
]

CATEGORICAL_FEATURES = ["reason_category", "content_type"]

ALL_FEATURES = NUMERIC_FEATURES + CATEGORICAL_FEATURES


def build_features(df: pd.DataFrame) -> pd.DataFrame:
    """Return the model input frame (column order fixed by ALL_FEATURES)."""
    missing = [c for c in ALL_FEATURES if c not in df.columns]
    if missing:
        raise ValueError(f"missing feature columns: {missing}")
    return df[ALL_FEATURES].copy()


def load_flags(path: str) -> pd.DataFrame:
    return pd.read_csv(path)


class KeywordRuleClassifier:
    """Deterministic baseline: reason category + keyword signals -> label.

    Lives here (not in train.py) so joblib can unpickle it by a stable module
    path instead of ``__main__``. Implements the sklearn predict/score API.
    """

    def __init__(self, label_kind: str):
        self.label_kind = label_kind  # "severity" | "action"
        self.classes_ = np.array(
            ["Low", "Medium", "High"] if label_kind == "severity" else ["approve", "reject", "escalate"]
        )

    def fit(self, X: pd.DataFrame, y) -> "KeywordRuleClassifier":
        return self

    def predict(self, X: pd.DataFrame) -> np.ndarray:
        out = []
        for _, row in X.iterrows():
            cat = row["reason_category"]
            high_signal = (
                cat in {"abusive_language", "credential_misrepresentation"}
                or row.get("has_url", 0) > 0
                or row.get("fraud_keyword_hits", 0) > 0
                or row.get("prior_flags_account", 0) >= 3
            )
            medium_signal = cat in {"off_platform_payment", "ip_infringement"} or row.get("has_phone", 0) > 0
            if self.label_kind == "severity":
                out.append("High" if high_signal else ("Medium" if medium_signal else "Low"))
            else:
                out.append("escalate" if high_signal else ("reject" if medium_signal else "approve"))
        return np.array(out)

    def score(self, X: pd.DataFrame, y) -> float:
        return float(np.mean(self.predict(X) == np.asarray(y)))
