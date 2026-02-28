# Documentation Checklist — Phase 08

Complete this checklist before presenting the documentation gate. All No-Go items must pass. Quality items should pass — proceed with documented exceptions if any fail.

---

## No-Go (hard stop if any of these fail)

### Foundation
- [ ] **Docs entry point exists** — `docs/README.md` (or equivalent) links to all documentation sections
- [ ] **Artifact index exists** — lists every artifact from Phases 01–06 with valid paths/URLs
- [ ] **All artifact paths resolve** — every path or URL in the artifact index is accessible

### User-facing documentation
- [ ] **Getting started guide exists** — covers prerequisites, step-by-step setup, and first-value moment
- [ ] **User guide exists** — covers all P0 features with step-by-step instructions

### Technical documentation
- [ ] **README exists** — project root README covers: what it is, tech stack, local setup, doc links
- [ ] **Environment setup guide exists** — a new developer can run the project locally by following it
- [ ] **At least one ADR exists** — at least the primary technology and architecture choices are documented

### Operations documentation
- [ ] **Operations handbook exists** — covers system overview, monitoring, and escalation path
- [ ] **Rollback procedure is documented** — step-by-step, copy-paste ready

### Knowledge transfer
- [ ] **Project retrospective exists** — covers what was built, what went well, what didn't, and lessons learned

---

## Quality (should pass — can proceed with documented exceptions)

### User-facing documentation
- [ ] **FAQ exists** — at least 5 questions covering the most common user issues
- [ ] **Troubleshooting section** — includes all known error messages with plain-language fixes
- [ ] **Plain language throughout** — no jargon in user docs; all terms defined on first use
- [ ] **Getting started tested** — a first-time reader completed the getting started guide without asking for help

### Technical documentation
- [ ] **Architecture overview exists** — includes system diagram, component table, data flow, and known constraints
- [ ] **ADR coverage** — one ADR per major technology choice, one per significant accepted trade-off
- [ ] **Contributing guide exists** — covers how to run tests, branch naming, PR process, and code style
- [ ] **Component docs exist** — if a component library was built, it is documented with usage examples

### Operations documentation
- [ ] **Incident playbook exists** — severity levels, first 15 minutes checklist, notification template
- [ ] **Deployment process documented** — covers pre-deploy checks, deploy steps, post-deploy verification
- [ ] **Monitoring reference complete** — all dashboards, alert definitions, and contacts documented

### Knowledge transfer
- [ ] **Lessons learned documented** — specific decisions that worked, decisions that created rework
- [ ] **Post-launch roadmap notes** — deferred scope, unvalidated assumptions, and prioritized next steps
- [ ] **New contributor onboarding guide** — day 1 checklist, week 1 reading list, team directory

### Standards compliance (see [doc-standards.md](doc-standards.md))
- [ ] **Every document has "Who this is for"** — audience stated at the top
- [ ] **Every document has a "Last updated" date** — and an owner
- [ ] **No document linked from the entry point is missing** — all links resolve
- [ ] **No placeholder values remain** — no `[PLACEHOLDER]` left unfilled
- [ ] **All code blocks are copy-paste ready** — tested and working

---

## Artifact Index Verification

Confirm all phase artifacts are accounted for.

| Phase | Expected Artifacts | Verified |
|-------|--------------------|----------|
| 1. Discovery | PRD, Personas (2–3), Journey Map, Competitive Analysis, Stakeholder Brief, Problem Statement | [ ] |
| 2. Product Design | IA Document, User Flows, Wireframes, Interaction Spec, Prototype Brief | [ ] |
| 3. Frontend Design | Design Tokens, Figma / BOM, Figma Handoff Manifest or Component Spec | [ ] |
| 4. Frontend Dev | Working application, Architecture doc, FAI Report, Test Coverage Matrix | [ ] |
| 5. QA Testing | Test Suite, Coverage Matrix, Accessibility Audit, Performance Audit, Defect Log | [ ] |
| 6. Deployment | Production URL, Release Notes, Ops Runbook, Launch Checklist | [ ] |

---

## User Documentation Verification

| Check | Verified |
|-------|----------|
| Getting started: prerequisites clearly stated | [ ] |
| Getting started: every step has an "expected result" | [ ] |
| Getting started: troubleshooting section covers the 3 most common first-run failures | [ ] |
| User guide: every P0 feature has step-by-step instructions | [ ] |
| User guide: screenshots or examples for every non-obvious step | [ ] |
| FAQ: at least 5 questions answered | [ ] |
| FAQ: includes a "quick answers" reference table | [ ] |
| All user docs: no jargon without a definition | [ ] |
| All user docs: active voice, short sentences (< 25 words) | [ ] |

---

## Technical Documentation Verification

| Check | Verified |
|-------|----------|
| README: what it is, tech stack, local setup in ≤ 5 steps, links to full docs | [ ] |
| Architecture: system diagram present | [ ] |
| Architecture: component table with technology and purpose | [ ] |
| Architecture: data flow described end-to-end | [ ] |
| Architecture: known constraints documented | [ ] |
| ADRs: linked from architecture doc | [ ] |
| ADRs: each has Context, Decision, and Consequences sections | [ ] |
| Setup guide: a fresh developer can follow it start to finish | [ ] |
| Setup guide: all environment variables documented with source | [ ] |
| Contributing: how to run tests locally | [ ] |
| Contributing: branch naming and PR process | [ ] |

---

## Operations Documentation Verification

| Check | Verified |
|-------|----------|
| Ops handbook: system URLs and status pages | [ ] |
| Ops handbook: routine operations checklist | [ ] |
| Ops handbook: monitoring dashboard links and alert definitions | [ ] |
| Ops handbook: escalation path (who to call and how) | [ ] |
| Incident playbook: P1–P4 severity definitions | [ ] |
| Incident playbook: first 15 minutes checklist | [ ] |
| Incident playbook: stakeholder notification template | [ ] |
| Deployment process: pre-deploy checklist | [ ] |
| Deployment process: rollback steps are copy-paste ready and tested | [ ] |

---

## Knowledge Transfer Verification

| Check | Verified |
|-------|----------|
| Retrospective: "what was built" section | [ ] |
| Retrospective: "what went well" with specific examples | [ ] |
| Retrospective: "what didn't go well" with root causes | [ ] |
| Retrospective: "if we started over" with honest recommendations | [ ] |
| Lessons learned: decisions that saved time | [ ] |
| Lessons learned: decisions that created rework | [ ] |
| Roadmap notes: deferred scope from all phases | [ ] |
| Roadmap notes: prioritized suggestions for next iteration | [ ] |
| Onboarding: day 1 access checklist | [ ] |
| Onboarding: week 1 reading list in order | [ ] |
| Onboarding: team directory with areas of responsibility | [ ] |

---

## Assessment Summary

Before presenting the gate, complete this summary:

**Strong:** [Areas with the best documentation coverage — what the team can rely on]

**Thin:** [Areas with known gaps — and why they are documented gaps, not oversights]

**Deferred:** [Documents not written this cycle — with rationale and a target date for completion]

---

## Sign-Off

```
Documentation Phase 08 — COMPLETE
Reviewed by: [Name]
Date: [Date]
Docs published at: [URL or path]
Doc owner assigned: [Name or team]
Maintenance cadence: [Quarterly / On each release / Other]
Notes: [Any observations or outstanding items]
```
