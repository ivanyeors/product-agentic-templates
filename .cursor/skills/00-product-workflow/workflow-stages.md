# Workflow Stages — Detailed Reference

## Gate Criteria by Phase

Each gate has minimum criteria that must be met for APPROVED to be valid. The agent should verify these before presenting the gate.

---

### Gate 1: Discovery → Product Design

**Minimum criteria:**
- PRD exists with at least 3 P0 user stories
- Problem statement is a single clear sentence
- At least 2 personas created with goals and frustrations
- Current state journey map completed for primary persona
- At least 3 competitors analyzed
- Success metrics defined and measurable

**Common revision requests:**
- "The PRD requirements aren't specific enough" → Make each FR testable and measurable
- "The personas feel generic" → Add specific behaviors and a representative quote
- "We don't know who our primary user is" → Revisit research synthesis, ask for user access
- "Success metrics aren't measurable" → Add baseline, target, and measurement method

---

### Gate 2: Product Design → Frontend Design

**Minimum criteria:**
- IA document covers all P0 screens
- User flow exists for every P0 user story
- Wireframes exist for every screen in P0 flows
- All screens have loading, empty, and error states specified
- Accessibility notes (focus order, ARIA flags) on every screen

**Common revision requests:**
- "Flows have dead ends" → Ensure every error state has a recovery path
- "Missing edge cases" → Specify empty states and error states for all data-dependent screens
- "IA doesn't match the PRD scope" → Audit IA against all P0/P1 user stories
- "Wireframes are too vague" → Add component annotations and interaction notes

---

### Gate 3: Frontend Design → Frontend Development

**Minimum criteria:**
- All design tokens defined (color, typography, spacing, radius, shadow)
- All P0 components designed with all states (default, hover, focus, active, disabled)
- All P0 screens at high fidelity (desktop + mobile)
- Figma file with Color Styles, Text Styles, and Variants
- All text/background combinations pass WCAG 4.5:1

**Common revision requests:**
- "Tokens are inconsistent" → Audit all components for raw values and replace with tokens
- "Missing component states" → Add hover, focus, disabled for [specific component]
- "Contrast fails on [screen]" → Identify failing pairs, adjust color tokens
- "No mobile designs" → Design mobile breakpoint for all P0 screens

---

### Gate 4: Frontend Development → QA Testing

**Minimum criteria:**
- Zero TypeScript errors (`tsc --noEmit`)
- Zero ESLint errors
- All P0 screens implemented with loading, empty, and error states
- Lighthouse audit run (scores documented)
- axe DevTools run with zero critical violations
- API error handling tested manually

**Common revision requests:**
- "Performance is poor" → Address specific Lighthouse recommendations
- "Accessibility violations found" → Fix listed axe violations
- "Missing error states" → Implement error UI for [specific screens]
- "TypeScript errors" → Fix all before proceeding

---

### Gate 5: QA → Deployment

**Minimum criteria:**
- All P0 E2E tests passing
- Unit test coverage ≥ 80% for utils and hooks
- Zero critical accessibility violations (axe automated)
- LCP < 2.5s, INP < 200ms, CLS < 0.1
- No critical npm audit vulnerabilities
- Zero P1/Critical bugs open

**Common revision requests:**
- "E2E tests are flaky" → Stabilize specific tests before re-presenting
- "Coverage is below target" → Add tests for uncovered utility/hook files
- "Performance still failing" → Address specific metrics
- "Security issue found" → Fix before proceeding (no exceptions for Critical)

---

### Gate 6: Deployment → Live (Post-Launch Sign-off)

**Minimum criteria:**
- 24 hours of stable operation
- Error rate < 0.1%
- Core Web Vitals in "Good" range in production
- No P1/Critical alerts in monitoring
- Stakeholders notified and accepted

**Common revision requests:**
- "Error rate too high" → Rollback, diagnose, fix, redeploy
- "Performance degraded in production" → Investigate CDN/hosting config differences

---

## Revision Loop Rules

1. **Targeted revisions only** — revise only what was specifically requested, not the entire phase
2. **Maximum 3 revision rounds** per gate. On the 3rd, escalate to the human for a decision on how to proceed
3. **Document what changed** — each revision cycle should note what was changed and why
4. **Re-validate against checklist** — after revising, re-verify the full gate checklist before re-presenting
5. **Don't regress** — ensure revisions don't break previously approved elements

### Revision Tracking Format

```
REVISION CYCLE [N] — Phase [X] Gate
Changes made:
- [Change 1]: [What was done and why]
- [Change 2]: [What was done and why]

Checklist re-verification:
- [Item]: [Status — Pass / Still failing → action taken]
```

---

## Phase Overlap Guidance

When a team is moving fast, some phase overlap is acceptable. Rules:

| Overlap | Allowed? | Condition |
|---------|----------|-----------|
| Design system tokens (Phase 3) while flows still being refined (Phase 2) | YES | Only tokens, not screen designs |
| Begin component dev (Phase 4) while component designs being finalized (Phase 3) | YES | Only for atoms approved at gate |
| Write unit tests (Phase 5) during development (Phase 4) | YES | Always encouraged |
| Staging deploy (Phase 6 prep) during QA (Phase 5) | YES | Required for E2E tests |
| Production deploy before QA gate approved | NO | Never |

---

## Human Decision Points Beyond Gates

These situations require a human decision even mid-phase:

### Scope Change
If new requirements emerge during a phase:
> A scope change has been identified: [description]. This was not in the original PRD. Options:
> 1. Add to current scope (extend this phase)
> 2. Defer to a future phase (log as a backlog item)
> 3. Reject (not in product vision)
> Please decide before continuing.

### Technical Risk
If a technical constraint blocks the designed approach:
> A technical constraint has been encountered: [description]. The designed approach [X] is not feasible because [reason]. Proposed alternatives:
> 1. [Alternative A] — trade-offs: [...]
> 2. [Alternative B] — trade-offs: [...]
> Please decide before continuing.

### Resource / Timeline Risk
If the work is taking significantly longer than expected:
> Timeline risk: Phase [N] is estimated to take [X] more time than originally planned. Reason: [description]. Options:
> 1. Reduce scope for this phase: [what could be deferred]
> 2. Continue with extended timeline
> Please decide before continuing.

---

## Artifact Inventory by Phase

### Phase 1 — Product Discovery
- `stakeholder-brief.md`
- `problem-statement.md`
- `research-synthesis.md`
- `competitive-analysis.md`
- `persona-[name].md` (one per persona)
- `journey-map-[persona].md`
- `prd.md`

### Phase 2 — Product Design
- `ia-document.md`
- `user-flows.md`
- `wireframe-specs.md`
- `interaction-spec.md`
- `prototype-brief.md`

### Phase 3 — Frontend Design
- `design-tokens.md` (or exported token file)
- Figma file URL
- Component library (in Figma)
- Screen designs (in Figma)

### Phase 4 — Frontend Development
- Git repository with working application
- `architecture.md` (documented decisions)
- Lighthouse audit report

### Phase 5 — QA Testing
- Test files in repository
- Coverage report
- Accessibility audit report
- Performance audit report
- Security review report

### Phase 6 — Deployment
- CI/CD pipeline configuration
- Production URL
- Monitoring dashboard URL
- Release notes
- Signed launch checklist
