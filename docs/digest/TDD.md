# Digest — Kaziforce Technical Design Document (TDD) v2

Source: `src/imports/Kaziforce_Technical_Design_Document__TDD__v2.md` (21,978 lines; Sections 1–23).
Purpose: complete technical blueprint translating the SRS into architecture, microservice design, AI, data, API, event, security, DevSecOps, and deployment decisions for the Kaziforce AI-powered workforce platform.

## Architecture decisions

- Stack, frontend: React + Next.js web (incl. Admin Portal), Flutter mobile/PWA; design system Material UI / Tailwind CSS (§2.7, §22.1.2).
- Stack, backend: Node.js (LTS) + TypeScript + NestJS (Express/Fastify adapters); Prisma ORM; Zod / class-validator validation (§2.7, §22.1.3).
- APIs: REST (primary, `/api/v1` URI versioning), federated GraphQL, gRPC for internal high-performance calls (§2.7, §10.1–10.4).
- Auth: OAuth 2.0, OIDC, JWT (short-lived + refresh rotation), MFA/passkeys, Argon2/bcrypt hashing; sessions/tokens in Redis (§6.3, §12.3).
- Data (polyglot persistence): PostgreSQL (transactional, ACID), MongoDB (documents/feeds), Redis (cache/sessions/rate-limit), Elasticsearch (search), Neo4j (graph), Vector DB or pgvector (AI embeddings), S3-compatible object storage (§9, §22.1.4).
- Messaging: Apache Kafka as the enterprise event backbone (Transactional Outbox, Avro/Protobuf via Schema Registry, DLQs); RabbitMQ/Redis Streams optional (§11, §22.1.7).
- AI: LLM Gateway with pluggable providers (OpenAI APIs, LangChain, Llama), RAG pipeline, embedding services, vector indexes, prompt governance, AI agent framework, AI cost/quotas (§8).
- Pattern: cloud-native microservices + DDD bounded contexts + event-driven (EDA) + selective CQRS + Event Sourcing (wallet/payroll/ledger/audit) + Clean + Hexagonal architecture (§3.3).
- Module internals (per-service layering): Controller → Application Service → Domain → Repository → Integration Adapter, plus event pub/sub, cache, search, validation, security, observability layers (§7.4–7.9).
- Repo strategy: Git monorepo or multi-repo; folders for microservices, shared libs, IaC, k8s manifests, Helm charts, CI/CD pipelines, API specs, docs, tests (§14.1.2–14.1.3).
- Middleware pipeline (API Gateway): routing → JWT validation → RBAC/ABAC authorization → rate limiting → request validation → API versioning → tenant resolution → CORS → observability → WAF/DDoS; request lifecycle: DNS → CDN → WAF → LB → Gateway → microservice → Kafka events + DB commit → response (§4.1.2, §4.3, §6.1).
- Deployment: Docker + Kubernetes (multi-AZ/multi-region), Istio/Linkerd mesh, Kong/APISIX/Envoy gateway, GitHub Actions + Argo CD GitOps, Terraform + Helm, blue-green/canary, Prometheus/Grafana/Loki/Jaeger/OpenTelemetry, Vault (§2.7, §14, §22.1.6).
- Targets: 5 deployment models — SaaS (primary multi-tenant), Private, Public (AWS/Azure/GCP), Hybrid, On-Prem; 99.95% platform / 99.99% auth-payments-DB availability; RTO ≤30 min, RPO ≤5 min (§2.6, §4.10, §17.5).
- 42 microservices specified §6.1–6.42 (Gateway, Identity, Auth, Profiles, Organization, Workforce, Marketplace, Fractional, Gig, Project, Collaboration, Scheduling, Time Tracking, AI Matching/Recommendation, Messaging, Notification, Search, Wallet→Tax/Compliance/Admin), each with entities, APIs, DB, events, security, scalability.

## Requirements / IDs (doc's own scheme: ADR-xxx, TDD-MOB-xxx, TDD-IDEM-xxx; DTM rows cite SRS IDs)

