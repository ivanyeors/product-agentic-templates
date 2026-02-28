# Product Design Phase — Human Review Gate Checklist

Use this checklist before approving the transition from Product Design → Frontend Design.

---

## Information Architecture
- [ ] Site map covers all P0 and P1 features from the PRD
- [ ] Navigation model is appropriate for the platform (web / mobile)
- [ ] Maximum 3 levels of depth for primary content
- [ ] Every page/screen has a clear purpose and unique URL (if web)
- [ ] Utility pages (auth, settings, help) are accounted for
- [ ] URL structure is consistent and meaningful

## User Flows
- [ ] A user flow exists for every P0 user story in the PRD
- [ ] Every flow has a defined entry point and success state
- [ ] All decision nodes have Yes/No paths documented
- [ ] Error states are defined for all flows (not just happy paths)
- [ ] Empty states are defined for all data-dependent screens
- [ ] No dead ends — every error state has a recovery path

## Wireframes
- [ ] Wireframes exist for every screen in the P0 flows
- [ ] Wireframes are lo-fi or mid-fi (no visual design decisions embedded)
- [ ] All content zones are labeled (header, primary, actions, footer)
- [ ] All interactive components are annotated with behavior
- [ ] Loading, empty, and error states are specified for each screen
- [ ] Content rules are documented (truncation limits, character counts, etc.)

## Interactions
- [ ] Transition types defined for all primary navigations
- [ ] Form validation behavior specified (when, how, what messages)
- [ ] Modal/dialog behavior specified (open, close, focus trap)
- [ ] Loading state behavior specified (skeleton vs spinner)
- [ ] Toast/notification behavior specified
- [ ] Motion principles defined and `prefers-reduced-motion` is addressed

## Accessibility
- [ ] Focus order defined for every screen
- [ ] Minimum 44×44px touch targets respected in layout
- [ ] Color-only information has been avoided (plan for icons + text)
- [ ] ARIA requirements flagged for all custom interactive components
- [ ] Keyboard navigation path is documented

## Prototype (if applicable)
- [ ] Prototype brief is complete
- [ ] All flows for testing are listed
- [ ] Data states needed are specified
- [ ] Usability test tasks are written (if testing planned)

## Cross-Phase Alignment
- [ ] All P0 user stories from the PRD have corresponding designs
- [ ] Personas are respected in design decisions
- [ ] Journey map pain points are addressed in the flows
- [ ] No new features added that aren't in the PRD without stakeholder approval

---

## Gate Decision

**Reviewer:** ______________________
**Date:** ______________________

- [ ] **APPROVED** — All critical items checked. Proceed to Frontend Design.
- [ ] **CONDITIONALLY APPROVED** — Proceed with these open items tracked: [list]
- [ ] **REVISE** — Return to agent with specific feedback: [feedback]

**Notes:**
[Space for reviewer notes]
