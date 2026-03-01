# Launch Checklist — Deployment

Complete this checklist in order before and after every production launch.

---

## Pre-Launch: Infrastructure & Config

- [ ] Production environment variables set and verified
- [ ] No development/staging secrets present in production config
- [ ] SSL/TLS certificate active and valid
- [ ] Custom domain configured and DNS propagated
- [ ] CDN configured for static assets
- [ ] Security headers configured and verified (securityheaders.com)
- [ ] HTTPS redirect enforced (HTTP → HTTPS)
- [ ] robots.txt configured correctly (allow/disallow as intended)
- [ ] sitemap.xml generated (if applicable)

## Pre-Launch: CI/CD Pipeline

- [ ] CI/CD pipeline fully configured
- [ ] All tests passing on main branch
- [ ] Production deployment requires manual approval (not auto-deploy)
- [ ] Rollback procedure tested on staging
- [ ] Previous deployment identified as rollback target

## Pre-Launch: Application Quality

- [ ] All P0 features working on staging
- [ ] All P0 E2E tests passing against staging
- [ ] Zero critical accessibility violations
- [ ] Performance audit passed (LCP, INP, CLS in "Good" range)
- [ ] No critical security vulnerabilities (npm audit clean)
- [ ] Error tracking (Sentry) configured and test event received
- [ ] Uptime monitor configured for production URL
- [ ] Alert notifications tested (email, Slack, PagerDuty)

## Pre-Launch: Content & SEO

- [ ] Page titles and meta descriptions set for all pages
- [ ] Open Graph tags set (og:title, og:description, og:image)
- [ ] Favicon set at correct sizes
- [ ] 404 page implemented and styled
- [ ] Error page (500) implemented
- [ ] Legal pages present: Privacy Policy, Terms of Service (if required)
- [ ] Cookie consent implemented (if required by jurisdiction)
- [ ] Analytics configured (GA4, Plausible, etc.)

## Pre-Launch: Functional Verification on Staging

Manually test these on staging before proceeding:
- [ ] User registration / onboarding flow
- [ ] User login (correct and incorrect credentials)
- [ ] Primary P0 user journey completed successfully
- [ ] Forms submit and show success/error correctly
- [ ] Email delivery working (confirmation, password reset)
- [ ] Mobile layout correct on iPhone and Android
- [ ] Desktop layout correct on Chrome and Safari

## Launch Execution

- [ ] Confirm team availability for next 2 hours (do not launch without coverage)
- [ ] Confirm rollback person assigned
- [ ] Notify stakeholders: "Production launch starting now"
- [ ] Execute deployment via CI/CD pipeline
- [ ] Confirm deployment pipeline completed successfully
- [ ] Smoke test: open production URL, confirm app loads
- [ ] Smoke test: complete primary user flow in production

## Post-Launch: First 30 Minutes

- [ ] Error rate: ≤ 0.1% (check Sentry)
- [ ] P95 response time: within baseline ± 20%
- [ ] Health check endpoint: returning 200
- [ ] LCP: < 2.5s (check Lighthouse or Web Vitals)
- [ ] No P1/P2 alerts triggered
- [ ] Core user paths manually verified in production

## Post-Launch: Notifications

- [ ] Stakeholders notified: "v[X.X.X] is live at [URL]"
- [ ] Release notes shared with stakeholders
- [ ] Internal team notified
- [ ] Status page updated to "Operational" (if applicable)

## Post-Launch: Monitoring (24h)

- [ ] 2h mark: error rate still normal
- [ ] 2h mark: no spike in support tickets
- [ ] 24h mark: all Core Web Vitals in "Good" range
- [ ] 24h mark: no new critical Sentry error groups
- [ ] 24h mark: **RELEASE SIGNED OFF**

---

## Emergency: Launch Abort Checklist

If any of the following occur during launch, abort and rollback:

- [ ] Deployment pipeline fails
- [ ] Smoke test fails
- [ ] Error rate spikes above 1% within 5 minutes
- [ ] Any data corruption detected
- [ ] P1 bug found in production

**Rollback command:**
```bash
# Document the rollback target before launching
PREVIOUS_VERSION=v[X.X.X]
# If needed: vercel rollback / git checkout $PREVIOUS_VERSION + deploy
```

**Notify:**
> Launch of v[X.X.X] has been aborted due to [reason]. Rolling back to [previous version]. ETA: [time].
