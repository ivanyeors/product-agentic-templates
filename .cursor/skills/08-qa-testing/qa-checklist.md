# QA Testing Phase — Human Review Gate Checklist

Use this checklist before approving the transition from QA Testing → Deployment.

---

## Test Strategy
- [ ] Test strategy document created and reviewed
- [ ] Test pyramid allocation is appropriate for this project
- [ ] All P0 user stories have a corresponding E2E test
- [ ] Defect severity definitions agreed upon
- [ ] Exit criteria defined and met

## Unit Tests
- [ ] Coverage ≥ 80% for utility functions
- [ ] Coverage ≥ 80% for custom React hooks
- [ ] All form validation logic is tested
- [ ] All state reducers/stores are tested
- [ ] Zero failing unit tests
- [ ] No tests skipped without documented reason

## Integration Tests
- [ ] All form submission flows tested (success + error cases)
- [ ] API error handling tested with mock server
- [ ] Critical component compositions tested
- [ ] State management interactions tested
- [ ] Zero failing integration tests

## E2E Tests
- [ ] All P0 user story happy paths tested and passing
- [ ] Primary error cases tested for all P0 flows
- [ ] Authenticated and unauthenticated states tested
- [ ] Mobile viewport tested for critical flows
- [ ] Desktop viewport tested for critical flows
- [ ] Zero failing E2E tests on staging environment

## Visual Regression
- [ ] Baseline screenshots captured for all P0 screens
- [ ] No unexpected visual differences (intentional changes updated in baseline)
- [ ] Mobile and desktop breakpoints both tested

## Accessibility
- [ ] axe-core automated audit run on all P0 screens
- [ ] Zero critical (WCAG 2.1 AA) violations
- [ ] Zero serious violations (or all documented with remediation plan)
- [ ] Keyboard navigation manually tested for all P0 flows
- [ ] All forms are fully keyboard-navigable
- [ ] All modals/dialogs trap and restore focus correctly
- [ ] Screen reader tested on at least one critical flow
- [ ] Skip-to-content link functional

## Performance
- [ ] Lighthouse CI run against staging
- [ ] LCP < 2.5s on desktop
- [ ] LCP < 4s on mobile (3G fast)
- [ ] INP < 200ms
- [ ] CLS < 0.1
- [ ] Performance score ≥ 90 (or documented exceptions with mitigation plan)

## Security
- [ ] OWASP Top 10 checklist reviewed
- [ ] npm audit shows zero critical or high vulnerabilities
- [ ] No secrets in client-side code or public env vars
- [ ] HTTPS enforced
- [ ] Security headers configured
- [ ] Authentication boundaries tested

## Defect Triage
- [ ] All Critical defects resolved
- [ ] All High defects resolved (or accepted with documented risk)
- [ ] Medium defects triaged and scheduled (not blocking deployment)
- [ ] All defects logged with reproduction steps

---

## Gate Decision

**Reviewer:** ______________________
**Date:** ______________________

- [ ] **APPROVED** — All critical items checked. Proceed to Deployment.
- [ ] **CONDITIONALLY APPROVED** — Proceed with these open items tracked: [list]
- [ ] **REVISE** — Return to agent with specific feedback: [feedback]

**Notes:**
[Space for reviewer notes]
