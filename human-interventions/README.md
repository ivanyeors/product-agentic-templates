# Human Interventions

This folder is the live workspace for all human feedback, instructions, and course-corrections injected into an active agentic product development workflow.

## How to Use This Folder

When you want to give the AI agents feedback, new instructions, or a change of direction **at any point during active development**, create a new folder and `content.md` file here rather than relying on the chat context alone. This ensures:

- The change is documented with full context and impact assessment
- The right agents are notified
- There is a permanent audit trail of every decision
- The change is not lost when the conversation context rotates

## Folder Structure

```
human-interventions/
├── active/           ← Interventions currently being processed
│   └── YYYY-MM-DD-[phase]-[topic]/
│       └── content.md
└── processed/        ← Completed interventions (never delete — audit trail)
    └── YYYY-MM-DD-[phase]-[topic]/
        └── content.md
```

## Creating an Intervention

### Quick method (tell the agent)
Just say: **"I have an intervention"** or **"Stop — I need to update something"** in the chat. The agent will create the folder and file for you.

### Manual method
1. Create a folder: `active/YYYY-MM-DD-[phase]-[topic]/`
2. Create `content.md` using the template from `.cursor/skills/10-human-intervention/intervention-protocol.md`
3. The agent will pick it up at the next work session start or gate check

## Folder Naming Convention

`YYYY-MM-DD-[phase-code]-[topic-slug]`

| Phase | Code |
|-------|------|
| Product Discovery | `01-product-discovery` |
| Product Design | `02-product-design` |
| Frontend Design | `03-frontend-design` |
| Backend Design | `04-backend-design` |
| Frontend Development | `05-frontend-development` |
| Backend Implementation | `06-backend-implementation` |
| Integration | `07-integration` |
| QA Testing | `08-qa-testing` |
| Deployment | `09-deployment` |
| Documentation | `11-documentation` |
| Product Documentation | `12-product-documentation` |
| All phases | `all` |

**Examples:**
```
2026-02-28-01-product-discovery-new-target-market/
2026-02-28-05-frontend-development-auth-requirement-added/
2026-02-28-all-deadline-moved-forward/
```

## Urgency Levels

| Urgency | Effect | Use when |
|---------|--------|----------|
| `immediate` | Agent halts current work and processes this first | Blocking issue, production incident, core assumption change |
| `end-of-phase` | Agent integrates before the next gate review | Important but not blocking current work |
| `backlog` | Agent acknowledges and queues for future planning | Nice-to-have, future enhancement |

## Intervention Types

- `requirement-change` — new or modified functional requirement
- `design-feedback` — visual or UX change request
- `scope-change` — adding or removing features
- `technical-constraint` — new technical limitation
- `priority-shift` — re-ordering P0/P1/P2 items
- `bug-report` — bug found outside formal QA
- `timeline-change` — deadline moved, sprint reduced
- `other` — anything else

## Rules

- **Never delete files** from `processed/` — this is the audit trail
- **Exact human words** go in the `## Feedback` section — agents interpret in `## Agent Interpretation`
- **Status field** must be kept up to date: `open` → `in-progress` → `resolved` / `deferred`
- Resolved interventions are referenced in the next phase gate summary

## For the Agent

At the start of every work session and before presenting any phase gate, read all files in `active/` and process according to urgency. See `.cursor/skills/10-human-intervention/SKILL.md` for the full protocol.
