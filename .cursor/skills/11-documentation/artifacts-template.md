# Documentation Artifact Templates — Phase 11

Use these templates when producing documentation outputs. Replace all `[PLACEHOLDER]` values. Every document opens by stating who it is for and what the reader will learn.

---

## Docs Entry Point (README)

The single front door for all documentation. Every reader starts here.

```markdown
# [Product Name] — Documentation
**Last updated:** [Date] · **Owner:** [Name or Team]

> [One sentence: what this product is and what it does.]

## For Users
- [Getting Started](getting-started.md) — Set up and use the product in 10 minutes
- [User Guide](user-guide.md) — Complete feature reference
- [FAQ & Troubleshooting](faq.md) — Common questions and error fixes

## For Developers
- [Architecture Overview](architecture.md) — How the system is built
- [Environment Setup](setup.md) — Run the project locally
- [Contributing](contributing.md) — How to make changes
- [Architecture Decision Records](adr/) — Key decisions and their rationale
- [Component Library](components.md) — UI components and usage

## For Operators
- [Operations Handbook](ops-handbook.md) — Day-to-day operations and monitoring
- [Incident Playbook](incident-playbook.md) — How to respond when things go wrong
- [Deployment Process](deployment-process.md) — How to release a new version

## For Stakeholders
- [Project Retrospective](retrospective.md) — What was built, what was learned
- [Roadmap Notes](roadmap-notes.md) — Deferred scope and next iteration suggestions

## All Artifacts
- [Artifact Index](artifact-index.md) — Complete list of every lifecycle artifact
```

---

## Artifact Index

Links every artifact produced across all six PDLC phases.

```markdown
# Artifact Index — [Product Name]
**Last updated:** [Date] · **Owner:** [Name or Team]

Complete index of all artifacts produced across the product lifecycle.

| Phase | Artifact | Path / URL | Purpose | Audience |
|-------|----------|-----------|---------|----------|
| 1. Discovery | PRD | `[path]` | Requirements, FR-IDs, user stories | PM, Design, Dev |
| 1. Discovery | Personas | `[path]` | User profiles | PM, Design |
| 1. Discovery | Journey Map | `[path]` | User journey stages | PM, Design |
| 1. Discovery | Competitive Analysis | `[path]` | Competitor comparison | PM |
| 1. Discovery | Stakeholder Brief | `[path]` | Business context, constraints | PM, Stakeholders |
| 1. Discovery | Problem Statement | `[path]` | Root cause, HMW questions | PM, Design |
| 2. Product Design | IA Document | `[path]` | Information architecture | Design, Dev |
| 2. Product Design | User Flows | `[path]` | Flow logic, UF-IDs | Design, Dev, QA |
| 2. Product Design | Wireframes | `[path]` | Screen specs, WF-IDs | Design, Dev |
| 2. Product Design | Interaction Spec | `[path]` | States, transitions, edge cases | Design, Dev |
| 3. Frontend Design | Design Tokens | `[path]` | Colors, typography, spacing | Dev |
| 3. Frontend Design | Figma / BOM | `[path or URL]` | Visual designs, component mapping | Design, Dev |
| 3. Frontend Design | Figma Handoff Manifest | `[path]` | Component-to-code mapping | Dev |
| 4. Frontend Dev | Architecture | `[path]` | Technical decisions, folder structure | Dev |
| 4. Frontend Dev | FAI Report | `[path]` | Implementation vs design comparison | QA, Design |
| 4. Frontend Dev | Test Coverage Matrix | `[path]` | FR-ID to test mapping | QA, Dev |
| 5. QA Testing | Test Suite | `[path]` | Unit, integration, E2E tests | Dev, QA |
| 5. QA Testing | Audit Reports | `[path]` | Accessibility, performance, security | QA |
| 5. QA Testing | Defect Log | `[path]` | All bugs found and their status | QA, Dev, PM |
| 6. Deployment | Production URL | [URL] | Live product | All |
| 6. Deployment | Release Notes | `[path]` | Changelog, features shipped | Stakeholders |
| 6. Deployment | Ops Runbook | `[path]` | Rollback, incident, release procedures | DevOps |
| 6. Deployment | Launch Checklist | `[path]` | Pre- and post-launch verification | DevOps, PM |
```

