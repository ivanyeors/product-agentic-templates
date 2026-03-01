# Agent-Direct Specification — Template (Route B)

Use these templates for Route B (Agent-Direct) handoffs from Phase 03 → Phase 05. The agent skips Figma and produces code-ready specifications directly from wireframes + component library.

The design is expressed as component composition and token values, not visual mockups. The Component BOM and screen specifications serve as the equivalent of Figma files.

---

## Component BOM (Bill of Materials)

```markdown
# Component BOM — [Product Name]
**Date:** [Date]
**Target Library:** [e.g., shadcn/ui v0.x + Radix primitives]
**Framework:** [e.g., Next.js 15 + React 19]
**Styling:** [e.g., Tailwind CSS + CSS custom properties]

## Library Components Used
| Wireframe Element | WF-ID | Library | Component | Props / Config | States | Notes |
|-------------------|-------|---------|-----------|----------------|--------|-------|
| Primary action button | WF-001 | shadcn/ui | Button | variant="default" size="default" | default, loading, disabled | |
| Secondary button | WF-001 | shadcn/ui | Button | variant="outline" size="default" | default, loading, disabled | |
| Text input | WF-002 | shadcn/ui | Input | type="text" | default, focus, error, disabled | Wrap in FormField for labels |
| Password input | WF-003 | shadcn/ui | Input | type="password" | default, focus, error, disabled | Add show/hide toggle |
| Navigation sidebar | WF-004 | shadcn/ui | Sidebar + SidebarMenu | collapsible="icon" | expanded, collapsed | |
| Data table | WF-005 | shadcn/ui | Table + DataTable | sortable, selectable | default, loading, empty, error | Use @tanstack/react-table |
| Dropdown menu | WF-005 | shadcn/ui | DropdownMenu | — | open, closed | For row actions |
| Badge | WF-005 | shadcn/ui | Badge | variant per status | — | Map status values to variants |
| Toast notification | global | shadcn/ui | Sonner | — | success, error, warning, info | |
| Dialog / Modal | WF-006 | shadcn/ui | Dialog | — | open, closed | Focus trap built-in |
| Avatar | WF-004 | shadcn/ui | Avatar | — | image, fallback-initials | |

## Custom Components (not in library)
| Component | WF-ID | Why custom? | Props | States | Minimum implementation |
|-----------|-------|-------------|-------|--------|----------------------|
| MetricsCard | WF-001 | No library equivalent for metric display with trend | value, trend, label, icon | loading, empty, populated | Card container + stat display + trend indicator |
| EmptyState | global | Reusable empty state pattern | title, description, action, illustration | — | Centered layout + illustration + CTA |

## Component Dependency Graph
[Which components depend on which — helps Phase 05 determine build order]

```
Atoms (build first):
  Button, Input, Badge, Avatar, Spinner

Molecules (build second):
  FormField (Label + Input + Error), SearchBar (Input + Button),
  MetricsCard (Card + stat + trend), EmptyState (layout + CTA)

Organisms (build third):
  Sidebar (Avatar + SidebarMenu + SidebarMenuItems),
  DataTable (Table + Badge + DropdownMenu),
  LoginForm (FormField + Button)

Pages (build last):
  Dashboard (Sidebar + MetricsCard[] + DataTable + EmptyState)
  Login (LoginForm)
```
```

---

## Screen Specification

