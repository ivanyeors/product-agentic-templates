# Deployment Guide

## Platform Quick Reference

| Platform | Best For | Deploy Method |
|----------|----------|---------------|
| Vercel | Next.js, React SPAs | Git push → auto deploy |
| Netlify | Static sites, SPAs | Git push → auto deploy |
| Railway | Full-stack, containers | Git push or Docker |
| Render | Web services, Docker | Git push or Docker |
| AWS (Amplify/S3+CF) | Enterprise, custom infra | CI/CD pipeline |
| GCP (Cloud Run) | Containerized services | Docker + CI/CD |

---

## CI/CD Patterns

### GitHub Actions — Full Pipeline

```yaml
# .github/workflows/deploy.yml
name: CI/CD

on:
  push:
    branches: [main, staging]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '20'

jobs:
  test:
    name: Test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test -- --coverage
      - name: Upload coverage
        uses: actions/upload-artifact@v4
        with:
          name: coverage
          path: coverage/

  build:
    name: Build
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      - run: npm ci
      - run: npm run build
        env:
          NEXT_PUBLIC_API_URL: ${{ secrets.NEXT_PUBLIC_API_URL }}
      - uses: actions/upload-artifact@v4
        with:
          name: build
          path: .next/

  deploy-staging:
    name: Deploy to Staging
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/staging'
    environment: staging
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to staging
        run: |
          # Platform-specific deploy command
          # Vercel: vercel deploy --token=${{ secrets.VERCEL_TOKEN }}
          # Railway: railway deploy
          echo "Deploy to staging"

  deploy-production:
    name: Deploy to Production
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment:
      name: production
      url: https://your-domain.com
    # Requires manual approval via GitHub Environment protection rules
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to production
        run: echo "Deploy to production"
        env:
          DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}
```

### Preview Deployments (PR Comments)

```yaml
  deploy-preview:
    name: Preview Deploy
    needs: build
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/checkout@v4
      - name: Deploy preview
        id: preview
        run: |
          # vercel deploy --token=${{ secrets.VERCEL_TOKEN }}
          echo "preview_url=https://preview.example.com" >> $GITHUB_OUTPUT
      - name: Comment PR
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '🚀 Preview deployed: ${{ steps.preview.outputs.preview_url }}'
            })
```

---

## Environment Configuration

### Environment Chain

```
local → development (auto-deploy from main) → staging → production
```

### Environment Variables Pattern

```bash
# .env.example (committed to git — no real values)
NEXT_PUBLIC_APP_NAME=MyApp
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_SENTRY_DSN=

# Server-side only (no NEXT_PUBLIC_ prefix)
DATABASE_URL=
JWT_SECRET=
STRIPE_SECRET_KEY=
```

### Secrets Management

| Platform | Secrets Tool |
|----------|-------------|
| GitHub Actions | GitHub Secrets (Settings → Secrets) |
| Vercel | Vercel Environment Variables |
| AWS | AWS Secrets Manager or Parameter Store |
| GCP | Google Secret Manager |
| Self-hosted | HashiCorp Vault or Doppler |

**Rules:**
- Never commit real values to `.env.*` files (only `.env.example`)
- Rotate secrets on every team member departure
- Use different secrets per environment — never share production secrets with staging

---

## Vercel Deployment (Next.js)

```bash
# Install Vercel CLI
npm i -g vercel

# Link project
vercel link

# Deploy to staging
vercel deploy --env NODE_ENV=staging

# Deploy to production
vercel deploy --prod
```

Key configuration (`vercel.json`):
```json
{
  "github": {
    "autoAlias": true
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    },
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "no-store" }
      ]
    }
  ]
}
```

---

## Infrastructure as Code

### Terraform (AWS example — minimal S3 + CloudFront static hosting)

```hcl
# main.tf
terraform {
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 5.0" }
  }
  backend "s3" {
    bucket = "my-terraform-state"
    key    = "frontend/terraform.tfstate"
    region = "us-east-1"
  }
}

resource "aws_s3_bucket" "frontend" {
  bucket = "my-app-frontend-${var.environment}"
}

resource "aws_cloudfront_distribution" "frontend" {
  origin {
    domain_name = aws_s3_bucket.frontend.bucket_regional_domain_name
    origin_id   = "S3-frontend"
  }
  default_cache_behavior {
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "S3-frontend"
    compress               = true
  }
  enabled = true
}
```

---

## Observability

### Error Tracking (Sentry)

```typescript
// app/layout.tsx (Next.js)
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  integrations: [
    Sentry.replayIntegration(),
  ],
  beforeSend(event) {
    // Filter out known non-actionable errors
    if (event.exception?.values?.[0]?.value?.includes('ResizeObserver')) {
      return null
    }
    return event
  },
})
```

### Uptime Monitoring

Options:
- **Betterstack / Uptime Robot** — external HTTP checks every 1 minute
- **Checkly** — synthetic monitoring with browser tests
- **AWS CloudWatch Synthetics** — if on AWS

Alert on:
- Endpoint returning non-2xx for 2+ consecutive checks
- Response time > 5s for 3+ consecutive checks

### Real User Monitoring (Core Web Vitals)

```typescript
// app/layout.tsx — Web Vitals reporting
import { onCLS, onINP, onLCP } from 'web-vitals'

function sendToAnalytics(metric: { name: string; value: number }) {
  // Send to your analytics endpoint or Datadog/Vercel Analytics
  fetch('/api/analytics/vitals', {
    method: 'POST',
    body: JSON.stringify(metric),
    keepalive: true,
  })
}

onCLS(sendToAnalytics)
onINP(sendToAnalytics)
onLCP(sendToAnalytics)
```

### Alert Thresholds

| Metric | Warning | Critical |
|--------|---------|----------|
| Error rate | > 0.1% | > 1% |
| P95 response time | > 1s | > 3s |
| Uptime | < 99.9% | < 99% |
| LCP (RUM) | > 2.5s | > 4s |
| CLS (RUM) | > 0.1 | > 0.25 |

---

## Security Headers

Required headers for every production deployment:

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: [define appropriate policy]
```

Verify with: [securityheaders.com](https://securityheaders.com)
