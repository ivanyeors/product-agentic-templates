# Backend Implementation Phase — Human Review Gate Checklist

Use this checklist before approving the transition from Backend Implementation → Integration.

---

## Project Architecture
- [ ] Folder structure follows agreed conventions (architecture-guide.md)
- [ ] TypeScript (or equivalent) configured with strict mode
- [ ] ESLint + Prettier configured and passing
- [ ] Environment variables typed and accessed via config object
- [ ] Database connection uses connection pooling
- [ ] Migration tooling configured and migrations runnable

## Schema
- [ ] All migrations executed successfully
- [ ] Schema matches Backend Design (tables, columns, indexes)
- [ ] No ad-hoc columns not in schema design
- [ ] Rollback migrations tested

## Data Access Layer
- [ ] Repositories implemented for all entities
- [ ] All queries are parameterized (no SQL injection risk)
- [ ] No N+1 queries — verified with query analysis or logging
- [ ] Transactions used for multi-step operations
- [ ] Connection handling correct (no connection leaks)

## Service Layer
- [ ] Business logic in services, not in controllers
- [ ] Services call repositories; no direct DB access in controllers
- [ ] Validation applied at service boundary
- [ ] Error handling uses custom error classes

## API Endpoints
- [ ] All P0 endpoints implemented
- [ ] Request/response match OpenAPI spec
- [ ] Status codes correct (200, 201, 400, 401, 403, 404, 422, 500)
- [ ] Error response format matches Backend Design
- [ ] Pagination implemented for list endpoints
- [ ] Idempotency-Key supported where specified

## Auth & Security
- [ ] Auth middleware implemented and applied to protected routes
- [ ] Permission checks implemented per endpoint
- [ ] RLS policies applied (if Postgres)
- [ ] No raw user input in queries (parameterized only)
- [ ] Passwords/tokens never logged

## Error Handling & Validation
- [ ] All endpoints return structured error format
- [ ] Validation middleware/schema applied to all mutation inputs
- [ ] 422 returned for validation failures with field-level details
- [ ] 5xx errors do not expose internal details to client
- [ ] Global error handler catches unhandled errors

## Testing
- [ ] Unit tests for services (key business logic)
- [ ] Integration tests for API endpoints
- [ ] Contract tests (response matches OpenAPI) or manual verification
- [ ] Auth tests (401 without token, 403 with wrong permission)
- [ ] All tests passing

## Code Quality
- [ ] No TypeScript errors (zero `tsc --noEmit` errors)
- [ ] No ESLint errors (warnings documented if acceptable)
- [ ] No `any` types (or documented exceptions)
- [ ] No console.log or debug statements in production paths
- [ ] No commented-out code blocks
- [ ] Pre-commit hooks configured and passing

## Cross-Phase Alignment
- [ ] Implementation matches Backend Design handoff
- [ ] No endpoints or schema changes without design update
- [ ] OpenAPI spec is source of truth for API shape

---

## Gate Decision

**Reviewer:** ______________________
**Date:** ______________________

- [ ] **APPROVED** — All critical items checked. Proceed to Integration.
- [ ] **CONDITIONALLY APPROVED** — Proceed with these open items tracked: [list]
- [ ] **REVISE** — Return to agent with specific feedback: [feedback]

**Notes:**
[Space for reviewer notes]
