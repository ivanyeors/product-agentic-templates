# Test Templates — QA Testing

## Unit Tests

### Utility Function Test

```typescript
// lib/utils/formatDate.test.ts
import { describe, it, expect } from 'vitest'
import { formatDate, formatRelativeTime } from './formatDate'

describe('formatDate', () => {
  it('formats ISO date string to readable format', () => {
    expect(formatDate('2024-01-15')).toBe('January 15, 2024')
  })

  it('returns "Invalid date" for invalid input', () => {
    expect(formatDate('not-a-date')).toBe('Invalid date')
  })

  it('handles null input gracefully', () => {
    expect(formatDate(null)).toBe('')
  })
})

describe('formatRelativeTime', () => {
  it('returns "just now" for timestamps within 60 seconds', () => {
    const now = Date.now()
    expect(formatRelativeTime(now - 30_000)).toBe('just now')
  })

  it('returns "X minutes ago" for timestamps within the last hour', () => {
    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000
    expect(formatRelativeTime(fiveMinutesAgo)).toBe('5 minutes ago')
  })
})
```

### Component Unit Test

```typescript
// components/ui/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renders with correct label', () => {
    render(<Button>Submit</Button>)
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Submit</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('shows spinner and disables button when isLoading is true', () => {
    render(<Button isLoading>Submit</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
  })

  it('applies correct variant class', () => {
    render(<Button variant="destructive">Delete</Button>)
    // Test behavior/presence, not specific class names
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })
})
```

### Custom Hook Test

```typescript
// lib/hooks/useDebounce.test.ts
import { renderHook, act } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'
import { useDebounce } from './useDebounce'

describe('useDebounce', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hello', 300))
    expect(result.current).toBe('hello')
  })

  it('does not update value before delay has elapsed', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'hello' } }
    )
    rerender({ value: 'world' })
    expect(result.current).toBe('hello')
  })

  it('updates value after delay has elapsed', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'hello' } }
    )
    rerender({ value: 'world' })
    act(() => vi.advanceTimersByTime(300))
    expect(result.current).toBe('world')
  })
})
```

---

## Integration Tests

### Form Integration Test

```typescript
// components/features/auth/LoginForm.test.tsx
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { server } from '@/test/mocks/server'
import { http, HttpResponse } from 'msw'
import { LoginForm } from './LoginForm'

describe('LoginForm', () => {
  it('shows validation errors when submitted empty', async () => {
    render(<LoginForm />)
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }))
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument()
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument()
  })

  it('shows error for invalid email format', async () => {
    render(<LoginForm />)
    await userEvent.type(screen.getByLabelText(/email/i), 'not-an-email')
    await userEvent.tab()
    expect(await screen.findByText(/invalid email/i)).toBeInTheDocument()
  })

  it('calls login API with correct credentials on valid submit', async () => {
    render(<LoginForm />)
    await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com')
    await userEvent.type(screen.getByLabelText(/password/i), 'password123')
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }))
    await waitFor(() => {
      expect(screen.getByText(/welcome/i)).toBeInTheDocument()
    })
  })

  it('displays server error message on API failure', async () => {
    server.use(
      http.post('/api/auth/login', () =>
        HttpResponse.json({ message: 'Invalid credentials' }, { status: 401 })
      )
    )
    render(<LoginForm />)
    await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com')
    await userEvent.type(screen.getByLabelText(/password/i), 'wrongpassword')
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }))
    expect(await screen.findByRole('alert')).toHaveTextContent('Invalid credentials')
  })
})
```

---

## E2E Tests

### Critical Path E2E Test (Playwright)

```typescript
// e2e/auth/login.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('user can log in with valid credentials', async ({ page }) => {
    await page.goto('/login')

    await page.getByLabel('Email').fill('user@example.com')
    await page.getByLabel('Password').fill('ValidPassword123!')
    await page.getByRole('button', { name: 'Sign in' }).click()

    await expect(page).toHaveURL('/dashboard')
    await expect(page.getByText('Welcome back')).toBeVisible()
  })

  test('shows error for invalid credentials', async ({ page }) => {
    await page.goto('/login')

    await page.getByLabel('Email').fill('user@example.com')
    await page.getByLabel('Password').fill('wrongpassword')
    await page.getByRole('button', { name: 'Sign in' }).click()

    await expect(page.getByRole('alert')).toContainText('Invalid credentials')
    await expect(page).toHaveURL('/login')
  })

  test('unauthenticated user is redirected to login', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page).toHaveURL('/login')
  })
})
```

### E2E Page Object Model (for complex flows)

```typescript
// e2e/pages/LoginPage.ts
import { type Page, type Locator } from '@playwright/test'

export class LoginPage {
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator
  readonly errorAlert: Locator

  constructor(private page: Page) {
    this.emailInput = page.getByLabel('Email')
    this.passwordInput = page.getByLabel('Password')
    this.submitButton = page.getByRole('button', { name: 'Sign in' })
    this.errorAlert = page.getByRole('alert')
  }

  async goto() {
    await this.page.goto('/login')
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    await this.submitButton.click()
  }
}
```