```markdown
# Screen Specifications — [Product Name]
**Date:** [Date]
**Component BOM:** [path to BOM file]
**Design Tokens:** `styles/tokens.css`

---

## Screen: [Screen Name] (WF-001)
**Covers:** FR-001, FR-002
**Flow(s):** UF-001
**Authentication Required:** Yes / No

### Layout
**Structure:** [e.g., Sidebar (240px fixed desktop, sheet on mobile) + Main content area]
**Grid:** [e.g., Main content uses 12-col grid desktop, single col mobile]
**Max width:** [e.g., 1280px centered]

### Composition
Describe how components from the BOM assemble into this screen:

- **Sidebar:** `Sidebar` → `SidebarMenu` with [N] `SidebarMenuItem` items
  - Items: [Dashboard (active), Projects, Team, Settings, Help]
  - Footer: `Avatar` + user name + logout action
- **Header:** `PageHeader` → title (`text-h2`: "[Page Title]") + `Button` (variant="default": "New Project")
- **Metrics row:** [N]x `MetricsCard` in [N]-col grid
  - Card 1: label="Total Projects", value=[dynamic], trend="+12%"
  - Card 2: label="Active Users", value=[dynamic], trend="+5%"
- **Content:** `DataTable` with columns:
  - Name (text, sortable)
  - Status (`Badge`, variant mapped from status enum)
  - Date (formatted, sortable)
  - Actions (`DropdownMenu`: Edit, Duplicate, Delete)
- **Empty state:** When table has 0 rows → `EmptyState` with title="No projects yet", action="Create your first project"

### Data States
| State | What is shown |
|-------|---------------|
| Loading | Skeleton: sidebar static, metrics cards with pulse, table rows with pulse |
| Populated | Full composition as described above |
| Empty | EmptyState component replaces DataTable area |
| Error | Error banner above table with retry action. Metrics cards show "--" with error icon |

### Responsive Behavior (Tolerances)
| Element | Mobile (<640px) | Tablet (640-1024) | Desktop (>1024) |
|---------|----------------|-------------------|-----------------|
| Sidebar | Hidden, hamburger trigger → sheet | Hidden, hamburger trigger → sheet | 240px fixed |
| Metrics | 1-col stack, full width | 2-col grid | [N]-col grid |
| Table | Card list (name + status + action) | Horizontal scroll, all columns | Full table |
| Header | Title (text-h4) + icon button | Title (text-h3) + button | Title (text-h2) + button |

### Accessibility
- Focus order: Skip link → Sidebar toggle → Sidebar items → Header action → Metrics cards → Table headers → Table rows → Table row actions
- Table: `role="grid"` with `aria-sort` on sortable columns
- Sidebar: `role="navigation"` with `aria-label="Main navigation"`
- Metrics: Each card is `role="status"` with `aria-label="[label]: [value]"`

---

## Screen: [Screen Name 2] (WF-002)
[Repeat structure]

---

## Downstream Use (05-frontend-development)
- Component BOM maps directly to component implementation order (atoms → molecules → organisms)
- Screen Compositions define the page-level integration — implement in BOM dependency order
- Responsive Tolerances table defines the acceptance criteria for responsive testing
- Data States define the loading/empty/error implementations required for every screen
- Custom components in BOM need full implementation; library components need configuration only
```

---

## Design Token Specification (Route B)

Route B uses the same token architecture as Route A. Produce tokens following the three-tier system in [design-system.md](design-system.md):

```markdown
# Design Tokens — [Product Name]
**Date:** [Date]
**Format:** CSS custom properties in `styles/tokens.css`
**Base library:** [e.g., Tailwind defaults extended with custom tokens]

## Primitive Tokens
[Define raw values — see design-system.md Color System, Typography, Spacing]

## Semantic Tokens
[Map primitives to meaning — see design-system.md Semantic Color Mapping]

## Component Tokens (if overriding library defaults)
[Only needed when library defaults do not match the design intent]

## Contrast Verification
| Pair | Ratio | Pass? |
|------|-------|-------|
| text-primary on surface-default | [X]:1 | [Yes/No] |
| text-secondary on surface-default | [X]:1 | [Yes/No] |
| brand-primary on white | [X]:1 | [Yes/No] |
| feedback-error on surface-default | [X]:1 | [Yes/No] |
```

---

## How to Use These Templates

1. **Start with the DFI audit** — review every wireframe element against the component library
2. **Fill the Component BOM** — this is the most critical artifact; it determines build order and effort
3. **Define tokens** — only customize what the library defaults cannot express
4. **Write screen specs** — use the BOM components to compose each screen
5. **Validate coverage** — every P0 wireframe (WF-xxx) must have a screen spec; every P0 FR-ID must be traceable through the coverage matrix

Phase 05 will use the Component BOM as the primary implementation guide and the screen specs as integration blueprints.
