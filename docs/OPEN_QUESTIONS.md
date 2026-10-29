# OPEN_QUESTIONS.md

Questions that the supervisor documents do not answer. Each has a proposed default; per AGENTS.md these are asked once, in one batch, in Phase 1 — the defaults apply if the user does not override them.

## ANSWERED

- **OQ-1 (answered by user, 2026-10-29):** The focus is the small build — the web-based Admin & Moderation System (auth + user management + moderation queue + immutable audit log + settings console). Borrow whatever is relevant from the wider v2 documents to improve that implementation. Additionally, a **bare website shell** (landing page, login, and other pages) must wrap the moderation module.
- **OQ-2 (answered: proposed defaults confirmed):** Generic key/value + feature-toggle settings over mock data; dashboard structurally present but unpopulated.
- **OQ-4 (answered by user, 2026-10-29):** Stack = proposal/Figma hybrid as proposed: Vite + React + Tailwind frontend keeping the export's tokens/look; typed mock data layer mirroring BED/DDD contracts; no real backend for now; TDD v2 microservice/K8s machinery out of scope. Recorded in DECISIONS.md D-009.
- **OQ-5 (answered by user, 2026-10-29):** The v2 engineering documents provide depth of instruction (complexity and constraints) but must not exceed Chapter 5's direction: they take precedence when guiding complexity and related constraints, but do not change Chapter 5's direction.

## OQ-3 — BRIEF.md — ANSWERED (2026-10-29)

BRIEF.md is now filled and confirmed: project/deadline/demo dates, scope, backend + database in scope, ML components A (required) and B (stretch), Azure VPS deployment artifacts + runbook, documentation drafting required, schedule and cut line. No open items remain from the original list.

## OQ-4 — Which stack is authoritative? — ANSWERED, see top

## OQ-5 — Which document set wins on contradictions? — ANSWERED, see top
