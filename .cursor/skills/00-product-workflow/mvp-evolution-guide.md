# MVP Evolution Guide

When an MVP has been launched (Phase 6 signed off) and the human decides to **evolve to full production**, follow this guide to add Post-MVP features without discarding MVP work.

---

## When to Evolve

Signals that may trigger the evolution decision:

- User feedback validates the MVP; stakeholders want more features
- Metrics indicate product-market fit; ready to expand
- Explicit stakeholder decision to invest in full production

---

## Evolution Check-in

After Gate 6 (Post-Launch Sign-off) when the product was built as MVP, present:

```
MVP LAUNCHED — Evolution Check-in

  EVOLVE TO FULL PRODUCTION  → Add Post-MVP features; run upgrade path
  STAY ON MVP                → Continue with MVP scope; no change
  PAUSE                      → Defer evolution decision
```

---

## Upgrade Path (when EVOLVE selected)

### 1. Run MVP Technical Debt Audit

Before adding Post-MVP features, run this audit. Human reviews and approves before Phase 3 re-entry.

| Area | Questions | Action if Yes |
|------|-----------|---------------|
| Design tokens | Are there hardcoded values that bypass tokens? | Replace with tokens before adding new components |
| Component states | Are MVP components missing hover/focus/disabled states? | Add missing states before new screens |
| Schema | Were any schema shortcuts taken (e.g. JSONB for structured data)? | Assess migration path before adding Post-MVP entities |
| Auth | Is auth minimal (e.g. single role)? | Extend auth model before adding permission-sensitive features |
| Test coverage | Is unit coverage below 60%? | Raise to at least 60% before adding Post-MVP code |
| Performance | Are there known performance issues? | Document and prioritize fixes in upgrade scope |

**Output:** `mvp-technical-debt-audit.md` — human reviews and approves.

### 2. Re-enter at Phase 3

- **Release Mode:** `Full Production`
- **Scope:** MVP FR-IDs + Post-MVP FR-IDs (from Post-MVP Backlog in handoff package)
- Product Design (Phase 2) is already done — no need to re-run

### 3. Extend, Don't Replace

- **Design tokens:** Add new tokens; do not replace MVP tokens
- **Components:** Add variants and new components; extend MVP components with missing states
- **Schema:** Add tables/columns via migrations; avoid rewrites
- **API:** Add new endpoints; preserve existing contract

### 4. Incremental Evolution (Optional)

Evolve in waves instead of one big release:

- Wave 1: Add highest-priority Post-MVP features, re-gate
- Wave 2: Add next batch, re-gate
- Repeat until full production scope is complete

---

## Merging Post-MVP with Existing MVP Codebase

- Use the existing design system, component library, and API as the base
- Add Post-MVP screens, endpoints, and schema incrementally
- Run regression tests after each wave
- Document any breaking changes in human interventions for downstream phases

---

## Rollback Strategy

If evolution introduces regressions:

- Tag the release; keep MVP deployment as a known-good rollback point
- Document rollback steps in ops runbook
- If critical issues found during QA, rollback to MVP and fix before re-deploying

---

## Integration

- Referenced by the orchestrator when MVP Evolution Check-in returns **EVOLVE**
- See [SKILL.md](SKILL.md) → MVP Evolution Check-in
- See [workflow-stages.md](workflow-stages.md) → MVP Evolution Path
