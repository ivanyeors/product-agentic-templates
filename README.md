# Product Workflow Skills Platform

A modular, multi-phase agentic skills library for Cursor and Claude AI covering the full product development lifecycle — from Discovery to Deployment. Each phase is a standalone Cursor skill that can be used independently or orchestrated together with mandatory human-in-the-loop review gates.

## What This Is

A collection of `.cursor/skills/` that give AI agents deep, structured guidance for every stage of building a product:

| Phase | Skill | Trigger |
|-------|-------|---------|
| 1. Product Discovery | `product-discovery` | Starting a new product, defining what to build |
| 2. Product Design | `product-design` | Defining UX, IA, flows, and prototypes |
| 3. Frontend Design | `frontend-design` | Building design systems, visual UI, components |
| 4. Frontend Development | `frontend-development` | Implementing UI in code |
| 5. QA Testing | `qa-testing` | Verifying quality, testing strategy |
| 6. Deployment | `deployment` | Shipping to production |
| Full Lifecycle | `product-workflow` | Running the complete end-to-end process with HITL gates |

## Installation

### Option A: Copy into your project (recommended)

```bash
# From your project root
cp -r /path/to/dssb-lint/.cursor/skills .cursor/skills
```

### Option B: Clone and symlink (for updates)

```bash
git clone https://github.com/your-org/dssb-lint ~/cursor-skills
ln -s ~/cursor-skills/.cursor/skills /your-project/.cursor/skills
```

### Option C: Git submodule

```bash
cd your-project
git submodule add https://github.com/your-org/dssb-lint .cursor/skills-lib
# Then copy or symlink .cursor/skills-lib/.cursor/skills to .cursor/skills
```

After copying, Cursor will automatically detect and surface the skills.

## Using Individual Phase Skills

Each skill is self-contained. Trigger by telling the agent what phase you're in:

- **"Let's do product discovery for [product idea]"** → activates `product-discovery`
- **"Design the UX for this product"** → activates `product-design`
- **"Build the design system"** → activates `frontend-design`
- **"Implement the frontend"** → activates `frontend-development`
- **"Write tests for this feature"** → activates `qa-testing`
- **"Deploy this to production"** → activates `deployment`

## Using the Full Workflow (with Human Gates)

To run the complete lifecycle with structured approval gates:

> "Run the full product workflow for [product idea]"

The `product-workflow` master skill will:
1. Guide through each phase in sequence
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
├── product-discovery/        Phase 1: Research, personas, PRD
├── product-design/           Phase 2: IA, flows, wireframes
├── frontend-design/          Phase 3: Design system, components
├── frontend-development/     Phase 4: Code implementation
├── qa-testing/               Phase 5: Test strategy + execution
├── deployment/               Phase 6: CI/CD, launch, monitoring
└── product-workflow/         Master orchestrator (all phases + HITL)
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
Design token systems, atomic component hierarchy, visual design, responsive breakpoints, motion principles, Figma handoff specs.

### 4. Frontend Development
Tech stack selection, architecture planning, component development, state management, API integration, performance, accessibility.

### 5. QA Testing
Test strategy, unit/integration/E2E testing, visual regression, accessibility audits, performance testing, security review.

### 6. Deployment
CI/CD pipelines, environment config, infrastructure-as-code, observability, rollback runbooks, release management.