- ADR-001: Cloud-native microservices architecture (§22.6.3).
- ADR-002: Domain-Driven Design (DDD).
- ADR-003: Event-Driven Architecture using Kafka.
- ADR-004: CQRS for selected business domains.
- ADR-005: Polyglot persistence.
- ADR-006: Kubernetes as orchestration platform.
- ADR-007: API-first architecture.
- ADR-008: AI-native platform architecture.
- ADR-009: Zero Trust security model.
- ADR-010: GitOps deployment strategy.
- ADR-011: Multi-tenant SaaS architecture.
- ADR-012: RAG architecture for enterprise AI.
- TDD-MOB-001: Mobile offline entities stored in embedded local DB (SQLite via Drift or equivalent) — High (§23.1.1).
- TDD-MOB-002: Local schema mirrors subset of canonical PostgreSQL schema, version-tagged for drift — High.
- TDD-MOB-003: Never persist payment credentials, MFA secrets, or unencrypted PII locally (SRS FR-MOB-007) — Critical.
- TDD-MOB-004: Configurable local cache ceiling with LRU eviction (SRS FR-MOB-006) — Medium.
- TDD-MOB-005: Conflict detection via version/ETag comparison — High (§23.1.3).
- TDD-MOB-006: Last-write-wins auto-resolution for non-critical fields (SRS FR-MOB-004) — High.
- TDD-MOB-007: Manual resolution for critical fields (payments, contracts, escrow); block auto-resolution — Critical.
- TDD-MOB-008: Audit-log all conflict resolutions with pre/post values — High.
- TDD-IDEM-001: Retryable write endpoints accept client `Idempotency-Key` header — Critical (§23.2.1).
- TDD-IDEM-002: Gateway persists {key, tenant_id, endpoint} → original response for configurable window (default 24h) — Critical.
- TDD-IDEM-003: Duplicate key returns cached original response without re-execution — Critical.
- TDD-IDEM-004: In-flight duplicate gets 409 Conflict + retry-after hint — High.
- TDD-IDEM-005: Keys scoped per tenant and per endpoint — Critical.
- DTM additions (§23.3) map SRS IDs to design: FR-ERR-001–016 → §7.15/§23.2; FR-TEN-001–005 → §17.5; FR-MOB-001–007 → §23.1; FR-API-001–007 → §10.1/§23.2; NFR-AVL-007–011, NFR-DR-001–005 → §4.10. (These are SRS requirement IDs referenced by the TDD, not TDD-owned IDs.)
- No per-requirement numeric IDs exist in Sections 1–22; traceability there is by SRS requirement → TDD section/component via the Design Traceability Matrix (§19, §22.13).

## Hard constraints (shall/must rules binding implementation)

- Each microservice owns its data; direct database access between services is prohibited (§6, §7.8, §9.1.4, §12.11.3).
- Services communicate via REST/GraphQL/gRPC APIs and Kafka events only; events are immutable, versioned, schema-governed, at-least-once, with idempotent consumers and DLQs (§4.4, §11).
- Events published only after successful transaction completion (Transactional Outbox); payloads must not expose unnecessary PII (§7.10).
- Strong ACID for financial/identity/payroll/billing/contract transactions; wallet ledger entries immutable; idempotency keys + maker-checker on sensitive financial ops (§9.3.4, §6.20, §7.16).
- Passwords hashed with Argon2/bcrypt; refresh-token rotation; short-lived access tokens; account lockout; MFA mandatory for admins, financial ops, payroll, payment approvals, privileged users (§6.3, §12.3, §12.5).
- TLS 1.3 external traffic; mutual TLS for selected internal services; encryption at rest for sensitive data; no secrets in source code or container images; Vault-managed credentials (§12.8, §12.9, §10.5.4).
- REST: plural-noun lowercase URIs, JSON, `/api/v1` URI versioning, standard status codes, cursor pagination preferred, common error envelope with correlationId (§10.1–10.10).
- Every production API must have complete documentation (OpenAPI 3.1 / GraphQL SDL / .proto) before GA (§10.11.5).
- Kafka topics `<domain>.<entity>.<event>`; event naming `<Entity><Action>`; standard event envelope (eventId, tenantId, correlationId, …) (§11.2–11.4).
- AI: assistive, explainable, auditable; AI outputs shall not override mandatory business rules; human review required for final hiring, credential rejection, payment holds, fraud enforcement, account suspension (§8.1.5, §8.22.4).
- AI shall not fabricate qualifications/experience (resume, proposals); no auto-submission of proposals; prompts/models/output versioned; no model in production before governance approval; production prompts must be approved (§8.4.6, §8.11.6, §8.14.5, §8.24.5).
- Protected attributes shall not be used for discriminatory ranking or pricing (§8.10.6, §8.18.5).
- AI agents: tool access via approved interfaces only; agents shall not access databases directly, make final hiring decisions, or process financial transactions without approval (§8.5).
- Multi-tenant isolation enforced across authz, DB, cache, search indexes, storage, and AI context (§17.5.3).
- Containers immutable, non-root, minimal images, health checks; branches protected; CI security gates (SAST/SCA/secrets/image/IaC scanning) mandatory (§14.3–14.4).
- IaC-only infrastructure (Terraform/Helm), GitOps reconciliation, zero-downtime releases, rollback for app/config/feature flags (§14, §17.8).
- TDD-MOB-003 and TDD-IDEM-002/003/005 are Critical priority (§23).
- Performance targets: auth <500 ms, profile/wallet lookup <300 ms, search <1 s, dashboard <2 s, sync AI recommendation <5 s (§7.17).

