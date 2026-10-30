"""FastAPI model service for the Kaziforce governance console.

Serves suggestion-only predictions on 127.0.0.1. It is NEVER exposed through
Nginx (BRIEF + AGENTS.md): the Node API calls it on loopback with a short
timeout, and if it is down or slow the console works normally and shows
"Suggestion unavailable".

Endpoints
    GET  /health   -> { status, model_version }
    POST /predict  -> { model_version, severity, action, confidence, probabilities }
Both responses carry the model version so an audit entry can record which model
produced a suggestion.

The model only recommends. A human moderator always decides; this service never
writes to the database or changes any flag.
"""

from __future__ import annotations

from pathlib import Path
from typing import Literal

import joblib
import numpy as np
import pandas as pd
from fastapi import FastAPI
from pydantic import BaseModel, Field

HERE = Path(__file__).parent
MODELS_PATH = HERE / "models" / "models.joblib"

app = FastAPI(title="Kaziforce moderation suggestion service", version="1.0.0")

# Loaded once at import. If the file is missing the service still starts and
# /health reports model_version "unavailable", so the Node client's fail-safe
# path is exercised rather than crashing the process at boot.
try:
    _ARTIFACTS = joblib.load(MODELS_PATH)
    _SEVERITY_MODEL = _ARTIFACTS["severity__random_forest"]["pipeline"]
    _ACTION_MODEL = _ARTIFACTS["action__random_forest"]["pipeline"]
    MODEL_VERSION = _ARTIFACTS["severity__random_forest"]["version"]
except Exception:  # pragma: no cover - defensive boot path
    _ARTIFACTS = {}
    _SEVERITY_MODEL = None
    _ACTION_MODEL = None
    MODEL_VERSION = "unavailable"


class PredictRequest(BaseModel):
    reason_category: Literal[
        "off_platform_payment",
        "abusive_language",
        "spam_or_promotion",
        "credential_misrepresentation",
        "ip_infringement",
        "other",
    ]
    content_type: Literal["Gig listing", "Review", "Portfolio submission"]
    report_text: str = Field(default="", max_length=4000)
    reporter_history: int = Field(default=0, ge=0, le=100000)
    account_age_days: int = Field(default=0, ge=0, le=100000)
    prior_flags_account: int = Field(default=0, ge=0, le=100000)


class PredictResponse(BaseModel):
    model_version: str
    severity: str
    action: str
    confidence: float
    probabilities: dict[str, dict[str, float]]
    disclaimer: str = (
        "Suggestion only. Derived from a model trained on synthetic data; it measures fit "
        "to that generator, not real-world moderation performance. A human decides."
    )


def _text_features(report_text: str) -> dict[str, float]:
    """Mirror the text features used at training time (see generate_data.text_features)."""
    # Imported lazily so the module path stays stable across train/serve.
    import sys

    sys.path.insert(0, str(HERE))
    from generate_data import text_features  # noqa: PLC0415

    return text_features(report_text)


@app.get("/health")
def health() -> dict:
    return {"status": "ok" if _SEVERITY_MODEL is not None else "degraded", "model_version": MODEL_VERSION}


@app.post("/predict", response_model=PredictResponse)
def predict(req: PredictRequest) -> PredictResponse:
    if _SEVERITY_MODEL is None or _ACTION_MODEL is None:
        # The Node client treats a non-2xx or a missing model as "unavailable".
        from fastapi import HTTPException

        raise HTTPException(status_code=503, detail="model unavailable")

    row = {
        "reason_category": req.reason_category,
        "content_type": req.content_type,
        "reporter_history": req.reporter_history,
        "account_age_days": req.account_age_days,
        "prior_flags_account": req.prior_flags_account,
        **_text_features(req.report_text),
    }
    frame = pd.DataFrame([row])

    sev_proba = _SEVERITY_MODEL.predict_proba(frame)[0]
    sev_classes = list(_SEVERITY_MODEL.classes_)
    act_proba = _ACTION_MODEL.predict_proba(frame)[0]
    act_classes = list(_ACTION_MODEL.classes_)

    sev_idx = int(np.argmax(sev_proba))
    act_idx = int(np.argmax(act_proba))
    confidence = float(round((sev_proba[sev_idx] + act_proba[act_idx]) / 2.0, 4))

    return PredictResponse(
        model_version=MODEL_VERSION,
        severity=sev_classes[sev_idx],
        action=act_classes[act_idx],
        confidence=confidence,
        probabilities={
            "severity": {c: round(float(p), 4) for c, p in zip(sev_classes, sev_proba)},
            "action": {c: round(float(p), 4) for c, p in zip(act_classes, act_proba)},
        },
    )
