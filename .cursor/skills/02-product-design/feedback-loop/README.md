# Feedback Loop

Plan feedback channels during Product Design so the product is built with feedback infrastructure from day one.

---

## Why Plan Feedback in Product Design?

Feedback channels are **design-time artifacts**. During Product Design, the team plans where and how feedback is collected so it can be designed into:

- **IA** — "Give feedback" in nav, Help, Settings
- **User flows** — Feedback submission flow (UF-xxx)
- **Wireframes** — Feedback form, NPS widget, bug report UI (WF-xxx)
- **Backend** — POST /feedback, webhook receivers
- **Integration** — Third-party feedback tools (Intercom, Canny, etc.)

Planning upfront ensures no "we'll add feedback later" — it's built in from the start.

---

## When to Use

- PRD includes feedback collection as a requirement (FR-xxx)
- Product needs user feedback, NPS, bug reports, feature requests
- Market feedback (reviews, competitive) is part of product strategy

---

## Subskills

| Subskill | Purpose | Output |
|----------|---------|--------|
| [feedback-channels-plan](feedback-channels-plan/) | Plan channels (in-app, email, support, reviews) and where they surface | Feedback Channels Plan |
| [user-feedback-design](user-feedback-design/) | Design in-app feedback flows and UI | UF-xxx flows, WF-xxx wireframes |
| [market-feedback-plan](market-feedback-plan/) | Plan market signal collection (reviews, competitive) | Market feedback sources, cadence |
| [feedback-triage](feedback-triage/) | Define how feedback is prioritized for roadmap | Triage rubric, escalation rules |

---

## Integration with Product Design Phases

- **Feedback channels plan** → Informs IA (utility nav, settings, help)
- **User feedback design** → Produces UF-xxx flows and WF-xxx wireframes
- **Market feedback plan** → Informs Discovery cadence; no wireframes
- **Feedback triage** → Referenced in handoff package; informs PM prioritization
