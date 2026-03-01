# Content Design

UX writing, microcopy, and content hierarchy in wireframes. See [ux-process.md](ux-process.md) for orchestrator.

---

## Purpose

Content design ensures wireframe specs include clear guidance on copy patterns, microcopy, and content hierarchy. This feeds the Content Notes column in wireframe specifications and the handover to Frontend Design.

---

## Copy Patterns

**Button labels:** Use action verbs. Be consistent across similar actions (e.g., "Save" not "Submit" for form save).

**Error messages:** User-facing, actionable. Structure: [What happened] + [What to do]. Example: "Email format is invalid. Enter a valid email address."

**Empty states:** Explain why it's empty + next action. Example: "No projects yet. Create your first project to get started."

**Success feedback:** Brief confirmation. Example: "Project saved" or "Changes saved."

---

## Placeholder Rules

- Use realistic placeholder text in mid-fi wireframes — not "Lorem ipsum"
- Placeholder length should reflect actual constraints (e.g., 60 chars for title)
- Mark placeholders clearly: `[Placeholder: Project name]` in annotations

---

## Content Hierarchy in Wireframes

For each screen, specify in Content Notes:
- **Primary heading** — purpose of the screen
- **Secondary content** — supporting copy, help text
- **Truncation rules** — e.g., "Title truncates at 60 chars with ellipsis"
- **Character limits** — e.g., "Description: max 500 characters"
- **List limits** — e.g., "Max 3 items shown; 'View all' expands list"

---

## Handover Format

Content design outputs feed the **Content Notes** column in [artifacts-template.md](../artifacts-template.md) → Wireframe Specification. Each wireframe screen must have content notes that specify:
- Copy for key UI elements (buttons, labels, placeholders)
- Content rules (limits, truncation)
- Empty state copy
- Error message copy
