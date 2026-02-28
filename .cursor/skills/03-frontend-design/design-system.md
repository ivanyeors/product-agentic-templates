# Design System Guide — Frontend Design

## Token Architecture

Design tokens form the single source of truth for all visual decisions. Use a three-tier structure:

```
Primitive Tokens → Semantic Tokens → Component Tokens
(raw values)        (meaning)          (specific use)
```

### Primitive Tokens
Raw values with no meaning. Never use directly in components.

```
color-blue-500: #3B82F6
color-blue-600: #2563EB
spacing-4: 16px
radius-md: 8px
```

### Semantic Tokens
Map primitives to intent. These are what components use.

```
color-brand-primary: {color-blue-500}
color-brand-primary-hover: {color-blue-600}
color-text-primary: {color-neutral-900}
color-text-secondary: {color-neutral-600}
color-surface-default: {color-neutral-50}
color-feedback-error: {color-red-600}
spacing-component-padding-sm: {spacing-3}  → 12px
spacing-component-padding-md: {spacing-4}  → 16px
```

### Component Tokens
Specific to a component. Override semantic tokens when component-specific values are needed.

```
button-primary-background: {color-brand-primary}
button-primary-background-hover: {color-brand-primary-hover}
button-border-radius: {radius-md}
input-border-color: {color-border-default}
input-border-color-focus: {color-brand-primary}
```

---

## Token Naming Convention

Pattern: `{category}-{property}-{variant}-{state}`

```
color-text-primary           ✅
color-text-primary-disabled  ✅
spacing-layout-section       ✅
button-background-hover      ✅
color-blue                   ❌ (no category)
blueHover                    ❌ (camelCase, no structure)
```

---

## Color System

### Brand Palette
Define 10 steps per brand color (50–900 or 100–950):

| Token | Example Use |
|-------|-------------|
| `color-brand-50` | Light tint backgrounds |
| `color-brand-100` | Hover backgrounds |
| `color-brand-500` | Primary interactive elements |
| `color-brand-600` | Hover state of primary |
| `color-brand-700` | Active/pressed state |
| `color-brand-900` | Dark text on light |

### Neutral Palette
11 steps: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950

### Semantic Color Mapping

| Semantic Token | Light Mode | Dark Mode |
|---------------|------------|-----------|
| `color-text-primary` | neutral-900 | neutral-50 |
| `color-text-secondary` | neutral-600 | neutral-400 |
| `color-text-disabled` | neutral-400 | neutral-600 |
| `color-surface-default` | white | neutral-950 |
| `color-surface-elevated` | neutral-50 | neutral-900 |
| `color-border-default` | neutral-200 | neutral-800 |
| `color-border-focused` | brand-500 | brand-400 |
| `color-feedback-success` | green-600 | green-400 |
| `color-feedback-warning` | amber-600 | amber-400 |
| `color-feedback-error` | red-600 | red-400 |
| `color-feedback-info` | blue-600 | blue-400 |

### Contrast Requirements (WCAG 2.1 AA)
| Pair | Requirement | Check |
|------|-------------|-------|
| Body text on background | ≥ 4.5:1 | |
| Large text (≥18pt) | ≥ 3:1 | |
| UI components & graphics | ≥ 3:1 | |
| Disabled states | Exempt | |

---

## Typography System

### Typeface Selection
- **Heading font:** [Specify or use Inter/system-ui as default]
- **Body font:** [Specify or use Inter/system-ui as default]
- **Mono font:** JetBrains Mono / Fira Code (for code blocks, data tables)

### Type Scale

| Token | Size | Line Height | Weight | Use |
|-------|------|-------------|--------|-----|
| `text-display-2xl` | 72px | 1.1 | 700 | Hero headlines |
| `text-display-xl` | 60px | 1.1 | 700 | Section headlines |
| `text-display-lg` | 48px | 1.1 | 700 | Page headlines |
| `text-h1` | 36px | 1.2 | 700 | H1 |
| `text-h2` | 30px | 1.25 | 600 | H2 |
| `text-h3` | 24px | 1.3 | 600 | H3 |
| `text-h4` | 20px | 1.35 | 600 | H4 |
| `text-h5` | 18px | 1.4 | 600 | H5 |
| `text-h6` | 16px | 1.5 | 600 | H6 |
| `text-body-lg` | 18px | 1.6 | 400 | Lead body text |
| `text-body` | 16px | 1.6 | 400 | Default body |
| `text-body-sm` | 14px | 1.5 | 400 | Secondary body |
| `text-caption` | 12px | 1.4 | 400 | Captions, metadata |
| `text-label-lg` | 14px | 1.25 | 500 | Button labels, form labels |
| `text-label` | 12px | 1.25 | 500 | Small labels |
| `text-code` | 14px | 1.6 | 400 | Code blocks |

