# Digests

One digest per source document, written during Phase 0 ingest and kept current as the documents are re-read. Maximum 150 lines each.

Source files are read-only markdown conversions in `src/imports/`. The two PDF templates were converted to text-only markdown next to their originals (the originals are unchanged), as AGENTS.md allows.

## Supervisor and project documents

| Digest | Source |
|---|---|
| `SRS.md` | Kaziforce Software Requirements Specification v2-2 |
| `TDD.md` | Kaziforce Technical Design Document v2 |
| `BED.md` | Kaziforce Backend Engineering Document v2 |
| `DDD.md` | Kaziforce Database Design Document v2 |
| `FWED.md` | Kaziforce Frontend Web Engineering Document v2 |
| `chapter-5-update.md` | `Chapter 5 Update.md` - the project's current documentation and the scope authority |
| `chapter-1-3-proposal.md` | `ICS_410X_CS_Project_II_-_Chapter_1-3_v2.md` - the earlier proposal |
| `note-8.md` | `ICS_410X_CS_Project_II_-_Note_8.md` - the report diagrams |

## Documentation templates (format and structure only; no product requirements)

| Digest | Source |
|---|---|
| `research-writing.md` | `Research Writing for CS 2 Projects - 2026.md` |
| `example-report-1.md` | `ICS 410X CS Project II - Example Report 1.md` |
| `example-report-2.md` | `ICS 410X CS Project II - Example Report 2.md` |
| `is-documentation-twayigize.md` | `IS_Documentation_Twayigize_Bienvenu.pdf` (converted) |
| `reference-guide-elvis-makara.md` | `REFERENCE GUIDE - Elvis Makara 2025 (1).pdf` (converted) |

## Generated artefacts

| File | Generator |
|---|---|
| `../TRACEABILITY.md` | `node docs/traceability-gen.mjs` - SRS archive, every ID |
| `../TRACEABILITY_SCOPE.md` | `node docs/traceability-gen.mjs` - in-scope rows only |

Per the AGENTS.md scoped-traceability rule, out-of-scope SRS identifiers are reported as a count in `TRACEABILITY_SCOPE.md`, never row by row.
