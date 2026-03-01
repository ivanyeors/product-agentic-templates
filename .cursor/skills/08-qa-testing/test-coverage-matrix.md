# Test Coverage Matrix — Template

Use this matrix to ensure every P0 requirement from the PRD is traced to at least one E2E test. Build this matrix during the Accept Handoff step (Phase 08) and maintain it throughout the QA phase.

The matrix traces requirements from PRD → implementation → test, closing the traceability chain that started in Phase 01.

---

## Template

```markdown
# Test Coverage Matrix — [Product Name]
**Date:** [Date]
**PRD Version:** [Version]
**Test Framework:** [Playwright / Cypress / etc.]

## P0 Requirements Coverage

Every P0 functional requirement must have at least one E2E test before the QA gate is presented.

| FR-ID | Requirement | User Story | Implementation | E2E Test File | Test Description | Status |
|-------|------------|------------|----------------|---------------|------------------|--------|
| FR-001 | [Requirement text] | US-001 | `/app/dashboard` | `e2e/dashboard.spec.ts` | Verify dashboard loads with metrics | Passing |
| FR-002 | [Requirement text] | US-002 | `/app/projects/new` | `e2e/projects.spec.ts` | Verify project creation flow | Passing |
| FR-003 | [Requirement text] | US-003 | `/app/auth/login` | `e2e/auth.spec.ts` | Verify login with valid credentials | Passing |
| FR-004 | [Requirement text] | US-003 | `/app/auth/login` | `e2e/auth.spec.ts` | Verify login error handling | Passing |

## P1 Requirements Coverage (if time permits)

| FR-ID | Requirement | E2E Test File | Status |
|-------|------------|---------------|--------|
| FR-005 | [Requirement text] | `e2e/settings.spec.ts` | Planned |
| FR-006 | [Requirement text] | — | Deferred |

## Non-Functional Requirements Coverage

| NFR-ID | Requirement | Test Type | Test Location | Status |
|--------|------------|-----------|---------------|--------|
| NFR-001 | Page load < 2s | Performance | Lighthouse CI | Passing |
| NFR-002 | WCAG 2.1 AA | Accessibility | `e2e/a11y.spec.ts` + axe | Passing |
| NFR-003 | 99.9% uptime | Monitoring | Post-deploy check | N/A (pre-launch) |

## Coverage Summary

| Priority | Total Requirements | Tests Written | Tests Passing | Coverage |
|----------|--------------------|---------------|---------------|----------|
| P0 | [N] | [N] | [N] | [X]% |
| P1 | [N] | [N] | [N] | [X]% |
| NFR | [N] | [N] | [N] | [X]% |

## Gaps

Requirements without test coverage (must be zero for P0 before gate):

| FR-ID | Requirement | Reason | Plan |
|-------|------------|--------|------|
| [none for P0] | | | |

## Error and Edge Case Coverage

For each P0 flow, document that error and edge cases are tested:

| Flow (UF-ID) | Happy Path | Primary Error | Empty State | Edge Case | Notes |
|--------------|-----------|---------------|-------------|-----------|-------|
| UF-001 | e2e/dashboard.spec.ts:L12 | e2e/dashboard.spec.ts:L45 | e2e/dashboard.spec.ts:L67 | e2e/dashboard.spec.ts:L89 | |
| UF-002 | e2e/projects.spec.ts:L10 | e2e/projects.spec.ts:L38 | e2e/projects.spec.ts:L55 | — | Edge case deferred |
```

---

## How to Build the Matrix

1. **During Accept Handoff** — pull all P0 FR-IDs from the PRD and the handoff package Coverage table
2. **Map to implementation** — use the traceability chain from the handoff package to find which routes/pages implement each requirement
3. **Plan tests** — for each FR-ID, determine which E2E test file will cover it; mark as "Planned"
4. **Write tests** — as tests are written, update status to "Written"
5. **Run tests** — after execution, update status to "Passing" or "Failing"
6. **Verify gaps** — before presenting the QA gate, verify zero P0 gaps

The matrix is included in the Phase 08 handoff package under the Coverage section, extending the traceability chain with the final column (test file).