---

## Visual Regression

### Playwright Screenshot Tests

```typescript
// e2e/visual/components.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Visual regression — Button', () => {
  test('primary button default state', async ({ page }) => {
    await page.goto('/storybook?story=button--primary')
    await expect(page.getByRole('button', { name: 'Button' })).toHaveScreenshot('button-primary-default.png')
  })

  test('primary button hover state', async ({ page }) => {
    await page.goto('/storybook?story=button--primary')
    await page.getByRole('button').hover()
    await expect(page.getByRole('button')).toHaveScreenshot('button-primary-hover.png')
  })
})

test.describe('Visual regression — Pages', () => {
  test('login page — desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.goto('/login')
    await expect(page).toHaveScreenshot('login-desktop.png', { fullPage: true })
  })

  test('login page — mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/login')
    await expect(page).toHaveScreenshot('login-mobile.png', { fullPage: true })
  })
})
```

Update baselines: `npx playwright test --update-snapshots`

---

## Accessibility Testing

### Automated axe Test (Playwright)

```typescript
// e2e/a11y/pages.spec.ts
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Accessibility', () => {
  test('login page has no critical a11y violations', async ({ page }) => {
    await page.goto('/login')
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()
    expect(results.violations.filter(v => v.impact === 'critical')).toHaveLength(0)
  })

  test('dashboard page has no serious a11y violations', async ({ page }) => {
    await page.goto('/dashboard')
    const results = await new AxeBuilder({ page }).analyze()
    const seriousOrCritical = results.violations.filter(
      v => v.impact === 'serious' || v.impact === 'critical'
    )
    expect(seriousOrCritical).toHaveLength(0)
  })
})
```

### Manual Keyboard Navigation Checklist

For each P0 flow, verify:
```
- [ ] Tab key moves focus forward through all interactive elements
- [ ] Shift+Tab moves focus backward
- [ ] Enter/Space activates buttons and interactive elements
- [ ] Escape closes modals and dropdowns
- [ ] Arrow keys navigate within menus, tabs, radio groups
- [ ] Focus is always visible (never hidden)
- [ ] No keyboard traps (except intentional modal traps)
- [ ] Skip-to-content link appears on first Tab press
```

---

## Performance Testing

### Lighthouse CI

```yaml
# .lighthouserc.yml
ci:
  collect:
    url:
      - http://localhost:3000/
      - http://localhost:3000/login
      - http://localhost:3000/dashboard
    numberOfRuns: 3
  assert:
    assertions:
      'categories:performance': ['error', { minScore: 0.9 }]
      'categories:accessibility': ['error', { minScore: 0.9 }]
      'first-contentful-paint': ['error', { maxNumericValue: 2000 }]
      'largest-contentful-paint': ['error', { maxNumericValue: 2500 }]
      'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }]
```

### k6 Load Test

```javascript
// load-tests/api-login.js
import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
  stages: [
    { duration: '30s', target: 20 },   // Ramp up to 20 users
    { duration: '1m', target: 20 },    // Hold at 20 users
    { duration: '10s', target: 0 },    // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],   // 95% of requests < 500ms
    http_req_failed: ['rate<0.01'],     // Error rate < 1%
  },
}

export default function () {
  const res = http.post('https://staging.example.com/api/auth/login', JSON.stringify({
    email: 'test@example.com',
    password: 'TestPassword123!',
  }), { headers: { 'Content-Type': 'application/json' } })

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response has token': (r) => JSON.parse(r.body).token !== undefined,
  })

  sleep(1)
}
```

---

## Security Review

### OWASP Top 10 Checklist (Frontend)

```
A01 — Broken Access Control
- [ ] Protected routes reject unauthenticated requests
- [ ] API endpoints verify authorization (not just authentication)
- [ ] No sensitive admin functionality accessible to standard users
- [ ] Direct object references validated on server (not just hidden in UI)

A02 — Cryptographic Failures
- [ ] HTTPS enforced everywhere
- [ ] Sensitive data not stored in localStorage (use httpOnly cookies)
- [ ] No secrets in client-side code or environment variables prefixed NEXT_PUBLIC_

A03 — Injection
- [ ] All user input is sanitized before rendering (no dangerouslySetInnerHTML with user data)
- [ ] URL parameters are validated before use
- [ ] No client-side template injection

A05 — Security Misconfiguration
- [ ] Security headers configured (CSP, HSTS, X-Frame-Options, X-Content-Type-Options)
- [ ] Error responses don't expose stack traces in production
- [ ] Source maps not publicly accessible in production

A06 — Vulnerable Components
- [ ] npm audit shows no critical or high vulnerabilities
- [ ] Dependencies are up to date

A07 — Authentication Failures
- [ ] Brute force protection on login (rate limiting)
- [ ] Password strength enforced
- [ ] Session tokens invalidated on logout
- [ ] JWT expiry is reasonable (access: 15min, refresh: 7d)

A10 — Server-Side Request Forgery
- [ ] Any URL inputs validated against allowlist
```
