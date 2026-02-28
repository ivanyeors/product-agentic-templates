# Frontend Design Phase — Human Review Gate Checklist

Use this checklist before approving the transition from Frontend Design → Frontend Development.

---

## Design Token Foundation
- [ ] All primitive tokens defined (color, spacing, radius, shadow, motion)
- [ ] All semantic tokens mapped from primitives (text, surface, border, feedback)
- [ ] No raw values used in components (tokens only)
- [ ] Naming convention is consistent throughout (category-property-variant-state)
- [ ] Dark mode tokens defined (if required)

## Typography System
- [ ] Complete type scale defined (display through caption)
- [ ] Line heights specified for every type level
- [ ] Font weights specified and available in chosen typeface
- [ ] Responsive typography behavior defined (fluid or breakpoint steps)
- [ ] Mono font defined for code/data contexts

## Color System
- [ ] Brand palette has 10 steps defined
- [ ] Neutral palette has 11 steps defined
- [ ] Semantic color mapping table complete
- [ ] Feedback colors (success, warning, error, info) with light/dark variants
- [ ] All text/background combinations pass WCAG 4.5:1 (normal text)
- [ ] All large text passes WCAG 3:1
- [ ] All UI component colors pass WCAG 3:1
- [ ] Dark mode verified (if applicable)

## Spacing & Grid
- [ ] Spacing scale defined (8pt base)
- [ ] Grid columns, gutters, and margins defined per breakpoint
- [ ] Max-width containers specified
- [ ] All breakpoints defined with tokens

## Component Library
- [ ] All components required for P0 flows are designed
- [ ] Every interactive component has all required states (default, hover, focus, active, disabled)
- [ ] Loading states designed for async-triggering components
- [ ] Error states designed for form components
- [ ] Atom → Molecule → Organism hierarchy followed
- [ ] No duplicate components (variants used instead of separate frames)
- [ ] All components have responsive behavior specified

## Screen Designs
- [ ] High-fidelity screens completed for all P0 wireframes
- [ ] Mobile designs completed for all P0 screens (min)
- [ ] Desktop designs completed for all P0 screens (min)
- [ ] Tablet designs completed (if in scope)
- [ ] Visual hierarchy matches intended content priority from wireframes
- [ ] All interaction states visible in flows (hover, active, error, empty, loading)

## Accessibility in Design
- [ ] Color contrast verified on every screen
- [ ] No information conveyed by color alone
- [ ] Focus rings visible and styled (not browser default)
- [ ] Touch targets ≥ 44×44px for all interactive elements
- [ ] ARIA patterns specified for all custom interactive components
- [ ] Keyboard focus order documented

## Figma Handoff
- [ ] All colors defined as Color Styles
- [ ] All text styles defined as Text Styles
- [ ] All shadows defined as Effect Styles
- [ ] All components use Variants, not separate frames
- [ ] Auto Layout applied to resizable components
- [ ] Layer naming is clean (no "Frame 43" or "Rectangle 12")
- [ ] All exportable assets marked with correct format
- [ ] Figma file organized by Pages per flow
- [ ] Design token file is published and linked

---

## Gate Decision

**Reviewer:** ______________________
**Date:** ______________________

- [ ] **APPROVED** — All critical items checked. Proceed to Frontend Development.
- [ ] **CONDITIONALLY APPROVED** — Proceed with these open items tracked: [list]
- [ ] **REVISE** — Return to agent with specific feedback: [feedback]

**Notes:**
[Space for reviewer notes]
