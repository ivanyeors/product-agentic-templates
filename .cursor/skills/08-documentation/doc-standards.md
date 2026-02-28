# Documentation Standards — Phase 08

Writing rules for all documentation produced in Phase 08. Apply these to every document, regardless of audience. The goal is always the same: the reader finishes the document knowing exactly what they need to know, and nothing else.

---

## The Five Rules

Every document must follow all five. No exceptions.

| Rule | What it means |
|------|--------------|
| **Audience first** | Every document opens by stating who it is for and what the reader will learn |
| **Plain language** | Short sentences, active voice, no jargon without a definition |
| **Progressive disclosure** | Overview at the top, details below — never bury what the reader needs first |
| **Scannable format** | Headings, bullets, numbered steps, tables, code blocks — no walls of text |
| **Maintained, not just written** | Every document has an owner and a "last reviewed" date |

---

## Rule 1: Audience First

Before writing a single word, answer: **who is reading this, and what do they need to do with it?**

Every document must open with:
- **Who this is for:** [specific audience]
- **What you'll learn:** [concrete outcome]

### Audience map

| Audience | What they need | What to avoid |
|----------|---------------|---------------|
| End users | How to complete tasks; what to expect; how to fix problems | Technical jargon; implementation details; code |
| Developers | How the system works; how to contribute; how to debug | Business-speak; over-explaining obvious technical concepts |
| Operators | Exact steps with copy-paste commands; what to expect; escalation paths | Vague descriptions; missing context for commands |
| Stakeholders | Business outcomes; what was delivered; what's next | Implementation details; technical jargon; long docs |

### Do not mix audiences in one document

If a document is for both users and developers, split it into two documents. A document that tries to serve everyone ends up serving no one well.

---

## Rule 2: Plain Language

Writing for users means writing for someone with no technical background. Writing for developers still means no unnecessary complexity.

### Sentence length

- **Target:** 15–20 words per sentence
- **Max:** 25 words — if you exceed this, break the sentence in two
- **Test:** read the sentence aloud. If you need to take a breath before finishing, it's too long

### Active voice

| Instead of (passive) | Write (active) |
|---------------------|---------------|
| "The form is submitted by the user" | "The user submits the form" |
| "An error is shown when..." | "The app shows an error when..." |
| "Settings can be changed in the menu" | "Change your settings in the menu" |

### Word choice

| Avoid | Use instead |
|-------|------------|
| utilize | use |
| commence | start |
| facilitate | help |
| in order to | to |
| due to the fact that | because |
| at this point in time | now |
| it is important to note that | (delete it — just make the point) |

### Jargon rules

- **User docs:** zero technical jargon. If a technical term is unavoidable, define it on first use: "API (Application Programming Interface)"
- **Technical docs:** technical terms are fine, but define domain-specific or project-specific terms on first use
- **Ops docs:** assume technical background but define system-specific terms and project-specific names

### Acronyms

Always spell out on first use: "Core Web Vitals (CWV)". After the first use, the abbreviation is fine.

---

## Rule 3: Progressive Disclosure

Readers scan before they read. Put the most important information first.

### Document structure (always in this order)

1. **Who this is for** and **what you'll learn** (first two lines)
2. **Summary or overview** (what you need to know in under 60 seconds)
3. **Main content** (the detail, organized from most to least important)
4. **Reference material** (tables, lists of options, edge cases — at the bottom)

### Section structure (always in this order)

1. What this section is about (one sentence)
2. The main point or action
3. An example
4. Edge cases or exceptions

### The "newspaper test"

A reader should understand the main point of each section by reading only:
- The section heading
- The first sentence of the section

If they can't, rewrite the heading and first sentence.

---

## Rule 4: Scannable Format

Most readers do not read — they scan. Format every document so the key information is visible without reading every word.

### Headings

- Use H2 (`##`) for main sections
- Use H3 (`###`) for subsections
- Use H4 (`####`) sparingly — if you need H4, consider restructuring
- Headings must match exactly what follows — no misleading headings
- Do not skip levels (no H2 followed immediately by H4)

### Lists

- **Bullet lists** for 3 or more unordered items
- **Numbered lists** for steps (order matters) or ranked items
- **Do not use lists for 1–2 items** — write them as sentences

