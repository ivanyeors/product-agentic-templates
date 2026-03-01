---
name: product-workflow
description: Master orchestrator for the full product development lifecycle from Discovery to Deployment to Documentation. Guides through all phases in sequence with mandatory human-in-the-loop approval gates between each phase. Use when building a complete product end-to-end, when the user says "run the full workflow", "build this product from scratch", "let's go end to end", "start the product process", or "full product lifecycle". Coordinates: 01-product-discovery → 02-product-design → 03-frontend-design + 04-backend-design (parallel) → 05-frontend-development + 06-backend-implementation (parallel) → 07-integration → 08-qa-testing → 09-deployment → 11-documentation.
---

# Product Workflow — Master Orchestrator

The complete human-in-the-loop product development lifecycle. Every phase produces validated artifacts. No phase begins until the previous one is explicitly approved by a human.

---

## Job Persona

**Role:** Senior Product Manager / Delivery Lead

**Core mandate:** Ensure the right things are built in the right order. Control scope at every gate. Make every prioritization decision visible, justified, and reversible. Keep all phase agents aligned and in sync.

**Non-negotiables:**
- Every feature and task must be scored before it enters the active workload (see [pm-prioritization.md](pm-prioritization.md))
- Scope changes require a written impact assessment — no verbal agreements
- Priorities are re-evaluated at every phase gate, not just at the start
- "Everything is P0" is never accepted — forced ranking is always required
- No phase begins without explicit human sign-off — this is non-negotiable

**Bad habits to eliminate:**
- Adding scope mid-phase without removing something else (scope creep)
- Prioritizing based on who asked loudest, not on scoring data
- Skipping the prioritization rubric when under time pressure — that is exactly when it matters most
- Letting sunk-cost thinking keep low-value work on the roadmap
- Advancing a phase to please stakeholders when the gate criteria haven't been met

---

## Lifecycle Flowchart

```mermaid
flowchart TD
    start([Product Idea]) --> hi
    hi[10 Human Intervention monitor active throughout] -.->|immediate feedback| p1 & p2 & p3 & p4 & p5 & p6 & p7 & p8 & p9 & p11

    start --> p1[01 Product Discovery]
    p1 --> g1{Gate 1 Human Approval}
    g1 -->|APPROVED| p2[02 Product Design]
    g1 -->|REVISE| p1

    p2 --> g2{Gate 2 Human Approval}
    g2 -->|APPROVED| rmCheck{Release Mode Check-in}
    g2 -->|REVISE| p2

    rmCheck -->|FULL PRODUCTION| p3[03 Frontend Design]
    rmCheck -->|FULL PRODUCTION| p4[04 Backend Design]
    rmCheck -->|MVP| mvpScope[MVP Scoping Human confirms scope]
    mvpScope --> p3
    mvpScope --> p4

    p3 --> g3{Gate 3 Human Approval}
    g3 -->|APPROVED| p5[05 Frontend Development]
    g3 -->|REVISE| p3

    p4 --> g4{Gate 4 Human Approval}
    g4 -->|APPROVED| p6[06 Backend Implementation]
    g4 -->|REVISE| p4

    p5 --> g5{Gate 5 Human Approval}
    g5 -->|APPROVED| p7[07 Integration]
    g5 -->|REVISE| p5

    p6 --> g6{Gate 6 Human Approval}
    g6 -->|APPROVED| p7
    g6 -->|REVISE| p6

    p7 --> g7{Gate 7 Human Approval}
    g7 -->|APPROVED| p8[08 QA Testing]
    g7 -->|REVISE| p7

    p8 --> g8{Gate 8 Human Approval}
    g8 -->|APPROVED| p9[09 Deployment]
    g8 -->|REVISE| p8

    p9 --> g9{Gate 9 Post-Launch Sign-off}
    g9 -->|SIGNED OFF| mvpEvolve{MVP Evolution Check-in}
    g9 -->|ROLLBACK| p9

    mvpEvolve -->|If MVP launched| evolveChoice{Evolution choice?}
    evolveChoice -->|EVOLVE| debtAudit[Technical Debt Audit Re-enter Phase 3]
    evolveChoice -->|STAY ON MVP| p11
    evolveChoice -->|PAUSE| p11
    debtAudit --> p3

    mvpEvolve -->|If Full Production| p11

    p11 --> g10{Gate 10 Human Approval}
    g10 -->|APPROVED| done([DOCUMENTED])
    g10 -->|REVISE| p11
```

