-- 010_perf_indexes.sql — indexes from the measured performance baseline
-- (docs/PERFORMANCE.md, branch perf/fixes; 50,000 audit rows / 5,004 flags on
-- the disposable perf database).
--
-- Measured (EXPLAIN ANALYZE, same queries as the API):
--   queue list ORDER BY severity-rank DESC, created_at ASC: 5.26 ms -> 0.61 ms
--     with the expression index (the planner matches the CASE expression).
--   audit count WHERE outcome = 'Blocked': 15.84 ms -> 1.34 ms with the
--     outcome + order index.
-- A third candidate index (action_type, created_at DESC, id DESC) was created,
-- measured as a non-mover (the existing single-column audit_log_action_idx
-- already served the count at 0.55-0.77 ms once the join was elided) and
-- dropped — never committed.
--
-- Read-only impact: indexes add write cost to audit_log INSERTs and flag
-- decisions; both are rare operator actions. Immutability grants are
-- unaffected (table-level grants follow the table).

CREATE INDEX IF NOT EXISTS flags_sevrank_created_idx
    ON flags ((CASE severity WHEN 'High' THEN 3 WHEN 'Medium' THEN 2 ELSE 1 END) DESC, created_at ASC);

CREATE INDEX IF NOT EXISTS audit_log_outcome_created_idx
    ON audit_log (outcome, created_at DESC, id DESC);