### Tables

Use tables for:
- Comparing options (columns = options, rows = criteria)
- Reference data (environment variables, error codes, alert rules)
- Structured lists where two or more properties per item matter

Avoid tables for simple lists — use bullet points instead.

### Code blocks

- Use code blocks for every command, file path, environment variable, and code snippet
- Always specify the language for syntax highlighting: ` ```bash `, ` ```typescript `, etc.
- Commands must be copy-paste ready — no `[PLACEHOLDER]` inside a command block

### Paragraph length

- **Maximum 4–5 lines** per paragraph
- If a paragraph runs longer, find the natural break and split it
- One paragraph = one idea

### Bold and emphasis

- Use **bold** for key terms, UI elements (button names, menu items), and critical warnings
- Use *italics* sparingly — only for titles or technical terms on first use
- Do not use bold or italics for decoration

---

## Rule 5: Maintained, Not Just Written

A document without an owner and a review date is already becoming stale.

### Required metadata (top of every document)

```markdown
**Last updated:** [Date] · **Owner:** [Name or Team]
```

### Maintenance rules

- Every document must have exactly one owner (a person or a named team role)
- Review schedule: after every significant release, or quarterly — whichever comes first
- "Update docs" must be a step in every release checklist
- Stale documents (not reviewed in 6+ months) must be flagged with a warning banner

### Stale document banner

If a document has not been reviewed in 6+ months, add this at the top:

```markdown
> **Note:** This document was last reviewed on [Date]. It may be out of date. 
> Contact [Owner] if you find inaccuracies.
```

---

## Formatting Quick Reference

| Element | Format | Example |
|---------|--------|---------|
| Section heading | `## Heading` | `## Getting Started` |
| Subsection | `### Sub-heading` | `### Step 3: Configure` |
| Ordered steps | Numbered list | `1. Click Save` |
| Unordered items | Bullet list | `- Chrome` |
| UI element | Bold | `Click **Save**` |
| File path | Inline code | `` `src/components/` `` |
| Command | Code block | ` ```bash\nnpm install\n``` ` |
| Environment variable | Inline code | `` `DATABASE_URL` `` |
| Term on first use | Bold | **API (Application Programming Interface)** |
| External link | Markdown link | `[Docs site](https://...)` |
| Warning | Blockquote | `> **Warning:** This is destructive.` |
| Tip | Blockquote | `> **Tip:** You can also use the keyboard shortcut.` |

---

## Pre-Publish Checklist

Run this on every document before it is published.

### Content
- [ ] "Who this is for" and "what you'll learn" stated at the top
- [ ] Main point of every section is in the first sentence of the section
- [ ] No jargon in user docs; all jargon defined on first use in other docs
- [ ] All acronyms spelled out on first use
- [ ] Active voice throughout (spot-check 5 sentences)

### Formatting
- [ ] No paragraph exceeds 5 lines
- [ ] All steps are numbered
- [ ] All multi-item lists use bullets
- [ ] All commands are in code blocks and are copy-paste ready
- [ ] No `[PLACEHOLDER]` values left unfilled

### Links and accuracy
- [ ] All internal links resolve to existing documents
- [ ] All external links open correctly
- [ ] All code examples and commands have been tested and work
- [ ] All screenshots match the current state of the product

### Metadata
- [ ] "Last updated" date is present and current
- [ ] Owner is named
- [ ] Document is linked from the docs entry point (`docs/README.md` or equivalent)

---

## Common Mistakes to Avoid

| Mistake | Why it's a problem | Fix |
|---------|-------------------|-----|
| Writing what was planned, not what was built | Readers follow wrong instructions | Audit against the live product before publishing |
| Passive voice everywhere | Harder to read; unclear who does what | Rewrite to active voice |
| Documenting for yourself | Assumes context the reader doesn't have | Start from zero; define all terms |
| One giant document for all audiences | Each audience reads past irrelevant sections | Split by audience |
| No examples | Abstract descriptions are hard to follow | Add a concrete example to every procedure |
| Screenshots without captions | Screenshots become stale and confusing | Add captions; plan to update on every release |
| Documenting every feature equally | Important things are buried | Lead with P0 features; put edge cases at the bottom |
