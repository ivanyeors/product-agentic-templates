# Documentation Phase — Human Review Gate Checklist

Use this checklist before approving the transition from Deployment → Documentation Complete (Gate 7 — Terminal Gate).

---

## No-Go (must all pass — hard stop if any fails)

- [ ] Every P0 requirement has a documentation path (user can find how to use it)
- [ ] Technical docs cover local setup, deployment, and testing
- [ ] Operations manual has a tested rollback procedure documented
- [ ] No placeholder content in any published document
- [ ] Documentation Hub index exists and links to all 7 outputs
- [ ] All documents state their audience in the first line
- [ ] All documents have a "Last Updated" date and owner

---

## Artifact Inventory

- [ ] All 6 phase directories audited
- [ ] All handoff packages (1–6) included
- [ ] Gaps and contradictions section completed
- [ ] Every artifact has a path and state (Complete / Stale / Missing)

---

## Product Overview

- [ ] What we built (one paragraph, plain language)
- [ ] Why we built it (problem + opportunity)
- [ ] Key decisions table with rationale
- [ ] Success metrics with measurement method
- [ ] Deferred items with reasons
- [ ] Product map (diagram or structure)
- [ ] Links to other documentation sections

---

## User Documentation

- [ ] Quick start section
- [ ] Task-based "How to..." guides for all P0 features
- [ ] Screen reference table
- [ ] Error states and what to do
- [ ] FAQ (derived from persona pain points)
- [ ] Help/support contact or link

---

## Technical Documentation

- [ ] Architecture overview (tech stack, project structure, data flow)
- [ ] Environment setup (prerequisites, local setup, env vars)
- [ ] Component reference (or link to Design System Reference)
- [ ] API integration (endpoints, auth, error handling)
- [ ] Testing guide (how to run, coverage, how to add tests)
- [ ] Full traceability matrix (FR-ID through to test file)

---

## Design System Reference

- [ ] Design tokens (color, typography, spacing, radius, shadow, motion)
- [ ] Component catalog with states and do/don't guidelines
- [ ] Accessibility standards (WCAG, focus order, ARIA)
- [ ] Pattern library (when to use each pattern)
- [ ] Figma link or screen specs reference (if applicable)

---

## Operations Manual

- [ ] Deployment runbook (deploy steps)
- [ ] Rollback procedure (tested on staging, step-by-step)
- [ ] Hotfix process
- [ ] Monitoring guide (dashboards, alerts, escalation)
- [ ] Incident response playbook
- [ ] Infrastructure reference (environments, CI/CD, secrets)
- [ ] Known issues and accepted risks

---

## Decision Log and Retrospective

- [ ] Decision log covers all 6 handoff packages
- [ ] Each decision has rationale and constraint
- [ ] Assumptions register (all phases)
- [ ] Lessons learned (what went well, thin areas, what to change)
- [ ] Intervention history summary

---

## Quality (should pass — can proceed with documented exceptions)

- [ ] All P1 features documented
- [ ] Design system reference covers all implemented components
- [ ] Decision log covers all 6 handoff packages
- [ ] Documentation is spell-checked
- [ ] Documentation has been peer-reviewed (or self-reviewed with checklist)
- [ ] 5-minute rule: each section digestible in under 5 minutes
- [ ] Visual over verbal: tables/diagrams used where appropriate

---

## Gate Decision

**Reviewer:** ______________________
**Date:** ______________________

- [ ] **APPROVED** — All No-Go items checked. PDLC complete. Product fully documented.
- [ ] **CONDITIONALLY APPROVED** — Proceed with these open items tracked: [list]
- [ ] **REVISE** — Return to agent with specific feedback: [feedback]

**Notes:**
[Space for reviewer notes]

---

*This is the terminal gate. There is no Phase 09. Approval marks the PDLC as complete.*
