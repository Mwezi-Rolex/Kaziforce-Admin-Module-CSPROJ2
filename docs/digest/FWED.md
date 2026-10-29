# FWED Digest — Kaziforce Frontend Web Engineering Document (v2)

Purpose: authoritative engineering blueprint for the Kaziforce web frontend (Next.js App Router, React 19+, TypeScript) — architecture, design system, routing, state, API integration, auth/RBAC, AI UX, PWA, security, performance, testing. Self-references as both "FWED" and "FED".

## Pages & routes

Route groups (9.3.1/9.4.3): (public), (auth), (professional), (enterprise), (recruiter), (client), (admin), (super-admin). Every page inherits app-level `loading.tsx`, `error.tsx`, `global-error.tsx`, `not-found.tsx` (9.4.2); all charts/dashboards must show loading and empty states (16.8.1). Per-page loading/empty/error states are otherwise mandated generically (11.6, 17.2), not per-route.

- `/` — Home / landing (hero, features, AI showcase, testimonials, pricing, blog, newsletter, footer). Public. SSG.
- `/about` — Public about page. SSG.
- `/features` — Public product features page (8.1.4, 13.1).
- `/solutions`, `/industries`, `/enterprise` (public marketing) — Public marketing pages (13.1).
- `/ai-platform` — Public AI Platform marketing page (13.1).
- `/pricing` — Public pricing page. SSG.
- `/blog` — Public blog. SSG.
- `/documentation` — Public docs; catch-all `/docs/[...slug]`, optional `/docs/[[...slug]]` (9.6).
- `/careers` — Public careers page.
- `/contact` — Public contact page.
- `/privacy`, `/terms` — Public legal pages (9.3.2).
- `/help/[...article]` — Help Center catch-all (13.31, 9.6).
- `/login` — Login (email/username/phone+OTP, OAuth, SSO, passkey; OAuth buttons, MFA dialog, CAPTCHA). Auth layout. SSR.
- `/register` — Registration (8-step wizard incl. account-type, verification, MFA setup). Auth layout.
- `/verify-email` — Email verification. Auth layout.
- `/verify-phone` — Phone verification (8.2).
- `/reset-password` — Forgot/reset password flow. Auth layout.
- `/mfa` — MFA verification (TOTP, OTP, push, passkey, FIDO2). Auth layout.
- `/passkey` — Passkey registration/login. Auth layout.
- Account recovery + SSO redirect screens (8.2) — Auth layout.
- `/dashboard` — Role-based workspace dashboard (Professional default; KPI widgets). Protected/authenticated. SSR.
- `/profile` — Profile overview; `/profile/skills` deep link; edit, public profile, privacy, verification, portfolio gallery screens (13.3).
- `/resume` — Resume Builder (sections, drag-drop, AI suggestions, ATS score, PDF preview, templates).
- `/jobs` — Job dashboard/search (filters, AI match score, saved jobs); detail `/jobs/[jobId]`; deep link `/jobs/software-engineer-12345`.
- `/marketplace` — Talent/Gig marketplace dashboard (27.4); `/gigs` via Gig Marketplace module (13.9: Gig Dashboard, Gig Details, Proposal Management, Contract Workspace, Earnings Dashboard).
- `/projects` — Projects (dashboard, task/Kanban board, Gantt, files, discussions, reports); detail `/projects/[projectId]`; nested `/projects/7845/tasks/19`.
- `/staffing` — Staffing portal (dashboard, candidate pipeline, placement board, shift calendar, availability grid).
- `/messages` — Messaging (conversation list + chat window, calls, presence); detail `/messages/[conversationId]`.
- `/notifications` — Notification Center (in-app, history, preferences).
- `/wallet` — Wallet (balance, transactions `/wallet/[transactionId]`, deposits/withdrawals, statements).
- `/payments` — Payments (payment form, methods incl. mobile money, history, refunds, receipts).
- Escrow UI (13.17) — Escrow cards, milestone timeline, release dialog, dispute form (within wallet/project flows).
- `/analytics` — Analytics dashboards per role (Executive/Professional/Recruiter/Enterprise/Admin/AI, sections 16.1–16.6).
- `/reports` — Reports (builder, viewer, export PDF/Excel/CSV/JSON, schedule manager).
- `/communities` — Communities (cards, discussion boards, member list, moderator panel).
- `/learning` — Learning (courses, lesson viewer, quiz, progress, certificates).
- `/events` — Events (discovery, registration, calendar, live sessions, QR check-in).
- `/ai/chat` + `/ai/chat/session-889` deep link — AI Assistant chat (streaming, citations, prompt history).
- AI Agents Marketplace UI (13.24) — Agent catalog, marketplace grid, config wizard, agent console, usage dashboard.
- `/settings` — Settings (profile, security, notifications, appearance, language, billing, API keys, devices, privacy).
- `/enterprise` — Enterprise dashboard; `/enterprise/workforce`, `/enterprise/departments` (+`[id]` nested: departments → employees `[id]`), `/enterprise/projects`, `/enterprise/reports`, `/enterprise/settings`. Enterprise-protected.
- Recruiter workspace (8.5) — Dashboard, job management, candidate pipeline, talent search, interview scheduling, resume viewer, AI recruiter, hiring analytics (no explicit base path given; role-based nav in 9.9).
- `/admin` — Admin console dashboard; `/admin/users` (+`/admin/users/583` detail), `/admin/reports`, `/admin/cms`, `/admin/security`. Admin-protected.
- `/super-admin` — Super Admin (platform dashboard, tenant management, infra monitoring, feature flags, API mgmt, AI models, billing, security center, audit logs, config, disaster recovery).
- CMS admin UI (13.27) — Pages, blogs, FAQs, announcements, media library, SEO, localization (under /admin/cms).
- `/companies/[companyId]` — Company profile (9.6). `/users/[userId]` — User detail (9.6).

