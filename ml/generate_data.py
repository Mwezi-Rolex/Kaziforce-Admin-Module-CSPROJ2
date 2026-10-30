"""Synthetic data generator for the Kaziforce moderation suggestion model.

EVERY number here is synthetic. Live platform data is under NDA and is never
used (proposal §1.5.2). Metrics computed on this data measure fit to THIS
GENERATOR, not real-world moderation performance. See ml/README.md.

Determinism
-----------
The single source of randomness is ``numpy.random.default_rng(SEED)``. Two runs
of this script produce byte-identical CSV output (asserted by ml/tests).

Part A — flag severity/action suggestion
----------------------------------------
One row per moderation flag. Features (the six families required by BRIEF):
  * reason_category      categorical, from a fixed vocabulary
  * content_type         categorical, from a fixed vocabulary
  * text features        derived from the free-text report: length, URL present,
                         phone-like token present, currency symbol present,
                         uppercase ratio, exclamation count, keyword hits
  * reporter_history     prior flags raised by the same reporter
  * account_age_days     age of the flagged account
  * prior_flags_account  prior flags previously raised on the same account

Latent process: a risk score in [0,1] is built from reason weight, account age,
prior flags and text signals; the TRUE severity is a 3-way cut of that score,
and the TRUE action follows from severity and content type. Label noise is then
applied at the rates below, so the task is not trivially separable.

Label noise (documented rates)
  NOISE_SEVERITY = 0.15  — 15% of rows have severity replaced by one of the
                           other two classes (chosen uniformly).
  NOISE_ACTION   = 0.12  — 12% of rows have the suggested action replaced by
                           one of the other two actions (chosen uniformly).
Noise is applied independently to the two labels, after the split assignment is
not needed — noise is a property of the observed labels for all splits.

Part B — operator activity anomalies
------------------------------------
One row per (operator, 1-hour window). Features:
  actions_per_hour, bulk_share, off_hours_share, reject_to_approve_ratio.
A documented fraction (ANOMALY_RATE) of windows are injected anomalies: the
operator's per-window behaviour is drawn from an exaggerated distribution
(many more actions, near-total bulk use, mostly off-hours activity, extreme
reject/approve ratio). The ground-truth column ``is_injected_anomaly`` is used
only for evaluation of the Isolation Forest, never as an input feature.

Usage
-----
    python ml/generate_data.py            # writes ml/data/*.csv
    python ml/generate_data.py --seed 7   # override the seed (tests use this)
"""

from __future__ import annotations

import argparse
import csv
import re
from pathlib import Path

import numpy as np

# --------------------------------------------------------------------------- #
# Fixed, documented constants
# --------------------------------------------------------------------------- #
SEED = 20261030  # fixed seed — change only with a matching README note

N_FLAGS = 4000  # Part A rows
N_OPERATORS = 12  # Part B operators
N_WINDOWS_PER_OPERATOR = 60  # Part B hourly windows per operator
ANOMALY_RATE = 0.06  # Part B fraction of windows that are injected anomalies

NOISE_SEVERITY = 0.15  # Part A label noise rate for severity
NOISE_ACTION = 0.12  # Part A label noise rate for suggested action

SEVERITIES = ["Low", "Medium", "High"]
ACTIONS = ["approve", "reject", "escalate"]

REASON_CATEGORIES = [
    "off_platform_payment",
    "abusive_language",
    "spam_or_promotion",
    "credential_misrepresentation",
    "ip_infringement",
    "other",
]
CONTENT_TYPES = ["Gig listing", "Review", "Portfolio submission"]

# Base risk contributed by the reason category (domain assumptions, documented).
REASON_RISK = {
    "off_platform_payment": 0.62,
    "abusive_language": 0.70,
    "spam_or_promotion": 0.35,
    "credential_misrepresentation": 0.78,
    "ip_infringement": 0.55,
    "other": 0.25,
}

# Severity cut points on the risk score.
SEVERITY_HIGH_CUT = 0.66
SEVERITY_MEDIUM_CUT = 0.40

# Report-text templates per category. Chosen so keyword signals correlate with
# (but do not perfectly determine) the category.
TEXT_TEMPLATES = {
    "off_platform_payment": [
        "Buyer asked me to pay outside the platform via {channel} before delivery.",
        "The client requested payment to {channel} and refused the escrow workflow.",
        "This listing asks for a deposit to {channel} directly, outside Kaziforce.",
    ],
    "abusive_language": [
        "The review contains repeated insults and threatening language toward the worker.",
        "Message history includes abusive and harassing wording aimed at the applicant.",
        "The gig description mocks a protected group in hostile terms.",
    ],
    "spam_or_promotion": [
        "The listing is unrelated promotional content linking to {channel}.",
        "This account posts the same advert repeatedly across many gigs.",
        "Portfolio item is pure advertising for an external {channel} service.",
    ],
    "credential_misrepresentation": [
        "The certificate shown appears forged and does not match the stated issuer.",
        "Claimed experience contradicts the attached documents and dates.",
        "Qualifications listed cannot be verified and look fabricated.",
    ],
    "ip_infringement": [
        "The portfolio uses copyrighted images without permission.",
        "Deliverable reproduces a third party's proprietary material verbatim.",
        "The submission copies a known brand asset without licence.",
    ],
    "other": [
        "Something about this content seems off but I cannot be specific.",
        "Flagging for a second look; details are unclear to me.",
        "Unsure, but the listing feels inconsistent with the policy.",
    ],
}