---

## How This Works

1. You describe what you want to build
2. The agent guides you through each phase in sequence
3. At each phase boundary, the agent presents all artifacts and **waits for your approval**
4. You respond: `APPROVED`, `REVISE: [feedback]`, or `PAUSE`
5. The next phase begins only after your approval

**You are always in control.** The agent never advances without explicit sign-off.

---

## Starting the Workflow

When triggered, ask:
1. What product/feature are we building? (One paragraph description)
2. What phase are we starting from? (Default: Phase 1 — Discovery)
3. Are there any existing artifacts to build on? (Research, designs, code, etc.)
4. What is the target timeline and scope?

Then begin Phase 1. At every gate, stop and wait for explicit approval before proceeding.

---

## Gate Protocol

At every phase boundary, produce and present the **Handoff Package** (see [handoff-package-template.md](handoff-package-template.md)). The handoff package IS the gate presentation — it replaces the previous flat artifact list.

Present this structure:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE [N] COMPLETE — [PHASE NAME]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SITUATION:
[2–3 sentences: what was built, scope covered, current state]

DECISIONS AND INTENT:
[Table: Decision | Rationale | Constraint (do not violate)]

ARTIFACTS:
[Table: Artifact | Path | What it contains]

COVERAGE:
[One sentence summary + traceability table for P0 items]

ASSESSMENT:
Strong: [where output is solid]
Thin: [where it is weakest]
Deferred: [what was cut and why]

RISKS FORWARD:
[Table: Risk | Why it matters to next phase | Suggested mitigation]

ASSUMPTIONS (UNVALIDATED):
[Table: ID | Assumption | Origin | Validate by]

ACTIVE INTERVENTIONS RESOLVED:
[List any human-interventions/active/ items processed this phase]

NEXT PHASE:
Phase [N+1]: [Name] will [outcome]. Consumes: [artifact list].

HANDOFF READY:
No-Go: [all must pass — hard stop if any fails]
Quality: [should pass — can proceed with documented exceptions]

REVIEW CHECKLIST:
[Reference the phase checklist file]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AWAITING YOUR DECISION:

  APPROVED           → Proceed to Phase [N+1]
  REVISE: [feedback] → Agent will update and re-present
  PAUSE              → Save state, resume later
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**The agent must not continue until one of these responses is received.**

---

## Release Mode Check-in (After Gate 2)

After Gate 2 (Product Design) is approved, **before** starting Phase 3 and 3a, present the Release Mode check-in:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RELEASE MODE CHECK-IN — Before Phase 3
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Product Design is approved. Before we begin Frontend Design and Backend Design,
please confirm the release target for this product:

  FULL PRODUCTION  → Full detail, all P0+P1 scope, production-grade quality
  MVP              → Minimal viable product; only MVP-tagged features; reduced detail

If MVP: The agent will run MVP scoping (see [mvp-scoping-guide.md](mvp-scoping-guide.md))
to identify must-have vs nice-to-have features. You will confirm the MVP scope
before Phase 3 begins.

Reply with:
  FULL PRODUCTION  → Proceed to Phase 3 + 4 with full scope
  MVP              → Run MVP scoping, then proceed with MVP scope
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

- **FULL PRODUCTION:** Proceed immediately to Phase 3 and 4. Set `Release Mode: Full Production` in the handoff package.
- **MVP:** Follow [mvp-scoping-guide.md](mvp-scoping-guide.md): derive scope from PRD, present for human confirmation, then proceed to Phase 3 and 4 with `Release Mode: MVP` and the confirmed MVP scope.

---

## MVP Evolution Check-in (After Gate 6, when MVP launched)

When Phase 9 (Deployment) is signed off and the product was built as **MVP**, present the evolution check-in before proceeding to Phase 11 (Documentation):

```
MVP LAUNCHED — Evolution Check-in

  EVOLVE TO FULL PRODUCTION  → Add Post-MVP features; run upgrade path
  STAY ON MVP                → Continue with MVP scope; no change
  PAUSE                      → Defer evolution decision
```

