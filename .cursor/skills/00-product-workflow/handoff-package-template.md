# Handoff Package Template

Use this template at every phase gate. The handoff package is the primary gate presentation — it replaces the separate artifact list. One document, one structure, serving both human review and agent consumption.

Inspired by SBAR (medicine), design intent (construction), FMEA risk forwarding (manufacturing), BOM (physical product design), and commander's intent (military).

---

## Template

```markdown
# Handoff Package — Phase [N] → Phase [N+1]
**Phase:** [Name] · **Product:** [Name] · **Date:** [Date]

## Release Mode
**Release Mode:** `Full Production` | `MVP`

*Set at the Release Mode check-in (after Gate 2). Carried forward in every handoff from Phase 2 onward. Phases 03–08 read this to adjust scope and detail.*

*When Release Mode = MVP, include the following sections.*

## MVP Scope (when MVP)
| FR-ID | Feature | MVP? | Rationale |
|-------|---------|------|-----------|
| FR-001 | [Feature] | Yes | [Why MVP] |
| FR-002 | [Feature] | No | [Why Post-MVP] |

## Post-MVP Backlog (when MVP)
| FR-ID | Feature | Deferred From | Notes |
|-------|---------|---------------|-------|
| FR-002 | [Feature] | MVP scoping | Add when evolving to full production |

## Situation
[2–3 sentences: what was built, scope covered, current state of the product.]

## Decisions and Intent
| Decision | Rationale | Constraint (do not violate) |
|----------|-----------|---------------------------|
| [Decision 1] | [Why this was chosen over alternatives] | [What the next phase must preserve] |
| [Decision 2] | [Why] | [Constraint, if any] |

## Artifacts
| Artifact | Path | What it contains |
|----------|------|------------------|
| [Artifact 1] | `[path]` | [Brief description, counts, key items] |
| [Artifact 2] | `[path]` | [Brief description] |

## Coverage
[One sentence summary: e.g., "All 5 P0 requirements have full coverage through this phase."]

| Requirement | Traced to | Status |
|-------------|-----------|--------|
| FR-001 | UF-001 → WF-001 | Complete |
| FR-002 | UF-002 → WF-002, WF-003 | Complete |
| FR-003 | (pending — next phase) | Pending |

## Assessment
**Strong:** [Where this phase's output is most solid — what the next phase can rely on confidently]
**Thin:** [Where it is weakest — assumptions, limited research, time-constrained areas]
**Deferred:** [What was explicitly cut or postponed, and why]

## Risks Forward
| Risk | Why it matters to Phase [N+1] | Suggested mitigation |
|------|-------------------------------|---------------------|
| [Risk 1] | [Impact on next phase's work] | [What the receiver should do] |
| [Risk 2] | [Impact] | [Mitigation] |

## Assumptions (Unvalidated)
| ID | Assumption | Origin | Validate by |
|----|-----------|--------|-------------|
| A-001 | [Assumption text] | Phase [N] [source] | [When/how to validate] |
| A-002 | [Assumption text] | [source] | [Validation method] |

## Next Phase
Phase [N+1]: [Name] will [one sentence on outcome]. Consumes: [artifact list with paths]. Key question to answer: [one sentence — the most important thing the next phase must resolve].

## Handoff Ready (No-Go / Quality)

**No-Go (must all pass — hard stop if any fails):**
- [ ] All P0 items have downstream coverage
- [ ] All artifacts exist at listed paths
- [ ] [Phase-specific blocker criterion]

**Quality (should pass — can proceed with documented exceptions):**
- [ ] All P1 items have coverage
- [ ] [Phase-specific quality item]
- [ ] No unresolved assumptions older than [threshold]
```

---

## Phase-Specific No-Go and Quality Items

### Phase 1 → 2 (Discovery → Product Design)
**No-Go:**
- [ ] PRD exists with FR-IDs for all P0 requirements
- [ ] Problem statement is a single clear sentence
- [ ] At least 2 personas with identified primary persona
- [ ] Success metrics defined and measurable

**Quality:**
- [ ] All P1 user stories have FR-IDs
- [ ] Competitive analysis covers at least 3 direct competitors
- [ ] Journey map completed for primary persona

### Phase 2 → 3 (Product Design → Frontend Design)
**No-Go:**
- [ ] User flow exists for every P0 user story (with FR-ID reference)
- [ ] Wireframes exist for every screen in P0 flows (with WF-IDs)
- [ ] All screens have loading, empty, and error states specified
- [ ] Accessibility notes (focus order, ARIA flags) on every screen

**Quality:**
- [ ] P1 flows have wireframes
- [ ] Interaction specification covers all P0 components
- [ ] Prototype brief completed (if applicable)
- [ ] Feedback Channels Plan completed (when feedback collection is a PRD requirement)
- [ ] Content model completed (when content-heavy product)
- [ ] Wireframe specs include content notes (per content-design)

**Phase 2 Artifacts (include in Artifacts table when produced):**
- `ia-document.md`, `ia-method-synthesis/` (card sort, tree test, etc. when used)
- `content-model.md` (when content-heavy)
- `user-flows.md`, `wireframe-specs.md`, `interaction-spec.md`
- `feedback-channels-plan.md` (when feedback in scope)
- `feedback-triage.md` (when feedback in scope)
- `market-feedback-plan.md` (when market signals in PRD)
- `prototype-brief.md` (if applicable)

