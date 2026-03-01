# Frontend Development Phase — Human Review Gate Checklist

Use this checklist before approving the transition from Frontend Development → QA Testing.

---

## Project Architecture
- [ ] Folder structure follows agreed conventions (documented in architecture-guide.md)
- [ ] TypeScript configured with strict mode
- [ ] ESLint + Prettier configured and passing
- [ ] Path aliases configured and used consistently
- [ ] Environment variables typed and accessed via config object (not raw process.env)
- [ ] Design tokens implemented as CSS custom properties
- [ ] Dark mode toggle implemented (if required)

## Component Library
- [ ] All P0 components implemented
- [ ] All components have TypeScript prop types defined
- [ ] All interactive components handle all required states (hover, focus, active, disabled)
- [ ] All components use design tokens (no hardcoded colors, spacing, or font values)
- [ ] No `any` types used in component props
- [ ] Components are accessible (semantic HTML, ARIA where needed)
- [ ] Focus rings are visible on all interactive elements (focus-visible pattern)

## Pages & Routing
- [ ] All P0 screens are implemented
- [ ] Loading states implemented for all data-dependent views
- [ ] Empty states implemented for all list/data views
- [ ] Error states implemented for all data-dependent views
- [ ] Protected routes configured correctly
- [ ] 404 and error pages implemented

## State & Data
- [ ] Server state managed with TanStack Query (or chosen tool)
- [ ] Global state implemented cleanly (no prop drilling > 2 levels)
- [ ] Form state uses React Hook Form + Zod validation
- [ ] API error handling covers 4xx (user errors) and 5xx (system errors) cases
- [ ] API retry logic configured for transient failures
- [ ] Authentication state correctly gates protected content

## Performance
- [ ] Lighthouse audit run and results documented
- [ ] LCP < 2.5s (or documented reason if not achievable)
- [ ] CLS < 0.1 (all images have explicit dimensions)
- [ ] No render-blocking resources
- [ ] Code splitting applied to route-level chunks
- [ ] Images optimized (next/image or responsive srcset + WebP)
- [ ] Bundle analyzed — no unexpected large dependencies
- [ ] Initial JS < 200KB gzipped (or documented exception)

## Accessibility
- [ ] Skip-to-main-content link implemented
- [ ] No axe DevTools violations on P0 screens
- [ ] Keyboard navigation tested for all critical flows
- [ ] All forms navigable and submittable without a mouse
- [ ] All modals/dialogs trap focus correctly
- [ ] Focus returns to trigger element when modal closes
- [ ] Dynamic content changes announced (aria-live or role="status/alert")
- [ ] All images have meaningful alt text (or alt="" if decorative)
- [ ] Color contrast passes on all screens

## Code Quality
- [ ] No TypeScript errors (zero `tsc --noEmit` errors)
- [ ] No ESLint errors (warnings documented if acceptable)
- [ ] No console.log statements in production code
- [ ] No commented-out code blocks
- [ ] All TODO comments have an owner and a ticket reference
- [ ] Pre-commit hooks configured and passing

---

## Gate Decision

**Reviewer:** ______________________
**Date:** ______________________

- [ ] **APPROVED** — All critical items checked. Proceed to QA Testing.
- [ ] **CONDITIONALLY APPROVED** — Proceed with these open items tracked: [list]
- [ ] **REVISE** — Return to agent with specific feedback: [feedback]

**Notes:**
[Space for reviewer notes]
