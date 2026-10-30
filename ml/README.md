# ml/ — moderation suggestion model

Suggestion-only machine learning for the Kaziforce Admin & Moderation console.
The model **recommends**; a human operator always decides. It never suspends an
account, changes a flag, or edits a setting.

## Plain-language caveat (read this first)

**The metrics in `ml/reports/metrics.json` measure how well the models fit the
synthetic data generator in `generate_data.py`. They are not a measure of
real-world moderation performance.** The training data is synthetic because the
industry partner's live data is under an NDA (proposal §1.5.2) and was never
used. A high accuracy here means "the model learned this generator", nothing more.

## Part A — flag severity / suggested action

For each flag, the service predicts:

- **severity** ∈ {Low, Medium, High}
- **suggested action** ∈ {approve, reject, escalate}
- a **confidence** score

Surfaced in the queue as **"Suggestion only"**, and the queue can be sorted by
predicted severity. The moderator's own decision is the one that is applied.

### Features

| Family | Columns |
|---|---|
| Reason category | `reason_category` (6-value vocabulary) |
| Content type | `content_type` (Gig listing, Review, Portfolio submission) |
| Text features (report text) | `text_length`, `has_url`, `has_phone`, `has_currency`, `uppercase_ratio`, `exclamation_count`, `payment_keyword_hits`, `abuse_keyword_hits`, `spam_keyword_hits`, `fraud_keyword_hits`, `word_count` |
| Reporter history | `reporter_history` |
| Account age | `account_age_days` |
| Prior flags on the account | `prior_flags_account` |

### Models compared

Random Forest (required) against logistic regression, a majority-class baseline
(scikit-learn `DummyClassifier`), and a deterministic keyword-rule baseline.
Every model is scored on the held-out test split; all numbers come from
`evaluate.py`, none are typed by hand.

## Part B — operator activity anomalies (stretch)

An Isolation Forest scores each operator's hourly activity window on
`actions_per_hour`, `bulk_share`, `off_hours_share`, `reject_to_approve_ratio`.
Scored windows are surfaced to a Super Admin in the audit log explorer for
review. The detector never acts on its own.

## Data generation and assumptions

`generate_data.py` is deterministic: one `numpy.random.default_rng(SEED)` with
`SEED = 20261030`. Two runs produce byte-identical CSVs (asserted in `tests/`).

Documented assumptions:

- Risk is driven by reason category weight, account newness, prior flags on the
  account, reporter credibility, and inline link/phone/amount signals in the
  report text — with irreducible Gaussian blur (`σ = 0.10`).
- **Label noise** makes the task non-trivial and is documented, not hidden:
  - `NOISE_SEVERITY = 0.15` — 15% of rows get a different severity class.
  - `NOISE_ACTION = 0.12` — 12% of rows get a different action class.
  These are the OBSERVED labels the models are trained and scored on.
- Part B: `ANOMALY_RATE = 0.06` of hourly windows are injected anomalies with an
  exaggerated distribution; the ground-truth `is_injected_anomaly` column is used
  **only** in `evaluate.py`, never as a model feature.

## Splitting discipline

`train.py` splits 60 / 20 / 20 (train / validation / test) with a fixed seed and
stratification, **before any fitting**. The validation set is used only to look
at configuration; the test set is touched once, in `evaluate.py`. The split is
reproduced from the same seed, so no leakage occurs between scripts.

## Files

| File | Purpose |
|---|---|
| `generate_data.py` | Synthetic data generator (fixed seed, documented noise) |
| `features.py` | Shared feature construction + the keyword-rule baseline |
| `train.py` | Splits, fits all Part A models, saves `models/models.joblib` |
| `anomaly.py` | Trains the Part B Isolation Forest |
| `evaluate.py` | Writes `reports/metrics.json` from the test split |
| `service.py` | FastAPI service: `POST /predict`, `GET /health` (loopback only) |
| `tests/test_ml.py` | pytest: determinism, noise, response schema |
| `requirements.txt` | Frozen from the installed environment |

## Running

```bash
python -m venv ml/.venv
ml/.venv/Scripts/python.exe -m pip install -r ml/requirements.txt   # Windows
ml/.venv/Scripts/python.exe ml/generate_data.py
ml/.venv/Scripts/python.exe ml/train.py
ml/.venv/Scripts/python.exe ml/anomaly.py
ml/.venv/Scripts/python.exe ml/evaluate.py
ml/.venv/Scripts/python.exe -m pytest ml/tests -q
ml/.venv/Scripts/python.exe -m uvicorn service:app --host 127.0.0.1 --port 8000
```

## Serving and safety

The FastAPI service binds to `127.0.0.1` only and is **never** exposed through
Nginx (BRIEF). The Node API calls it on loopback with a short timeout
(`MODEL_TIMEOUT_MS`, default 800 ms). If the service is down or slow, the queue
works normally and shows **"Suggestion unavailable"**. When a moderator acts, the
audit entry records the model version, the suggested action/severity/confidence,
and whether the moderator followed or overrode it — so real decisions can become
labelled data later.
