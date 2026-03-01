# Feedback Channels Plan — Handover Template

Use this template for handover to IA, user flows, wireframes, and backend.

---

## Feedback Channels Plan — [Product Name]

**Date:** [Date]
**Covers:** [FR-IDs for feedback]

### Channels

| Channel | Purpose | Touchpoint | IA Placement |
|---------|---------|------------|--------------|
| In-app form | [Bug report / Feature request / General] | [When: e.g., Settings > Feedback] | [Nav location] |
| Email | [Support / Feedback] | [support@...] | [Help page, footer] |
| NPS / Rating | [Satisfaction] | [Post-task / Periodic] | [Modal / In-app] |
| App store reviews | [Public feedback] | [External] | [Link from app] |

### In-App Placement

| Location | Channel | Trigger |
|----------|---------|---------|
| [Settings > Feedback] | Feedback form | User-initiated |
| [Help > Contact] | Email, support | User-initiated |
| [Post-onboarding] | NPS | System-triggered |
| [Floating button] | Quick feedback | Always available |

### Technical Requirements

| Channel | Backend | Third-Party |
|---------|---------|-------------|
| In-app form | POST /feedback | — |
| NPS | POST /feedback or [Tool] | [Intercom / Canny / etc.] |
| Support | — | [Zendesk / Freshdesk / etc.] |

### Handover to Downstream

- **IA:** Add [Feedback], [Help] to utility nav
- **User flows:** UF-feedback for form submission
- **Wireframes:** WF-feedback-form, WF-nps-modal
- **Backend:** POST /feedback endpoint spec
