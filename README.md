# Product Workflow Skills Platform

A modular, multi-phase agentic skills library for Cursor and Claude AI covering the full product development lifecycle — from Discovery to Deployment to Documentation. Each phase is a standalone Cursor skill that can be used independently or orchestrated together with mandatory human-in-the-loop review gates.

## Platform (docs/)

A static platform in `docs/` provides:

- **Use this template** — Create a new repo from this template (enable in GitHub: Settings → General → Template repository)
- **Download** — Get `.cursor/` as a zip (`docs/assets/product-agentic-templates.zip`). Regenerate with `node scripts/zip-cursor.js`
- **Visualization** — Holistic view of all phases, gates, and connections at `docs/visualization.html`

**GitHub Pages:** Deploy the platform by enabling Pages in repo Settings → Pages → Source: Deploy from a branch → Branch: `main` → Folder: `/docs`.

## What This Is

A collection of `.cursor/skills/` that give AI agents deep, structured guidance for every stage of building a product:

| Phase | Skill | Trigger |
|-------|-------|---------|
| 1. Product Discovery | `product-discovery` | Starting a new product, defining what to build |
| 2. Product Design | `product-design` | Defining UX, IA, flows, and prototypes |
| 3. Frontend Design | `frontend-design` | Building design systems, visual UI, components |
| 4. Backend Design | `backend-design` | API contract, schema design, auth model |
| 5. Frontend Development | `frontend-development` | Implementing UI in code |
| 6. Backend Implementation | `backend-implementation` | Building API endpoints, migrations, services |
| 7. Integration | `integration` | Connecting frontend to backend, third-party services |
| 8. QA Testing | `qa-testing` | Verifying quality, testing strategy |
| 9. Deployment | `deployment` | Shipping to production |
| 10. Human Intervention | `human-intervention` | Mid-phase feedback, scope changes, corrections |
| 11. Documentation | `documentation` | User guides, technical docs, knowledge transfer |
| 12. Product Documentation | `product-documentation` | Documentation hub, handover package |
| Full Lifecycle | `product-workflow` | Running the complete end-to-end process with HITL gates |

## Installation

### Option A: Copy into your project (recommended)

```bash
# From your project root
cp -r /path/to/product-agentic-templates/.cursor/skills .cursor/skills
```

### Option B: Clone and symlink (for updates)

```bash
git clone https://github.com/ivanyeors/product-agentic-templates ~/product-agentic-templates
ln -s ~/product-agentic-templates/.cursor/skills /your-project/.cursor/skills
```

### Option C: Git submodule

```bash
cd your-project
git submodule add https://github.com/ivanyeors/product-agentic-templates .cursor/skills-lib
# Then copy or symlink .cursor/skills-lib/.cursor/skills to .cursor/skills
```

After copying, Cursor will automatically detect and surface the skills.

## Using Individual Phase Skills

Each skill is self-contained. Trigger by telling the agent what phase you're in:

- **"Let's do product discovery for [product idea]"** → activates `product-discovery`
- **"Design the UX for this product"** → activates `product-design`
- **"Build the design system"** → activates `frontend-design`
- **"Design the API"** → activates `backend-design`
- **"Implement the frontend"** → activates `frontend-development`
- **"Implement the backend"** → activates `backend-implementation`
- **"Integrate the API"** → activates `integration`
- **"Write tests for this feature"** → activates `qa-testing`
- **"Deploy this to production"** → activates `deployment`
- **"I need to add feedback"** → activates `human-intervention`
- **"Write the docs"** → activates `documentation`
- **"Create the documentation hub"** → activates `product-documentation`

## Using the Full Workflow (with Human Gates)

To run the complete lifecycle with structured approval gates:

> "Run the full product workflow for [product idea]"

