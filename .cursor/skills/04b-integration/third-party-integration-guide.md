# Third-Party Integration Guide — Integration

Patterns for auth providers, payment providers, and webhooks.

---

## Auth Providers

### OAuth 2.0 / OIDC (Auth0, Clerk, Supabase Auth, etc.)

**Frontend:**
- Redirect to provider login URL
- Handle callback with `code` or `token`
- Store token (httpOnly cookie preferred over localStorage for security)
- Send token in `Authorization: Bearer <token>` header

**Backend:**
- Validate token (JWT verify, or introspect with provider)
- Extract user ID and claims
- Apply permission checks per endpoint

**Common issues:**
- CORS: ensure backend allows frontend origin
- Redirect URI: must match exactly (including trailing slash)
- Token expiry: implement refresh flow or re-auth

### API Keys
- Store in environment variable
- Send in header: `X-API-Key` or `Authorization: ApiKey <key>`
- Never expose in frontend — backend only

---

## Payment Providers (Stripe, etc.)

### Client-Side (Stripe Elements, etc.)
- Use provider's SDK for card input (never handle raw card numbers)
- Create PaymentIntent or similar on backend
- Confirm on frontend with client secret
- Handle success/failure webhooks on backend

### Webhooks
- Verify signature (Stripe: `stripe.webhooks.constructEvent` with secret)
- Idempotency: use `event.id` to avoid duplicate processing
- Return 200 quickly; process async if needed
- Retry: provider will retry on non-2xx response

### Security
- Never log full card data
- Use provider's test mode for development
- Validate webhook signatures before processing

---

## Webhooks (Outgoing)

When your backend sends webhooks to external systems:

### Payload
- Include: event type, timestamp, resource ID, payload
- Use idempotency key if consumer supports it
- Version the payload structure

### Retries
- Exponential backoff: 1s, 2s, 4s, 8s, ...
- Max retries: 5–10
- Dead letter queue for permanent failures

### Security
- Sign payload (HMAC) so consumer can verify
- Use HTTPS only
- Validate consumer URL before subscribing

---

## Error Handling for Third-Party Calls

```typescript
// Pattern: wrap external calls with timeout and error mapping
async function callExternalAPI(url: string, options: RequestInit) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) {
      throw new ExternalAPIError(res.status, await res.text());
    }
    return res.json();
  } catch (err) {
    clearTimeout(timeout);
    if (err.name === 'AbortError') {
      throw new TimeoutError('External API timeout');
    }
    throw err;
  }
}
```

---

## Environment Variables

Document all required env vars for third-party integrations:

| Variable | Purpose | Where Used |
|---------|---------|------------|
| `AUTH0_DOMAIN` | Auth0 tenant | Backend, Frontend |
| `AUTH0_CLIENT_ID` | OAuth client ID | Frontend |
| `AUTH0_CLIENT_SECRET` | OAuth client secret | Backend only |
| `STRIPE_SECRET_KEY` | Stripe API key | Backend only |
| `STRIPE_WEBHOOK_SECRET` | Webhook signature verification | Backend only |
| `STRIPE_PUBLISHABLE_KEY` | Client-side Stripe | Frontend |

Never commit secrets. Use `.env.example` with placeholder values.
