# Component Specifications — Frontend Design

## Atomic Design Hierarchy

```
Atoms → Molecules → Organisms → Templates → Pages
```

**Atoms:** Single-purpose UI elements that cannot be broken down further.
Examples: Button, Input, Checkbox, Badge, Avatar, Icon, Divider, Spinner

**Molecules:** Combinations of atoms that form a distinct UI unit.
Examples: Form Field (Label + Input + Helper/Error), Search Bar (Input + Button), Card (Image + Heading + Text + Button)

**Organisms:** Complex sections made of molecules/atoms.
Examples: Navigation bar, Form, Data table, Hero section, Sidebar

**Templates:** Page-level layout skeletons (no real content, just structure).

**Pages:** Templates filled with real content — the final screens.

---

## Required States for Every Interactive Component

Every interactive component MUST have designs for:

| State | Description |
|-------|-------------|
| Default | Normal resting state |
| Hover | Mouse over (web) / Press-and-hold indication (mobile) |
| Focus | Keyboard focus — visible focus ring required |
| Active / Pressed | During click/tap |
| Disabled | Not interactive — reduced opacity, no pointer events |
| Loading | Async action in progress (if component triggers async work) |
| Error | Validation or system error state (if applicable) |
| Success | Completion confirmation (if applicable) |

---

## Core Component Inventory

### Atoms

#### Button
Variants: Primary, Secondary, Tertiary, Ghost, Destructive, Link
Sizes: sm (32px), md (40px), lg (48px), xl (56px)
States: all 8 above
Specs:
- Min width: 64px
- Icon-only variant needs `aria-label`
- Loading state: inline spinner replaces/accompanies label
- Full-width option

#### Input (Text)
Variants: Default, With prefix icon, With suffix icon, With both, Password (show/hide toggle)
States: Default, Focus, Filled, Error, Disabled, Read-only
Specs:
- Height: 40px (md), 36px (sm), 48px (lg)
- Error message below field
- Character count (if max length applies)
- Autofill style must be overridden to match design

#### Textarea
States: Default, Focus, Filled, Error, Disabled
Specs:
- Min height: 80px
- Resizable: vertical only
- Character count (if applicable)

#### Select / Dropdown
Variants: Default, With search
States: Default, Open, Selected, Disabled, Error
Specs:
- Dropdown opens below (with overflow handling to open above)
- Keyboard navigable (arrow keys, Enter to select, Escape to close)
- ARIA: `role="listbox"`, `aria-selected`

#### Checkbox
States: Unchecked, Checked, Indeterminate (for parent selection), Disabled (all 3 states)
Specs:
- 20×20px box
- Focus ring on the box
- Clickable area extends to label
- ARIA: `aria-checked="mixed"` for indeterminate

#### Radio Button
States: Unselected, Selected, Disabled
Specs:
- 20×20px circle
- Group requires `role="radiogroup"` and `aria-labelledby`

#### Toggle / Switch
States: Off, On, Off-Disabled, On-Disabled
Specs:
- 48×28px (standard size)
- Must display a visible label (not rely on color alone)
- Accessible via keyboard Space key

#### Badge / Tag
Variants: Solid, Outline, Subtle
Colors: brand, success, warning, error, info, neutral
Sizes: sm, md
Specs:
- Dismissible variant with ✕ button (44px tap target for ✕)

#### Avatar
Variants: Image, Initials, Icon (fallback)
Sizes: xs (24), sm (32), md (40), lg (48), xl (64), 2xl (96)
Shapes: Circle, Square with radius
Group variant (overlapping avatars with count)

#### Icon
Source: Use design system icon library (do not introduce new icon packages)
Sizes: 16, 20, 24, 32px
All icons must have `aria-hidden="true"` if decorative; `aria-label` if semantic

#### Spinner / Loading
Variants: Circular, Linear (progress bar)
Sizes: sm (16px), md (24px), lg (32px)
Must include `role="status"` and visually-hidden "Loading..." text

#### Divider
Variants: Horizontal, Vertical
Optional label (centered text divider)

---

### Molecules