The `product-workflow` master skill will:
1. Guide through each phase in sequence (with Frontend Design + Backend Design in parallel, then Frontend Development + Backend Implementation in parallel)
2. Produce structured artifacts at each phase
3. **Pause at every phase boundary** for human review and approval
4. Only advance when you explicitly approve
5. Allow revision loops if artifacts need changes

### Human-in-the-Loop Gate Flow

```
Phase Work → Agent Summary → Human Review → Approve/Revise → Next Phase
```

At each gate, the agent presents:
- Summary of what was completed
- All artifacts produced
- Key decisions made and why
- What the next phase will begin

You respond with:
- `APPROVED` — proceed to next phase
- `REVISE: [feedback]` — agent revises and re-presents
- `PAUSE` — save state, resume later

## Skill Directory Structure

```
.cursor/skills/
├── 00-product-workflow/      Master orchestrator (all phases + HITL)
├── 01-product-discovery/    Phase 1: Research, personas, PRD
├── 02-product-design/       Phase 2: IA, flows, wireframes
├── 03-frontend-design/       Phase 3: Design system, components
├── 04-backend-design/        Phase 4: API contract, schema, auth
├── 05-frontend-development/ Phase 5: UI implementation
├── 06-backend-implementation/ Phase 6: API endpoints, migrations
├── 07-integration/          Phase 7: Frontend-backend, third-party
├── 08-qa-testing/           Phase 8: Test strategy + execution
├── 09-deployment/           Phase 9: CI/CD, launch, monitoring
├── 10-human-intervention/   Cross-cutting: mid-phase feedback
├── 11-documentation/        Phase 11: User guides, knowledge transfer
└── 12-product-documentation/ Phase 12: Documentation hub, handover
```

## Customizing Skills

Skills are plain markdown files. To customize for your team:

1. Edit `SKILL.md` in any phase directory to change agent behavior
2. Edit `*-checklist.md` files to adjust your review gates
3. Edit `artifacts-template.md` files to change document formats
4. Add new files in a skill directory and reference them from `SKILL.md`

## Contributing

To add a new sub-skill or improve an existing one:
1. Edit the relevant phase's `SKILL.md` or add a reference `.md` file
2. Keep `SKILL.md` under 500 lines
3. Place detailed content in sibling reference files
4. Test by triggering the skill in Cursor and verifying agent behavior

## Phase Overview

### 1. Product Discovery
Stakeholder interviews, user research, competitive analysis, problem statement definition, persona creation, journey mapping, PRD writing.

### 2. Product Design
Information architecture, user flow design, wireframing, prototype specification, usability testing design, accessibility planning.

### 3. Frontend Design
Design token systems, atomic component hierarchy, visual design, responsive breakpoints, motion principles, Figma handoff specs. Runs in parallel with Backend Design after Gate 2.

### 4. Backend Design
API contract specification (OpenAPI), database schema design, auth and permission model, integration points (webhooks, third-party).

### 5. Frontend Development
Tech stack selection, architecture planning, component development, state management, performance, accessibility. Runs in parallel with Backend Implementation after respective design gates.

### 6. Backend Implementation
Project setup, schema migrations, data access layer, service layer, API endpoints, auth, validation, testing.

### 7. Integration
Frontend-backend API consumption, contract validation, third-party service integration (auth, payments, webhooks). Requires both Frontend and Backend implementation gates.

### 8. QA Testing
Test strategy, unit/integration/E2E testing, visual regression, accessibility audits, performance testing, security review.

### 9. Deployment
CI/CD pipelines, environment config, infrastructure-as-code, observability, rollback runbooks, release management.

### 10. Human Intervention
Structured capture of mid-phase feedback, scope changes, and corrections. Cross-cutting — monitors active throughout the workflow.

### 11. Documentation
User documentation, technical documentation, operations documentation, knowledge transfer package. Post-launch.

### 12. Product Documentation
Consolidation of all PDLC artifacts into a Product Documentation Hub — user guides, technical docs, design system reference, operations manual, decision log.
