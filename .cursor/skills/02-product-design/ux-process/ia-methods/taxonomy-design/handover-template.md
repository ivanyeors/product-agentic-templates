# Taxonomy Design — Handover Template

Use this template for handover to IA Document and metadata implementation.

---

## Taxonomy — [Product Name]

**Date:** [Date]
**Covers:** [FR-IDs if applicable]

### Controlled Vocabulary

| Term | Definition | Parent |
|------|------------|--------|
| [Term 1] | [Definition] | — |
| [Term 2] | [Definition] | [Term 1] |
| [Term 3] | [Definition] | [Term 1] |

### Hierarchy

```
[Root term]
├── [Child 1]
│   ├── [Grandchild 1]
│   └── [Grandchild 2]
└── [Child 2]
```

### Facets

| Facet | Purpose | Values |
|-------|---------|--------|
| [Facet 1: e.g., Type] | [Filter by content type] | [List of terms] |
| [Facet 2: e.g., Audience] | [Filter by audience] | [List of terms] |

### Content Type Mapping

| Content Type | Facets Applied |
|--------------|----------------|
| [Type 1] | [Facet A], [Facet B] |
| [Type 2] | [Facet A] |

### Handover to Backend

- Tag/category schema: [description]
- Facet filters for search: [list]
