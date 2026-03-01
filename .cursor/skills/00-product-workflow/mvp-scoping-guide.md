# MVP Scoping Guide

When the human selects **MVP** at the Release Mode check-in (after Gate 2), the orchestrator follows this guide to derive and confirm MVP scope before Phase 3 and 4 begin.

---

## Purpose

Differentiate **must-have features for MVP** from **nice-to-have (Post-MVP)** so phases 03–05 can adjust their level of detail and implementation scope accordingly.

---

## Flow

1. Human selects **MVP** at Release Mode check-in
2. Orchestrator runs MVP scoping (this guide)
3. Orchestrator presents proposed MVP scope to human for confirmation or edits
4. Human confirms or modifies the scope
5. Orchestrator proceeds to Phase 3 and 4 with `Release Mode: MVP` and the confirmed scope

---

## Step 1: List All P0 (and optionally P1) Features

From the Handoff Package 2 (Product Design) and PRD:

- Extract all FR-IDs with their descriptions
- Include P0 (Must-Have) and optionally P1 (Should-Have) from the PRD

---

## Step 2: Derive MVP Scope Automatically

Apply one or more of these criteria to tag each FR as MVP or Post-MVP:

| Criterion | Definition | MVP if... |
|-----------|-------------|-----------|
| **Core value proposition** | The primary reason the product exists | Feature delivers the core value |
| **Single primary user path** | The critical path for the primary persona's main goal | Feature is on this path |
| **Minimum viable data** | Core entities required for the flow to function | Feature requires core data; cannot defer without breaking flow |
| **RICE top tier** | Highest RICE scores in PRD | In top 25% by RICE |
| **P0-only** | PRD Must-Haves | All P0 = MVP (simplest rule) |

**Default:** Start with P0-only. If P0 is too large for MVP timeline, apply RICE ranking and take top N, or apply the three criteria above to trim.

---

## Step 3: Produce MVP Scope Table

| FR-ID | Feature | MVP? | Rationale |
|-------|---------|------|-----------|
| FR-001 | User login | Yes | Core auth — required for any use |
| FR-002 | Dashboard | Yes | Primary user path |
| FR-003 | Export PDF | No | Nice-to-have; defer |

---

## Step 4: Present to Human for Confirmation

```
MVP SCOPE — CONFIRMATION REQUIRED

Based on the PRD and Product Design handoff, the following scope is proposed for MVP:

MVP (in scope for Phase 3–8):
- FR-001: [Feature] — [Rationale]
- FR-002: [Feature] — [Rationale]

Post-MVP (deferred to backlog):
- FR-003: [Feature] — [Rationale]
- FR-004: [Feature] — [Rationale]

Please confirm or edit:
  CONFIRMED  → Proceed to Phase 3 + 4 with this scope
  EDIT: [changes] → Agent will update and re-present
```

---

## Step 5: Output

- **Release Mode:** `MVP`
- **MVP Scope:** Table of FR-IDs with MVP/Post-MVP tags (attach to Handoff Package 2)
- **Post-MVP Backlog:** Table of deferred FR-IDs for upgrade path (see [handoff-package-template.md](handoff-package-template.md))

---

## Integration

- Referenced by the orchestrator when `MVP` is selected at the Release Mode check-in
- Output flows into the handoff package; phases 03–05 read `Release Mode` and `MVP Scope` during Accept Handoff
- See [pm-prioritization.md](pm-prioritization.md) → MVP Overlay for criteria and table template