CHANNELS = ["WhatsApp", "a personal bank transfer", "email", "a mobile money number"]

# Text-signal keywords scanned for by the feature builder.
PAYMENT_KEYWORDS = ["outside", "escrow", "deposit", "pay", "transfer", "payment"]
ABUSE_KEYWORDS = ["abusive", "threat", "insult", "harass", "hostile", "mocks"]
SPAM_KEYWORDS = ["promotional", "advert", "repeatedly", "unrelated", "advertising"]
FRAUD_KEYWORDS = ["forged", "fabricated", "contradicts", "unverifiable", "mismatch"]

URL_RE = re.compile(r"https?://\S+|www\.\S+")
PHONE_RE = re.compile(r"\+?\d[\d\s-]{7,}\d")
# NOTE: currency symbols must NOT be written as a bare character class with
# letters — e.g. [$€£KSh] would match any text containing "K", "S" or "h".
CURRENCY_RE = re.compile(r"[$€£₦₵]|\bKSh\b|\bUSD\b|\bEUR\b")


def _report_text(rng: np.random.Generator, category: str) -> str:
    template = rng.choice(TEXT_TEMPLATES[category])
    text = template.format(channel=rng.choice(CHANNELS)) if "{channel}" in template else template
    # A minority of reports carry an inline link / phone / amount, which the
    # text features pick up; this is deliberately imperfect.
    if rng.random() < 0.22:
        text += f" Contact: {rng.choice(['https://t.me/handle', 'www.example-deal.com'])}"
    if rng.random() < 0.15:
        text += f" Reach them on +2547{rng.integers(10_000_000, 99_999_999)}."
    if rng.random() < 0.12:
        text += f" They asked for {rng.choice(['$', 'KSh ', '€'])}{rng.integers(20, 900)}."
    return text


def text_features(text: str) -> dict[str, float]:
    """Six documented text features derived from the free-text report."""
    lower = text.lower()
    words = re.findall(r"[A-Za-z']+", text)
    return {
        "text_length": float(len(text)),
        "has_url": float(bool(URL_RE.search(text))),
        "has_phone": float(bool(PHONE_RE.search(text))),
        "has_currency": float(bool(CURRENCY_RE.search(text))),
        "uppercase_ratio": float(sum(c.isupper() for c in text) / max(len(text), 1)),
        "exclamation_count": float(text.count("!")),
        "payment_keyword_hits": float(sum(k in lower for k in PAYMENT_KEYWORDS)),
        "abuse_keyword_hits": float(sum(k in lower for k in ABUSE_KEYWORDS)),
        "spam_keyword_hits": float(sum(k in lower for k in SPAM_KEYWORDS)),
        "fraud_keyword_hits": float(sum(k in lower for k in FRAUD_KEYWORDS)),
        "word_count": float(len(words)),
    }


def _score_to_severity(risk: float) -> str:
    if risk >= SEVERITY_HIGH_CUT:
        return "High"
    if risk >= SEVERITY_MEDIUM_CUT:
        return "Medium"
    return "Low"


def _severity_to_action(severity: str, content_type: str, rng: np.random.Generator) -> str:
    """TRUE action from severity + content type (documented mapping)."""
    if severity == "High":
        # High-risk portfolio/credential disputes tend to be escalated upward.
        return "escalate" if content_type == "Portfolio submission" or rng.random() < 0.35 else "reject"
    if severity == "Medium":
        return "reject" if rng.random() < 0.7 else "approve"
    return "approve" if rng.random() < 0.85 else "reject"


def _apply_noise(labels: list[str], rate: float, rng: np.random.Generator) -> tuple[list[str], int]:
    """Replace each label with a different class with probability `rate`."""
    out = list(labels)
    flipped = 0
    vocab = sorted(set(labels))
    for i, label in enumerate(out):
        if rng.random() < rate:
            alternatives = [v for v in vocab if v != label]
            out[i] = str(rng.choice(alternatives))
            flipped += 1
    return out, flipped


