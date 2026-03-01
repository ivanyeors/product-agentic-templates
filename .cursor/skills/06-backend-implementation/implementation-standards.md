# Implementation Standards — Backend Implementation

Coding standards, repository pattern, error handling, and query optimization.

---

## Repository Pattern

### Responsibilities
- **Repository:** Data access only. CRUD operations, queries. No business logic.
- **Service:** Business logic, validation, orchestration. Calls repositories.
- **Controller:** HTTP handling. Parses request, calls service, formats response.

### Repository Interface

```typescript
// users.repository.ts
export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: CreateUserInput): Promise<User>;
  update(id: string, data: UpdateUserInput): Promise<User>;
  delete(id: string): Promise<void>;
}
```

### Service Example

```typescript
// users.service.ts
export class UserService {
  constructor(private userRepo: UserRepository) {}

  async getUser(id: string): Promise<User> {
    const user = await this.userRepo.findById(id);
    if (!user) throw new NotFoundError('User', id);
    return user;
  }

  async createUser(data: CreateUserInput): Promise<User> {
    const existing = await this.userRepo.findByEmail(data.email);
    if (existing) throw new ConflictError('Email already in use');
    return this.userRepo.create(data);
  }
}
```

---

## Query Optimization

### Avoid N+1 Queries

**Bad:**
```typescript
const orders = await orderRepo.findAll();
for (const order of orders) {
  order.user = await userRepo.findById(order.userId); // N+1!
}
```

**Good:**
```typescript
const orders = await orderRepo.findAllWithUsers(); // Single query with JOIN
// Or: batch load users
const userIds = [...new Set(orders.map(o => o.userId))];
const users = await userRepo.findByIds(userIds);
const userMap = new Map(users.map(u => [u.id, u]));
orders.forEach(o => { o.user = userMap.get(o.userId); });
```

### Index Usage
- Ensure queries use indexed columns (WHERE, ORDER BY, JOIN)
- For Postgres: use EXPLAIN ANALYZE to verify index usage
- Reference **supabase-postgres-best-practices** for index design

### Parameterized Queries Only
- Never concatenate user input into SQL
- Use parameterized queries or ORM query builders

```typescript
// ✅ Good
await db.query('SELECT * FROM users WHERE id = $1', [userId]);

// ❌ Bad
await db.query(`SELECT * FROM users WHERE id = '${userId}'`);
```

---

## Error Handling

### Error Classes

```typescript
// shared/errors/index.ts
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, id: string) {
    super(404, 'NOT_FOUND', `${resource} not found: ${id}`);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details: Array<{ field: string; message: string }>) {
    super(422, 'VALIDATION_FAILED', message, details);
  }
}

export class UnauthorizedError extends AppError {
  constructor() {
    super(401, 'UNAUTHORIZED', 'Authentication required');
  }
}

export class ForbiddenError extends AppError {
  constructor() {
    super(403, 'FORBIDDEN', 'Insufficient permissions');
  }
}
```

### Error Response Format

Match Backend Design spec:

```json
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Validation failed",
    "details": [
      { "field": "email", "message": "Invalid email format" }
    ],
    "requestId": "req_abc123",
    "timestamp": "2025-03-01T12:00:00Z"
  }
}
```

### Global Error Handler

```typescript
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
        details: err.details,
        requestId: req.id,
        timestamp: new Date().toISOString(),
      },
    });
  }
  // Log unexpected errors, return 500
  logger.error(err);
  res.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred',
      requestId: req.id,
      timestamp: new Date().toISOString(),
    },
  });
});
```

---

## Input Validation

Validate all input at the controller or middleware layer:

```typescript
// users.validation.ts
import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email('Invalid email'),
  name: z.string().min(1).max(255).optional(),
  password: z.string().min(8, 'Minimum 8 characters'),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
```

```typescript
// In controller
const parsed = createUserSchema.safeParse(req.body);
if (!parsed.success) {
  throw new ValidationError(
    'Validation failed',
    parsed.error.errors.map(e => ({
      field: e.path.join('.'),
      message: e.message,
    }))
  );
}
const user = await userService.createUser(parsed.data);
```

---

## Auth Middleware

```typescript
// auth.middleware.ts
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) throw new UnauthorizedError();
  try {
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch {
    throw new UnauthorizedError();
  }
};

export const requirePermission = (permission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) throw new UnauthorizedError();
    if (!hasPermission(req.user, permission)) throw new ForbiddenError();
    next();
  };
};
```

---

## Idempotency

For POST mutations that create resources (e.g., payments), support `Idempotency-Key`:

```typescript
// Check for existing response with same key
const key = req.headers['idempotency-key'];
if (key) {
  const cached = await idempotencyStore.get(key);
  if (cached) return res.status(cached.status).json(cached.body);
}

const result = await service.createOrder(data);

if (key) {
  await idempotencyStore.set(key, { status: 201, body: result }, ttlSeconds);
}
return res.status(201).json(result);
```

---

## Testing

### Unit Tests (Services)
- Mock repositories
- Test business logic, edge cases, error paths

### Integration Tests (API)
- Use test database or transactions
- Send HTTP requests, assert response status and body
- Test auth (401 without token, 403 with wrong permission)

### Contract Tests
- Verify response shape matches OpenAPI spec
- Use openapi-validator or similar
