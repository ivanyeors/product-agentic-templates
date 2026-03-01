# Development Standards — Frontend Development

## Component Patterns

### Component Anatomy

```typescript
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import type { VariantProps } from 'class-variance-authority'
import { buttonVariants } from './Button.variants'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? <Spinner size="sm" aria-hidden /> : leftIcon}
        {children}
        {!isLoading && rightIcon}
      </button>
    )
  }
)
Button.displayName = 'Button'
```

### Variant Definition (CVA)

```typescript
// Button.variants.ts
import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-[var(--color-brand-primary)] text-white hover:bg-[var(--color-brand-primary-hover)]',
        secondary: 'border border-[var(--color-border-default)] bg-transparent hover:bg-[var(--color-surface-elevated)]',
        destructive: 'bg-[var(--color-feedback-error)] text-white hover:opacity-90',
        ghost: 'hover:bg-[var(--color-surface-elevated)]',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        xl: 'h-14 px-8 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)
```

### Compound Components (for complex organisms)

```typescript
// For components with tightly coupled children
const Card = ({ children, ...props }: CardProps) => <div {...props}>{children}</div>
const CardHeader = ({ children }: { children: React.ReactNode }) => <div>{children}</div>
const CardBody = ({ children }: { children: React.ReactNode }) => <div>{children}</div>

Card.Header = CardHeader
Card.Body = CardBody

// Usage
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
</Card>
```

---

## State Management

### Decision Matrix

| State Type | Tool |
|------------|------|
| Local UI state (open/closed, form values) | `useState` / `useReducer` |
| Server state (API data, caching, mutations) | TanStack Query (React Query) |
| Global client state (theme, auth, user prefs) | Zustand or Context + useReducer |
| URL state (filters, pagination, tabs) | `useSearchParams` / router |
| Form state | React Hook Form + Zod |

### Server State (TanStack Query)

```typescript
// Fetching
const { data, isLoading, error } = useQuery({
  queryKey: ['users', userId],
  queryFn: () => api.users.get(userId),
  staleTime: 5 * 60 * 1000, // 5 minutes
})

// Mutations
const mutation = useMutation({
  mutationFn: api.users.update,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] })
    toast.success('User updated')
  },
  onError: (error) => toast.error(error.message),
})
```

### Global State (Zustand)

```typescript
// stores/auth.store.ts
interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (credentials: Credentials) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (credentials) => {
    const user = await api.auth.login(credentials)
    set({ user, isAuthenticated: true })
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}))
```

### Form State (React Hook Form + Zod)

```typescript
const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Minimum 8 characters'),
})

type FormValues = z.infer<typeof schema>

function LoginForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} aria-describedby={errors.email ? 'email-error' : undefined} />
      {errors.email && <p id="email-error" role="alert">{errors.email.message}</p>}
    </form>
  )
}
```

---

## API Integration

### API Client Structure

```typescript
// lib/api/client.ts
async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${config.apiBaseUrl}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    ...options,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new ApiError(response.status, error.message ?? 'Request failed', error)
  }

  return response.json() as Promise<T>
}

// lib/api/users.ts
export const users = {
  get: (id: string) => apiRequest<User>(`/users/${id}`),
  list: (params: UserListParams) => apiRequest<PaginatedResponse<User>>(`/users?${qs.stringify(params)}`),
  update: (id: string, data: UpdateUserInput) => apiRequest<User>(`/users/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
}
```

### Error Handling

```typescript
class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// Global error handling in React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (error instanceof ApiError && error.status < 500) return false
        return failureCount < 2
      },
    },
  },
})
```

---

## Performance Optimization

### Code Splitting

```typescript
// Route-level (automatic in Next.js App Router)
// Manual lazy loading for heavy components
const HeavyChart = lazy(() => import('./HeavyChart'))

function Dashboard() {
  return (
    <Suspense fallback={<ChartSkeleton />}>
      <HeavyChart />
    </Suspense>
  )
}
```

### Image Optimization

```typescript
// Next.js
import Image from 'next/image'
<Image src={url} alt="Description" width={800} height={600} priority={isAboveFold} />

// Outside Next.js
<img
  src={`${url}?w=800`}
  srcSet={`${url}?w=400 400w, ${url}?w=800 800w`}
  sizes="(max-width: 640px) 400px, 800px"
  loading="lazy"
  decoding="async"
  alt="Description"
/>
```

### Memoization — Use Sparingly

Only memoize when profiling shows a real performance issue:

```typescript
// Expensive pure computations
const sortedList = useMemo(() => expensiveSort(items), [items])

// Stable callback references to prevent child re-renders
const handleClick = useCallback(() => { ... }, [dependency])

// Prevent re-renders when parent re-renders (profile first)
const MemoizedComponent = memo(Component)
```

### Core Web Vitals Targets

| Metric | Good | Needs Improvement |
|--------|------|-------------------|
| LCP (Largest Contentful Paint) | < 2.5s | 2.5–4s |
| INP (Interaction to Next Paint) | < 200ms | 200–500ms |
| CLS (Cumulative Layout Shift) | < 0.1 | 0.1–0.25 |

To improve LCP: preload hero images, reduce server response time, avoid render-blocking resources.
To improve INP: reduce JS execution time, defer non-critical JS, use web workers for heavy computation.
To improve CLS: set explicit width/height on images/media, avoid inserting content above existing content.

---

## Accessibility Implementation

### Required for Every Component

```typescript
// Focus ring — never remove outline without providing alternative
// In Tailwind: focus-visible:ring-2 focus-visible:ring-offset-2 (not focus:ring)

// Semantic HTML first
<button>Submit</button>           // ✅ not <div onClick>Submit</div>
<a href="/page">Link</a>          // ✅ not <span onClick>Link</span>
<h2>Section Title</h2>            // ✅ not <p className="text-xl font-bold">

// ARIA only when semantic HTML isn't enough
<div role="alert">{errorMessage}</div>          // Error announcements
<div aria-live="polite">{statusMessage}</div>   // Status updates
<button aria-expanded={isOpen} aria-controls="menu-id">Menu</button>
```

### Focus Management

```typescript
// Modal: trap focus and restore on close
function Modal({ isOpen, onClose, triggerRef }) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      // Trap focus
      const focusableElements = modalRef.current?.querySelectorAll(FOCUSABLE_SELECTORS)
      focusableElements?.[0]?.focus()
    } else {
      // Restore focus to trigger
      triggerRef.current?.focus()
    }
  }, [isOpen])
}

// Dynamic content: announce to screen readers
const [announcement, setAnnouncement] = useState('')
// ...
setAnnouncement('3 results found')
// In JSX:
<div role="status" className="sr-only">{announcement}</div>
```

### Skip Link (Required on every page)

```typescript
// First element in layout
<a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-white p-2">
  Skip to main content
</a>
// ...
<main id="main-content">...</main>
```

### Screen Reader Text Utility

```css
.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

---

## Code Quality

### ESLint Config (minimal)

```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "jsx-a11y/anchor-is-valid": "error",
    "no-console": ["warn", { "allow": ["warn", "error"] }]
  }
}
```

### Pre-commit Hooks (Husky + lint-staged)

```json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{css,md,json}": ["prettier --write"]
  }
}
```
