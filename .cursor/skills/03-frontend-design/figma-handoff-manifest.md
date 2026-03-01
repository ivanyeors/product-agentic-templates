# Figma Handoff Manifest — Template

Use this manifest for Route A (Figma-based) handoffs from Phase 03 → Phase 05. Inspired by physical product design's Bill of Materials (BOM) and engineering drawings with tolerances.

The manifest is the structured contract between design and development. It eliminates ambiguity by mapping every Figma element to its code implementation.

---

## Template

```markdown
# Figma Handoff Manifest — [Product Name]
**Figma URL:** [URL]
**Date:** [Date]
**Token export:** `styles/tokens.css` (CSS custom properties)
**Design system:** [Library name, e.g., shadcn/ui + custom]

## Figma File Structure
| Page | Contents |
|------|----------|
| Cover | Project name, version, last updated |
| Foundation | Color swatches, type specimens, spacing |
| Components | All components, all variants |
| [Flow 1 Name] | Screens for [flow], desktop + mobile |
| [Flow 2 Name] | Screens for [flow], desktop + mobile |
| Handoff Notes | Annotations, asset exports |

## Screen-to-Frame Mapping
| Wireframe ID | Screen Name | Figma Page | Frame Name | Breakpoint |
|-------------|-------------|------------|------------|------------|
| WF-001 | [Name] | [Page] | [Frame] | Desktop |
| WF-001 | [Name] | [Page] | [Frame]-Mobile | Mobile |
| WF-002 | [Name] | [Page] | [Frame] | Desktop |
| WF-002 | [Name] | [Page] | [Frame]-Mobile | Mobile |

## Component BOM (Bill of Materials)

Every UI component used in the design must be listed. Phase 05 uses this table to know exactly which code component to use for each design element.

| Component | Figma Component | Figma Variant(s) | Code Library | Code Component | Props / Config | Custom? |
|-----------|----------------|-------------------|-------------|----------------|----------------|---------|
| Primary Button | Button | Primary/md | [library] | Button | variant="default" size="default" | No |
| Secondary Button | Button | Secondary/md | [library] | Button | variant="outline" size="default" | No |
| Text Input | Input | Default/Error/Disabled | [library] | Input | — | No |
| Data Table | Table | Sortable | [library] | Table + DataTable | columns config | No |
| [Custom] | [Name] | [Variants] | NEW | [Name] | [Props] | Yes |

### Custom Components (not in library)
| Component | Why custom? | Minimum implementation |
|-----------|-------------|----------------------|
| [Name] | [Why an existing library component cannot be used] | [What needs to be built] |

## Token-to-CSS Mapping
| Figma Style | CSS Variable | Value (Light) | Value (Dark) |
|-------------|-------------|---------------|--------------|
| Brand/Primary | `--color-brand-primary` | #3B82F6 | #60A5FA |
| Text/Primary | `--color-text-primary` | #111827 | #F9FAFB |
| Text/Secondary | `--color-text-secondary` | #4B5563 | #9CA3AF |
| Surface/Default | `--color-surface-default` | #FFFFFF | #030712 |
| Body | `--text-body` | 16px/1.6/400 Inter | — |
| H1 | `--text-h1` | 36px/1.2/700 Inter | — |

## Tolerances (Acceptable Responsive Ranges)

Do not expect pixel-perfect implementation — define the acceptable range for each responsive element. Phase 05 uses this table to validate implementation correctness.

| Element | Mobile (<640px) | Tablet (640-1024) | Desktop (>1024) | Notes |
|---------|----------------|-------------------|-----------------|-------|
| Card width | 100% (1-col) | 50% (2-col) | 33% (3-col) | Min 280px |
| Sidebar | Hidden (sheet) | Hidden (sheet) | 240px fixed | Collapsible on desktop optional |
| Hero text | text-h3 | text-h2 | text-display-lg | Fluid or step-based |
| Table | Card list view | Horizontal scroll | Full table | Mobile card includes key columns only |
| Modal | Full-screen sheet | Centered 480px max | Centered 600px max | |
| Nav | Bottom tab bar | Bottom tab bar | Top horizontal | |

## Asset Export Inventory
| Asset | Format | Figma Location | Size | Notes |
|-------|--------|---------------|------|-------|
| Logo | SVG | Foundation / Logo | — | Export at 1x |
| Logo (dark) | SVG | Foundation / Logo-Dark | — | If dark mode |
| [icon-name] | SVG | Components / Icons / [name] | 24x24 | |
| [hero-image] | WebP | [Flow] / [Frame] / hero | 1200x600 | Compress to < 100KB |

## First Article Inspection Protocol

When Phase 05 implements the first screen, inspect systematically against this manifest:
- [ ] Every component in BOM is implemented with the correct library component and props
- [ ] All token values match CSS variable definitions (check with browser dev tools)
- [ ] Responsive behavior matches Tolerances table at all breakpoints
- [ ] All assets render at correct size, format, and quality
- [ ] Custom components match Figma within 2px tolerance for spacing and sizing
- [ ] Focus rings visible on all interactive components
- [ ] Color contrast passes WCAG 4.5:1 in both light and dark mode (if applicable)
- [ ] Loading, empty, and error states implemented per wireframe spec

Document deviations with rationale — not all deviations are bugs; some are intentional trade-offs.
```

---

## How to Fill This Manifest

1. **During Phase 7 (Figma Handoff Preparation)** — fill in all sections
2. **Screen-to-Frame Mapping** — verify every P0 wireframe (WF-xxx) has a corresponding Figma frame listed
3. **Component BOM** — walk through every Figma component used in the designs; look up the code library equivalent
4. **Token-to-CSS** — export from Figma Color Styles, Text Styles, Effect Styles; map to CSS variable names
5. **Tolerances** — define responsive ranges for every element that changes across breakpoints
6. **Assets** — mark every exportable asset with format and size

Phase 05 will use this manifest as the primary reference for implementation — not the Figma file directly. The manifest IS the spec.
