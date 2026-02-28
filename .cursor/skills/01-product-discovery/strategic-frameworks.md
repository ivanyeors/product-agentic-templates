# Strategic Frameworks — Product Discovery Reference

Use these frameworks during **Phase 4b: Strategic Positioning** to move beyond feature comparison and identify genuine differentiation opportunities, underserved jobs, and value innovation space.

---

## 1. Blue Ocean Strategy

**Purpose:** Identify uncontested market space by making competition irrelevant rather than beating competitors on their own terms.

**Core concept — Value Innovation:** Simultaneously pursue differentiation and low cost by eliminating and reducing factors the industry competes on, while raising and creating factors customers actually value.

### 4 Actions Framework (ERRC Grid)

Apply to each key competitive factor in the market:

| Action | Question | Effect |
|--------|----------|--------|
| **Eliminate** | Which factors the industry takes for granted should be eliminated? | Reduces cost, removes complexity |
| **Reduce** | Which factors should be reduced well below the industry standard? | Lowers cost in areas of diminishing return |
| **Raise** | Which factors should be raised well above the industry standard? | Increases buyer value |
| **Create** | Which factors should be created that the industry has never offered? | Creates new demand, new value |

**ERRC Grid Template:**

```
ELIMINATE                    REDUCE
─────────────────────────────────────────
[Factor 1]                   [Factor A] ↓
[Factor 2]                   [Factor B] ↓

CREATE                       RAISE
─────────────────────────────────────────
[Factor X] (new)             [Factor C] ↑
[Factor Y] (new)             [Factor D] ↑
```

### Strategy Canvas

The Strategy Canvas plots the offering level (vertical axis: low → high) for each competitive factor (horizontal axis) across your product and all competitors. The resulting curve is the **value curve**.

**Steps:**
1. List 6–10 competitive factors the industry competes on (e.g. price, features, support, speed, integrations)
2. Score each competitor on each factor (1–5)
3. Plot your current or proposed offering
4. Identify where the curve diverges from competitors — that divergence is the differentiation story

**Blue Ocean signal:** A value curve that zigs where competitors zag — especially where it creates new factors the industry ignores.

### Three Tiers of Non-Customers

Blue Ocean growth comes from converting non-customers, not stealing market share.

| Tier | Who They Are | Research Question |
|------|--------------|-------------------|
| **Tier 1** (Soon-to-be) | On the edge of your market; use minimum viable solution, ready to switch | "What stops them from committing fully?" |
| **Tier 2** (Refusing) | Consciously choose not to use your category; use alternatives | "Why do they refuse? What alternative do they use instead?" |
| **Tier 3** (Unexplored) | Never considered your market as relevant | "What job are they trying to do that your product could serve if repositioned?" |

See `research-guide.md → Blue Ocean Non-Customer Research` for interview techniques.

---

## 2. Jobs To Be Done (JTBD)

**Purpose:** Define what progress users are trying to make — their functional, emotional, and social jobs — so product decisions are grounded in real motivation rather than demographics or feature requests.

**Core concept:** People don't buy products; they hire them to get a job done. Understanding the job in full — including emotional and social dimensions — reveals why people switch, stay, or abandon solutions.

### Job Types

| Job Type | Description | Example |
|----------|-------------|---------|
| **Functional** | The practical task to accomplish | "Send a document to my client for signature" |
| **Emotional** | How the user wants to feel (or avoid feeling) | "Feel confident the document is legally binding" |
| **Social** | How the user wants to be perceived by others | "Look professional and organised to clients" |

### The 8-Stage Job Map

Every functional job can be broken into up to 8 stages. Under-served stages are opportunity spaces.

| Stage | Question to Ask |
|-------|----------------|
| 1. **Define** | How does the user determine what they need? |
| 2. **Locate** | How do they find the inputs and information needed? |
| 3. **Prepare** | How do they set up the environment to do the job? |
| 4. **Confirm** | How do they verify they are ready to proceed? |
| 5. **Execute** | How do they perform the core job? |
| 6. **Monitor** | How do they assess whether the job is going well? |
| 7. **Modify** | How do they correct course when things go wrong? |
| 8. **Conclude** | How do they finish and wrap up? |

For each stage, interview users to surface:
- What they currently do (workarounds, tools)
- Pain intensity (frustration level 1–5)
- Desired outcome (what "perfect" looks like)

### Opportunity Score Formula

From Anthony Ulwick's Outcome-Driven Innovation:

```
Opportunity Score = Importance + max(Importance − Satisfaction, 0)
```

Where Importance and Satisfaction are both rated 1–10 by users.

| Score | Interpretation |
|-------|----------------|
| > 15 | Highly underserved — strong opportunity |
| 10–15 | Moderately underserved — worth addressing |
| < 10 | Over-served or adequately served — low priority |

**Survey format:**
- "When [job stage], how important is it that you [desired outcome]?" (1 = not important, 10 = critically important)
- "When [job stage], how satisfied are you with the solutions currently available?" (1 = not satisfied, 10 = fully satisfied)

**Output:** Opportunity Map — see `artifacts-template.md → JTBD Opportunity Map`.

### Job Statement Format

Structure job statements consistently for scoring:

`[Direction verb] + [object of the verb] + [contextual clarifier]`

Example: "Minimise the time it takes to prepare a client contract for signature"

---

## 3. Value Proposition Canvas

**Purpose:** Ensure product features create genuine fit with customer jobs, pains, and gains — preventing feature-building without grounding in customer value.

**Two sides:**

```
┌──────────────────────┐     ┌──────────────────────┐
│   VALUE MAP          │     │   CUSTOMER PROFILE   │
│  (What we offer)     │ FIT │  (What they need)     │
│                      │◄───►│                      │
│  Products/Services   │     │  Jobs                │
│  Pain Relievers      │     │  Pains               │
│  Gain Creators       │     │  Gains               │
└──────────────────────┘     └──────────────────────┘
```

### Customer Profile

| Element | Definition | Questions to Ask |
|---------|------------|-----------------|
| **Jobs** | Tasks they're trying to complete, problems to solve, needs to satisfy | "What are you trying to accomplish? What job is this part of?" |
| **Pains** | Negative experiences, risks, obstacles before/during/after the job | "What annoys you? What goes wrong? What are you afraid of?" |
| **Gains** | Benefits they want — required, expected, desired, unexpected | "What would make the job easier? What would delight you?" |

Rank each pain and gain by intensity (extreme → moderate → slight).

### Value Map

| Element | Definition | Construction Method |
|---------|------------|--------------------|
| **Products/Services** | What you offer to help complete jobs | List all features, services, and support |
| **Pain Relievers** | How your offer reduces or removes specific pains | Map each to a pain from the customer profile |
| **Gain Creators** | How your offer creates specific gains | Map each to a gain from the customer profile |

### Fit Assessment

**Problem-Solution Fit:** Pain relievers and gain creators address the most extreme pains and required gains.
**Product-Market Fit:** Evidence from real customers confirms that the value map reliably gets the job done.

Fit Score: `(Mapped extreme pains + required gains addressed) / Total extreme pains + required gains × 100%`

Target: ≥ 70% of extreme pains and required gains addressed before entering full build.

---

## 4. Kano Model

**Purpose:** Classify features by their relationship to customer satisfaction to prioritise the right things and avoid over-engineering.

### Feature Categories

| Category | Description | Example | Investment Guidance |
|----------|-------------|---------|---------------------|
| **Basic (Must-be)** | Expected; absence causes strong dissatisfaction; presence goes unnoticed | Secure login, data not lost | Must have. Do not over-invest — no bonus for excellence. |
| **Performance (Linear)** | More = more satisfaction; less = less satisfaction | Search speed, storage capacity | Invest proportionally to competitive importance. |
| **Excitement (Delighter)** | Unexpected; absence unnoticed; presence creates delight | Smart suggestions, one-click exports | High ROI when done well. Can become Basic over time. |
| **Indifferent** | Neither satisfied nor dissatisfied regardless of presence | Most users don't care | Deprioritise. Avoid building. |
| **Reverse** | Presence causes dissatisfaction for some users | Mandatory onboarding tour | Avoid or make optional. |

### Kano Survey Format

For each feature, ask two questions:

1. **Functional question:** "If this feature is present, how do you feel?" (Delight / Expect it / Neutral / Tolerate / Dislike)
2. **Dysfunctional question:** "If this feature is absent, how do you feel?" (Delight / Expect it / Neutral / Tolerate / Dislike)

Cross-reference answers using the Kano evaluation table to classify each feature.

### Classification Matrix

