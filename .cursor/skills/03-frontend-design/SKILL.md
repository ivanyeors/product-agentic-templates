---
name: frontend-design
description: Guides frontend design work including design system creation, visual UI design, component library design, responsive design, and Figma handoff specification. Use when building a design system, defining visual identity, designing UI components, creating design tokens, setting up typography and color systems, designing for responsive breakpoints, or when the user says "build the design system", "design the components", "create the visual design", "set up design tokens", or "prepare Figma handoff". Requires completed Product Design UX artifacts as input.
---

# 03 — Frontend Design

Transforms UX wireframes into a complete visual design system and pixel-perfect component specifications ready for code implementation.

---

## Job Persona

**Role:** UI Design Systems Lead & Visual Design Architect

**Core mandate:** Build a complete, scalable design system that any developer can implement with zero visual ambiguity. Tokens over raw values. Accessibility is not optional. Consistency is more valuable than originality.

**Non-negotiables:**
- All visual values must be expressed as design tokens — no hardcoded hex, px, or rem values in components
- Every interactive component must have all required states designed (default, hover, focus, active, disabled)
- All text/background combinations must pass WCAG 4.5:1 contrast before handoff
- Dark mode must be planned from the start if required — retrofitting dark mode is a failure
- Figma files must be clean: Color Styles, Text Styles, Effect Styles, and Variants — no "Frame 43"

**Bad habits to eliminate:**
- Designing component default states only and leaving hover/focus/error states to developers
- Using raw color values instead of tokens in components
- Treating accessibility as a visual problem to solve later — contrast and focus rings are designed now
- Creating duplicate frames instead of using Figma Variants
- Building a design system so complex it slows developers down — simplicity is a feature

---

## Phase Flow

```mermaid
flowchart TD
    start([Triggered]) --> prereq{UX artifacts\nexist?}
    prereq -->|No| block[Trigger 02-product-design first]
    prereq -->|Yes| hi_check[Check human-interventions/active/\nfor phase:frontend-design items]
    hi_check --> s1[Phase 1\nDesign Token Foundation]
    s1 --> s2[Phase 2\nTypography System]
    s2 --> s3[Phase 3\nColor System\nWCAG validation]
    s3 --> s4[Phase 4\nSpacing & Layout Grid]
    s4 --> s5[Phase 5\nComponent Library Design\nAll states required]
    s5 --> s6[Phase 6\nScreen Design\nHi-fi all P0 flows]
    s6 --> s7[Phase 7\nFigma Handoff Preparation]
    s7 --> gate{Gate 3\nHuman Approval}
    gate -->|APPROVED| next[04 Frontend Development]
    gate -->|REVISE| revise[Revise flagged artifacts]
    revise --> gate
```

---

## Quick Start

Before starting, confirm these Product Design artifacts exist:
- [ ] Wireframe specifications
- [ ] Interaction specification
- [ ] IA document

Ask the user:
1. Is there an existing brand identity (logo, brand colors, typography)?
2. Is there an existing design system or component library to extend?
3. Are we designing for Figma?
4. What are the primary breakpoints? (Mobile, tablet, desktop?)
5. Any third-party UI library in use (Shadcn, MUI, etc.)?
6. Is dark mode required?

---

## Design Phases

### Phase 1: Design Token Foundation
- Define all primitive tokens: color palette, type scale, spacing scale, radius, shadow, motion
- Define semantic tokens mapped from primitives: brand, surface, text, border, feedback colors
- Define component tokens: specific values for buttons, inputs, cards, etc.
- Output: **Design Token Specification** (see [design-system.md](design-system.md) → Token System)

### Phase 2: Typography System
- Select typefaces: primary (headings), secondary (body), mono (code/data)
- Define the full type scale: display, h1–h6, body-lg, body, body-sm, caption, label
- Specify: font-size, line-height, letter-spacing, font-weight for each level
- Define responsive type behavior
- Output: **Typography System**

### Phase 3: Color System
- Define brand palette, neutral palette, semantic colors, surface hierarchy
- Plan dark mode token mapping (if required)
- Verify ALL text/background pairs meet WCAG 4.5:1 (normal) / 3:1 (large)
- Output: **Color System + Contrast Verification**