## Section map

- §1 Introduction — purpose, scope, conventions, SRS relationship, design principles, assumptions.
- §2 System Overview — vision, capabilities, high-level architecture, deployment models, tech stack, constraints, trade-offs.
- §3 Enterprise Architecture — principles, EA layers, patterns, ADR mechanism, governance.
- §4 Overall System Architecture — logical/physical/runtime, service interaction, infra/cloud/network/edge, multi-region, HA targets.
- §5 Functional Architecture — domain model, 12 business domains, bounded contexts, event model, workflow architecture.
- §6 Microservices Architecture — 42 services (6.1 API Gateway … 6.42 Administration), each with purpose/entities/APIs/DB/events/security/scalability.
- §7 Detailed Module Design — mandatory 20-part module template (7.1–7.20) + 7.21 template.
- §8 AI Architecture — orchestration, LLM integration, prompts, agents, RAG, embeddings, vector DB, matching engine, resume/assessment/career/proposal/interview/learning/salary/fraud/analytics/search, safety, hallucination prevention, evaluation, cost.
- §9 Data Architecture — polyglot persistence; PostgreSQL/MongoDB/Redis/Elasticsearch/Neo4j/object storage design; lifecycle, backup, DR.
- §10 API Architecture — REST/GraphQL/gRPC standards, versioning, security, rate limiting, pagination, filtering, sorting, error model, docs.
- §11 Event-Driven Architecture — Kafka, taxonomy, topics, contracts, versioning, replay, DLQs, idempotency, monitoring.
- §12 Security Architecture — Zero Trust, identity, authn/authz, MFA, RBAC/ABAC, encryption, secrets, API/network security, data protection, audit, compliance, fraud.
- §13 Integration Architecture — internal patterns; external APIs; payments, email, SMS, calendar, video, IdPs, HRIS, ERP.
- §14 DevSecOps Architecture — source control, branching (main/develop/feature/release/hotfix), CI/CD stages, Docker, Kubernetes, Helm, Terraform, GitOps, blue-green, canary, rollback.
- §15 Observability Architecture — logging, metrics, tracing, monitoring, alerting, dashboards, SLA, capacity.
- §16 Performance Architecture — scalability, load balancing, caching, CDN, DB/search/queue/AI optimization.
- §17 Deployment Architecture — dev/test/staging/prod environments, multi-tenancy, HA, DR, IaC.
- §18 Testing Architecture — unit, integration, contract, E2E, security, performance, load, chaos, AI validation, UAT.
- §19 Design Traceability — SRS↔TDD mapping, functional/NFR/ADR/risk traceability.
- §20 Technical Risks and Mitigations — architecture/security/performance/scalability/AI/integration risks + layered mitigation.
- §21 Future Technical Roadmap — autonomous AI workforce, agent marketplace, digital identity, blockchain credentials, workforce cloud, global exchange, AI OS, super app.
- §22 Appendices — tech stack matrix, service dependency matrix, event/API/DB catalogs, ADR catalog, security/performance matrices, topologies, IBOM, glossary, acronyms, DTM, references.
- §23 TDD Amendments — mobile offline/sync (TDD-MOB), API idempotency keys (TDD-IDEM), DTM additions for SRS Section 23.
