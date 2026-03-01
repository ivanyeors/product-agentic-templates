# Backend Design Phase — Human Review Gate Checklist

Use this checklist before approving the transition from Backend Design → Backend Implementation.

---

## API Contract
- [ ] Every endpoint is traceable to at least one FR-ID from the PRD
- [ ] Resource naming follows conventions (plural nouns, kebab-case)
- [ ] HTTP methods are correct (GET read, POST create, PATCH update, DELETE remove)
- [ ] All list endpoints have pagination defined
- [ ] Mutations that need idempotency have Idempotency-Key documented
- [ ] Versioning strategy is defined and documented

## Request/Response
- [ ] Request body schemas defined for all mutation endpoints
- [ ] Response schemas defined for all endpoints (success case)
- [ ] Error response format is consistent (code, message, details)
- [ ] Status codes are appropriate (200, 201, 400, 401, 403, 404, 422, 500)
- [ ] Validation error format (422) includes field-level details
- [ ] Date format is ISO 8601 UTC

## Schema Design
- [ ] All tables map to data dictionary entities
- [ ] All columns map to data dictionary attributes
- [ ] Primary keys defined (id UUID or bigint)
- [ ] Foreign keys defined with appropriate cascade rules
- [ ] Indexes defined for: PK, FKs, unique constraints, query filters
- [ ] Soft delete (deleted_at) planned where required
- [ ] Audit fields (created_at, updated_at) on mutable tables
- [ ] Migration plan exists with order and rollback strategy

## Auth & Permissions
- [ ] Auth strategy is defined (JWT, session, OAuth, etc.)
- [ ] Roles are defined
- [ ] Permissions are defined and mapped to roles
- [ ] Every endpoint has permission requirements documented
- [ ] RLS policies (or equivalent) designed for multi-tenant or row-level access

## Integration Points
- [ ] Webhook payloads defined (if applicable)
- [ ] Third-party API contracts documented (auth, payments, etc.)
- [ ] Event payloads defined for async flows
- [ ] Error handling for external calls considered

## Documentation
- [ ] OpenAPI spec is complete and valid
- [ ] Request/response examples included for key endpoints
- [ ] Migration files (or DDL) are ready for implementation
- [ ] No ambiguous or underspecified areas remain

## Cross-Phase Alignment
- [ ] Schema aligns with data dictionary — no orphan columns
- [ ] Endpoints support all P0 user flows from Product Design
- [ ] Wireframe data requirements are covered by API responses
- [ ] No new endpoints added that aren't traceable to PRD

---

## Gate Decision

**Reviewer:** ______________________
**Date:** ______________________

- [ ] **APPROVED** — All critical items checked. Proceed to Backend Implementation.
- [ ] **CONDITIONALLY APPROVED** — Proceed with these open items tracked: [list]
- [ ] **REVISE** — Return to agent with specific feedback: [feedback]

**Notes:**
[Space for reviewer notes]