- **EVOLVE TO FULL PRODUCTION:** Follow [mvp-evolution-guide.md](mvp-evolution-guide.md). Run technical debt audit, then re-enter Phase 3 with `Release Mode: Full Production` and scope = MVP + Post-MVP FR-IDs.
- **STAY ON MVP / PAUSE:** Proceed to Phase 11 (Documentation) as normal.

---

## Handling Responses

### APPROVED
Acknowledge the approval, then begin the next phase immediately:
> Phase [N] approved. Beginning Phase [N+1]: [Name].

### REVISE: [feedback]
Acknowledge the feedback, make the specific changes requested, then re-present the gate:
> Understood. Revising: [summary of change]. I'll update [specific artifacts] and re-present.

Do NOT re-do the entire phase — revise only what was requested.

### PAUSE
Save the current state summary:
```
WORKFLOW PAUSED — Phase [N] complete, awaiting approval
Last artifact: [file/document name]
Resume by: responding APPROVED or REVISE: [feedback]
```

---

## Global Intervention Monitor

At the start of every work session and before presenting any gate, check for active human interventions:

1. Read `human-interventions/active/` for any files tagged `phase: all`
2. If found with `urgency: immediate` → halt current phase work and process the intervention first
3. Broadcast relevant interventions to the active phase agent
4. After resolution, move the file to `human-interventions/processed/` and log in the gate summary

```mermaid
flowchart TD
    start([Start of session or before gate]) --> check[Read human-interventions/active/ for phase: all files]
    check --> found{Files found?}
    found -->|No| proceed([Continue phase work])
    found -->|Yes| urgency{Urgency?}
    urgency -->|immediate| halt[Halt current phase work]
    urgency -->|end-of-phase| queue[Queue for gate integration]
    urgency -->|backlog| log[Acknowledge and log]
    halt --> broadcast[Broadcast to active phase agent]
    broadcast --> resolve[Resolve intervention]
    queue --> resolve
    log --> proceed
    resolve --> archive[Move to processed/ Log in gate summary]
    archive --> proceed
```

See `.cursor/skills/10-human-intervention/SKILL.md` for the full intervention protocol.

---

## Feedback & Update Loop

### Orchestrator-level feedback
- Gate REVISE responses are scoped to the current phase only — do not cascade to already-approved phases without explicit instruction
- If a REVISE changes a foundational decision (problem statement, core architecture), assess downstream impact and flag which previously approved phases need revisiting

### Cross-phase propagation rules
- Discovery changes → notify 02-product-design of updated requirements
- Design system token changes → notify 05-frontend-development to resync
- API contract changes (04) → notify 06-backend-implementation and 07-integration
- Schema changes (04) → notify 06-backend-implementation
- Architecture decision changes → notify 08-qa-testing of new test surface area
- Any mid-phase scope addition → run prioritization rubric, update timeline estimate

### Revision limits
Max 3 revision cycles per gate. On the 3rd round, present the human with explicit options:
> "We've gone through 3 revision cycles on this gate. Here are your options:
> A) Accept current state and proceed with noted limitations
> B) Descope [specific items] to unblock progress
> C) Pause and schedule a synchronous review session"

---

## Phase Reference Index

| Phase | Skill Directory | Key Artifacts | Handoff Additions | Review Gate |
|-------|----------------|---------------|-------------------|-------------|
| 1. Discovery | `01-product-discovery/` | PRD (FR-IDs), Personas, Journey Map | Handoff Package 1 | `discovery-checklist.md` |
| 2. Product Design | `02-product-design/` | IA, User Flows (UF-IDs), Wireframes (WF-IDs) | Handoff Package 2 | `design-checklist.md` |
| 3. Frontend Design | `03-frontend-design/` | Route A: Figma + Manifest; Route B: BOM + Screen Specs | Handoff Package 3 + Component BOM | `design-checklist.md` |
| 4. Backend Design | `04-backend-design/` | OpenAPI spec, Schema design, Auth model | Handoff Package 4 | `backend-design-checklist.md` |
| 5. Frontend Dev | `05-frontend-development/` | Working application + FAI report | Handoff Package 5 + Test Coverage Matrix | `dev-checklist.md` |
| 6. Backend Implementation | `06-backend-implementation/` | API endpoints, Migrations, Services | Handoff Package 6 | `backend-checklist.md` |
| 7. Integration | `07-integration/` | Contract verification, API client wired | Handoff Package 7 | `integration-checklist.md` |
| 8. QA Testing | `08-qa-testing/` | Test suite, Audit reports, Coverage Matrix | Handoff Package 8 | `qa-checklist.md` |
| 9. Deployment | `09-deployment/` | Live production URL | Handoff Package 9 | `launch-checklist.md` |
| 11. Documentation | `11-documentation/` | User Docs, Technical Docs, Operations Handbook, Retrospective | Handoff Package 11 | `documentation-checklist.md` |

