# Writing Guide — Documentation Phase

All documentation produced in Phase 08 must follow these principles. Clear, simple, easy to read.

---

## Principles

| Principle | Rule |
|-----------|------|
| **Clarity** | One idea per paragraph; one topic per section |
| **Simplicity** | Short sentences; active voice; avoid acronyms unless defined |
| **Scannability** | Headings, tables, bullet lists; no walls of text |
| **Structure** | Consistent templates across docs; same heading order |
| **Links** | Cross-link where relevant; no orphan docs |
| **Audience** | Each doc has a clear audience (user, operator, stakeholder) |

---

## Clarity

- **One idea per paragraph.** If a paragraph covers two ideas, split it.
- **One topic per section.** Section headings should match exactly what follows.
- **Define terms on first use.** If you use an acronym, spell it out: "Application Programming Interface (API)".
- **Avoid ambiguity.** "Click the button" not "Click it." "Save your changes" not "Save."

---

## Simplicity

- **Short sentences.** Aim for 15–20 words or fewer. Break long sentences into two.
- **Active voice.** "The user clicks Submit" not "Submit is clicked by the user."
- **Plain language.** Use common words. "Use" not "utilize." "Start" not "commence."
- **No jargon in user docs.** Operators may need technical terms; users should not.
- **Concrete over abstract.** "Click the blue Save button" not "Execute the save operation."

---

## Scannability

- **Use headings.** Every section should have a heading. Use H2 for main sections, H3 for subsections.
- **Use lists.** Bullet lists for 3+ items. Numbered lists for steps.
- **Use tables.** When comparing or listing structured data (features, env vars, metrics).
- **No walls of text.** If a paragraph exceeds 4–5 lines, consider a list or table.
- **Front-load key info.** Put the most important information first in each section.

---

## Structure

- **Consistent templates.** Use the templates in [documentation-templates.md](documentation-templates.md).
- **Same heading order.** User guide: What it does → How to use it → Common issues.
- **Last updated date.** Every doc includes "Last updated: [Date]" at the top.

---

## Audience-Specific Rules

### User Documentation
- No technical jargon. If a term is unavoidable, define it.
- Focus on outcomes: "You will see your dashboard" not "The dashboard component renders."
- Use "you" and "your." "Click your profile" not "Click the profile."

### Operations Documentation
- Step-by-step. Number every step. No assumptions.
- Copy-paste commands. Operators should be able to run commands without editing.
- Include "what to expect." "You should see: Success" after a command.

### Stakeholder Documentation
- Business-focused. Lead with impact and outcomes.
- No implementation details. "Users can now X" not "We implemented the X API."
- One page. Links for detail.

---

## Checklist Before Publishing

- [ ] Every doc has a "Last updated" date
- [ ] Every doc has a clear audience
- [ ] No paragraph exceeds 5 lines
- [ ] All acronyms defined on first use
- [ ] All links work and point to existing docs
- [ ] User docs contain zero jargon (or jargon is defined)