---

## Getting Started Guide

For end users. Assumes no prior knowledge. Step-by-step to first value.

```markdown
# Getting Started — [Product Name]
**Who this is for:** New users who want to set up and use [Product Name] for the first time.
**What you'll learn:** How to [primary action] in [N] steps.
**Time required:** About [N] minutes.
**Last updated:** [Date] · **Owner:** [Name or Team]

---

## Before you begin

You will need:
- [Prerequisite 1, e.g. "An account — sign up at [URL]"]
- [Prerequisite 2, e.g. "A modern browser (Chrome, Firefox, Safari, Edge)"]

---

## Step 1: [First action]

[One sentence describing what to do.]

Example: Go to [URL] and click **Sign up**.

> **Expected result:** You will see [what they should see].

---

## Step 2: [Second action]

[One sentence describing what to do.]

> **Expected result:** [What they should see.]

---

## Step 3: [Third action]

[One sentence describing what to do.]

> **Expected result:** [What they should see.]

---

## Step 4: [Fourth action]

[One sentence describing what to do.]

> **Expected result:** [What they should see.]

---

## Step 5: [Fifth action]

[One sentence describing what to do.]

> **Expected result:** [What they should see — this is their "first value" moment.]

---

## What's next?

You're all set. Here's where to go from here:
- [User Guide](user-guide.md) — Learn every feature in detail
- [FAQ](faq.md) — Common questions

---

## Something went wrong?

| Problem | What to do |
|---------|-----------|
| [Error message or symptom] | [Exact steps to fix it] |
| [Error message or symptom] | [Exact steps to fix it] |

Still stuck? [Contact support at [email/URL].]
```

---

## User Guide

For end users. Complete reference for every feature. One section per feature.

```markdown
# User Guide — [Product Name]
**Who this is for:** Users who want a complete reference for all features.
**Last updated:** [Date] · **Owner:** [Name or Team]

---

## Contents
- [Feature 1: [Name]](#feature-1)
- [Feature 2: [Name]](#feature-2)
- [Feature 3: [Name]](#feature-3)

---

## Feature 1: [Feature Name] {#feature-1}

**What it does:** [One sentence.]

**How to use it:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Example:** [Brief real-world example.]

**Common issues:**
| Problem | Fix |
|---------|-----|
| [Problem description] | [What to do] |

---

## Feature 2: [Feature Name] {#feature-2}

[Repeat the structure above for each feature.]
```

---

## FAQ & Troubleshooting

For end users. Quick answers to the most common questions.

```markdown
# FAQ & Troubleshooting — [Product Name]
**Who this is for:** Users who have a specific question or are stuck.
**Last updated:** [Date] · **Owner:** [Name or Team]

---

## Quick answers

| I want to… | Go to |
|-----------|-------|
| [Task 1] | [Link or step] |
| [Task 2] | [Link or step] |
| [Task 3] | [Link or step] |

---

## Frequently asked questions

### [Question 1 in plain language?]

[Short answer. One to three sentences. No jargon.]

---

### [Question 2?]

[Short answer.]

---

### [Question 3?]

[Short answer.]

---

## Error messages

| Message | What it means | What to do |
|---------|--------------|-----------|
| "[Exact error message]" | [Plain explanation] | [Steps to fix] |
| "[Exact error message]" | [Plain explanation] | [Steps to fix] |
```

---

## Architecture Overview

For developers. Explains the system structure and key design decisions.

