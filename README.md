# Nivedan P S — Developer Portfolio

A modern, high-performance full-stack developer portfolio built with React 19, TypeScript, Express 5, Tailwind CSS, Three.js, and Nodemailer.

---

## 🛠️ Technology Stack

- **Frontend:** React 19, Vite 7, Tailwind CSS v4, Framer Motion, Three.js, `@react-three/fiber`, Lucide React, Radix UI.
- **Backend:** Node.js (>= 20.6.0), Express 5, Nodemailer (Gmail SMTP SSL), Zod.
- **Shared:** TypeScript shared schemas and types.
- **Build & Dev Tooling:** esbuild, tsx, Vite, TypeScript.

---

## 🏗️ Project Structure

```
nivedan-react-portfolio/
├── frontend/             # Client-side React 19 SPA
│   ├── public/           # Static public assets (resume PDF, profile, favicon)
│   ├── src/
│   │   ├── components/   # UI primitives (ui/), 3D canvas (3d/), layout (layout/)
│   │   ├── sections/     # Individual page sections (Home, About, Projects, etc.)
│   │   ├── hooks/        # Custom React hooks (use-toast, use-mobile)
│   │   ├── lib/          # Client API callers & data registry (data.ts, contact.ts, github.ts)
│   │   ├── providers/    # Theme and context providers (ThemeProvider.tsx)
│   │   ├── styles/       # Global CSS & Tailwind CSS tokens (index.css)
│   │   ├── App.tsx       # Root component and router
│   │   └── main.tsx      # DOM mount point
│   └── index.html        # HTML shell
│
├── backend/              # Server-side Express API
│   └── src/
│       ├── config/       # Environment & runtime configuration
│       ├── controllers/  # Request handlers (contact.controller, github.controller)
│       ├── middleware/   # Rate limiting, logging, error handling, Vite/static serving
│       ├── routes/       # Express route definitions (/api/contact, /api/github)
│       ├── services/     # Business logic (email.service, github.service)
│       ├── storage/      # Persistence layer (storage.ts)
│       ├── app.ts        # Express app initialization
│       └── index.ts      # Server entry point & port listener
│
├── shared/               # Shared TypeScript definitions & contracts
│   ├── schemas/          # Zod validation schemas (contact.schema, user.schema)
│   └── types/            # TypeScript models (contact.types, github.types, user.types)
│
├── tests/                # Automated test suites
│   ├── contact/          # Comprehensive contact form & rate limiting tests
│   ├── email/            # Nodemailer SMTP configuration & template unit tests
│   └── integration/      # End-to-end integration tests
│
├── scripts/              # Production build scripts
│   └── build.ts          # Bundles Vite client to dist/public and backend via esbuild
│
└── [Root Configs]        # package.json, tsconfig.json, vite.config.ts, .env.example
```

---

## 📋 Prerequisites

- **Node.js:** `>= 20.6.0` (required for native `process.loadEnvFile()` support)
- **Package Manager:** `npm` `>= 9.0.0`

Check your installed versions:
```bash
node -v
npm -v
```

---

## 🚀 Local Development Setup

### 1. Install Dependencies
```bash
npm ci
```

### 2. Configure Environment Variables
Copy the example environment file to `.env`:
```bash
cp .env.example .env
```

Configure your variables in `.env`:
```env
PORT=4000
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
CONTACT_RECEIVER_EMAIL=your-recipient-email@gmail.com
```

