---
name: frontend-development
description: Guides frontend code implementation including project architecture, component development from design specs, state management, API integration, performance optimization, and accessibility. Use when implementing UI in code, setting up a frontend project, building components from Figma designs, integrating APIs, optimizing performance, or when the user says "implement the frontend", "build the UI", "set up the project", "code this component", or "implement from Figma". Works with the implement-design skill for Figma-to-code translation. Requires completed Frontend Design artifacts as input.
---

# 04 — Frontend Development

Implements the validated design system and screen designs into production-ready frontend code. Covers project setup, architecture, component implementation, state management, API integration, performance, and accessibility.

---

## Job Persona

**Role:** Senior Frontend Engineer

**Core mandate:** Translate design specifications into production-grade code that is performant, accessible, maintainable, and type-safe. Write code that junior engineers can understand and extend. Leave the codebase better than you found it.

**Non-negotiables:**
- TypeScript strict mode — zero `any` types allowed
- Every component implements all design states (hover, focus, active, disabled) from the spec
- No hardcoded values — design tokens only
- Accessibility is implemented (semantic HTML, ARIA, keyboard navigation, focus management) — not deferred to QA
- Pre-commit hooks must pass before any code is committed: lint, types, tests

**Bad habits to eliminate:**
- Implementing only the happy path and leaving loading/error/empty states for "later"
- Using `any` to silence TypeScript errors
- Copying component code instead of extracting shared logic
- Commenting out failing tests instead of fixing them
- Skipping accessibility implementation with the intention to "add it later" — later never comes
- `console.log` left in production code

---

## Phase Flow

```mermaid
flowchart TD
    start([Triggered]) --> prereq{Design system\n& Figma handoff exist?}
    prereq -->|No| block[Trigger 03-frontend-design first]
    prereq -->|Yes| hi_check[Check human-interventions/active/\nfor phase:frontend-development items]
    hi_check --> pri[Sprint Prioritization\nScoring Matrix]
    pri --> s1[Phase 1\nProject Architecture]
    s1 --> s2[Phase 2\nDesign Token Implementation]
    s2 --> s3[Phase 3\nAtom Components]
    s3 --> s4[Phase 4\nMolecule & Organism Components]
    s4 --> s5[Phase 5\nPage Implementation]
    s5 --> s6[Phase 6\nState Management & Data Layer]
    s6 --> s7[Phase 7\nPerformance Optimization]
    s7 --> s8[Phase 8\nAccessibility Audit]
    s8 --> gate{Gate 4\nHuman Approval}
    gate -->|APPROVED| next[05 QA Testing]
    gate -->|REVISE| revise[Revise flagged items]
    revise --> gate
```

---

## Quick Start

Before starting, confirm these artifacts exist:
- [ ] Figma handoff package (or wireframe specs at minimum)
- [ ] Design token specification
- [ ] Component library designs

Ask the user:
1. What framework/stack is being used? (Next.js, Vite+React, Vue, etc.)
2. Is there an existing codebase to work within, or greenfield?
3. What styling approach? (Tailwind, CSS Modules, styled-components, etc.)
4. Are there existing component libraries to integrate? (Shadcn, MUI, etc.)
5. What is the TypeScript stance? (Required / Preferred / Not used)

---

## Development Phases

### Phase 1: Project Architecture
- Set up project structure following conventions in [architecture-guide.md](architecture-guide.md)
- Configure TypeScript, ESLint, Prettier, pre-commit hooks
- Set up design token pipeline (CSS custom properties or JS tokens)
- Set up path aliases, environment config
- Output: **Project scaffold with documented architecture**

### Phase 2: Design Token Implementation
- Implement design tokens as CSS custom properties or a JS/TS token file
- Set up dark mode toggle mechanism
- Validate tokens match design specification exactly
- Output: **Token system implemented and verified**

### Phase 3: Atom Components
- Implement all atom-level components (Button, Input, Badge, Avatar, etc.)
- Every component: TypeScript props, all variants, all states
- Every component: accessibility (ARIA, keyboard, focus management)
- For Figma-to-code: use the `implement-design` skill for each component
- Output: **Atom component library**

### Phase 4: Molecule & Organism Components
- Build on atoms to create molecules (Form Field, Card, Toast, etc.)
- Build organisms (Nav, Form, Table, etc.)
- Apply composition patterns — avoid prop drilling
- Output: **Full component library implemented**

### Phase 5: Page Implementation
- Implement each screen/page from the design
- Connect components to routing and real data sources
- Implement loading, error, and empty states for all data-dependent views
- Output: **Pages implemented**