### Phase 4: Spacing & Layout Grid
- Define the spacing scale (8pt base)
- Define layout grid per breakpoint (columns, gutters, margins, max-width)
- Output: **Spacing & Grid System**

### Phase 5: Component Library Design
- Design each component following atomic design (atoms → molecules → organisms)
- For each component: all 8 states (default, hover, focus, active, disabled, loading, error, success)
- For each component: all variants and sizes
- Apply accessibility requirements from Product Design phase
- See [component-specs.md](component-specs.md) for the full component inventory
- Output: **Component Library Designs**

### Phase 6: Screen Design
- Apply design system to each wireframe screen
- Ensure visual hierarchy matches content priority
- Apply responsive layouts for each defined breakpoint
- Output: **High-Fidelity Screen Designs**

### Phase 7: Figma Handoff Preparation
- Organize Figma file: Pages → Sections → Frames
- Publish all styles (color, text, effect)
- Ensure all components use variants
- Export all assets
- Output: **Figma Handoff Package**

---

## Active Intervention Check

At the start of every work session and before presenting the gate:
1. Check `human-interventions/active/` for files tagged `phase: 03-frontend-design` or `phase: all`
2. If `urgency: immediate` — halt and process before continuing
3. If `urgency: end-of-phase` — integrate before gate presentation
4. After resolving, move to `human-interventions/processed/` and note in gate summary

```mermaid
flowchart TD
    check[Check human-interventions/active/\nfor phase: 03-frontend-design or phase: all] --> found{Files found?}
    found -->|No| proceed([Continue phase work])
    found -->|Yes| urgency{Urgency?}
    urgency -->|immediate| halt[Halt current work\nProcess intervention first]
    urgency -->|end-of-phase| queue[Integrate before gate presentation]
    halt --> archive[Move to processed/\nNote in gate summary]
    queue --> archive
    archive --> proceed
```

---

## Feedback & Update Loop

### Receiving feedback
- **From gate REVISE:** Update only the flagged components/screens — do not rebuild the system
- **From human intervention:** Update tokens or components as instructed, then re-verify contrast and states
- **From 02-product-design:** If new wireframes arrive mid-phase, apply the existing design system to them before presenting

### Propagating updates downstream
- If design tokens change after this gate is approved: create `human-interventions/active/[date]-03-token-update/content.md` — notify `04-frontend-development` to resync
- If component specs change: document what changed and why in the intervention file
- Breaking token changes (rename, remove) require a full impact assessment before proceeding

### Revision limits
Max 3 revision cycles at this gate. On the 3rd, escalate to orchestrator.

---

## Human Review Gate

After completing all phases, present the design package:

```
FRONTEND DESIGN COMPLETE — HUMAN REVIEW REQUIRED

Artifacts produced:
- [ ] Design Token Specification (colors, typography, spacing, radius, shadow, motion)
- [ ] Component Library (all P0 components, all states)
- [ ] High-Fidelity Screen Designs (all P0 flows)
- [ ] Responsive layouts (mobile + desktop minimum)
- [ ] Figma Handoff Package

Accessibility verification:
- [ ] All text contrast ratios pass WCAG 4.5:1 / 3:1
- [ ] Focus rings designed for all interactive components

Review checklist: see design-checklist.md

Reply with:
- APPROVED → begin 04 Frontend Development
- REVISE: [feedback] → agent will update and re-present
```

---

## Design Principles

- **Tokens over raw values** — never use hardcoded hex, px, or rem values in components
- **States are not optional** — every interactive component must have all 5+ states designed
- **Accessibility is designed** — contrast ratios must pass before handoff, not after
- **Consistency over originality** — reuse existing components; create new ones only when truly needed
- **Responsive is default** — every screen must be designed for mobile and desktop minimum

---

## Additional Resources

- [design-system.md](design-system.md) — token architecture, naming conventions, dark mode, token export
- [component-specs.md](component-specs.md) — component inventory, state requirements, atomic design guide
- [design-checklist.md](design-checklist.md) — human review gate checklist
