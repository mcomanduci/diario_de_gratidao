# 📔 Diário de Gratidão

A modern, full-featured web application for recording and managing daily gratitude entries. Built with Next.js 16, React 19, and a focus on mental wellness and positive daily habits.

---

## Executive Summary

**Diário de Gratidão** (Gratitude Diary) is a privacy-focused journaling platform designed to help users cultivate gratitude and mindfulness through daily reflections. The application provides a secure, intuitive interface for creating, organizing, and reflecting on gratitude moments.

**Why it exists**: Research shows that practicing gratitude improves mental health, reduces stress, and enhances overall well-being. This application makes gratitude journaling accessible, engaging, and sustainable through features like streak tracking, categorization, visual enhancements, and insightful analytics.

**Key Differentiators**:
- 🔒 **Privacy-first**: All data is encrypted and user-controlled
- 🎨 **Modern UX**: Clean, responsive design with ambient sound support
- 📊 **Insights**: Visual analytics and gratitude statistics
- 🔄 **Seamless**: Real-time updates with optimistic UI patterns
- 🌐 **Serverless**: Scalable infrastructure with edge-ready architecture

---

## Architecture Overview

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Layer (Browser)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │  Next.js App │  │ React 19 UI  │  │  Client Components   │  │
│  │   (App Router)│  │  (RSC)       │  │  (Interactivity)     │  │
│  └──────┬───────┘  └──────┬───────┘  └──────────┬───────────┘  │
└─────────┼──────────────────┼─────────────────────┼──────────────┘
          │                  │                     │
          ▼                  ▼                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Next.js Server (Edge/Node)                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │ API Routes   │  │ Server       │  │  Server Actions      │  │
