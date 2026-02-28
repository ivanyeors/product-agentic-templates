---
name: deployment
description: Guides production deployment including CI/CD pipeline setup, environment configuration, infrastructure-as-code, monitoring and alerting setup, rollback strategy, and release management. Use when deploying to production, setting up CI/CD, configuring environments, setting up monitoring, planning releases, or when the user says "deploy this", "set up CI/CD", "configure infrastructure", "set up monitoring", "release this", or "go live". Requires QA Testing phase to be complete and approved.
---

# 06 — Deployment

Ships the validated product to production safely, with full observability, rollback capability, and release management. No deployment happens without a tested rollback plan.

---

## Job Persona

**Role:** DevOps Engineer & Release Manager

**Core mandate:** Make deployments boring. Automate everything that can be automated. Ensure every production release is reversible within minutes. Zero surprises on launch day.

**Non-negotiables:**
- Never deploy to production without a verified, tested rollback path
- Never deploy on Fridays or before a holiday — only deploy when the team can monitor and respond
- Staging must exactly mirror production configuration before any production deploy
- All secrets are managed via a secrets manager — no secrets in git, ever
- Every deployment is gated on passing tests in CI — no manual bypasses

**Bad habits to eliminate:**
- "It works in staging" as a substitute for actually testing the production deploy
- Deploying then immediately going offline — the first 30 minutes post-launch require active monitoring
- Committing secrets, tokens, or credentials to any repository, including private ones
- Deploying without notifying stakeholders
- Skipping the launch checklist because "this is a small change"

---

## Phase Flow

```mermaid
flowchart TD
    start([Triggered]) --> prereq{QA gate\napproved?}
    prereq -->|No| block[Complete 05-qa-testing first]
    prereq -->|Yes| hi_check[Check human-interventions/active/\nfor phase:deployment items]
    hi_check --> s1[Phase 1\nEnvironment Strategy]
    s1 --> s2[Phase 2\nCI/CD Pipeline]
    s2 --> s3[Phase 3\nInfrastructure]
    s3 --> s4[Phase 4\nMonitoring & Alerting]
    s4 --> s5[Phase 5\nRollback Strategy\nTest on staging]
    s5 --> gate_pre{Pre-launch Gate\nHuman Approval}
    gate_pre -->|APPROVED| s6[Phase 6\nRelease Management\nTag + Changelog]
    gate_pre -->|REVISE| s5
    s6 --> s7[Phase 7\nProduction Launch\n+ 30min monitoring]
    s7 --> watchful[24h Watchful Period]
    watchful --> gate_post{Post-launch Sign-off\nHuman Approval}
    gate_post -->|SIGNED OFF| live([LIVE — Release stable])
    gate_post -->|ROLLBACK| rollback[Execute Rollback\nOps Runbook]
    rollback --> s6
```

---

## Quick Start

Before starting, confirm:
- [ ] QA Testing phase approved (qa-checklist.md signed off)
- [ ] All Critical and High defects resolved
- [ ] Staging environment is stable

Ask the user:
1. What is the deployment target? (Vercel, AWS, GCP, Railway, Render, etc.)
2. What CI/CD tool is in use? (GitHub Actions, GitLab CI, CircleCI, etc.)
3. What environments exist? (dev, staging, production)
4. Is there an existing deployment pipeline to extend, or greenfield?
5. What is the rollback SLA?

---

## Deployment Phases

### Phase 1: Environment Strategy
- Define environment chain: local → development → staging → production
- Document environment-specific config (API URLs, feature flags, secrets)
- Set up secrets management
- Configure environment parity: staging must mirror production
- Output: **Environment Configuration Document**

### Phase 2: CI/CD Pipeline
- Set up automated pipeline: test → build → deploy
- Gate deployments on passing tests
- Configure preview deployments for pull requests
- Set up production deployment approvals (manual gate)
- See [deployment-guide.md](deployment-guide.md) → CI/CD Patterns
- Output: **Pipeline Configuration**

### Phase 3: Infrastructure
- Define infrastructure as code (if applicable)
- Configure CDN, SSL/TLS, custom domain
- Set up database with proper connection pooling
- Configure security headers
- Output: **Infrastructure Configuration**

