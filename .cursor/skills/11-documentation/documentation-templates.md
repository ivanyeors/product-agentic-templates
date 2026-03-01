# Documentation Templates — Phase 11

Use these templates when producing documentation outputs. Replace all `[PLACEHOLDER]` values.

---

## Artifact Index

```markdown
# Artifact Index — [Product Name]
**Last updated:** [Date]

Complete index of all artifacts produced across the product lifecycle. Use this to find any document quickly.

| Phase | Artifact | Path/URL | Purpose | Who Uses |
|-------|----------|----------|---------|----------|
| 1. Discovery | PRD | `[path]` | Requirements, FR-IDs, user stories | PM, Design, Dev |
| 1. Discovery | Personas | `[path]` | User profiles | PM, Design |
| 1. Discovery | Journey Map | `[path]` | User journey stages | PM, Design |
| 1. Discovery | Competitive Analysis | `[path]` | Competitor comparison | PM |
| 2. Product Design | IA Document | `[path]` | Information architecture | Design, Dev |
| 2. Product Design | User Flows | `[path]` | Flow logic, UF-IDs | Design, Dev, QA |
| 2. Product Design | Wireframes | `[path]` | Screen specs, WF-IDs | Design, Dev |
| 3. Frontend Design | Design Tokens | `[path]` | Colors, typography, spacing | Dev |
| 3. Frontend Design | Figma / BOM | `[path or URL]` | Visual designs, component mapping | Design, Dev |
| 4. Frontend Dev | Architecture | `[path]` | Technical decisions | Dev |
| 4. Frontend Dev | FAI Report | `[path]` | Implementation vs design | QA, Design |
| 4. Frontend Dev | Test Coverage Matrix | `[path]` | FR-ID to test mapping | QA, Dev |
| 5. QA Testing | Test Suite | `[path]` | Unit, E2E tests | Dev, QA |
| 5. QA Testing | Audit Reports | `[path]` | Accessibility, performance | QA |
| 6. Deployment | Ops Runbook | `[path]` | Rollback, incidents | DevOps |
| 6. Deployment | Release Notes | `[path]` | Changelog, features | Stakeholders |
| 6. Deployment | Production URL | [URL] | Live product | All |
```

---

## Quick Start (User Guide)

```markdown
# Quick Start — [Product Name]
**Last updated:** [Date]

Get started in 5 minutes. No prior experience needed.

## Step 1: [First action]
[One sentence. What to do.]

Example: Go to [URL] and click **Sign up**.

## Step 2: [Second action]
[One sentence. What to do.]

## Step 3: [Third action]
[One sentence. What to do.]

## Step 4: [Fourth action]
[One sentence. What to do.]

## Step 5: [Fifth action]
[One sentence. What to do.]

## What's next?
- [Link to Feature Guide] — Learn all features
- [Link to FAQ] — Common questions
```

---

## Feature Guide Section

```markdown
## [Feature Name]

**What it does:** [One sentence.]

**How to use it:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Common issues:**
- **Problem:** [Description] → **Fix:** [What to do]
- **Problem:** [Description] → **Fix:** [What to do]
```

---

## FAQ Entry

```markdown
### [Question in plain language?]

[Short answer. One to three sentences. No jargon.]
```

---

## Environment Reference (Ops)

```markdown
# Environment Reference — [Product Name]
**Last updated:** [Date]

Quick reference for environments and configuration.

## URLs

| Environment | URL | Purpose |
|-------------|-----|---------|
| Production | [URL] | Live product |
| Staging | [URL] | Pre-production testing |
| Local | [URL] | Development |

## Environment Variables

| Variable | Required | Description | Where Set |
|----------|----------|-------------|-----------|
| [VAR_NAME] | Yes/No | [Purpose] | [Vercel/AWS/etc] |

## Secrets

| Secret | Location | Purpose |
|--------|----------|---------|
| [Secret name] | [Secrets manager path] | [Purpose] |
```

---

## Monitoring Reference (Ops)

```markdown
# Monitoring & Alerts — [Product Name]
**Last updated:** [Date]

## Dashboards

| Dashboard | URL | What It Shows |
|-----------|-----|---------------|
| [Name] | [URL] | [Metrics] |

## Alert Rules

| Alert | Threshold | Action | Contact |
|-------|-----------|--------|---------|
| [Name] | [Condition] | [What happens] | [Who] |

## Key Metrics

| Metric | Target | Current |
|--------|--------|---------|
| Error rate | < 0.1% | [Value] |
| LCP | < 2.5s | [Value] |
```

---

## Stakeholder Package

```markdown
# Stakeholder Package — [Product Name]
**Last updated:** [Date]
**Release:** v[X.X.X]

## Executive Summary

[2–3 sentences: What was built, for whom, and why it matters.]

## What Was Delivered

- [Feature 1] — [One line description]
- [Feature 2] — [One line description]
- [Feature 3] — [One line description]

**Live product:** [URL]

## Success Metrics

| Metric | Baseline | Target | How to Measure |
|--------|----------|--------|----------------|
| [Metric 1] | [Value] | [Value] | [Method] |
| [Metric 2] | [Value] | [Value] | [Method] |

## Where to Find Things

- **User guide:** [Link]
- **Release notes:** [Link]
- **Support:** [Link or contact]

## Next Steps

- [Recommended follow-up 1]
- [Recommended follow-up 2]
```

---

## Docs README (Entry Point)

```markdown
# Documentation — [Product Name]
**Last updated:** [Date]

Single entry point for all product documentation.

## For Users

- [Quick Start](user-guide/quick-start.md) — Get started in 5 minutes
- [Feature Guide](user-guide/features.md) — How to use each feature
- [FAQ](user-guide/faq.md) — Common questions

## For Operators

- [Ops Runbook](ops/ops-runbook.md) — Rollback, incidents, release process
- [Environment Reference](ops/environment-reference.md) — URLs, env vars, secrets
- [Monitoring](ops/monitoring.md) — Dashboards, alerts

## For Stakeholders

- [Stakeholder Package](stakeholder-package.md) — What was delivered, metrics, next steps

## Artifact Index

- [Artifact Index](artifact-index.md) — Complete list of all lifecycle artifacts
```