```markdown
# Architecture Overview — [Product Name]
**Who this is for:** Developers who want to understand how the system is built.
**What you'll learn:** The system components, data flow, and key technology choices.
**Last updated:** [Date] · **Owner:** [Name or Team]

---

## Summary

[2–3 sentences: what the system does and how it is structured at the highest level.]

---

## System diagram

[Insert diagram here — component boxes and arrows showing data flow]

---

## Components

| Component | Technology | Purpose | Notes |
|-----------|-----------|---------|-------|
| [Frontend] | [React / Next.js / etc.] | [User interface] | [Key constraints] |
| [Backend / API] | [Node.js / etc.] | [Business logic] | [Key constraints] |
| [Database] | [Postgres / etc.] | [Data persistence] | [Key constraints] |
| [Auth] | [Supabase Auth / etc.] | [Authentication] | [Key constraints] |

---

## Data flow

1. [Step 1: e.g. "User makes a request in the browser"]
2. [Step 2: e.g. "Request hits the Next.js server"]
3. [Step 3: e.g. "Server queries the database"]
4. [Step 4: e.g. "Response is returned and rendered"]

---

## Key technology choices

| Decision | Choice | Why |
|----------|--------|-----|
| Frontend framework | [Choice] | [Reason] |
| Database | [Choice] | [Reason] |
| Auth | [Choice] | [Reason] |
| Deployment | [Choice] | [Reason] |

See [adr/](adr/) for full decision records.

---

## External dependencies

| Dependency | Purpose | Impact if unavailable |
|-----------|---------|----------------------|
| [Service] | [What it does] | [What breaks] |

---

## Known constraints and trade-offs

- [Constraint 1 — and why it was accepted]
- [Constraint 2 — and why it was accepted]
```

---

## Architecture Decision Record (ADR)

One file per significant decision. Stored in `docs/adr/`. Filename: `NNN-short-title.md`.

```markdown
# ADR-[NNN]: [Short Decision Title]
**Status:** Accepted | Superseded by ADR-[NNN] | Deprecated
**Date:** [Date]
**Deciders:** [Names or roles]
**Source:** Phase [N] — [Phase name], [link to relevant handoff package section]

---

## Context

[2–4 sentences: what situation required this decision, what constraints existed, what options were considered. Write for a developer reading this a year from now with no other context.]

---

## Decision

[One clear statement of what was decided. Start with "We decided to…" or "We will…"]

---

## Consequences

**Positive:**
- [Benefit 1]
- [Benefit 2]

**Negative / Trade-offs:**
- [Cost or constraint accepted]
- [What this rules out]

**Neutral:**
- [Anything that is neither good nor bad but worth noting]
```

---

## Environment Setup Guide

For developers. Everything needed to run the project locally.

```markdown
# Environment Setup — [Product Name]
**Who this is for:** Developers setting up the project for the first time.
**What you'll learn:** How to run [Product Name] locally.
**Time required:** About [N] minutes.
**Last updated:** [Date] · **Owner:** [Name or Team]

---

## Prerequisites

Before you start, install:
- [ ] [Node.js v[X]] — [download link]
- [ ] [Package manager: npm / pnpm / yarn] — comes with Node or install separately
- [ ] [Other tool, e.g. Docker] — [download link]
- [ ] [Other tool, e.g. Supabase CLI] — [install command]

You will also need accounts for:
- [ ] [Service 1, e.g. Supabase] — [signup URL]
- [ ] [Service 2] — [signup URL]

---

## Step-by-step setup

### 1. Clone the repository

```bash
git clone [repo URL]
cd [project folder]
```

### 2. Install dependencies

```bash
[npm install / pnpm install / yarn]
```

### 3. Configure environment variables

Copy the example file:

```bash
cp .env.example .env.local
```

Fill in the values (see the table below for where to find each one):

| Variable | Description | Where to find it |
|----------|-------------|-----------------|
| `[VAR_NAME]` | [What it does] | [Where to get the value] |
| `[VAR_NAME]` | [What it does] | [Where to get the value] |

### 4. [Any database or service setup steps]

```bash
[command]
```

### 5. Start the development server

```bash
[npm run dev / pnpm dev / yarn dev]
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Expected result:** You should see the [Product Name] home page.

---

## Common setup problems

| Problem | Fix |
|---------|-----|
| [Error message] | [What to do] |
| [Error message] | [What to do] |
```

---

## Contributing Guide

For developers. How to make changes and submit them.

```markdown
# Contributing — [Product Name]
**Who this is for:** Developers who want to fix a bug, add a feature, or improve the docs.
**Last updated:** [Date] · **Owner:** [Name or Team]

---

## Before you start