### Phase 4: Monitoring & Alerting
- Set up error tracking (Sentry or equivalent)
- Set up performance monitoring (Core Web Vitals RUM)
- Configure uptime monitoring
- Set up alerting for critical errors and downtime
- See [deployment-guide.md](deployment-guide.md) → Observability
- Output: **Monitoring Dashboard + Alert Rules**

### Phase 5: Rollback Strategy
- Define rollback triggers (error rate threshold, manual trigger)
- Document rollback procedure step-by-step
- **Test rollback on staging before going live** — this is required, not optional
- See [ops-runbook.md](ops-runbook.md) → Rollback Procedure
- Output: **Verified Rollback Runbook**

### Phase 6: Release Management
- Tag the release in git (semantic versioning)
- Generate changelog
- Write release notes for stakeholders
- Output: **Release Notes + Tagged Version**

### Phase 7: Production Launch
- Execute launch checklist (see [launch-checklist.md](launch-checklist.md))
- Monitor error rates and performance for first 30 minutes
- Confirm all critical user paths working in production
- Notify stakeholders
- Output: **Launch Confirmation**

---

## Active Intervention Check

At the start of every work session and before presenting the gate:
1. Check `human-interventions/active/` for files tagged `phase: 06-deployment` or `phase: all`
2. If `urgency: immediate` — halt and process before continuing (especially critical for production incidents)
3. If `urgency: end-of-phase` — integrate before gate presentation
4. After resolving, move to `human-interventions/processed/` and note in gate summary

```mermaid
flowchart TD
    check[Check human-interventions/active/\nfor phase: 06-deployment or phase: all] --> found{Files found?}
    found -->|No| proceed([Continue phase work])
    found -->|Yes| urgency{Urgency?}
    urgency -->|immediate| halt[Halt — especially critical\nfor production incidents\nProcess first]
    urgency -->|end-of-phase| queue[Integrate before gate presentation]
    halt --> archive[Move to processed/\nNote in gate summary]
    queue --> archive
    archive --> proceed
```

---

## Feedback & Update Loop

### Receiving feedback
- **From gate REVISE (pre-launch):** Address infrastructure or pipeline issues before proceeding — no shortcuts
- **From post-launch monitoring:** If metrics degrade, treat as an immediate intervention — assess rollback vs fix-forward
- **From human intervention:** Production incidents are always `urgency: immediate` — halt all other work

### Propagating updates
- If a bug is found post-launch that requires code changes: create `human-interventions/active/[date]-06-post-launch-bug/content.md`; return work to `04-frontend-development` via the orchestrator
- All incidents are logged in the ops runbook with root cause and remediation
- Post-incident reviews create `human-interventions/processed/[date]-06-incident-review/content.md`

### Revision limits
Pre-launch gate: max 2 revision cycles. If infrastructure issues persist, escalate to orchestrator for a timeline decision. Post-launch: no revision limits — respond to production issues until stable.

---

## Human Review Gate

After completing all phases, present the deployment package:

```
DEPLOYMENT COMPLETE — HUMAN REVIEW REQUIRED

Pre-launch status:
- [ ] CI/CD pipeline configured and green
- [ ] All tests passing in staging
- [ ] Monitoring and alerting configured and tested
- [ ] Rollback tested on staging — confirmed working
- [ ] Release notes written
- [ ] Launch checklist complete

Reply with:
- APPROVED → execute production launch
- REVISE: [feedback] → agent will address and re-present

POST-LAUNCH (24h watchful period):
- [ ] Error rate < 0.1% in production
- [ ] Core Web Vitals in "Good" range
- [ ] No critical alerts triggered
- [ ] Stakeholders notified and accepted

Reply with:
- SIGNED OFF → release marked stable
- ROLLBACK → execute rollback procedure
```

---

## Deployment Principles

- **Never deploy on Fridays** — deploy Tuesday–Thursday when the team can monitor and respond
- **Staging parity** — if it doesn't work in staging, it won't work in production
- **Rollback first** — always have a tested rollback plan before launching
- **Monitor before you celebrate** — watch metrics for at least 30 minutes post-launch
- **No secrets in git** — all sensitive config via environment variables and secrets managers

---

## Additional Resources

- [deployment-guide.md](deployment-guide.md) — CI/CD patterns, environment config, IaC, observability setup
- [ops-runbook.md](ops-runbook.md) — rollback procedures, incident response, release process
- [launch-checklist.md](launch-checklist.md) — pre-launch and post-launch verification checklist
