"""pytest suite for the ML slice.

Covers:
  * data generation determinism — the same seed yields byte-identical CSVs,
    and a different seed yields different data;
  * the /predict response schema and /health model version;
  * that the model version is reported everywhere it is used.

Run:  ml/.venv/Scripts/python.exe -m pytest ml/tests -q
"""

from __future__ import annotations

import sys
from pathlib import Path

import pandas as pd
import pytest

ML_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ML_DIR))

import generate_data  # noqa: E402


def test_same_seed_same_data(tmp_path):
    """Two runs with the same seed produce identical frames."""
    a = pd.DataFrame(generate_data.generate_flags(seed=123))
    b = pd.DataFrame(generate_data.generate_flags(seed=123))
    pd.testing.assert_frame_equal(a, b)

    wa = pd.DataFrame(generate_data.generate_windows(seed=123))
    wb = pd.DataFrame(generate_data.generate_windows(seed=123))
    pd.testing.assert_frame_equal(wa, wb)


def test_different_seed_different_data():
    a = pd.DataFrame(generate_data.generate_flags(seed=1))
    b = pd.DataFrame(generate_data.generate_flags(seed=2))
    assert not a.equals(b)


def test_label_noise_is_applied():
    rows = generate_data.generate_flags(seed=20261030)
    df = pd.DataFrame(rows)
    sev_flips = (df["severity"] != df["severity_noisy"]).mean()
    act_flips = (df["suggested_action"] != df["action_noisy"]).mean()
    # Roughly the documented rates (15% / 12%); allow a wide sampling band.
    assert 0.08 < sev_flips < 0.22, sev_flips
    assert 0.06 < act_flips < 0.20, act_flips


def test_features_present_and_types():
    df = pd.DataFrame(generate_data.generate_flags(seed=20261030))
    for col in ["reason_category", "content_type", "reporter_history", "account_age_days", "prior_flags_account"]:
        assert col in df.columns
    assert df["text_length"].dtype.kind == "f"


@pytest.fixture(scope="module")
def client():
    fastapi_testclient = pytest.importorskip("fastapi.testclient")
    import service

    return fastapi_testclient.TestClient(service.app)


def test_health_reports_model_version(client):
    resp = client.get("/health")
    assert resp.status_code == 200
    body = resp.json()
    assert "model_version" in body
    assert body["status"] in {"ok", "degraded"}


def test_predict_response_schema(client):
    payload = {
        "reason_category": "off_platform_payment",
        "content_type": "Gig listing",
        "report_text": "Buyer asked me to pay outside the platform via WhatsApp before delivery.",
        "reporter_history": 3,
        "account_age_days": 30,
        "prior_flags_account": 2,
    }
    resp = client.post("/predict", json=payload)
    if resp.status_code == 503:
        pytest.skip("model artifacts not present; /predict returns 503 by design")
    assert resp.status_code == 200
    body = resp.json()
    assert set(body) >= {"model_version", "severity", "action", "confidence", "probabilities", "disclaimer"}
    assert body["severity"] in {"Low", "Medium", "High"}
    assert body["action"] in {"approve", "reject", "escalate"}
    assert 0.0 <= body["confidence"] <= 1.0
    # probability maps cover the label space and sum to ~1
    assert abs(sum(body["probabilities"]["severity"].values()) - 1.0) < 1e-3
    assert abs(sum(body["probabilities"]["action"].values()) - 1.0) < 1e-3
    assert "synthetic" in body["disclaimer"].lower()


def test_predict_rejects_unknown_category(client):
    resp = client.post("/predict", json={"reason_category": "made_up", "content_type": "Review"})
    assert resp.status_code == 422