- Read the [Architecture Overview](architecture.md) to understand the system
- Check [open issues]([issues URL]) — your idea might already be tracked
- For big changes, open an issue first to discuss before writing code

---

## Running tests locally

```bash
# Unit and integration tests
[npm run test / pnpm test]

# End-to-end tests
[npm run test:e2e / pnpm test:e2e]

# Check coverage
[npm run test:coverage]
```

All tests must pass before submitting a pull request.

---

## Branch naming

| Type | Format | Example |
|------|--------|---------|
| Feature | `feature/short-description` | `feature/user-auth` |
| Bug fix | `fix/short-description` | `fix/login-redirect` |
| Docs | `docs/short-description` | `docs/setup-guide` |
| Chore | `chore/short-description` | `chore/update-deps` |

---

## Pull request process

1. Create a branch from `main`
2. Make your changes
3. Run the full test suite locally
4. Open a PR with a clear title and description
5. Link to the issue it closes (if applicable): `Closes #[issue number]`
6. Wait for review — at least one approval required before merge

---

## Code style

- Linting: [ESLint / Biome / etc.] — run `[lint command]` before committing
- Formatting: [Prettier / etc.] — run `[format command]` or configure your editor to format on save
- TypeScript: strict mode enabled — no `any` without a comment explaining why

---

## Reporting a bug

Open an issue with:
1. What you expected to happen
2. What actually happened
3. Steps to reproduce
4. Browser / OS / version (if relevant)
```

---

## Operations Handbook

For operators. Day-to-day operations, monitoring, and quick-reference.

```markdown
# Operations Handbook — [Product Name]
**Who this is for:** Anyone responsible for keeping [Product Name] running in production.
**Last updated:** [Date] · **Owner:** [Name or Team]

---

## System overview

| Component | Location | Status page |
|-----------|----------|------------|
| Production | [URL] | [Status URL] |
| Staging | [URL] | — |
| Database | [Provider + region] | [Status URL] |
| Auth | [Provider] | [Status URL] |

---

## Routine operations

### Deploy a new version
See [Deployment Process](deployment-process.md).

### Check system health

1. Open the [monitoring dashboard]([URL])
2. Verify: error rate < 0.1%, LCP < 2.5s, uptime 100%
3. Check: no active alerts in [alerting tool]

### Routine checks (recommended: daily)
- [ ] Error rate within normal range
- [ ] No critical alerts triggered
- [ ] Uptime confirmed

---

## Monitoring reference

| Dashboard | URL | What it shows |
|-----------|-----|---------------|
| [Name] | [URL] | [Metrics] |

### Alert definitions

| Alert | Threshold | Meaning | First action |
|-------|-----------|---------|-------------|
| High error rate | > 1% for 5 min | Something is broken | Check [runbook section] |
| LCP degraded | > 4s | Performance issue | Check [runbook section] |
| Uptime down | Any | Service unavailable | Check [runbook section] |

---

## Escalation path

| Situation | Contact | How |
|-----------|---------|-----|
| Production down | [Name] | [Phone / Slack] |
| Database issue | [Name] | [Phone / Slack] |
| Security incident | [Name] | [Phone / Slack] |
```

---

## Incident Playbook

For operators. What to do when something goes wrong.

```markdown
# Incident Response Playbook — [Product Name]
**Who this is for:** On-call engineers responding to production incidents.
**Last updated:** [Date] · **Owner:** [Name or Team]

---

## Severity levels

| Level | Definition | Response SLA | Example |
|-------|-----------|-------------|---------|
| P1 — Critical | Product is down or unusable for all users | 15 minutes | Site returns 500 for all users |
| P2 — High | Major feature broken; no workaround | 1 hour | Login is broken |
| P3 — Medium | Feature broken; workaround exists | 4 hours | Export fails but data is viewable |
| P4 — Low | Minor issue; cosmetic or edge case | Next sprint | Alignment off on mobile |

---

## First 15 minutes (P1 / P2)

1. **Acknowledge the alert** in [alerting tool]
2. **Check the status page** — is it a provider outage? [Status page URLs]
3. **Check error logs** in [logging tool URL]
4. **Check recent deploys** — was anything deployed in the last 2 hours?
   - If yes → consider rollback (see [Deployment Process](deployment-process.md))
