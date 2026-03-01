# User Flow Notation

Reference for documenting user flows in Product Design. See [ux-process.md](ux-process.md) for orchestrator.

---

## Flow Elements

| Symbol | Meaning |
|--------|---------|
| Rounded rectangle | Screen / view |
| Diamond | Decision point |
| Rectangle | Action / process |
| Oval | Start / End |
| Arrow | Navigation direction |
| Dashed arrow | Optional path |
| X | Error / blocked state |

---

## Flow Types

**Happy Path:** The ideal uninterrupted journey from start to success.

**Alternate Path:** A valid but non-primary route to the same goal.

**Error Path:** What happens when something goes wrong — must include recovery.

**Edge Cases:** Empty states, permission-denied states, offline states.

---

## Flow Documentation Format

```
Flow Name: [e.g., User Registration]
Persona: [Primary persona name]
Entry Point: [Where does this flow begin?]
Goal: [What does the user achieve at the end?]

Steps:
1. [Screen/Action] → [Decision or next step]
2. [Decision] → Yes: [path] / No: [path]
3. [Screen] → [Action]
...
N. [End state: Success / Error / Exit]

Error States:
- [Error condition] → [Recovery path]
- [Error condition] → [Recovery path]

Empty States:
- [Screen] when no data: [what is shown]
```
