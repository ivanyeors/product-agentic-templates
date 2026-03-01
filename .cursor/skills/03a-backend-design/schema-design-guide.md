# Schema Design Guide — Backend Design

Naming conventions, indexing strategy, and migration approach for database schema design.

---

## Naming Conventions

### Tables
- **Plural nouns**, snake_case: `users`, `order_items`, `user_preferences`
- Junction tables: `entity_a_entity_b` (e.g., `users_roles`, `orders_products`)

### Columns
- **snake_case**: `created_at`, `user_id`, `is_active`
- Boolean: prefix with `is_`, `has_`, or `can_`: `is_verified`, `has_paid`, `can_edit`
- Timestamps: `created_at`, `updated_at`, `deleted_at` (UTC)

### Primary Keys
- Prefer `id` (UUID or bigint) for all tables
- Composite PKs only when truly required (junction tables)

### Foreign Keys
- `{referenced_table_singular}_id`: `user_id`, `order_id`, `product_id`

---

## Index Strategy

Index for:
1. **Primary key** — automatic in most DBs
2. **Foreign keys** — for JOIN performance
3. **Unique constraints** — email, slug, etc.
4. **Query filters** — columns in WHERE, ORDER BY
5. **Composite indexes** — for multi-column queries (order matters)

### Index Naming
- `idx_{table}_{columns}`: `idx_orders_user_id`, `idx_orders_status_created_at`
- Unique: `uq_{table}_{columns}`: `uq_users_email`

### Postgres-Specific
When using Postgres, reference the **supabase-postgres-best-practices** skill for:
- Partial indexes (filtered indexes)
- Covering indexes (INCLUDE)
- Avoid over-indexing (write cost)

---

## Common Patterns

### Soft Delete
```sql
deleted_at TIMESTAMPTZ NULL  -- NULL = active, non-NULL = deleted
```
- Add index: `WHERE deleted_at IS NULL` for active-record queries

### Audit Fields
```sql
created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
created_by UUID REFERENCES users(id),
updated_by UUID REFERENCES users(id)
```

### JSONB (Postgres)
Use for flexible/schema-less data; avoid for query-heavy columns.
- Add GIN index if querying inside JSON: `CREATE INDEX idx_orders_metadata ON orders USING GIN (metadata);`

---

## Migration Strategy

1. **One migration per logical change** — add table, add column, add index
2. **Order migrations** — dependencies first (e.g., users before orders)
3. **Rollback plan** — every migration should have a reversible down migration
4. **Naming:** `YYYYMMDDHHMMSS_description.sql` or sequential: `001_create_users.sql`

### Migration Checklist
- [ ] No data loss on rollback (or document intentional loss)
- [ ] Indexes created after bulk inserts (for initial seed)
- [ ] Default values for NOT NULL columns on existing rows

---

## Data Dictionary Alignment

Every table and column must trace to the data dictionary:
- Table → Entity
- Column → Attribute
- Constraint → Business Rule

If a column is not in the data dictionary, either:
1. Update the data dictionary first (with approval), or
2. Document the deviation and rationale

---

## Relationship Patterns

| Relationship | Implementation | Example |
|--------------|----------------|---------|
| One-to-many | FK on "many" side | `orders.user_id` → `users.id` |
| Many-to-many | Junction table | `users_roles` (user_id, role_id) |
| One-to-one | FK on either side | `profiles.user_id` → `users.id` |

### Cascade Rules
- **ON DELETE CASCADE:** Child has no meaning without parent (e.g., line items)
- **ON DELETE SET NULL:** Child can exist without parent (e.g., `orders.created_by`)
- **ON DELETE RESTRICT:** Prevent delete if children exist (default for critical FKs)