## Components & conventions

- Atomic Design hierarchy: Tokens → Atoms → Molecules → Organisms → Templates → Pages (7.1).
- Base components (7.2): inputs, selections, buttons, display, feedback — all typed, themed (light/dark), localized, accessible, responsive by default.
- Composite components (7.3): Login/Registration/MFA forms, UserCard, JobCard, GigCard, WalletCard, AI Suggestion Card, etc.
- Layout components (7.4): Root/Public/Auth layouts; workspace layouts; Header, Sidebar, Footer, Breadcrumbs, PageContainer, Tabs/Drawer layouts.
- Enterprise components (7.5): Org Chart, Candidate Pipeline, Audit Log Viewer, Permission Matrix, Feature Flag Manager.
- AI components (7.6): AI Chat Window, Prompt Input, Streaming Response Viewer, Agent Card, MCP Resource Explorer.
- Data grid: TanStack Table + virtualization preferred (7.9). Charts: ECharts/Recharts (4.10).
- Naming (5.9/24.1): components PascalCase, hooks `use*`, services `*.service.ts`, constants UPPER_SNAKE_CASE, env vars NEXT_PUBLIC_*, pages page.tsx/layout.tsx/loading.tsx/error.tsx.
- Design tokens `--kf-*` prefix (6.1.4); semantic colors, Inter + JetBrains Mono, 8-pt spacing grid, 8 elevation levels.
- File size limits (24.1): component 300, hook 200, utility 250, slice 300, service 300 lines.
- Feature-first folders (5.3): each feature has components/hooks/api/types/tests/utils/schemas.
- Accessibility (18): WCAG 2.2 AA + Section 508 + EN 301 549; skip links, focus management, ARIA enhancement only, reduced motion, high contrast; 44×44 px touch targets.
- Every reusable component: TypeScript strict, Storybook stories, unit tests, API docs, a11y guidance (7.12).
- Form stack: React Hook Form + Zod (+ resolvers); client+server+async+cross-field validation (4.6, 7.8).
- State: Redux Toolkit + RTK Query (server state), Zustand (UI state), React Context (theme/locale/auth config) (10).
- Tokens in secure HTTP-only cookies only; never in Local/Session Storage (12.7, 21.6).
- URL conventions: lowercase, hyphenated, REST-inspired, stable IDs (9.12).

## IDs