5. **Notify stakeholders** using the template below
6. **Start an incident channel** in [Slack / Teams] named `inc-[date]-[short description]`

---

## Stakeholder notification template

```
[P1/P2] INCIDENT — [Product Name]
Time detected: [HH:MM timezone]
Impact: [What users are experiencing]
Status: Investigating
Next update: [HH:MM]
```

Send updates every 30 minutes until resolved.

---

## Resolution and post-incident

When the incident is resolved:
1. Send a resolution notification: "RESOLVED — [what was fixed] at [HH:MM]"
2. Complete a post-incident review within 48 hours
3. Log the incident in the ops runbook with: root cause, timeline, remediation, prevention

---

## Runbook index (by symptom)

| Symptom | Runbook |
|---------|---------|
| [Symptom 1] | [Link to runbook section] |
| [Symptom 2] | [Link to runbook section] |
```

---

## Deployment Process

For operators. How to release a new version, step-by-step.

```markdown
# Deployment Process — [Product Name]
**Who this is for:** Engineers deploying a new version to production.
**Last updated:** [Date] · **Owner:** [Name or Team]

---

## Before you deploy

- [ ] All tests passing in CI
- [ ] PR approved and merged to `main`
- [ ] Release notes written
- [ ] Stakeholders notified
- [ ] Rollback plan confirmed (see below)

---

## Deploy to production

1. [Step 1 — exact command or UI action]
   ```bash
   [command if applicable]
   ```
2. [Step 2]
3. [Step 3]

> **Expected result:** [What you should see when the deploy succeeds.]

---

## Post-deploy verification (first 30 minutes)

- [ ] Open the production URL and verify the home page loads
- [ ] Complete the [critical path checklist: [link]]
- [ ] Check error rate in [monitoring tool] — should be < 0.1%
- [ ] Check for new alerts in [alerting tool]

---

## How to roll back

If something goes wrong:

1. [Step 1 — exact rollback command or UI action]
   ```bash
   [command if applicable]
   ```
2. [Step 2]
3. [Step 3]

> **Expected result:** Previous version is live within [N] minutes.

Verify the rollback succeeded using the same post-deploy checklist above.
```

---

## Project Retrospective

For the team. What was built, what was learned, what to do differently next time.

```markdown
# Project Retrospective — [Product Name]
**Version:** v[X.X.X] · **Date:** [Date] · **Author:** [Name or Team]

---

## What we built

[2–3 sentences: what the product is, who it is for, and the key problem it solves.]

**Delivered:**
- [Feature 1]
- [Feature 2]
- [Feature 3]

**Not delivered (deferred):**
- [Item 1 — reason]
- [Item 2 — reason]

**Live at:** [Production URL]

---

## What went well (keep doing)

- [Specific thing that worked well — and why]
- [Specific thing that worked well — and why]
- [Specific thing that worked well — and why]

---

## What didn't go well (stop doing or change)

- [Specific thing that caused problems — root cause — what to do differently]
- [Specific thing that caused problems — root cause — what to do differently]
- [Specific thing that caused problems — root cause — what to do differently]

---

## What we learned for the first time (start doing)

- [New technique, tool, or insight — and where it should be applied next]
- [New technique, tool, or insight]

---

## If we started over

[3–5 bullet points: the most important things you would do differently on day one, with honest reasoning. No sugarcoating.]

- [Decision you would change]
- [Process you would start earlier]
- [Scope you would cut]

---

## Shout-outs

[Specific contributions worth recognizing publicly.]

- [Name] — [what they did that made a difference]
- [Name] — [what they did that made a difference]

---

## Sign-off

| Role | Name | Date |
|------|------|------|
| Product | [Name] | [Date] |
| Engineering | [Name] | [Date] |
| Design | [Name] | [Date] |
```

---

## Lessons Learned

For the team and future projects. Transferable knowledge from this project.

```markdown
# Lessons Learned — [Product Name]
**Date:** [Date] · **Author:** [Name or Team]

---

## Decisions that saved time or improved quality

