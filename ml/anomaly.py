"""Part B: Isolation Forest anomaly detection over operator activity windows.

Anomaly scores are computed per hourly window from four documented features:
  actions_per_hour, bulk_share, off_hours_share, reject_to_approve_ratio.

The model is unsupervised: it never sees the ``is_injected_anomaly`` column.
That column is used ONLY in ml/evaluate.py to measure how many injected
anomalies the detector recovers. It never changes a flag or an account — it is
surfaced to a Super Admin for review (AGENTS.md: the model only flags).
"""

from __future__ import annotations

from pathlib import Path

import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler

MODEL_VERSION = "operator-activity-iforest-1.0.0"
SEED = 20261030

FEATURES = ["actions_per_hour", "bulk_share", "off_hours_share", "reject_to_approve_ratio"]

HERE = Path(__file__).parent
WINDOWS_CSV = HERE / "data" / "operator_windows.csv"
MODELS_DIR = HERE / "models"


def train_isolation_forest(contamination: float = 0.06) -> dict:
    df = pd.read_csv(WINDOWS_CSV)
    X = df[FEATURES].to_numpy()
    scaler = StandardScaler().fit(X)
    model = IsolationForest(
        n_estimators=300,
        contamination=contamination,  # expected anomaly rate, documented
        random_state=SEED,
        n_jobs=-1,
    )
    model.fit(scaler.transform(X))
    return {"version": MODEL_VERSION, "scaler": scaler, "model": model, "features": FEATURES}


def score_windows(artifact: dict, df: pd.DataFrame) -> pd.DataFrame:
    X = df[artifact["features"]].to_numpy()
    scaled = artifact["scaler"].transform(X)
    # decision_function: lower = more anomalous; convert to a 0..1 score where
    # higher = more anomalous, for display.
    raw = artifact["model"].decision_function(scaled)
    score = 1.0 - (raw - raw.min()) / (raw.max() - raw.min() + 1e-9)
    out = df.copy()
    out["anomaly_score"] = np.round(score, 4)
    out["predicted_anomaly"] = (artifact["model"].predict(scaled) == -1).astype(int)
    return out


def main() -> None:
    MODELS_DIR.mkdir(parents=True, exist_ok=True)
    artifact = train_isolation_forest()
    joblib.dump(artifact, MODELS_DIR / "anomaly_model.joblib")
    print(f"[anomaly] trained Isolation Forest (version {MODEL_VERSION}) on {len(pd.read_csv(WINDOWS_CSV))} windows")


if __name__ == "__main__":
    main()