### Responsive Typography
Option A — Fixed steps at breakpoints:
```css
/* Mobile */
h1: text-h2
/* Tablet */
h1: text-h1
/* Desktop */
h1: text-display-lg
```

Option B — Fluid type (CSS clamp):
```css
h1: clamp(24px, 4vw, 48px)
```

---

## Spacing System

Base unit: 4px. All spacing is multiples of 4px.

| Token | Value | Use |
|-------|-------|-----|
| `spacing-0.5` | 2px | Hairline separators |
| `spacing-1` | 4px | Tight padding, icon spacing |
| `spacing-2` | 8px | Component inner padding (sm) |
| `spacing-3` | 12px | Component inner padding (md) |
| `spacing-4` | 16px | Component inner padding (lg), section gaps |
| `spacing-5` | 20px | |
| `spacing-6` | 24px | Card padding, form field spacing |
| `spacing-8` | 32px | Section gaps, content spacing |
| `spacing-10` | 40px | |
| `spacing-12` | 48px | Large section gaps |
| `spacing-16` | 64px | Page section padding |
| `spacing-20` | 80px | |
| `spacing-24` | 96px | Large feature sections |
| `spacing-32` | 128px | Hero sections |

---

## Radius & Elevation

### Border Radius
| Token | Value | Use |
|-------|-------|-----|
| `radius-none` | 0 | No rounding |
| `radius-sm` | 4px | Small inputs, tags |
| `radius-md` | 8px | Buttons, cards |
| `radius-lg` | 12px | Modals, large cards |
| `radius-xl` | 16px | Sheets, large containers |
| `radius-2xl` | 24px | Feature cards |
| `radius-full` | 9999px | Pills, avatars |

### Shadows (Elevation)
| Token | Value | Use |
|-------|-------|-----|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `shadow-md` | `0 4px 6px rgba(0,0,0,0.07)` | Cards |
| `shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Dropdowns, popovers |
| `shadow-xl` | `0 20px 25px rgba(0,0,0,0.1)` | Modals |
| `shadow-2xl` | `0 25px 50px rgba(0,0,0,0.25)` | Full-screen overlays |

---

## Motion Tokens

| Token | Value | Use |
|-------|-------|-----|
| `duration-instant` | 0ms | Immediate state changes |
| `duration-fast` | 100ms | Micro feedback (button press) |
| `duration-normal` | 200ms | Standard transitions |
| `duration-slow` | 300ms | Complex transitions |
| `duration-slower` | 400ms | Page transitions |
| `ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | Standard easing |
| `ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Elements exiting |
| `ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Elements entering |
| `ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful spring |

Always provide a `prefers-reduced-motion` override that sets all durations to 0ms or 1ms.

---

## Layout Grid

### Breakpoints
| Token | Value | Description |
|-------|-------|-------------|
| `screen-xs` | 375px | Small mobile |
| `screen-sm` | 640px | Large mobile |
| `screen-md` | 768px | Tablet |
| `screen-lg` | 1024px | Desktop |
| `screen-xl` | 1280px | Wide desktop |
| `screen-2xl` | 1536px | Ultra-wide |

### Grid Config per Breakpoint
| Breakpoint | Columns | Gutter | Margin | Max Width |
|------------|---------|--------|--------|-----------|
| Mobile | 4 | 16px | 16px | — |
| Tablet | 8 | 24px | 32px | — |
| Desktop | 12 | 24px | 48px | 1280px |
| Wide | 12 | 32px | 80px | 1440px |

---

## Dark Mode

Use CSS custom properties with a `[data-theme="dark"]` or `.dark` class toggle.

```css
:root {
  --color-text-primary: #111827; /* neutral-900 */
  --color-surface-default: #ffffff;
}

[data-theme="dark"] {
  --color-text-primary: #f9fafb; /* neutral-50 */
  --color-surface-default: #030712; /* neutral-950 */
}
```

Always design for both modes from the start. Verify contrast in both modes.

---

## Figma File Organization

```
Figma File
├── 📄 Cover (project name, version, last updated)
├── 📄 Design Tokens (color styles, text styles, effect styles)
├── 📄 Foundation (color swatches, type specimens, spacing examples)
├── 📄 Components (all components, all variants)
├── 📄 [Flow 1 Name] (screens for this flow, desktop + mobile)
├── 📄 [Flow 2 Name]
└── 📄 Handoff Notes (annotations, asset exports)
```

### Required Figma Setup Before Handoff
- [ ] All colors defined as Color Styles
- [ ] All text styles defined as Text Styles
- [ ] All shadows defined as Effect Styles
- [ ] All components use Variants (not separate frames)
- [ ] Auto Layout applied to all resizable components
- [ ] Correct layer naming (no "Frame 43" or "Rectangle 12")
- [ ] Assets marked for export with correct format (SVG for icons, PNG/WebP for photos)
