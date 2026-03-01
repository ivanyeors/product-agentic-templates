# Backend Design Artifact Templates

Use these templates when producing Backend Design outputs. Replace all `[PLACEHOLDER]` values.

---

## Endpoint Inventory

```markdown
# Endpoint Inventory — [Product Name]
**Version:** 1.0
**Date:** [Date]
**PRD Version:** [1.0]

## Scope
[Which resources and flows does this API cover?]

## Endpoints

| Method | Path | Covers | Description |
|--------|------|--------|-------------|
| GET | /users | FR-001 | List users (paginated) |
| GET | /users/{id} | FR-002 | Get user by ID |
| POST | /users | FR-003 | Create user |
| PATCH | /users/{id} | FR-004 | Update user |
| DELETE | /users/{id} | FR-005 | Soft-delete user |

## Traceability
- Every endpoint maps to at least one FR-ID from the PRD
- Use `Covers: FR-xxx` to enable traceability to Backend Implementation and QA

## Pagination
- List endpoints: [cursor-based / offset-based] — see api-design-guide.md

## Auth Requirements
| Endpoint | Auth Required | Permissions |
|----------|---------------|-------------|
| GET /users | Yes | users:read |
| POST /users | Yes | users:create |
| ... | | |
```

---

## OpenAPI Spec (Minimal Structure)

```yaml
openapi: 3.0.3
info:
  title: [Product Name] API
  version: 1.0.0
  description: [One-line description]

servers:
  - url: https://api.example.com/v1
    description: Production

paths:
  /users:
    get:
      summary: List users
      operationId: listUsers
      tags:
        - Users
      parameters:
        - name: page
          in: query
          schema:
            type: integer
            default: 1
        - name: limit
          in: query
          schema:
            type: integer
            default: 20
            maximum: 100
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserListResponse'
        '401':
          description: Unauthorized
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
    post:
      summary: Create user
      operationId: createUser
      # ... request body, responses

  /users/{id}:
    get:
      summary: Get user by ID
      operationId: getUser
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '404':
          description: Not found
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'

components:
  schemas:
    User:
      type: object
      required:
        - id
        - email
        - createdAt
      properties:
        id:
          type: string
          format: uuid
        email:
          type: string
          format: email
        name:
          type: string
          nullable: true
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time

    UserListResponse:
      type: object
      properties:
        data:
          type: array
          items:
            $ref: '#/components/schemas/User'
        pagination:
          $ref: '#/components/schemas/Pagination'

    Pagination:
      type: object
      properties:
        page:
          type: integer
        limit:
          type: integer
        total:
          type: integer
        totalPages:
          type: integer

    Error:
      type: object
      required:
        - error
      properties:
        error:
          type: object
          properties:
            code:
              type: string
            message:
              type: string
            details:
              type: array
              items:
                type: object
                properties:
                  field:
                    type: string
                  message:
                    type: string
            requestId:
              type: string
            timestamp:
              type: string
              format: date-time
```

---

## Schema DDL Template

```sql
-- Migration: 001_create_users
-- Description: Create users table
-- Entity: User (from data dictionary)

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  password_hash VARCHAR(255) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE UNIQUE INDEX uq_users_email ON users (email) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_created_at ON users (created_at);
CREATE INDEX idx_users_deleted_at ON users (deleted_at) WHERE deleted_at IS NULL;

COMMENT ON TABLE users IS 'User accounts - maps to Data Dictionary Entity: User';
```

---

## Auth & Permission Model

```markdown
# Auth & Permission Model — [Product Name]
**Date:** [Date]

## Auth Strategy
- **Method:** [JWT / Session / OAuth 2.0 / API Key]
- **Token location:** [Authorization: Bearer header / Cookie]
- **Token expiry:** [e.g., 15 min access, 7 day refresh]

## Roles
| Role | Description |
|------|-------------|
| admin | Full access |
| user | Standard user access |
| guest | Read-only, limited |

## Permissions
| Permission | Description | Roles |
|------------|-------------|-------|
| users:read | View users | admin, user |
| users:create | Create users | admin |
| users:update | Update users | admin, user (own) |
| users:delete | Delete users | admin |
| orders:read | View orders | admin, user |
| orders:create | Create orders | admin, user |

## Endpoint → Permission Mapping
| Endpoint | Permission |
|----------|------------|
| GET /users | users:read |
| POST /users | users:create |
| PATCH /users/{id} | users:update |
| DELETE /users/{id} | users:delete |

## RLS Policies (Postgres)
If using Postgres Row-Level Security:
- [Policy 1: users can read own profile]
- [Policy 2: admins can read all users]
- ...
```

---

## Integration Points Specification

```markdown
# Integration Points — [Product Name]
**Date:** [Date]

## Webhooks (Outgoing)
| Event | Payload | Subscribers |
|-------|---------|-------------|
| order.created | { orderId, userId, total, ... } | [System X] |
| user.updated | { userId, changedFields } | [CRM] |

## Third-Party APIs (Incoming)
| Provider | Purpose | Auth | Endpoints Used |
|----------|---------|------|----------------|
| Auth0 | Authentication | Client credentials | /userinfo, /token |
| Stripe | Payments | Secret key | /v1/charges, /v1/customers |

## Event Payloads
[Schema for async events, webhook payload structure]
```
