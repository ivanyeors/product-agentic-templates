# Integration Phase — Human Review Gate Checklist

Use this checklist before approving the transition from Integration → QA Testing.

---

## Contract Verification
- [ ] All P0 endpoints verified against OpenAPI spec
- [ ] Request shapes match (body, query params, headers)
- [ ] Response shapes match (success and error)
- [ ] No frontend expectations that backend does not satisfy
- [ ] No backend responses that frontend does not handle
- [ ] Mismatches documented and resolved (not deferred)

## API Client
- [ ] API client is typed (OpenAPI-generated or manual types)
- [ ] Base URL configured for target environment (staging/local)
- [ ] Auth headers (Bearer token) sent with protected requests
- [ ] Error responses parsed and mapped to user-facing messages
- [ ] Loading states triggered during API calls
- [ ] Error states displayed when API returns 4xx/5xx
- [ ] Retry logic configured for transient failures (if applicable)

## Auth Flow
- [ ] Login flow works (token obtained, stored, sent)
- [ ] Logout clears token and redirects
- [ ] Protected routes require auth (401 redirects to login)
- [ ] Token refresh works (if refresh flow exists)
- [ ] Expired token handled (re-auth or refresh)

## Third-Party Integrations
- [ ] Auth provider configured (OAuth, JWT) per PRD
- [ ] Payment provider configured if required (Stripe, etc.)
- [ ] Webhooks configured if required (payload verification, signing)
- [ ] Environment variables set for third-party keys/secrets
- [ ] Error handling for third-party failures

## E2E Data Flow
- [ ] Create flow: form submit → API → success → UI update
- [ ] Read flow: page load → API → data display
- [ ] Update flow: edit → API → success → UI update
- [ ] Delete flow: delete action → API → success → UI update
- [ ] List/pagination flow works
- [ ] Error paths tested (401, 403, 404, 422, 500)

## Cross-Phase Alignment
- [ ] Frontend and backend agree on API contract
- [ ] No orphan endpoints (backend has it, frontend doesn't use)
- [ ] No orphan frontend calls (frontend calls it, backend doesn't have it)
- [ ] PRD integration requirements satisfied

---

## Gate Decision

**Reviewer:** ______________________
**Date:** ______________________

- [ ] **APPROVED** — All critical items checked. Proceed to QA Testing.
- [ ] **CONDITIONALLY APPROVED** — Proceed with these open items tracked: [list]
- [ ] **REVISE** — Return to agent with specific feedback: [feedback]

**Notes:**
[Space for reviewer notes]
