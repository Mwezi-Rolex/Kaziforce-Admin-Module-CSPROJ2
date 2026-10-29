# BED Digest — Kaziforce Backend Engineering Document (BED) v2

Purpose: definitive engineering blueprint for the Kaziforce backend — microservices, REST/GraphQL APIs, auth, security, events, data, AI, ops. Read with SRS/TDD/DDD; Section 25 adds amendments (idempotency, Sync Service, tenant middleware). Stack: TypeScript + NestJS, PostgreSQL (Prisma), MongoDB, Redis, Kafka, Elasticsearch, BullMQ.

## API surface (REST; ~218 enumerated endpoints; role gate noted only where doc states/implies one — most paths carry no per-endpoint gate in BED, default = JWT + RBAC/tenant)

- Identity (4.1.7, /api/v1/identities): POST create; GET/{id}; PUT/{id}; DELETE/{id} (admin-implied); POST /verify-email; POST /verify-phone; POST /recover (public/self).
- Auth (4.2.7, unprefixed in doc, catalog 24.3 uses /api/v1/auth/*): POST /login (public); /logout; /refresh; /verify-mfa; /forgot-password; /reset-password (public, token-gated); /change-password (authed).
- Authorization (4.3.6): POST /authorize (internal/authed); GET/POST/PUT/DELETE /roles (admin); GET /permissions (authed); POST /policies (admin).
- User Profile (4.4.6, /profiles): GET /{id}; POST; PUT; DELETE (owner); GET /search (public/authed); GET /me (self).
- Organization (4.5.7, /organizations): POST; GET/{id}; PUT/{id}; DELETE/{id} (org admin); POST /{id}/members; /departments; /teams; /branches (org admin).
- Talent (4.6.7, /api/v1/talents): GET list; GET/{id}; POST (self); PUT/{id}; DELETE/{id}; GET /search; GET /recommended.
- Skills (4.7.7, /api/v1/skills): GET; POST; PUT/{id}; DELETE/{id} (taxonomy admin); POST /user-skills; PUT /user-skills/{id}; DELETE /user-skills/{id} (self).
- Certifications (4.8.7, /api/v1/certifications): POST; GET; PUT/{id}; DELETE/{id} (owner); POST /verify (verifier/admin).
- Experience (4.9.6, /api/v1/experience): GET; POST; PUT/{id}; DELETE/{id} (owner).
- Portfolio (4.10.6, /api/v1/portfolios): GET; POST; PUT/{id}; DELETE/{id} (owner).
- Resume (4.11.7, /api/v1/resumes): POST; GET; PUT/{id}; DELETE/{id} (owner); POST /parse; POST /generate; POST /export.
- Marketplace (4.12.7, /api/v1/marketplace): GET; GET /listings; POST /listings (verified org); PUT/DELETE /listings/{id} (owner/moderator); GET /featured; GET /recommended.
- Jobs (4.13.7, /api/v1/jobs): GET list; GET/{id}; POST (recruiter/org); PUT/{id}; DELETE/{id}; POST /{id}/publish; POST /{id}/close (hiring team).
- Projects (4.14.7, /api/v1/projects): GET; POST; PUT/{id}; DELETE/{id}; POST /{id}/members; /{id}/milestones; /{id}/deliverables (project members).
- Contracts (4.15.7, /api/v1/contracts): GET; GET/{id}; POST; PUT/{id}; DELETE/{id} (draft only); POST /{id}/approve; POST /{id}/sign (contract parties); POST /{id}/terminate.
- Applications (4.16.7, /api/v1/applications): GET; GET/{id}; POST (professional); PUT/{id}; DELETE/{id} (withdraw); POST /{id}/shortlist; /{id}/interview; /{id}/offer (recruiter/hiring manager).
- AI Matching (4.17.7): POST /api/v1/ai/matching/jobs; /projects; /workforce; GET /results/{id}; POST /feedback.
- Recommendations (4.18.7): GET /api/v1/recommendations; /jobs; /projects; /skills; POST /feedback.
- Copilot (4.19.7): POST /api/v1/copilot/chat; /generate; /summarize; /translate; /explain (authed).
- AI Agents (4.20.7, /api/v1/agents): POST; GET; POST /{id}/execute; /{id}/pause; /{id}/terminate (owner/admin; approval gates for high-risk).
- AI Knowledge (4.21.7, /api/v1/knowledge): POST /documents; GET /search; POST /embed; POST /retrieve; DELETE /documents/{id}.
- Wallet (4.22.7, /api/v1/wallets): POST; GET/{id}; GET /{id}/balance; POST /deposit; /withdraw; /transfer (owner/MFA for high value); GET /{id}/transactions.
- Payments (4.23.7, /api/v1/payments): POST; GET/{id}; POST /{id}/capture; /{id}/refund (finance); GET /status/{reference}.
- Billing (4.24.7, /api/v1/billing): POST /invoices; GET /invoices/{id}; POST /invoices/{id}/send; POST /credit-notes; GET /statements (finance).
- Subscriptions (4.25.7, /api/v1/subscriptions): POST; GET/{id}; PUT/{id}; POST /{id}/renew; POST /{id}/cancel (owner).
- Revenue (4.26.7, /api/v1/revenue): GET; GET /statements; POST /reconcile (finance/admin); GET /commissions; GET /settlements.
- Notifications (4.27.7, /api/v1/notifications): POST; GET; GET/{id}; PUT /{id}/read; POST /broadcast (admin); POST /schedule.
- Email (4.28.7, /api/v1/emails): POST /send; POST /schedule; GET/{id}; GET /templates (internal/admin).
- SMS (4.29.7, /api/v1/sms): POST /send; POST /send-bulk; GET /status/{id}; POST /otp (internal).
- Chat (4.30.7, /api/v1/chat): GET /conversations; POST /messages; GET /messages/{conversationId}; POST /channels; POST /attachments (participants).
- Meetings (4.31.7, /api/v1/meetings): POST; GET/{id}; PUT/{id}; DELETE/{id} (host); POST /{id}/join; POST /{id}/record (JWT-secured access).
- Search (4.32.7, /api/v1/search): GET; GET /suggestions; GET /facets; POST /reindex (admin).
- Analytics (4.33.7, /api/v1/analytics): GET /dashboard; GET /kpis; GET /reports (role-based access).
- Reports (4.34.7, /api/v1/reports): POST; GET/{id}; POST /export (access-controlled).
- Audit (4.35.7, /api/v1/audit): GET; GET/{id}; GET /search (auditor/admin; read-only/immutable).
- Logging (4.36.7, /api/v1/logs): GET; GET /search (RBAC-restricted).
- Documents (4.37.7, /api/v1/documents): POST; GET/{id}; DELETE/{id} (owner/access policy; signed URLs for access).
- Admin (4.38.7, /api/v1/admin): GET /users; POST /moderation; POST /feature-flags (Platform Administrator, MFA).
- Configuration (4.40.7, /api/v1/configurations): GET; PUT/{key}; GET /feature-flags; PUT /feature-flags/{id} (RBAC).
- Health (5.8–5.9, every service): GET /health; /health/live; /health/ready; /health/startup.
- OIDC (7.3): GET /.well-known/openid-configuration; /oauth2/authorize; /oauth2/token; /oauth2/userinfo; /oauth2/logout; /oauth2/jwks.
- Sync Service (25.2, /api/v1/sync): POST /mutations (authed, batched offline replay); GET /?since={cursor} (delta sync); GET /conflicts; POST /conflicts/{id}/resolve.
- API Gateway (4.39.6): "gateway configuration APIs and administrative endpoints" — not enumerated.
- Also defined: GraphQL operations per service (4.x.8), WebSocket events for chat (4.30.8: message.send, message.received, typing.started, presence.updated, receipt.read, reaction.added, etc.) and meetings (4.31.8: meeting.join/leave, recording.started/completed, etc.).

## Auth & roles

- Primary auth = JWT (stateless, signed RS256/ES256); OAuth 2.0 (Auth Code + PKCE, Client Credentials, Refresh; password grant forbidden) and OIDC for SSO (Google, Microsoft, Apple, GitHub, LinkedIn, enterprise IdPs); SAML/LDAP federation; API keys for service-to-service only.
- JWT claims: iss=kaziforce-auth, sub, aud=kaziforce-api, tenantId, organizationId, roles[], permissions[] (e.g. "profile.read"), iat, exp, jti. Access tokens short-lived; audience/issuer validated; revocation + replay prevention.
- Refresh tokens: one-time use, rotated on every refresh, hashed at rest, device-bound, revocable.
- Tokens: Access, Refresh, Service, M2M, Temporary Verification.
- RBAC roles (7.4): Platform Administrator, Organization Administrator, Recruiter, Hiring Manager, Professional, Contractor, Client, Finance Officer, Auditor, AI Agent, System Service.
- Flow: identity → JWT validation → role resolution → permission resolution → access decision. ABAC adds contextual attributes (department, clearance, time, device, risk score).
- Permission categories: Identity, Profiles, Jobs, Projects, Contracts, Finance, AI, Administration, Reporting, Documents.
- MFA mandatory for: admin access, financial transactions, password changes, device registration, high-risk logins, org administration.
- Sessions in Redis: device-tracked, idle/absolute timeouts, revocation, invalidated on password change/suspension.
- Zero Trust: every request authenticated, authorized, audited, tenant-isolated (ADR-013).
- Tenant context (25.3): tenantId from JWT on every request; cross-tenant access → 403 (never 404) + security audit log; repositories require explicit tenant_id; background jobs propagate tenant context.

## IDs (doc's own scheme)

- ADR-001…ADR-018 (3.12): architecture decisions — microservices; NestJS; TypeScript; DDD; Clean Arch; Hexagonal; Kafka; PostgreSQL; MongoDB; Redis; API-First; Kubernetes; Zero Trust; OpenTelemetry; AI-native; polyglot persistence; GitHub Actions+ArgoCD; multi-tenant isolation.
- BED-IDEM-001…006 (25.1): tenant+endpoint-scoped idempotency keys (Redis idemp:{tenant}:{endpoint}:{key}); store request-hash; hash mismatch → 422; in-flight duplicate → 409 + Retry-After; async audit write; critical endpoints (payment release, contract creation, payout) require Idempotency-Key else 400.
- BED-SYNC (25.2): new Sync Service for mobile offline mutation replay, delta sync, conflict resolution (critical fields manual, others last-write-wins).
- BED-TEN-001…005 (25.3): tenant context enforcement — JWT tenantId required; repo-level mandatory tenant_id; 403 not 404 cross-tenant; security logging; tenant propagation to jobs/consumers.
- Error codes (24.10, format DOMAIN-ERRORCODE): AUTH-001 invalid credentials; AUTH-002 token expired; USER-001; JOB-001; CONTRACT-001 already signed; WALLET-001 insufficient balance; PAYMENT-001 payment failed; AI-001 model unavailable; SEARCH-001 search timeout; SYSTEM-001 internal error.
- Sample traceability IDs (22.4–22.7, illustrative only): SRS refs FR-001, FR-045, FR-087, FR-102, AI-021; test cases AUTH-001, JOB-023, PAY-012; API tests API-001/045/087; migrations MIG-001/018/044/061; DB tests DB-001/018/044/061.

## Hard constraints

- Every service owns its DB; no direct cross-service DB access, shared schemas/tables/repos/business logic (5.2).
- Business rules never in controllers, repositories, migrations, or adapters; repos never do auth, publish events, or call APIs (5.4–5.5, 10.1.5).
- Every service: health endpoints, readiness/liveness/startup probes, graceful shutdown (12-step procedure), structured JSON logs with correlation/trace IDs, OpenTelemetry tracing.
- REST: plural resource URIs, no verbs; /api/v1/{resource}; versioned (major=breaking); OpenAPI 3.x for all endpoints; JSON only; HTTPS/TLS 1.3+.
- Status codes: 200/201/202/204; 400, 401, 403, 404, 409 (conflict/optimistic-lock mismatch), 422 (validation), 429, 500, 503; retired APIs → 410 Gone.
- Uniform response envelope: success flag, data, meta, timestamp; errors: success/code/message/traceId/timestamp; never expose stack traces.
- Pagination: offset (?page&size, default 20, max 100) and cursor (preferred for chat/notifications/feeds/audit); standard pagination object with hasNext/hasPrevious. Filtering: ?field=value, comparisons (?experienceYears>=5), multi-value (comma). Sorting: ?sort=field, -field for desc.
- Idempotency: Idempotency-Key header (UUID) on payments, transfers, purchases, contract signing, job publishing, invoicing; Redis, 24h TTL; full rules per BED-IDEM-001–006.
- Rate limits: anonymous 100 req/h; authenticated 5,000 req/h; enterprise configurable; 429 + X-RateLimit-* / Retry-After headers; sliding window preferred.
- Financial integrity: double-entry ledger, immutable financial records, no distributed 2PC (saga + outbox patterns instead), at-least-once delivery with idempotent consumers, financial events retained 7 years.
- Events: Kafka topic naming <domain>.<entity>.<event>; versioned schemas via Schema Registry (backward compatible); DLQ <topic>.dlq; retries only for transient failures, never business validation failures.
- Immutability: invoices, contracts history, audit records (tamper-detecting), authorization logs.
- Security: Argon2id passwords; AES-256-GCM at rest; never log passwords/secrets/tokens; MD5/SHA-1 forbidden; no dynamic SQL concatenation (Prisma/parameterized); CSRF for cookie sessions; HttpOnly/Secure/SameSite cookies; strict CORS (no wildcard with credentials); uploads virus-scanned, stored outside web root, signed URL access; executables prohibited.
- Validation everywhere: required fields, types, UUIDs, dates, enums, file sizes; multi-layer (client→API→application→domain→DB constraints); errors via standard envelope.
- Multi-tenancy: tenant_id on every record; tenant-aware JWT, caching, Kafka topics, search indexes; 403 (not 404) on cross-tenant (BED-TEN-003).
- Performance targets: avg API ≤200ms, auth ≤150ms, search ≤300ms, DB query ≤100ms, cache hit ≥90%, availability 99.9% (auth/payments 99.95%).
- Testing gates: unit ≥90% (business logic ≥95%), contract compatibility, security scans before release; production data never used unanonymized.
- Conventional Commits; no secrets in git/images (.env.example pattern); coverage gates block merges.

## Section map

- Part I §1 Introduction (purpose, scope, principles, constraints, references).
- Part II §2 Backend Platform Overview (vision, domains, stack, reference architecture).
- Part III §3 Overall Backend Architecture (microservices, Clean/Hexagonal/DDD, event-driven, API-first, multi-tenant, ADRs).
- Part IV §4 Core Backend Services — 40 services in 6 domains: Identity&Access (4.1–4.5), Workforce (4.6–4.11), Marketplace (4.12–4.16), AI (4.17–4.21), Financial (4.22–4.26), Communication (4.27–4.31), Enterprise (4.32–4.40).
- Part V §5 Service Design Standards (responsibilities, boundaries, domain models, DI, config, health, shutdown).
- Part VI §6 API Engineering (REST/GraphQL, versioning, validation, responses, pagination/filter/sort, idempotency, rate limiting, gateway, deprecation).
- Part VII §7 Identity & Security (JWT, OAuth2, OIDC, RBAC, ABAC, MFA, sessions, refresh, API keys, federation, Zero Trust, secrets).
- Part VIII §8 Backend Security (OWASP Top 10, encryption, hashing, headers, CSRF/CORS/XSS/SQLi/SSRF, uploads, security logging, threat detection).
- Part IX §9 Messaging & Events (Kafka, topics, schemas, sagas, outbox, retries, DLQ, replay, monitoring).
- Part X §10 Data Layer (repository pattern, Prisma, MongoDB, transactions, locking, validation, migrations).
- Part XI §11 Redis Integration (caching, locks, pub/sub, sessions, rate limits, leaderboards, TTL, invalidation).
- Part XII §12 Job Processing (BullMQ, workers, scheduled jobs, retries, AI/notification/email/document jobs).
- Part XIII §13 Search Services (Elasticsearch, indexes, mappings, pipelines, autocomplete, facets, hybrid/vector search).
- Part XIV §14 AI Platform (architecture, prompts, RAG, embeddings, vector DBs, agents, model gateway, memory, guardrails, monitoring).
- Part XV §15 Storage Services (object storage, upload pipeline, virus scanning, signed URLs, CDN, lifecycle).
- Part XVI §16 Performance (scaling, circuit breakers, bulkheads, backpressure, load balancing, benchmarks).
- Part XVII §17 Monitoring & Operations (logging, metrics, tracing, dashboards, alerting, SLOs/SLIs, error budgets, health).
- Part XVIII §18 DevSecOps (CI/CD, Docker, K8s, Helm, Terraform, GitHub Actions, ArgoCD, scanning, SAST/DAST, SBOM, secrets).
- Part XIX §19 Testing (unit, integration, API, contract, performance, security, chaos, E2E, test data, coverage).
- Part XX §20 Engineering Standards (structure, folders, naming, DI, logging, errors, config, git, review).
- Part XXI §21 Deployment (dev/staging/prod, multi-cloud, blue-green, canary, rollback, DR, continuity).
- Part XXII §22 Traceability (BED↔SRS/TDD/DDD maps, requirement/service/API/database matrices).
- Part XXIII §23 Future Evolution (AI-native, agents, event mesh, edge, identity ledger, blockchain, serverless).
- Part XXIV §24 Appendices (folder structure, service/API/GraphQL/event/topic/Redis/env catalogs, error codes, logging, dashboards, topologies, IaC BOM, stack matrix, checklists, glossary).
- §25 BED Amendments (25.1 idempotency completion, 25.2 Sync Service, 25.3 tenant middleware, 25.4 traceability additions, 25.5 summary).
