# Accessibility in UX Design

Reference for accessibility planning in Product Design. See [ux-process.md](ux-process.md) for orchestrator.

---

## Focus Order

Every screen must have a defined tab order:
1. Skip to main content link (first focusable element)
2. Navigation
3. Main content, top to bottom, left to right
4. Actions and controls in reading order

---

## Touch / Click Targets

- Minimum 44×44px touch target
- 8px minimum spacing between adjacent targets

---

## Color and Contrast

- Do not rely on color alone to convey information
- Plan for icons + text labels for status indicators
- Note contrast requirements: 4.5:1 for normal text, 3:1 for large text

---

## ARIA Planning

Flag in wireframe annotations:
- Landmark regions: `<main>`, `<nav>`, `<header>`, `<footer>`
- Interactive components needing ARIA: custom dropdowns, tabs, modals, carousels
- Dynamic content needing live regions

---

## Keyboard Navigation Traps

- Modals must trap focus when open
- Focus must return to trigger element when modal closes
- All actions accessible without a pointer device