The FWED defines its own IDs only in Section 28 (Amendments). All other sections have no FWED- IDs.

- FWED-IDEM-001 — API client generates client-side UUID `Idempotency-Key` header for critical write endpoints (payment release, contract creation, payout, application submission). Critical.
- FWED-IDEM-002 — Same Idempotency-Key reused across automatic retries; new key only for genuinely new user actions. Critical.
- FWED-IDEM-003 — On 409 Conflict, back off per Retry-After and retry automatically without user-visible duplication. High.
- FWED-IDEM-004 — On 422 idempotency key/payload mismatch, surface error; user must restart action with fresh key. Medium.
- FWED-IDEM-005 — Reconcile optimistic UI updates against actual cached response on 200 for an already-completed key. High.
- FWED-SYNC-001 — Offline queue batches mutations to POST /api/v1/sync/mutations on reconnection, each with its own Idempotency-Key. High.
- FWED-SYNC-002 — Track per-mutation sync_status (Pending, Syncing, Applied, Failed, Conflict) and reflect in UI per SRS FR-MOB-005. High.
- FWED-SYNC-003 — Failed mutations retained and retried with exponential backoff; never silently dropped without surfacing to user. High.
- FWED-SYNC-004 — On reconnection call GET /api/v1/sync?since={cursor} with stored cursor before replaying local mutations. High.
- FWED-SYNC-005 — Persist returned next_cursor only after fully applying the delta batch to local state. High.
- FWED-SYNC-006 — Non-critical-field conflicts auto-resolved last-write-wins; passive notification allowed, must not block user. Medium.
- FWED-SYNC-007 — Critical-field conflicts (payment amounts, contract terms, escrow status) require blocking conflict-resolution UI; choice submitted to POST /api/v1/sync/conflicts/{id}/resolve. Critical.
- FWED-SYNC-008 — Query GET /api/v1/sync/conflicts on app foreground to surface unresolved conflicts. High.
- FWED-TEN-001 — Attach active tenant_id via Authorization JWT on every request; no separate editable tenant parameter. Critical.
- FWED-TEN-002 — On workspace switching, refresh JWT/session before further API calls (no stale tenant context). High.
- FWED-TEN-003 — On 403, show generic access-denied message; never reveal cross-tenant resource existence (per BED-TEN-003). High.

Referenced (not FWED-defined) IDs in Section 28.4 traceability: SRS FR-ERR-005, FR-API-003, FR-MOB-001–007, FR-TEN-001–005; TDD-MOB-006/007; BED-IDEM-003/004, BED-TEN-003. Section 25.1 examples cite SRS IDs FR-AUTH-001, FR-JOB-015, FR-AI-021, NFR-PERF-004 (illustrative).

## Hard constraints

- Accessibility: WCAG 2.2 AA mandatory on all major workflows (18.1); Lighthouse Accessibility/Best Practices/SEO = 100, Performance ≥95 (17.10, 27.19).
- Core Web Vitals: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1, FCP ≤1.8s, TTFB ≤800ms (17.10).
- Performance budgets: initial JS <200KB gzipped, CSS <100KB; builds exceeding budgets fail quality gates (17.5, 17.10).
- Browser support: Chrome/Edge/Firefox/Safari (+iOS Safari, Chrome Android) latest 2 major versions; Samsung Internet stable; NO Internet Explorer; unsupported browsers get upgrade notification (4.19, 27.22).
- Responsiveness: mobile-first; breakpoints XS<576/576/768/992/1200/1400+ px (27.23; 8.11 gives <640/640–767/768–1023/1024–1279/1280–1535/≥1536 — slight internal divergence); 4/8/12/16-col grids; 44×44px touch targets.
- Validation: all input validated client AND server side; Zod schemas; never trust client input (21.1, 7.8).
- Security: TypeScript strict mode; no client-side secrets; refresh tokens never in Local/Session Storage; CSP, XSS sanitization, CSRF tokens where cookie auth, X-Frame-Options/frame-ancestors (no embedding of admin/auth/enterprise pages); HTTPS only; OWASP Top 10 alignment (21).
- Auth: JWT access+refresh tokens; secure HttpOnly SameSite cookies; MFA, OAuth2/OIDC/SAML SSO, WebAuthn passkeys; RBAC with route/component/action guards (12).
- Frontend never talks to databases, Kafka, or microservices directly — only via API Gateway / WebSocket Gateway per BED (11.1, 15.2).
- Every module: error boundaries + loading states, i18n-ready, tenant-aware, RBAC-gated, tested (unit/component/integration/E2E) (13 "Cross-Module Engineering Standards").
- Offline: auth/payments/escrow/live messaging/AI inference unavailable offline; queued actions synced via Sync Service (20.2, 28.2).
- Logs must never contain passwords, tokens, financial data, or PII (22.8).
- i18n: English initial release; planned FR/AR/PT/ES/SW/DE/ZH/JA/KO/HI; RTL support (Arabic) (19).
- Quality gates: TS compile, ESLint, unit/component/integration tests, a11y scan, security scan, perf budget, visual regression — all must pass before promotion (23.11, 22.1).
- Coverage targets (23.1): business logic/utils/state/shared libs ≥95%, hooks ≥90%.
- pnpm preferred package manager; monorepo (Turborepo) layout (5.1, 5.10).