| Functional ↓ / Dysfunctional → | Like | Expect | Neutral | Tolerate | Dislike |
|---|---|---|---|---|---|
| **Like** | Questionable | Excitement | Excitement | Excitement | Performance |
| **Expect** | Reverse | Indifferent | Indifferent | Indifferent | Basic |
| **Neutral** | Reverse | Indifferent | Indifferent | Indifferent | Basic |
| **Tolerate** | Reverse | Indifferent | Indifferent | Indifferent | Basic |
| **Dislike** | Reverse | Reverse | Reverse | Reverse | Questionable |

**Output:** Kano Analysis Table — see `artifacts-template.md → Kano Analysis Table`.

---

## 5. Porter's Five Forces

**Purpose:** Understand the structural attractiveness and competitive dynamics of the market before committing to a positioning strategy.

### The Five Forces

| Force | What It Measures | Key Questions |
|-------|-----------------|---------------|
| **Threat of New Entrants** | How easy is it for new competitors to enter? | What are the barriers to entry (capital, regulation, network effects, brand)? |
| **Bargaining Power of Suppliers** | How much leverage do suppliers hold? | Are there few suppliers? Are inputs unique or easy to switch? |
| **Bargaining Power of Buyers** | How much leverage do customers hold? | Are buyers price-sensitive? Can they easily switch? Do they buy in volume? |
| **Threat of Substitutes** | How easily can customers find alternative solutions? | What workarounds exist? What do non-customers use instead? |
| **Competitive Rivalry** | How intense is competition among existing players? | How many competitors? Is the market growing or shrinking? Is differentiation low? |

### Force Intensity Ratings

Rate each force: **Low / Medium / High**

| Force | Intensity | Strategic Implication |
|-------|-----------|----------------------|
| New Entrants | [L/M/H] | [How it shapes positioning] |
| Supplier Power | [L/M/H] | [How it shapes build vs. partner decisions] |
| Buyer Power | [L/M/H] | [How it shapes pricing and retention strategy] |
| Substitutes | [L/M/H] | [How it shapes value proposition] |
| Rivalry | [L/M/H] | [How it shapes go-to-market] |

**Overall attractiveness:** Sum of Low=1, Medium=2, High=3. Score 5–8 = attractive; 9–12 = moderate; 13–15 = unattractive.

**Strategic use:** High buyer power + high substitutes → product must have strong switching costs or network effects. High rivalry + low differentiation → Blue Ocean or niche positioning required.

---

## 6. USP Definition Framework

**Purpose:** Articulate a single, defensible, and credible Unique Selling Proposition that anchors product positioning, marketing, and design language.

### What Makes a USP Strong

A strong USP is:
- **Specific** — not "easy to use" but "set up in under 5 minutes without a developer"
- **Differentiated** — not offered (or not offered as well) by any direct competitor
- **Valued** — addresses an extreme pain or required gain from the customer profile
- **Credible** — supported by proof (data, testimonials, mechanism)
- **Durable** — not easily copied in < 6 months

### Differentiation Ladder

Work up from feature to belief to find the highest-leverage USP statement:

```
Feature      →  "We have [specific capability]"
Benefit      →  "Which means you can [tangible outcome]"
Value        →  "So that [business/life impact]"
Belief       →  "Because we believe [world-view / mission]"
```

**Example:**
- Feature: "Real-time document co-editing"
- Benefit: "Which means you can review and sign contracts without sending attachments"
- Value: "So that deals close faster and you spend less time on admin"
- Belief: "Because we believe professional services should run at the speed of trust"

The USP statement lives at the **Value** or **Belief** level, backed by the Feature.

### Unique Mechanism Identification

The unique mechanism is the *how* — the specific thing your product does differently that produces the superior outcome.

Questions to identify it:
1. "What is the one thing our product does that competitors don't (or do worse)?"
2. "Why does our approach produce a better result — what is the underlying mechanism?"
3. "If a competitor tried to copy this tomorrow, what would be hard about it?"

### USP Validation

Before committing to a USP, validate:

| Test | Pass Criteria |
|------|--------------|
| **Differentiation clarity test** | Show USP to 5 target users with competitors listed — they can immediately explain why it's different |
| **Believability test** | Users rate the USP as believable (≥ 4/5) without seeing proof points |
| **Relevance test** | USP directly maps to a pain rated ≥ 7/10 importance in JTBD scoring |
| **Competitor gap test** | None of the top 3 competitors claims the same USP in their headline copy |

See `research-guide.md → USP Validation Research` for interview prompts.

### USP Statement Format

`For [target customer], [product name] is the [category] that [unique benefit] because [unique mechanism / proof].`

Example: "For independent consultants, Docusign is the e-signature platform that closes deals fastest because it requires no account creation for the signer."