> **Note on Gmail App Password:** Generate a 16-character App Password from [Google Account Security](https://myaccount.google.com/security) > 2-Step Verification > App passwords. Never use your main Google account password.

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:4000](http://localhost:4000) in your browser.

---

## 🧪 Testing Commands

Run all verification suites:
```bash
# Type check all TypeScript files (frontend, backend, shared, tests)
npm run check

# Run automated unit and integration tests (mock transport, no real emails sent)
npm test
```

---

## 📦 Production Build & Run

### 1. Build for Production
```bash
npm run build
```
This builds:
- Frontend assets into `dist/public/` (Vite client build, minified, gzip-optimized)
- Backend server bundle into `dist/index.cjs` (esbuild CJS bundle, minified)

### 2. Run the Production Server
```bash
npm start
```
The unified Express server serves both the frontend static assets and backend API on the configured `PORT`.

---

## 🌐 Production Hosting Instructions

The application is structured for single-container / single-process deployment where Express serves the static frontend and handles API endpoints simultaneously.

### Deployment Commands
- **Install Command:** `npm ci`
- **Build Command:** `npm run build`
- **Start Command:** `npm start`

### Production Environment Variables

| Variable | Required | Description |
| :--- | :---: | :--- |
| `NODE_ENV` | Yes | Set to `production` |
| `PORT` | Yes | Port assigned by the host (e.g. `8080`, `3000`, `5000`) |
| `GMAIL_USER` | Yes | Gmail address used for sending contact notification emails |
| `GMAIL_APP_PASSWORD` | Yes | 16-character Google App Password (spaces are stripped automatically) |
| `CONTACT_RECEIVER_EMAIL` | No | Destination inbox (defaults to `GMAIL_USER` if omitted) |
| `TRUST_PROXY` | No | Set to `1` or `true` if behind reverse proxies (Cloudflare, Nginx, Render) |
| `GITHUB_TOKEN` | No | GitHub Personal Access Token to avoid public REST API rate limits |

### Platform-Specific Guides

#### Render (Web Service)
1. Create a **New Web Service** pointing to your repository.
2. Set **Environment:** `Node`.
3. Set **Build Command:** `npm ci && npm run build`.
4. Set **Start Command:** `npm start`.
5. Under **Environment Variables**, add `NODE_ENV=production`, `GMAIL_USER`, `GMAIL_APP_PASSWORD`.

#### Railway
1. Create a **New Project** and connect your GitHub repo.
2. Railway detects Node automatically. Under Service Settings:
   - **Build Command:** `npm ci && npm run build`
   - **Start Command:** `npm start`
3. Add your environment variables in Railway's **Variables** tab.

#### Fly.io / VPS / Docker
1. Use an official Node.js 20+ base image (`node:20-alpine` or `node:22-alpine`).
2. Run `npm ci && npm run build`.
3. Expose the container port and execute `npm start`.

---

## 🛡️ Security & Rate Limiting Features

- **Honeypot Spam Trap:** A hidden `_hp` field silently traps spam bots without sending emails or consuming visitor rate limits.
- **In-Memory Rate Limiting:** Enforces up to 5 legitimate submissions per 15 minutes per visitor IP.
- **Automatic Quota Rollback:** If a mail server error occurs, the quota slot is immediately restored so legitimate users are not penalized.
- **RFC-Compliant `Retry-After`:** HTTP 429 responses return a `Retry-After` header indicating seconds until the window resets.
- **HTML XSS Escaping:** Input fields are sanitized with entity escaping before insertion into HTML email templates.
- **Safe Secrets Handling:** Credentials exist only in server-side environment variables and are never bundled into client assets or leaked in API responses.

---

## 🔧 Common Troubleshooting

1. **Port in use (`EADDRINUSE: address already in use`):**
   - On macOS, AirPlay Receiver frequently occupies port 5000. Start with an alternative port: `PORT=4000 npm run dev`.
2. **Gmail SMTP Authentication Error (`535-5.7.8`):**
   - Ensure 2-Step Verification is active on your Google account.
   - Use an **App Password**, not your personal Google account password.
   - Whitespace in the password string is stripped automatically by the server.
3. **GitHub API Rate Limit (`403 rate limit exceeded`):**
   - Unauthenticated GitHub requests have a limit of 60 requests/hour per IP.
   - Add a `GITHUB_TOKEN` in your `.env` to increase the limit to 5,000 requests/hour.
4. **Browser PDF Download:**
   - Resumes are served directly from `dist/public/resume.pdf` with native browser viewing and download support.
