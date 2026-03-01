# Content Model — Handover Template

Use this template for handover to IA Document and Backend Design.

---

## Content Model — [Product Name]

**Date:** [Date]
**Covers:** [FR-IDs if applicable]

### Content Types

| Content Type | Description | Where Used |
|--------------|-------------|------------|
| [Type 1] | [Description] | [Section(s)] |
| [Type 2] | [Description] | [Section(s)] |

### Field Definitions

**Content Type: [Name]**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| [field_1] | [string / number / date / reference] | Yes/No | [Description] |
| [field_2] | [type] | Yes/No | [Description] |

### Relationships

| From | To | Relationship |
|------|-----|---------------|
| [Type A] | [Type B] | [One-to-many / Many-to-many / Reference] |

### Metadata / Tags

| Attribute | Values | Purpose |
|-----------|--------|---------|
| [tag/category] | [Controlled list or free] | [Filtering / Search / Display] |

### Handover to Backend

- Tables/collections to create: [list]
- Indexes for search/filter: [list]