│  │ /api/*       │  │ Components   │  │  (Form Handlers)     │  │
│  └──────┬───────┘  └──────┬───────┘  └──────────┬───────────┘  │
└─────────┼──────────────────┼─────────────────────┼──────────────┘
          │                  │                     │
          ▼                  ▼                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Service Layer                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │ Better Auth  │  │ Drizzle ORM  │  │  Cloudinary SDK      │  │
│  │ (Auth Logic) │  │ (Data Layer) │  │  (Image Storage)     │  │
│  └──────┬───────┘  └──────┬───────┘  └──────────┬───────────┘  │
└─────────┼──────────────────┼─────────────────────┼──────────────┘
          │                  │                     │
          ▼                  ▼                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                      External Services                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │ Neon DB      │  │ Cloudinary   │  │  Resend (Email)      │  │
│  │ (PostgreSQL) │  │ (CDN/Media)  │  │  (Transactional)     │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### Core Modules & Components

#### 📁 **`/app`** - Application Routes (App Router)
- **`/dashboard`**: Main user dashboard with diary list, calendar, timeline views
- **`/configuracoes`**: User settings (profile, password management)
- **`/reset-password`**: Password reset flow
- **`/api/auth`**: Authentication endpoints (Better Auth)
- **`/api/send`**: Email sending API route

#### 📁 **`/actions`** - Server Actions
- **`auth.ts`**: Login, signup, password reset actions
- **`diarios.ts`**: CRUD operations for diary entries (create, read, update, delete)
- **`upload.ts`**: Cloudinary image upload handler
- **`user.ts`**: User profile management

#### 📁 **`/components`** - UI Components
- **`/dashboard`**: Dashboard-specific components (calendar, timeline, stats, charts)
- **`/login`**: Authentication forms and dialogs
- **`/configuracoes`**: Settings forms
- **`/ui`**: Reusable Shadcn UI components

#### 📁 **`/db`** - Database Layer
- **`schema.ts`**: Drizzle ORM schema definitions (user, session, diario tables)
- **`drizzle.ts`**: Database client initialization
- **`/migrations`**: SQL migration files

#### 📁 **`/lib`** - Shared Libraries
- **`auth.ts`**: Better Auth configuration
- **`auth-client.ts`**: Client-side auth utilities
- **`env.ts`**: Environment variable validation (Zod)
- **`email.ts`**: Email sending utilities (Resend)
- **`data.ts`**: Data fetching and caching utilities
- **`prompts.ts`**: Daily gratitude prompt generator

### Data Flow Example: Creating a Diary Entry

```
User fills form → Submit event → Server Action (createDiario)
                                         ↓
                        Validate with Zod schema
                                         ↓
                        Insert to DB via Drizzle ORM
                                         ↓
                        Update user streak logic
                                         ↓
                        Revalidate cache → Update UI
```

---

## Setup Guide

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v20.x or higher ([Download](https://nodejs.org/))
- **pnpm**: v9.x or higher (Install: `npm install -g pnpm`)
- **Git**: For cloning the repository
- **PostgreSQL**: Either local installation or use Neon (recommended)

### Environment Setup

You'll need accounts for the following services:

1. **Neon Database** ([neon.tech](https://neon.tech)) - PostgreSQL database
2. **Cloudinary** ([cloudinary.com](https://cloudinary.com)) - Image storage
3. **Resend** ([resend.com](https://resend.com)) - Email delivery

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/mcomanduci/diario_de_gratidao.git
cd diario_de_gratidao
```

#### 2. Install Dependencies

```bash
pnpm install
```

#### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Database
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"

# Authentication
BETTER_AUTH_SECRET="your-secret-key-min-32-characters-long"
BETTER_AUTH_URL="http://localhost:3000"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Email (Resend)
RESEND_API_KEY="re_your_resend_api_key"

# Public
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**Important**: Never commit `.env.local` to version control. It's already in `.gitignore`.

#### 4. Generate Database Schema

Run Drizzle migrations to create database tables:

```bash
pnpm drizzle-kit push
```

Or use the migration command:

```bash
pnpm drizzle-kit migrate
```

#### 5. Run Development Server

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Verify Installation

1. Navigate to `http://localhost:3000`
2. Click "Sign Up" to create a new account
3. Verify email functionality (check Resend dashboard)
4. Create your first diary entry
5. Upload an image to test Cloudinary integration

---

## Usage Guide

### Getting Started

#### 1. Create an Account

Navigate to the homepage and click **"Criar conta"** (Create account):

```typescript
// Example: User registration payload
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "SecurePassword123!"
}
```

#### 2. Login

After registration, login with your credentials:

- Email: `joao@example.com`
- Password: Your chosen password

#### 3. Create Your First Diary Entry

On the dashboard:

1. Click **"Novo Diário"** (New Diary)
2. Add a title (e.g., "Beautiful Sunrise")
3. Write your gratitude description
4. Select a category: `Família`, `Trabalho`, `Religioso`, or `Outros`
5. Upload an optional image
6. Click **"Salvar"** (Save)

### Dashboard Features

#### 📅 **Calendar View**
Switch to calendar mode to see all entries organized by date. Days with entries are highlighted.

#### 📊 **Statistics & Insights**
View your gratitude journey:
- **Current Streak**: Consecutive days with entries
- **Total Entries**: Lifetime diary count
- **Category Distribution**: Visual breakdown by type
- **Monthly Chart**: Entries per month with trends

#### 🔍 **Search & Filter**
- **Search**: Find entries by title or description
- **Filter by Type**: Show only specific categories
- **Date Range**: Filter entries by custom date ranges

#### 🎵 **Ambient Sounds** (Focus Mode)
Enable calming background sounds while writing:
- Rain sounds
- Forest ambiance
- Ocean waves
- White noise

### API Endpoints

#### Authentication Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/sign-in` | POST | User login |
| `/api/auth/sign-up` | POST | User registration |
| `/api/auth/sign-out` | POST | User logout |
| `/api/auth/reset-password` | POST | Request password reset |

#### Server Actions (Form Handlers)

```typescript
// Example: Creating a diary entry (from client component)
import { createDiario } from '@/actions/diarios';

const formData = {
  title: "Amazing Day",
  description: "Grateful for my supportive family",
  type: "Família",
  image: "https://res.cloudinary.com/..."
};

const result = await createDiario(formData);
```

### Example Usage Scenarios

#### Scenario 1: Daily Gratitude Routine

```typescript
// Morning routine: Create entry
const morningEntry = await createDiario({
  title: "Morning Coffee",
  description: "Grateful for a peaceful morning with coffee",
  type: "Outros",
  image: "uploaded-image-url"
});

// Evening routine: Review stats
const stats = await getUserStats();
console.log(`Current streak: ${stats.streak} days`);
```

#### Scenario 2: Monthly Review

```typescript
// Get all entries from last month
const lastMonth = await getDiarios({
  startDate: new Date('2025-10-01'),
  endDate: new Date('2025-10-31'),
  type: 'Família'
});

// Export data
const exportData = await exportUserData();
```

---

## Configuration

### Environment Variables

All environment variables are validated using Zod schemas in `/lib/env.ts`. Here's a detailed breakdown:

#### Database Configuration

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_URL` | ✅ Yes | PostgreSQL connection string | `postgresql://user:pass@host/db` |

**Setup Guide**:
1. Create a Neon database: [neon.tech](https://neon.tech)
2. Copy the connection string from dashboard
3. Ensure `?sslmode=require` is appended

#### Authentication Configuration

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `BETTER_AUTH_SECRET` | ✅ Yes | Secret key for JWT signing (min 32 chars) | `your-super-secret-key-here-32-chars` |
| `BETTER_AUTH_URL` | ✅ Yes | App URL for auth callbacks | `http://localhost:3000` |

**Generate Secret**:
```bash
# On Linux/Mac
openssl rand -base64 32

# On Windows (PowerShell)
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

#### Cloudinary Configuration

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `CLOUDINARY_CLOUD_NAME` | ✅ Yes | Your Cloudinary cloud name | `myapp-cloud` |
| `CLOUDINARY_API_KEY` | ✅ Yes | API key from dashboard | `123456789012345` |
| `CLOUDINARY_API_SECRET` | ✅ Yes | API secret (keep private!) | `abcdefghijklmnop` |

**Setup Guide**:
1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Navigate to Dashboard → Settings → API Keys
3. Create a new API key or use default
4. Copy Cloud Name, API Key, and API Secret

#### Email Configuration (Resend)

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `RESEND_API_KEY` | ✅ Yes | Resend API key (starts with `re_`) | `re_123abc456def` |

**Setup Guide**:
1. Sign up at [resend.com](https://resend.com)
2. Go to API Keys → Create API Key
3. Copy the key (shown only once!)

#### Public Configuration

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `NEXT_PUBLIC_APP_URL` | ✅ Yes | Public-facing app URL | `https://myapp.com` |

**Note**: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

### Configuration Files

#### `next.config.ts`

```typescript
// Image optimization
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "res.cloudinary.com",
      pathname: "/**",
    },
  ],
}

// Security headers
headers: [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
  // ... more security headers
]
```

#### `drizzle.config.ts`

```typescript
export default defineConfig({
  schema: "./db/schema.ts",      // Schema definitions
  out: "./db/migrations",        // Migration output
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
```

#### `biome.json` (Linting & Formatting)

```json
{
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "lineWidth": 80
  }
}
```

### Secrets Handling Best Practices

1. **Never commit secrets**: Always use `.env.local` (gitignored)
2. **Use secret managers**: For production, use Vercel Env Vars, AWS Secrets Manager, etc.
3. **Rotate secrets regularly**: Change API keys every 90 days
4. **Principle of least privilege**: Use read-only keys where possible
5. **Validate secrets**: Use Zod validation to catch missing vars early

#### Production Secret Management

**Vercel Deployment**:
```bash
# Add secrets via Vercel CLI
vercel env add DATABASE_URL
vercel env add BETTER_AUTH_SECRET
# ... add all other secrets
```

**Docker Deployment**:
```bash
# Use Docker secrets
docker secret create db_url /path/to/db_url.txt
```

---

## Testing

### Current Test Status

⚠️ **Note**: This project currently does not have a comprehensive test suite implemented. Testing infrastructure is planned for future releases.

### Recommended Testing Strategy

For contributors implementing tests, follow this approach:

#### Unit Tests (Jest + React Testing Library)

**Setup**:
```bash
pnpm add -D jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom
```

**Example Test Structure**:
```typescript
// __tests__/lib/utils.test.ts
import { cn } from '@/lib/utils';

describe('cn utility', () => {
  it('should merge class names correctly', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });
});
```

#### Integration Tests (Playwright)

**Setup**:
```bash
pnpm add -D @playwright/test
pnpm exec playwright install
```

**Example Test**:
```typescript
// e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test('user can sign up', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.click('text=Criar conta');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'Password123!');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');
});
```

#### API Tests (Server Actions)

```typescript
// __tests__/actions/diarios.test.ts
import { createDiario } from '@/actions/diarios';

describe('createDiario', () => {
  it('should create a diary entry', async () => {
    const result = await createDiario({
      title: 'Test Entry',
      description: 'Test description',
      type: 'Outros',
      image: 'https://res.cloudinary.com/test.jpg'
    });
    expect(result.success).toBe(true);
  });
});
```

### Running Tests (Future)

When tests are implemented:

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run E2E tests
pnpm test:e2e

# Generate coverage report
pnpm test:coverage
```

### Test Coverage Goals

Target coverage metrics:
- **Unit Tests**: 80%+ coverage for utilities and business logic
- **Integration Tests**: All critical user flows (auth, CRUD operations)
- **E2E Tests**: Happy paths for core features

---

## Deployment

### Local Deployment

Already covered in [Setup Guide](#setup-guide). Run:

```bash
pnpm dev  # Development server (port 3000)
```

### Production Build

#### Build the Application

```bash
# Create optimized production build
pnpm build

# Start production server
pnpm start
```

The build output will be in `.next/` directory.

### Deployment Platforms

#### Vercel (Recommended)

Vercel is the native platform for Next.js and offers the best experience.

**Deploy via CLI**:
```bash
# Install Vercel CLI
pnpm add -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

**Deploy via GitHub Integration**:
1. Push code to GitHub: `git push origin main`
2. Visit [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repository
4. Configure environment variables in Vercel dashboard
5. Deploy automatically on every push to `main`

**Environment Variables on Vercel**:
- Navigate to Project Settings → Environment Variables
- Add all variables from `.env.local`
- Set scope: Production, Preview, or Development

#### Docker Deployment

**Dockerfile** (create this file):

```dockerfile
FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# Build application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN corepack enable pnpm && pnpm build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]
```

**Build and Run**:
```bash
# Build Docker image
docker build -t diario-gratidao .

# Run container
docker run -p 3000:3000 \
  -e DATABASE_URL="your-db-url" \
  -e BETTER_AUTH_SECRET="your-secret" \
  diario-gratidao
```

#### Other Platforms

| Platform | Guide |
|----------|-------|
| **Netlify** | Use Next.js adapter: [docs](https://docs.netlify.com/integrations/frameworks/next-js/) |
| **AWS Amplify** | Follow Next.js SSR guide: [docs](https://docs.amplify.aws/guides/hosting/nextjs/) |
| **Railway** | Connect GitHub repo, auto-deploys: [railway.app](https://railway.app) |
| **DigitalOcean** | Use App Platform: [docs](https://docs.digitalocean.com/products/app-platform/) |

### CI/CD Setup

#### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          
      - name: Install pnpm
        run: npm install -g pnpm
        
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
        
      - name: Run linter
        run: pnpm lint
        
      - name: Build application
        run: pnpm build
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          BETTER_AUTH_SECRET: ${{ secrets.BETTER_AUTH_SECRET }}
          # ... add all other secrets
          
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

**Required Secrets** (GitHub Settings → Secrets):
- `DATABASE_URL`
- `BETTER_AUTH_SECRET`
- `CLOUDINARY_*` variables
- `RESEND_API_KEY`
- `VERCEL_TOKEN` (if using Vercel)

### Database Migrations in Production

**Before Deployment**:
```bash
# Generate migration files
pnpm drizzle-kit generate

# Review migrations in db/migrations/

# Apply migrations (in production environment)
pnpm drizzle-kit migrate
```

**Automated Migration** (in CI/CD):
```yaml
- name: Run Database Migrations
  run: pnpm drizzle-kit migrate
  env:
    DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

### Performance Optimization

- **Enable ISR**: Use `revalidate` for static pages
- **Image Optimization**: Already configured via Next.js Image
- **Caching**: Implement Redis for session/data caching
- **CDN**: Cloudinary handles image CDN automatically
- **Edge Functions**: Deploy auth endpoints to edge for lower latency

### Monitoring & Logging

**Recommended Tools**:
- **Sentry**: Error tracking ([sentry.io](https://sentry.io))
- **Vercel Analytics**: Built-in Web Vitals
- **LogRocket**: Session replay
- **DataDog**: APM and infrastructure monitoring

---

## Contributing Guide

We welcome contributions from the community! Follow these guidelines to ensure smooth collaboration.

### Getting Started

1. **Fork the Repository**: Click "Fork" on GitHub
2. **Clone Your Fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/diario_de_gratidao.git
   cd diario_de_gratidao
   ```
3. **Add Upstream Remote**:
   ```bash
   git remote add upstream https://github.com/mcomanduci/diario_de_gratidao.git
   ```

### Branching Strategy

We follow **Git Flow** branching model:

- **`main`**: Production-ready code (protected)
- **`develop`**: Integration branch for features (default branch)
- **`feature/*`**: New features (`feature/add-export-pdf`)
- **`bugfix/*`**: Bug fixes (`bugfix/fix-streak-calculation`)
- **`hotfix/*`**: Emergency production fixes (`hotfix/security-patch`)

#### Creating a Feature Branch

```bash
# Update your local main/develop
git checkout develop
git pull upstream develop

# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: add PDF export functionality"

# Push to your fork
git push origin feature/your-feature-name
```

### Commit Message Convention

We use **Conventional Commits** specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks (dependencies, config)

**Examples**:
```bash
feat(dashboard): add monthly gratitude chart
fix(auth): resolve password reset email not sending
docs(readme): update deployment instructions
refactor(actions): simplify diario CRUD operations
```

### Code Style & Linting

This project uses **Biome** for linting and formatting.

#### Before Committing

```bash
# Check for lint errors
pnpm lint

# Auto-fix issues
pnpm format
```

#### Editor Integration

**VS Code** (recommended):
1. Install "Biome" extension
2. Add to `.vscode/settings.json`:
   ```json
   {
     "editor.defaultFormatter": "biomejs.biome",
     "editor.formatOnSave": true,
     "editor.codeActionsOnSave": {
       "quickfix.biome": "explicit"
     }
   }
   ```

### Pull Request Process

1. **Ensure Your Branch is Up-to-Date**:
   ```bash
   git checkout develop
   git pull upstream develop
   git checkout feature/your-feature
   git rebase develop
   ```

2. **Run Pre-submission Checks**:
   ```bash
   pnpm lint        # No errors
   pnpm build       # Builds successfully
   # pnpm test      # (when tests are added)
   ```

3. **Push and Create PR**:
   ```bash
   git push origin feature/your-feature
   ```
   - Go to GitHub and click "Compare & pull request"
   - Target: `develop` branch (not `main`)
   - Fill out PR template with:
     - Description of changes
     - Related issue (if applicable)
     - Screenshots (for UI changes)
     - Testing steps

4. **PR Review Checklist**:
   - ✅ Code follows project conventions
   - ✅ No console.log or debugging code
   - ✅ TypeScript types are properly defined
   - ✅ Server actions include error handling
   - ✅ Changes are documented in code comments
   - ✅ No breaking changes (or clearly documented)

5. **Address Review Feedback**:
   ```bash
   # Make requested changes
   git add .
   git commit -m "fix: address PR feedback"
   git push origin feature/your-feature
   ```

### Testing Requirements

When tests are implemented, ensure:
- ✅ Unit tests for new utility functions
- ✅ Integration tests for new server actions
- ✅ E2E tests for new user flows
- ✅ All existing tests pass

### Documentation

Update documentation when:
- Adding new features → Update README
- Changing environment variables → Update Configuration section
- Adding new API endpoints → Update Usage Guide
- Fixing bugs → Add to Troubleshooting section

### Issue Reporting

**Bug Reports**: Use "Bug Report" template
- Describe the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots/logs
- Environment details (OS, browser, Node version)

**Feature Requests**: Use "Feature Request" template
- Problem statement
- Proposed solution
- Alternatives considered
- Additional context

---

## FAQ & Troubleshooting

### Frequently Asked Questions

#### Q: Can I self-host this application?
**A**: Yes! Follow the [Deployment](#deployment) guide for Docker or VPS deployment. Ensure you have your own database and service credentials.

#### Q: Is my data encrypted?
**A**: Yes. Passwords are hashed with bcrypt, and database connections use SSL. For additional encryption, consider enabling database-level encryption on Neon.

#### Q: Can I export my data?
**A**: Yes! Use the "Export Data" feature in the dashboard settings to download all your entries as JSON.

#### Q: What's the maximum image size for uploads?
**A**: Cloudinary enforces limits based on your plan. Free tier: 10MB per image, 25GB total storage.

#### Q: How is the streak calculated?
**A**: Streaks increment when you create at least one entry per day. Missing a day resets the streak to 0.

#### Q: Can I use this offline?
**A**: Currently, no. The app requires an internet connection. Offline support with sync is planned for future releases.

### Common Errors & Fixes

#### Error: `DATABASE_URL environment variable is not set`

**Cause**: Missing or invalid `.env.local` file.

**Fix**:
1. Create `.env.local` in project root
2. Add `DATABASE_URL="your-connection-string"`
3. Restart dev server: `pnpm dev`

#### Error: `Invalid Cloudinary URL`

**Cause**: Image upload failed or wrong Cloudinary configuration.

**Fix**:
1. Verify Cloudinary credentials in `.env.local`
2. Check Cloudinary dashboard for upload errors
3. Ensure `CLOUDINARY_CLOUD_NAME` matches your cloud name exactly

#### Error: `Session expired` or `Unauthorized`

**Cause**: Session token expired or `BETTER_AUTH_SECRET` changed.

**Fix**:
1. Clear browser cookies for localhost
2. Log in again
3. If persists, regenerate `BETTER_AUTH_SECRET` and restart server

#### Error: `Failed to send email`

**Cause**: Invalid Resend API key or domain not verified.

**Fix**:
1. Verify `RESEND_API_KEY` starts with `re_`
2. Check Resend dashboard for domain verification status
3. Ensure sending domain is verified (use resend.dev sandbox for testing)

#### Error: Build fails with TypeScript errors

**Cause**: Type inconsistencies or missing type definitions.

**Fix**:
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
pnpm install

# Rebuild
pnpm build
```

#### Error: `Hydration mismatch` in browser console

**Cause**: Server and client rendering mismatch, often due to date/time differences.

**Fix**:
- Ensure date formatting is consistent
- Use `suppressHydrationWarning` attribute for dynamic content
- Check for environment-specific code running on server

#### Error: Images not displaying (404)

**Cause**: Incorrect Next.js image configuration or Cloudinary URL.

**Fix**:
1. Verify `next.config.ts` includes Cloudinary domain:
   ```typescript
   images: {
     remotePatterns: [
       { protocol: "https", hostname: "res.cloudinary.com" }
     ]
   }
   ```
2. Restart dev server after config changes

#### Database Migration Issues

**Error**: `Migration failed: table already exists`

**Fix**:
```bash
# Reset database (⚠️ DESTROYS DATA)
pnpm drizzle-kit drop

# Rerun migrations
pnpm drizzle-kit push
```

**Error**: `Schema drift detected`

**Fix**:
```bash
# Generate new migration
pnpm drizzle-kit generate

# Apply migration
pnpm drizzle-kit migrate
```

### Performance Issues

#### Slow Dashboard Load

**Diagnosis**:
- Check network tab: Is database query slow?
- Check server logs for errors

**Solutions**:
1. Add database indexes (already configured in schema)
2. Implement pagination for large diary lists
3. Use React Suspense boundaries

#### Image Upload Takes Too Long

**Solutions**:
1. Compress images before upload (use Cloudinary transformations)
2. Show upload progress indicator
3. Consider client-side image compression

---

## License and Credits

### License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2025 Mateo Comanduci

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### Credits & Acknowledgments

#### Project Creator
- **Mateo Comanduci** ([@mcomanduci](https://github.com/mcomanduci)) - Original author and maintainer

#### Open Source Dependencies

This project is built on the shoulders of amazing open-source projects:

| Library | Purpose | License |
|---------|---------|---------|
| [Next.js](https://nextjs.org/) | React framework | MIT |
| [React](https://react.dev/) | UI library | MIT |
| [Drizzle ORM](https://orm.drizzle.team/) | Database ORM | Apache 2.0 |
| [Better Auth](https://www.better-auth.com/) | Authentication | MIT |
| [Shadcn UI](https://ui.shadcn.com/) | Component library | MIT |
| [Tailwind CSS](https://tailwindcss.com/) | CSS framework | MIT |
| [Zod](https://zod.dev/) | Schema validation | MIT |
| [Biome](https://biomejs.dev/) | Linter & formatter | MIT |
| [Lucide Icons](https://lucide.dev/) | Icon library | ISC |

#### Special Thanks

- **Vercel Team** - For creating Next.js and hosting platform
- **Neon Team** - For serverless PostgreSQL infrastructure
- **Cloudinary** - For image management platform
- **Resend** - For developer-friendly email API
- **Open Source Community** - For continuous inspiration and contributions

#### Design Inspiration

- **Calm App** - Meditation and wellness UX patterns
- **Day One** - Premium journaling experience
- **Notion** - Clean, modern interface design

#### Contributing

Special thanks to all contributors who have helped improve this project. See [CONTRIBUTORS.md](./CONTRIBUTORS.md) for a full list.

---

## Support & Community

### Getting Help

- **Documentation**: Read this README thoroughly
- **GitHub Issues**: Report bugs or request features
- **GitHub Discussions**: Ask questions and share ideas

### Stay Updated

- ⭐ **Star this repo** to stay notified of updates
- 👀 **Watch releases** for new versions
- 🐦 **Follow the author** for project updates

### Roadmap

Planned features for future releases:

- [ ] **V2.0**: Enhanced gratitude prompts and AI insights
- [ ] **V2.1**: Mobile app (React Native)
- [ ] **V2.2**: Social features (share gratitude with friends)
- [ ] **V2.3**: Gratitude challenges and achievements
- [ ] **V2.4**: Export to PDF with custom templates
- [ ] **V3.0**: Offline-first with sync capabilities

---

## Quick Start Checklist

For quick reference when setting up:

- [ ] Node.js 20+ and pnpm installed
- [ ] Repository cloned and dependencies installed (`pnpm install`)
- [ ] `.env.local` created with all required variables
- [ ] Neon database created and `DATABASE_URL` configured
- [ ] Cloudinary account created and API keys added
- [ ] Resend account created and API key added
- [ ] Database migrations run (`pnpm drizzle-kit push`)
- [ ] Development server running (`pnpm dev`)
- [ ] Account created and first diary entry added
- [ ] Image upload tested successfully

---

**Happy gratitude journaling! 🙏✨**

*Made with ❤️ by the open-source community*