## Section map

- 1 Introduction (purpose, scope, principles, definitions) · 2 Frontend System Overview · 3 Frontend Architecture (layered, feature-based, AI-native, multi-tenant, offline-first) · 4 Technology Stack (incl. 4.19 Browser Support Matrix) · 5 Frontend Project Structure (monorepo, naming, dependencies) · 6 Enterprise Design System (tokens, colors, typography, spacing, motion, themes, branding) · 7 Component System (atomic design, base/composite/enterprise/AI/data-grid/dashboard components) · 8 Layout Architecture (public/auth/professional/enterprise/recruiter/client/admin/super-admin workspaces; mobile/tablet/responsive) · 9 Navigation Architecture (IA, routes, App Router, middleware, protected routes, RBAC nav, breadcrumbs, deep linking) · 10 State Management (RTK, RTK Query, Zustand, Context, cache, optimistic, offline) · 11 Frontend Integration Layer (REST, GraphQL, gateway, DTO, errors, retries, pagination, upload, streaming) · 12 Authentication & Authorization (login, registration, recovery, OAuth, SSO, MFA, JWT, sessions, RBAC, guards, tenant isolation) · 13 Frontend Modules (13.1–13.31: landing → help center) · 14 AI User Experience (chat, search, recommendations, coach, recruiter, resume, workflows, agents, MCP, streaming) · 15 Real-Time Features (WebSockets, Kafka-fed events, notifications, chat, presence, typing, live dashboards, WebRTC, push) · 16 Dashboards & Analytics (executive/professional/recruiter/enterprise/admin/AI dashboards, reports, charts, KPI widgets) · 17 Frontend Performance (rendering, lazy loading, splitting, images, bundles, virtualization, edge, CDN, Lighthouse) · 18 Accessibility (WCAG 2.2 AA, keyboard, screen readers, focus, forms, reduced motion, contrast) · 19 Internationalization (languages, localization, RTL, time zones, currency, regional formatting) · 20 Progressive Web App (service workers, offline, background sync, push, installability, updates) · 21 Frontend Security (secure coding, CSP, XSS, CSRF, clickjacking, token storage, secrets, OWASP) · 22 Frontend DevOps (build pipeline, CI/CD, Docker, K8s, environments, feature flags, monitoring, logging, deployment) · 23 Testing Strategy (unit→E2E, a11y, security, performance, visual regression, quality gates) · 24 Frontend Engineering Standards (coding, TS, ESLint, Prettier, Git/PR, docs) · 25 Engineering Traceability (SRS/TDD/DDD/BED mappings, API/UI/component/requirement matrices) · 26 Future Evolution (AI-native UI, agents, voice, AR/VR, super app, low-code, personalization) · 27 Appendices (folder structure, component/page/route/screen/layout/form catalogs, tokens, themes, icons, checklists, matrices, env vars, glossary) · 28 FWED Amendments (28.1 idempotency, 28.2 Sync Service integration, 28.3 tenant context, 28.4 traceability, 28.5 summary).