| Decision | Why it worked | Repeat on next project? |
|----------|--------------|------------------------|
| [Decision] | [Reason] | Yes |
| [Decision] | [Reason] | Yes |

---

## Decisions that cost time or created rework

| Decision | What went wrong | What to do instead |
|----------|----------------|-------------------|
| [Decision] | [What happened] | [Better approach] |
| [Decision] | [What happened] | [Better approach] |

---

## Tool and process recommendations

| Category | Recommendation | Reason |
|----------|---------------|--------|
| [Testing] | [Recommendation] | [Why] |
| [Tooling] | [Recommendation] | [Why] |
| [Process] | [Recommendation] | [Why] |

---

## Patterns worth repeating

- [Pattern name]: [Brief description of what it is and why it worked]
- [Pattern name]: [Brief description]

---

## Anti-patterns to avoid

- [Anti-pattern name]: [Brief description of the problem it caused]
- [Anti-pattern name]: [Brief description]
```

---

## Post-Launch Roadmap Notes

For the PM and stakeholders. What comes next.

```markdown
# Post-Launch Roadmap Notes — [Product Name]
**Date:** [Date] · **Author:** [Name or Team]

---

## Deferred scope

Items explicitly cut during the PDLC, now candidates for the next iteration.

| Item | Phase deferred | Priority estimate | Notes |
|------|---------------|------------------|-------|
| [Feature or fix] | Phase [N] | P[0–3] | [Context and rationale] |
| [Feature or fix] | Phase [N] | P[0–3] | [Context and rationale] |

---

## Unvalidated assumptions

Assumptions that were accepted during the project but never validated.

| Assumption ID | Assumption | Origin | How to validate |
|--------------|-----------|--------|----------------|
| A-001 | [Assumption text] | Phase [N] | [Research method or experiment] |

---

## User feedback (post-launch)

| Feedback | Source | Priority | Action |
|----------|--------|----------|--------|
| [Feedback item] | [User segment] | P[0–3] | [Next step] |

---

## Suggested next iteration priorities

Based on deferred scope, unvalidated assumptions, and post-launch feedback:

1. **P0:** [Most important next step — and why]
2. **P1:** [Second priority — and why]
3. **P2:** [Third priority — and why]
```

---

## New Contributor Onboarding Guide

For new team members. How to get up to speed on day one.

```markdown
# New Contributor Onboarding — [Product Name]
**Who this is for:** New team members joining the [Product Name] project.
**What you'll learn:** How to get set up and make your first contribution.
**Last updated:** [Date] · **Owner:** [Name or Team]

---

## Day 1 checklist

Access and accounts:
- [ ] GitHub access to [repo URL]
- [ ] [Tool 1] access — request from [Name]
- [ ] [Tool 2] access — request from [Name]
- [ ] Added to [Slack / Teams] channels: [list channels]

Tools to install:
- [ ] [Tool] — [install link or command]
- [ ] [Tool] — [install link or command]

Environment setup:
- [ ] Follow the [Environment Setup Guide](setup.md)
- [ ] Confirm the app runs locally

---

## Week 1 reading list

Read these in order:

1. [README](../README.md) — Project overview (5 minutes)
2. [Architecture Overview](architecture.md) — How it's built (20 minutes)
3. [User Guide](user-guide.md) — Use the product as a user (10 minutes)
4. [Contributing Guide](contributing.md) — How to submit changes (10 minutes)
5. [Architecture Decision Records](adr/) — Key past decisions (skim titles, read 2–3 that interest you)

---

## Who to talk to for what

| Topic | Contact | How to reach |
|-------|---------|-------------|
| Product decisions | [Name, role] | [Slack / email] |
| Engineering | [Name, role] | [Slack / email] |
| Design | [Name, role] | [Slack / email] |
| DevOps / infrastructure | [Name, role] | [Slack / email] |

---

## Your first contribution

A safe, small change to get started:

1. Pick a [good first issue]([URL]) from the issues list
2. Follow the [Contributing Guide](contributing.md)
3. Ask [Name] to review your first PR

Questions? Ask in [#channel-name] — there are no stupid questions here.
```