#### Form Field
Structure: Label → Input → Helper text / Error message
Spec:
- Label is always visible (never use placeholder as the only label)
- Required indicator: asterisk (*) with `aria-required="true"` on input
- Error message replaces helper text; has `role="alert"` or `aria-describedby`

#### Search Bar
Structure: Search icon → Input → Clear button (when filled) → Optional submit button
Spec:
- `role="search"` on wrapper
- `type="search"` on input
- Clear button appears only when input has value

#### Card
Variants: Default, Clickable (entire card is interactive), With actions
Spec:
- If entire card is a link: single `<a>` wrapping, no nested interactive elements
- If card has multiple actions: individual buttons/links (not wrapping anchor)
- Min touch target for action buttons: 44×44px

#### Toast / Notification
Variants: Success, Warning, Error, Info
Spec:
- Position: top-center (mobile), bottom-right (desktop)
- Auto-dismiss after 4s for success/info; persistent for error/warning
- Manual dismiss button always present
- `role="alert"` for errors; `role="status"` for success
- Stack multiple toasts vertically

#### Tooltip
Spec:
- Appears on hover (200ms delay) and focus
- Disappears on mouse out and Escape key
- Never on touch-only interactive elements (use alternative)
- Max width: 240px
- `role="tooltip"` and `aria-describedby` on trigger

#### Modal / Dialog
Spec:
- `role="dialog"` and `aria-modal="true"`
- `aria-labelledby` pointing to modal heading
- Focus traps inside when open
- First focus: first interactive element or close button
- Closes on: Close button, Escape key, backdrop click (if non-critical)
- Focus returns to trigger element on close
- Scroll lock on body when open

#### Dropdown Menu
Spec:
- `role="menu"`, items have `role="menuitem"`
- Opens on click (not hover)
- Arrow keys navigate items; Enter selects; Escape closes
- First item focused on open
- Closes on selection, Escape, outside click

---

### Organisms

#### Navigation Bar
Variants: Top nav (web), Bottom nav (mobile), Sidebar (desktop)
Required elements: Logo/brand, primary nav items, utility actions (auth, settings)
States: Active nav item clearly distinguished
Spec:
- Mobile: hamburger menu or bottom navigation
- Active item: visual treatment beyond color alone
- Skip-to-main-content link as first focusable element

#### Form
Variants: Single-column, Two-column, Multi-step
Spec:
- One logical group per section with `<fieldset>` + `<legend>`
- Submit placed at end (bottom-right for single column)
- Inline validation (on blur, not on submit)
- Error summary at top if multiple errors exist on submit
- Disable submit during async submission (show loading state)
- Always confirm successful submission

#### Data Table
Variants: Basic, Sortable, Selectable (with checkboxes), With actions
Spec:
- `<table>` with `<thead>`, `<tbody>`
- `scope="col"` on all `<th>` elements
- Sort direction: arrow indicator; `aria-sort="ascending|descending"`
- Row selection: checkbox column; `aria-selected` on selected rows
- Empty state: dedicated empty message in a full-span row
- Loading state: skeleton rows

#### Hero Section
Variants: Center-aligned, Left-aligned, With image/media
Required: Headline, subheadline, CTA, optional media
Spec:
- H1 used for headline (only one per page)
- CTA is a prominent primary button

---

## Responsive Component Behavior

For each component, define behavior at mobile breakpoint:

| Component | Desktop | Mobile |
|-----------|---------|--------|
| Navigation | Top horizontal nav | Bottom tab bar or hamburger menu |
| Data table | Full table | Horizontally scrollable or card list |
| Modal | Centered dialog (max 600px) | Full-screen sheet from bottom |
| Sidebar | Persistent column | Dismissible overlay |
| Form | Two-column possible | Single column always |
| Card grid | 3–4 column | 1–2 column |

---

## Accessibility Component Patterns

Reference [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/patterns/) for any custom component.

| Component | ARIA Pattern |
|-----------|-------------|
| Custom Select | Listbox pattern |
| Tabs | Tabs pattern |
| Accordion | Disclosure pattern |
| Carousel | Carousel pattern |
| Tree view | Tree View pattern |
| Date picker | Dialog (modal) + Grid pattern |
| Combobox | Combobox pattern |

Every new custom component must include keyboard interaction specification before it is considered complete for handoff.