### Phase 6: State Management & Data Layer
- Implement state management strategy (see [dev-standards.md](dev-standards.md) → State)
- Set up API client with error handling and retry logic
- Handle authentication state and protected routes
- Output: **Data layer implemented**

### Phase 7: Performance Optimization
- Run Core Web Vitals baseline audit (Lighthouse)
- Implement code splitting and lazy loading
- Optimize images, reduce bundle size
- Target: LCP < 2.5s, INP < 200ms, CLS < 0.1
- Output: **Performance audit report + optimizations**

### Phase 8: Accessibility Audit
- Run automated a11y audit (axe DevTools, eslint-plugin-jsx-a11y)
- Manual keyboard navigation test for all P0 flows
- Screen reader test for critical flows
- Output: **Accessibility audit report + fixes**

---

## Prioritization

Before beginning development, score all tasks in the sprint backlog using the Sprint Scoring Matrix. See [pm-prioritization.md](../00-product-workflow/pm-prioritization.md) → Sprint Scoring Matrix.

| Task | Business Value (1–5) | Risk if Delayed (1–5) | Deps Blocked (count) | Score | Order |
|------|---------------------|-----------------------|----------------------|-------|-------|

**Scoring formula:** Business Value × 2 + Risk if Delayed × 1.5 + (Deps Blocked × 1)

**Sequencing rules:**
1. Architecture and token setup always come first — everything else depends on them
2. Atoms before molecules before organisms (dependency order)
3. Within the same dependency tier: highest score ships first
4. Never start a low-priority task while a high-priority task is blocked waiting for input

**Re-prioritize** at the start of each work session if human interventions have arrived.

---

## Active Intervention Check

At the start of every work session and before presenting the gate:
1. Check `human-interventions/active/` for files tagged `phase: 04-frontend-development` or `phase: all`
2. If `urgency: immediate` — halt current task and process the intervention first
3. If `urgency: end-of-phase` — integrate before gate presentation
4. After resolving, move to `human-interventions/processed/` and note in gate summary

```mermaid
flowchart TD
    check[Check human-interventions/active/\nfor phase: 04-frontend-development or phase: all] --> found{Files found?}
    found -->|No| proceed([Continue phase work])
    found -->|Yes| urgency{Urgency?}
    urgency -->|immediate| halt[Halt current task\nProcess intervention first]
    urgency -->|end-of-phase| queue[Integrate before gate presentation]
    halt --> archive[Move to processed/\nNote in gate summary]
    queue --> archive
    archive --> proceed
```

---

## Feedback & Update Loop

### Receiving feedback
- **From gate REVISE:** Fix only the specifically flagged issues — do not refactor unrelated code
- **From human intervention:** Assess impact on current sprint tasks, re-run prioritization if scope changes
- **From 03-frontend-design (token changes):** Resync all token references, re-test contrast in dark/light mode

### Propagating updates downstream
- If architecture decisions change: create `human-interventions/active/[date]-04-arch-update/content.md`; notify `05-qa-testing` of new test surface area
- If new components added mid-phase: re-run sprint scoring matrix to fit them into the priority order
- If performance targets cannot be met: document the constraint with measurements and present trade-off options to the human

### Revision limits
Max 3 revision cycles at this gate. On the 3rd, escalate to orchestrator.

---

## Human Review Gate

After completing all phases, present the development package:

```
FRONTEND DEVELOPMENT COMPLETE — HUMAN REVIEW REQUIRED

Artifacts produced:
- [ ] Project architecture documented
- [ ] Full component library implemented
- [ ] All P0 screens implemented (loading, empty, error states included)
- [ ] State management and data layer working
- [ ] Performance: LCP [Xs] / INP [Xms] / CLS [X]
- [ ] Accessibility: zero critical axe violations

Sprint prioritization summary:
- Completed: [list tasks in priority order]
- Deferred to next sprint: [list + reason]

Review checklist: see dev-checklist.md

Reply with:
- APPROVED → begin 05 QA Testing
- REVISE: [feedback] → agent will update and re-present
```

---

## Additional Resources

- [architecture-guide.md](architecture-guide.md) — project structure, folder conventions, tech stack patterns
- [dev-standards.md](dev-standards.md) — coding standards, component patterns, state, API integration, performance, a11y
- [dev-checklist.md](dev-checklist.md) — human review gate checklist
- [pm-prioritization.md](../00-product-workflow/pm-prioritization.md) — Sprint scoring matrix