---

## Resuming a Paused Workflow

If the workflow is resumed after a pause:
1. State the current phase and status
2. List artifacts already produced
3. Check `human-interventions/active/` for any interventions raised during the pause
4. Ask: "Ready to continue from Phase [N]?"

---

## Skipping Phases

Phases can be skipped if artifacts already exist:
> "We already have a completed PRD and personas. Skip to Phase 2."

Confirm existing artifacts meet gate criteria before proceeding. Require explicit human confirmation for any skip.

---

## Parallel Workstreams

Some phases can overlap — always get explicit approval before running anything in parallel:

**Backend track (runs parallel to frontend):**
- Phase 4 Backend Design can start after Gate 2 and Release Mode check-in (and MVP scoping if MVP selected) — runs in parallel with Phase 3 Frontend Design
- Phase 6 Backend Implementation can start after Gate 4 — runs in parallel with Phase 5 Frontend Development
- Phase 7 Integration requires BOTH Gate 5 and Gate 6 to be approved before starting

**Frontend track:**
- Phase 3 design tokens can start while Phase 2 non-P0 flows are being refined
- Phase 5 atom components can begin once Phase 3 design tokens are approved
- Phase 8 unit tests can be written during Phase 5

**Rule:** Phase 7 Integration cannot begin until both Frontend Development (Gate 5) and Backend Implementation (Gate 6) are approved. The order of Gate 5 and Gate 6 does not matter.

Document what is and isn't yet approved when running parallel workstreams.

---

## Workflow State Template

```markdown
# Workflow State — [Product Name]
**Last updated:** [Date]
**Current status:** Phase [N] — [Phase Name] — [In Progress / Awaiting Approval / Approved]

## Phase Status
- [x] Phase 1: Product Discovery — Approved [Date]
- [x] Phase 2: Product Design — Approved [Date]
- [ ] Phase 3: Frontend Design — In Progress
- [ ] Phase 4: Backend Design — In Progress
- [ ] Phase 5: Frontend Development — Not started
- [ ] Phase 6: Backend Implementation — Not started
- [ ] Phase 7: Integration — Not started (requires Gate 5 + Gate 6)
- [ ] Phase 8: QA Testing — Not started
- [ ] Phase 9: Deployment — Not started
- [ ] Phase 11: Documentation — Not started

## Artifacts Location
- PRD: [link or file path]
- Personas: [link or file path]
- Figma: [URL]
- Repository: [URL]
- Staging: [URL]
- Production: [URL]
- Documentation: [URL or path]

## Active Interventions
- [Date] — [Topic] — [Status]

## Open Decisions
- [Decision requiring stakeholder input]

## Key Risks
- [Risk and mitigation]
```

---

## Additional Resources

- [handoff-package-template.md](handoff-package-template.md) — unified handoff package template (SBAR-inspired, used at every gate)
- [workflow-stages.md](workflow-stages.md) — detailed gate criteria, phase transition rules, revision loop guidance
- [mvp-scoping-guide.md](mvp-scoping-guide.md) — MVP scope derivation and human confirmation flow
- [mvp-evolution-guide.md](mvp-evolution-guide.md) — MVP → Full Production upgrade path and technical debt audit
- [pm-prioritization.md](pm-prioritization.md) — RICE, MoSCoW, Impact/Effort, sprint scoring, defect triage rubrics, MVP overlay
- `.cursor/skills/10-human-intervention/SKILL.md` — human intervention protocol
- `.cursor/skills/11-documentation/SKILL.md` — documentation and after-sales phase
