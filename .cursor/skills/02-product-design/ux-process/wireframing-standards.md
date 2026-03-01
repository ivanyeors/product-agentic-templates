# Wireframing Standards

Reference for wireframe specifications in Product Design. See [ux-process.md](ux-process.md) for orchestrator.

---

## Fidelity Levels

**Low Fidelity (lo-fi):** Boxes and labels only. Focus on layout and content hierarchy.
- Use for early exploration and stakeholder alignment
- No color, no icons, no real content
- Use placeholder text: "Heading", "Body copy", "Button label"

**Mid Fidelity:** Real content, basic spacing, real component shapes.
- Use for flow validation and developer handoff prep
- Black/white/grey only
- Actual button labels, navigation items, field labels

**High Fidelity:** Only if combining wireframing with Frontend Design phase.

---

## Layout Conventions

**Grid System:** Reference the 8pt grid (all spacing multiples of 8px).

**Zones to define on every screen:**
- Header / Navigation zone
- Primary content zone
- Secondary / sidebar zone (if applicable)
- Footer / action zone

**Required annotations per screen:**
- Component labels (e.g., "Primary CTA button", "Inline form validation")
- Interaction notes (e.g., "Clicking X opens modal Y")
- State notes (e.g., "Button disabled until all required fields filled")
- Content notes (e.g., "Max 3 items shown; 'View all' expands list")

---

## Screen States to Document

For every significant screen, specify:
- **Default state** — normal loaded state
- **Loading state** — skeleton screens or spinners
- **Empty state** — no data, first-time user, search with no results
- **Error state** — validation errors, network errors, permission errors
- **Success state** — confirmation, completion feedback
