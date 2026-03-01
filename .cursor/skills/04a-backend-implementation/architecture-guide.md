# Architecture Guide — Backend Implementation

Project structure, folder conventions, and tech stack patterns for backend services.

---

## Tech Stack Decision Framework

### Runtime / Framework

| Signal | Recommended Stack |
|--------|-------------------|
| Node.js ecosystem, TypeScript | Express + TypeScript or NestJS |
| Python ecosystem | FastAPI |
| High performance, strong typing | Go (Gin, Echo, or Chi) |
| Existing .NET team | ASP.NET Core |
| Serverless / edge | Hono, Nitro, or provider-specific |

### Database

| Signal | Recommendation |
|--------|----------------|
| Relational, complex queries | Postgres |
| Existing MySQL infra | MySQL / MariaDB |
| Document model, flexible schema | MongoDB |
| Serverless, managed | Supabase, PlanetScale, Neon |

### Migration Tooling

| Stack | Tool |
|-------|------|
| Node/TypeScript | Prisma, Drizzle, Knex |
| Python | Alembic, Django migrations |
| Go | golang-migrate, Atlas |
| Raw SQL | Flyway, Liquibase |

---

## Project Structure (Node/Express + TypeScript)

```
src/
├── config/                 # Environment, DB config
│   ├── env.ts
│   └── database.ts
├── db/
│   ├── migrations/         # Migration files
│   └── seeds/              # Seed data (optional)
├── modules/                # Feature modules (or domains)
│   ├── users/
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── users.repository.ts
│   │   ├── users.types.ts
│   │   └── users.validation.ts
│   ├── orders/
│   │   ├── ...
│   └── auth/
│       ├── auth.controller.ts
│       ├── auth.service.ts
│       ├── auth.middleware.ts
│       └── ...
├── shared/
│   ├── errors/             # Custom error classes
│   ├── middleware/          # Global middleware (auth, error handler)
│   └── utils/
├── types/                  # Shared types, OpenAPI-generated
├── app.ts                  # Express app setup
└── server.ts               # Entry point
```

### Alternative: Layered (by technical concern)

```
src/
├── controllers/
├── services/
├── repositories/
├── models/                 # Orm entities
├── middleware/
├── config/
└── ...
```

Prefer **module/feature-based** when the codebase will grow; prefer **layered** for small APIs.

---

## Naming Conventions

### Files
- Controllers: `{resource}.controller.ts`
- Services: `{resource}.service.ts`
- Repositories: `{resource}.repository.ts`
- Types: `{resource}.types.ts` or `types/{Resource}.ts`
- Validation: `{resource}.validation.ts`

### Code
- Classes: `PascalCase` — `UserService`, `OrderRepository`
- Functions: `camelCase` — `getUserById`, `createOrder`
- Constants: `UPPER_SNAKE_CASE` — `MAX_PAGE_SIZE`
- Database columns: `snake_case` — `created_at`, `user_id`

---

## Request Flow

```
Request → Middleware (auth, logging) → Controller → Service → Repository → DB
                ↓                         ↓           ↓
            Response ←─────────────────────┴───────────┘
```

- **Controller:** Parse request, validate input, call service, format response
- **Service:** Business logic, orchestration, validation
- **Repository:** Data access only — no business logic

---

## Environment Configuration

```
.env.local          # Local development (gitignored)
.env.development    # Dev defaults
.env.production     # Production defaults
.env.example        # Template (no real values)
```

Access via typed config:

```typescript
// config/env.ts
export const config = {
  port: parseInt(process.env.PORT ?? '3000', 10),
  db: {
    url: process.env.DATABASE_URL!,
    poolSize: parseInt(process.env.DB_POOL_SIZE ?? '10', 10),
  },
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: process.env.JWT_EXPIRES_IN ?? '15m',
  },
} as const;
```

---

## Database Connection

- Use connection pooling (never one connection per request)
- Set pool size based on expected concurrency
- Use transactions for multi-step operations that must be atomic
- For Postgres: reference **supabase-postgres-best-practices** for connection management

---

## API Versioning

If Backend Design specified URL path versioning (`/v1/`):

```
/api/v1/users
/api/v1/orders
```

Mount versioned routers:

```typescript
app.use('/api/v1', v1Router);
```

---

## Logging

- Use structured logging (JSON) for production
- Include: timestamp, level, message, requestId, userId (if auth)
- Never log passwords, tokens, or PII
- Log at appropriate levels: error for failures, info for key events, debug for development