def generate_flags(seed: int = SEED) -> list[dict]:
    rng = np.random.default_rng(seed)
    rows: list[dict] = []
    reporter_history: dict[int, int] = {}
    account_prior_flags: dict[int, int] = {}

    n_reporters = 300
    n_accounts = 800

    for _ in range(N_FLAGS):
        reporter_id = int(rng.integers(0, n_reporters))
        account_id = int(rng.integers(0, n_accounts))
        account_age_days = int(np.clip(rng.gamma(2.0, 90.0), 0, 3650))
        prior_flags = account_prior_flags.get(account_id, 0)
        rep_history = reporter_history.get(reporter_id, 0)

        category = str(rng.choice(REASON_CATEGORIES))
        content_type = str(rng.choice(CONTENT_TYPES))

        # Risk: reason weight, then adjustments from account age, prior flags,
        # text signals and reporter credibility.
        risk = REASON_RISK[category]
        risk += 0.25 * (1.0 - min(account_age_days, 365) / 365)  # newer = riskier
        risk += 0.06 * min(prior_flags, 4)  # repeat offenders
        risk -= 0.04 * min(rep_history, 5)  # established reporters slightly more reliable
        risk += float(rng.normal(0.0, 0.10))  # irreducible blur

        text = _report_text(rng, category)
        tf = text_features(text)
        # Inline payment/link/phone signals raise perceived risk.
        risk += 0.10 * tf["has_url"] + 0.08 * tf["has_phone"] + 0.06 * tf["has_currency"]
        risk = float(np.clip(risk, 0.0, 1.0))

        severity = _score_to_severity(risk)
        action = _severity_to_action(severity, content_type, rng)

        rows.append(
            {
                "reporter_id": reporter_id,
                "account_id": account_id,
                "reason_category": category,
                "content_type": content_type,
                "report_text": text,
                "reporter_history": rep_history,
                "account_age_days": account_age_days,
                "prior_flags_account": prior_flags,
                "risk_score": round(risk, 4),  # kept for audit/analysis, not a model input
                "severity": severity,
                "suggested_action": action,
                **tf,
            }
        )
        reporter_history[reporter_id] = rep_history + 1
        account_prior_flags[account_id] = prior_flags + 1

    noisy_sev, n_sev = _apply_noise([r["severity"] for r in rows], NOISE_SEVERITY, rng)
    noisy_act, n_act = _apply_noise([r["suggested_action"] for r in rows], NOISE_ACTION, rng)
    for row, s, a in zip(rows, noisy_sev, noisy_act):
        row["severity_noisy"] = s
        row["action_noisy"] = a

    print(f"[generate_data] Part A: {len(rows)} flags; severity noise {n_sev} rows "
          f"({n_sev / len(rows):.1%}), action noise {n_act} rows ({n_act / len(rows):.1%})")
    return rows


def generate_windows(seed: int = SEED) -> list[dict]:
    """Part B: operator hourly activity windows with injected anomalies."""
    rng = np.random.default_rng(seed + 1)
    rows: list[dict] = []
    n_anomalies = 0

    for operator in range(N_OPERATORS):
        # Per-operator normal behaviour baselines.
        base_rate = float(rng.uniform(1.5, 6.0))
        base_bulk = float(rng.uniform(0.05, 0.25))
        for window in range(N_WINDOWS_PER_OPERATOR):
            is_anomaly = rng.random() < ANOMALY_RATE
            if is_anomaly:
                actions = float(rng.uniform(25, 70))
                bulk = float(rng.uniform(0.8, 1.0))
                off_hours = float(rng.uniform(0.6, 1.0))
                ratio = float(rng.uniform(5.0, 20.0))  # rejects vastly exceed approvals
                n_anomalies += 1
            else:
                actions = float(max(0.0, rng.normal(base_rate, 1.6)))
                bulk = float(np.clip(rng.normal(base_bulk, 0.08), 0.0, 1.0))
                off_hours = float(np.clip(rng.normal(0.18, 0.10), 0.0, 1.0))
                ratio = float(np.clip(rng.normal(1.1, 0.35), 0.0, 4.0))
            rows.append(
                {
                    "operator_id": operator,
                    "window_index": window,
                    "actions_per_hour": round(actions, 3),
                    "bulk_share": round(bulk, 3),
                    "off_hours_share": round(off_hours, 3),
                    "reject_to_approve_ratio": round(ratio, 3),
                    "is_injected_anomaly": int(is_anomaly),
                }
            )
    print(f"[generate_data] Part B: {len(rows)} windows; {n_anomalies} injected anomalies "
          f"({n_anomalies / len(rows):.1%})")
    return rows


def _write_csv(path: Path, rows: list[dict]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="", encoding="utf-8") as fh:
        writer = csv.DictWriter(fh, fieldnames=list(rows[0].keys()))
        writer.writeheader()
        writer.writerows(rows)


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate synthetic moderation data")
    parser.add_argument("--seed", type=int, default=SEED)
    parser.add_argument("--out", type=Path, default=Path(__file__).parent / "data")
    args = parser.parse_args()

    flags = generate_flags(args.seed)
    windows = generate_windows(args.seed)
    _write_csv(args.out / "flags.csv", flags)
    _write_csv(args.out / "operator_windows.csv", windows)
    print(f"[generate_data] wrote {args.out / 'flags.csv'} and {args.out / 'operator_windows.csv'} (seed={args.seed})")


if __name__ == "__main__":
    main()