### Phase 3 → 5 (Frontend Design → Frontend Development)
**No-Go:**
- [ ] All design tokens defined (color, typography, spacing, radius, shadow)
- [ ] Component BOM complete — every P0 component mapped to code library
- [ ] All P0 screens at high fidelity (desktop + mobile) OR screen specs complete (Route B)
- [ ] All text/background combinations pass WCAG 4.5:1

**Quality:**
- [ ] All interactive components have all states designed (default, hover, focus, active, disabled)
- [ ] Token-to-CSS mapping documented
- [ ] Tolerances table complete for responsive behavior

### Phase 4 → 6 (Backend Design → Backend Implementation)
**No-Go:**
- [ ] OpenAPI spec exists and is valid
- [ ] Every endpoint traceable to FR-ID
- [ ] Schema design complete (tables, columns, indexes, migration plan)
- [ ] Auth & permission model defined

**Quality:**
- [ ] Request/response examples in OpenAPI
- [ ] Error format documented and consistent
- [ ] Pagination defined for all list endpoints
- [ ] Integration points (webhooks, third-party) specified

### Phase 5 → 7 (Frontend Development → Integration)
**No-Go:**
- [ ] Zero TypeScript errors (`tsc --noEmit`)
- [ ] Zero ESLint errors
- [ ] All P0 screens implemented with loading, empty, and error states
- [ ] First Article Inspection passed for first screen
- [ ] API client structure exists (see 05-frontend-development dev-standards)

**Quality:**
- [ ] Lighthouse audit run and scores documented
- [ ] axe DevTools run with zero critical violations
- [ ] Test coverage matrix maps all P0 FR-IDs to planned E2E tests

### Phase 6 → 7 (Backend Implementation → Integration)
**No-Go:**
- [ ] All P0 endpoints implemented and match OpenAPI spec
- [ ] Backend API is runnable (staging or local)
- [ ] Auth and permission checks applied
- [ ] Structured error responses match Backend Design format

**Quality:**
- [ ] Unit tests for services
- [ ] Integration tests for API endpoints
- [ ] No N+1 queries verified

### Phase 7 → 8 (Integration → QA Testing)
**No-Go:**
- [ ] Contract verification passed for all P0 endpoints
- [ ] API client integrated in frontend (typed, error handling)
- [ ] Auth flow works (login, token, protected routes)
- [ ] E2E data flow verified for P0 flows
- [ ] Third-party integrations configured per PRD (if applicable)

**Quality:**
- [ ] No frontend/backend contract mismatches
- [ ] Error handling aligned between frontend and backend

### Phase 8 → 9 (QA → Deployment)
**No-Go:**
- [ ] All P0 E2E tests passing
- [ ] Zero critical accessibility violations
- [ ] Zero P0 defects open
- [ ] No critical npm audit vulnerabilities

**Quality:**
- [ ] Unit test coverage >= 80% for utils and hooks
- [ ] LCP < 2.5s, INP < 200ms, CLS < 0.1
- [ ] P1 defects documented with remediation plan

### Phase 9 → 11 (Deployment → Product Documentation)
**No-Go:**
- [ ] Post-launch sign-off received (product is live and stable)
- [ ] Production URL is available and documented
- [ ] All 9 handoff packages (Phases 01–09) exist and are accessible
- [ ] Rollback procedure was tested on staging and is documented

**Quality:**
- [ ] Release notes written and shared with stakeholders
- [ ] Monitoring dashboards and alert rules documented
- [ ] Environment configuration document exists
- [ ] Ops runbook exists with deployment and rollback steps

---

## How to Use This Template

1. **Release Mode** is set at the Release Mode check-in (after Gate 2). When MVP, **MVP Scope** and **Post-MVP Backlog** are populated during MVP scoping and carried forward.
2. **Producing phase** fills in the template at gate time — before presenting to human
3. **Human reviewer** reads Situation, Decisions/Intent, Assessment, Risks Forward — approves or revises
4. **Receiving phase** reads the full package during Accept Handoff — verifies Release Mode and MVP Scope (if MVP), verifies no-go items, logs read-back, raises RFIs
5. The Coverage table is a **living traceability matrix** — each phase appends its column to existing rows
6. Assumptions carry forward — each phase reviews inherited assumptions and flags stale ones

---

## Living Traceability Matrix

The Coverage table grows across phases. Each handoff package inherits and extends the previous one:

```
Phase 1:   FR-001 → (pending)
Phase 2:   FR-001 → UF-001 → WF-001
Phase 3:   FR-001 → UF-001 → WF-001 → Figma/Dashboard (or Screen Spec)
Phase 4:   FR-001 → GET/POST /users, /orders (API endpoints)
Phase 5:   FR-001 → UF-001 → WF-001 → Figma/Dashboard → /app/dashboard
Phase 6:   FR-001 → API implemented, migrations run
Phase 7:   FR-001 → Contract verified, API client wired
Phase 8:   FR-001 → UF-001 → WF-001 → Figma/Dashboard → /app/dashboard → e2e/dashboard.spec.ts
```

If any row has a gap, it is visible immediately — that requirement has lost traceability.
