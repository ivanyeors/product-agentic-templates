# API Design Guide — Backend Design

REST API conventions, versioning, pagination, and error format for contract-first design.

---

## Resource Naming

- Use **plural nouns** for collections: `/users`, `/orders`, `/products`
- Use **kebab-case** for multi-word resources: `/order-items`, `/user-preferences`
- Use **nested resources** when the child has no meaning without the parent: `/orders/{id}/line-items`
- Avoid verbs in URLs — use HTTP methods instead

| Good | Bad |
|------|-----|
| `GET /users` | `GET /getUsers` |
| `POST /orders` | `POST /createOrder` |
| `PATCH /users/{id}` | `POST /users/{id}/update` |
| `DELETE /orders/{id}` | `GET /orders/{id}/delete` |

---

## HTTP Methods

| Method | Use Case | Idempotent | Safe |
|--------|----------|------------|------|
| GET | Read single or list | Yes | Yes |
| POST | Create | No | No |
| PATCH | Partial update | Yes | No |
| PUT | Full replace | Yes | No |
| DELETE | Remove | Yes | No |

**Idempotency:** For POST mutations that create resources (e.g., payments), support `Idempotency-Key` header to allow safe retries.

---

## Status Codes

| Code | Meaning | When to Use |
|------|---------|-------------|
| 200 | OK | Successful GET, PATCH, PUT, DELETE |
| 201 | Created | Successful POST that creates a resource |
| 204 | No Content | Successful DELETE (no body) |
| 400 | Bad Request | Malformed request, invalid syntax |
| 401 | Unauthorized | Missing or invalid auth token |
| 403 | Forbidden | Authenticated but not permitted |
| 404 | Not Found | Resource does not exist |
| 409 | Conflict | Duplicate resource, version conflict |
| 422 | Unprocessable Entity | Validation failed (business rules) |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Unexpected server error |

---

## Standard Error Format

All error responses (4xx, 5xx) must use a consistent structure:

```json
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Human-readable error message",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ],
    "requestId": "req_abc123",
    "timestamp": "2025-03-01T12:00:00Z"
  }
}
```

| Field | Required | Description |
|-------|----------|-------------|
| code | Yes | Machine-readable code (e.g., `VALIDATION_FAILED`, `NOT_FOUND`) |
| message | Yes | Human-readable summary |
| details | No | Per-field validation errors (for 422) |
| requestId | Recommended | For support/debugging |
| timestamp | Recommended | ISO 8601 UTC |

---

## Pagination

All list endpoints must support pagination. Use **cursor-based** for large datasets; **offset-based** for simpler cases.

### Offset-based (simpler)

```
GET /users?page=1&limit=20
```

Response:
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

### Cursor-based (recommended for large lists)

```
GET /users?cursor=eyJpZCI6MTAwfQ&limit=20
```

Response:
```json
{
  "data": [...],
  "pagination": {
    "nextCursor": "eyJpZCI6MTIwfQ",
    "hasMore": true
  }
}
```

---

## Versioning

Choose one strategy and document it in the OpenAPI spec:

| Strategy | Example | Pros | Cons |
|----------|---------|------|------|
| URL path | `/v1/users` | Explicit, cacheable | URL clutter |
| Header | `Accept: application/vnd.api+json;version=1` | Clean URLs | Less visible |
| Query param | `?version=1` | Simple | Not RESTful |

**Recommendation:** URL path (`/v1/`) for clarity and tooling support.

---

## Filtering and Sorting

- **Filtering:** Use query params: `GET /users?status=active&role=admin`
- **Sorting:** Use `sort` param: `GET /users?sort=-createdAt,name` (prefix `-` for descending)
- **Field selection:** Optional `fields` param: `GET /users?fields=id,name,email` (sparse fieldsets)

---

## Request/Response Conventions

- **Content-Type:** `application/json` for request and response bodies
- **Date format:** ISO 8601 UTC (`2025-03-01T12:00:00Z`)
- **IDs:** Use UUIDs for public-facing IDs; internal IDs can differ
- **Null vs omit:** Omit optional fields when not set; use `null` only when explicitly clearing a value
