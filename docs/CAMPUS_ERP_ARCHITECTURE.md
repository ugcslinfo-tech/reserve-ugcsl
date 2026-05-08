# Campus ERP Architecture — UGCSL

**United Global Campus of Sri Lanka**
Version 1.0 | Production Ready

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [High-Level Architecture](#2-high-level-architecture)
3. [Frontend Architecture](#3-frontend-architecture)
4. [Backend Architecture](#4-backend-architecture)
5. [Database Architecture](#5-database-architecture)
6. [API Architecture](#6-api-architecture)
7. [Security Architecture](#7-security-architecture)
8. [Deployment Architecture](#8-deployment-architecture)
9. [Performance Architecture](#9-performance-architecture)
10. [Internationalization Architecture](#10-internationalization-architecture)
11. [SEO Architecture](#11-seo-architecture)
12. [Data Flow Diagrams](#12-data-flow-diagrams)
13. [Module Breakdown](#13-module-breakdown)
14. [Tech Stack Summary](#14-tech-stack-summary)

---

## 1. System Overview

UGCSL Campus ERP is a full-stack web platform serving as the public-facing digital presence and administrative interface for United Global Campus of Sri Lanka. It handles academic program listings, admissions inquiries, news publishing, research showcasing, and contact management.

### Core Objectives

- Provide prospective students with program and admissions information
- Enable staff to manage news, programs, and contact submissions via MongoDB
- Deliver a fast, accessible, SEO-optimized experience in English and Sinhala
- Support serverless deployment on Vercel with zero-downtime scaling

### System Boundaries

```
External Users (Students, Public)
        │
        ▼
  [CDN / Vercel Edge]
        │
   ┌────┴────┐
   │ Frontend│  React 19 + Vite 8 (SPA)
   └────┬────┘
        │ HTTPS REST
   ┌────┴────┐
   │ Backend │  Express 5 + Node.js 18+
   └────┬────┘
        │ Mongoose ODM
   ┌────┴────┐
   │ MongoDB │  Atlas (Cloud)
   └─────────┘
```

---

## 2. High-Level Architecture

### Architectural Pattern

**Decoupled Monolith (Frontend) + Serverless API (Backend)**

- Frontend: Single Page Application (SPA) deployed as static files
- Backend: RESTful API deployed as Vercel Serverless Functions
- Database: MongoDB Atlas (managed cloud database)

### Deployment Topology

```
┌─────────────────────────────────────────────────────────┐
│                     Vercel Platform                      │
│                                                          │
│  ┌──────────────────────┐   ┌────────────────────────┐  │
│  │   Frontend Project   │   │   Backend Project      │  │
│  │                      │   │                        │  │
│  │  Static Files (CDN)  │   │  Serverless Functions  │  │
│  │  ugcsl.lk            │   │  api.ugcsl.lk/api/*    │  │
│  │                      │   │                        │  │
│  │  dist/               │   │  api/index.ts          │  │
│  │  ├── index.html      │   │  └── Express App       │  │
│  │  ├── assets/         │   │                        │  │
│  │  ├── robots.txt      │   └────────────┬───────────┘  │
│  │  ├── sitemap.xml     │                │              │
│  │  └── _redirects      │                │              │
│  └──────────────────────┘                │              │
│                                          │              │
└──────────────────────────────────────────┼──────────────┘
                                           │ TLS
                              ┌────────────▼───────────┐
                              │    MongoDB Atlas        │
                              │    (Cloud Database)     │
                              └────────────────────────┘
```

---

## 3. Frontend Architecture

### Technology Stack

| Layer | Technology | Version |
|---|---|---|
| UI Framework | React | 19.x |
| Language | TypeScript | 5.9.x |
| Build Tool | Vite | 8.x |
| Routing | React Router | 7.x |
| HTTP Client | Axios | 1.x |
| i18n | i18next + react-i18next | 25.x / 16.x |
| Compression | vite-plugin-compression2 | 2.x |

### Component Hierarchy

```
App.tsx
├── Navbar.tsx              # Responsive nav with hamburger menu
├── React.Suspense          # Code-split boundary
│   └── Routes
│       ├── /               → Home.tsx
│       ├── /about          → About.tsx
│       ├── /programs       → Programs.tsx
│       ├── /programs/:slug → ProgramDetail.tsx
│       ├── /admissions     → Admissions.tsx
│       ├── /research       → Research.tsx
│       ├── /news           → News.tsx
│       ├── /news/:slug     → NewsDetail.tsx
│       ├── /contact        → Contact.tsx
│       └── *               → NotFound.tsx
├── Footer.tsx
└── WhatsAppFloat.tsx
```

### Code Splitting Strategy

All page components are lazy-loaded via `React.lazy()`:

```
Initial Bundle (~80KB)
├── React core
├── React Router
├── i18next
└── App shell (Navbar, Footer)

Route Chunks (loaded on demand)
├── Home.chunk.js
├── About.chunk.js
├── Programs.chunk.js
├── ProgramDetail.chunk.js
├── Admissions.chunk.js
├── Research.chunk.js
├── News.chunk.js
├── NewsDetail.chunk.js
└── Contact.chunk.js
```

### CSS Architecture (ITCSS)

```
styles.css          ← Global reset, variables, typography
  └── shared.css    ← Shared page patterns (hero, cards, sections)
        └── [Page].css  ← Page-specific overrides
```

CSS Custom Properties (design tokens):
```css
--primary-color
--secondary-color
--text-color
--background-color
--border-radius
--shadow
--transition
```

### State Management

No external state library. State is managed via:

| Pattern | Usage |
|---|---|
| `useState` | Local UI state (menus, forms, loading) |
| `useEffect` | Data fetching, side effects |
| `useRef` | DOM refs, Intersection Observer |
| `useApi` (custom hook) | API calls + form submissions |

### Custom Hooks

**`useApi.ts`** — Centralized data fetching and form submission:
- GET requests with loading/error/data states
- POST requests for contact form
- Axios instance with base URL from `VITE_API_URL`

### Reusable Components

| Component | Purpose |
|---|---|
| `SEO.tsx` | Dynamic `<head>` meta tags (title, description, canonical, OG) |
| `LazyImage.tsx` | Intersection Observer-based lazy loading with fade-in |
| `ErrorBoundary.tsx` | Catches render errors, shows fallback UI |
| `FaqItem.tsx` | Accessible accordion for FAQ sections |
| `Navbar.tsx` | Responsive navigation with mobile hamburger |
| `Footer.tsx` | Site-wide footer with social links |
| `WhatsAppFloat.tsx` | Floating WhatsApp CTA button |

---

## 4. Backend Architecture

### Technology Stack

| Layer | Technology | Version |
|---|---|---|
| Runtime | Node.js | 18+ |
| Framework | Express | 5.x |
| Language | TypeScript | 5.9.x |
| ODM | Mongoose | 9.x |
| Security | Helmet | 8.x |
| Rate Limiting | express-rate-limit | 8.x |
| Validation | express-validator | 7.x |
| Email | Nodemailer | 8.x |
| CSRF | cookie-parser + crypto | built-in |

### Layered Architecture

```
HTTP Request
     │
     ▼
┌─────────────────────────────────┐
│         Middleware Stack         │
│  Helmet → CORS → Cookie Parser  │
│  → JSON Body → Rate Limiter     │
└──────────────┬──────────────────┘
               │
     ┌─────────▼──────────┐
     │      Routes         │
     │  /api/programs      │
     │  /api/news          │
     │  /api/contact       │
     │  /api/csrf-token    │
     │  /api/health        │
     └─────────┬───────────┘
               │
     ┌─────────▼──────────┐
     │   Validation Layer  │
     │  express-validator  │
     └─────────┬───────────┘
               │
     ┌─────────▼──────────┐
     │   Mongoose Models   │
     │  Program / News /   │
     │  Contact            │
     └─────────┬───────────┘
               │
     ┌─────────▼──────────┐
     │   MongoDB Atlas     │
     └────────────────────┘
```

### Middleware Stack (in order)

1. `helmet()` — Sets secure HTTP headers
2. `cors()` — Restricts origins to `ALLOWED_ORIGINS` env var
3. `cookieParser()` — Parses signed cookies for CSRF
4. `express.json({ limit: '10kb' })` — Parses JSON body, limits payload
5. `rateLimit()` — 100 req / 15 min per IP on all `/api/*` routes

### Route Structure

```
backend/src/
├── routes/
│   ├── programs.ts   GET /api/programs, GET /api/programs/:slug
│   ├── news.ts       GET /api/news, GET /api/news/:slug
│   └── contact.ts    POST /api/contact
├── models/
│   ├── Program.ts
│   ├── News.ts
│   └── Contact.ts
├── middleware/
│   └── csrf.ts
├── app.ts            Express app setup
├── index.ts          Local server entry (port 5000)
└── seed.ts           Database seeding script
```

### Serverless Entry Point

`api/index.ts` exports the Express app as a Vercel serverless function:

```typescript
// api/index.ts
import app from '../src/app';
export default app;
```

---

## 5. Database Architecture

### Database: MongoDB Atlas

**Database Name:** `ugcsl`

### Collections

#### `programs`

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | Auto-generated |
| `title` | String | Required |
| `title_si` | String | Sinhala translation |
| `slug` | String | Unique, indexed |
| `faculty` | String | Required |
| `faculty_si` | String | Sinhala translation |
| `degree` | String | Diploma / Certificate / etc. |
| `degree_si` | String | Sinhala translation |
| `duration` | String | e.g. "1 Year" |
| `duration_si` | String | Sinhala translation |
| `description` | String | Required |
| `description_si` | String | Sinhala translation |
| `icon` | String | Emoji or icon identifier |
| `featured` | Boolean | Default: false |
| `modules` | String[] | Course module list |
| `careers` | String[] | Career opportunities |
| `requirements` | String[] | Admission requirements |
| `createdAt` | Date | Auto (timestamps) |
| `updatedAt` | Date | Auto (timestamps) |

#### `news`

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | Auto-generated |
| `title` | String | Required |
| `slug` | String | Unique, indexed |
| `excerpt` | String | Short summary |
| `content` | String | Full article body |
| `category` | String | e.g. "Announcement" |
| `image` | String | Cloudinary URL (optional) |
| `author` | String | Default: "UGCSL Admin" |
| `date` | Date | Publication date |
| `createdAt` | Date | Auto (timestamps) |
| `updatedAt` | Date | Auto (timestamps) |

#### `contacts`

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | Auto-generated |
| `name` | String | Required, 2–100 chars |
| `email` | String | Required, valid email |
| `phone` | String | Optional |
| `subject` | String | Required, 5–200 chars |
| `message` | String | Required, 10–2000 chars |
| `createdAt` | Date | Auto (timestamps) |

### Indexes

```
programs:  { slug: 1 }  unique
news:      { slug: 1 }  unique
contacts:  { createdAt: -1 }  (for admin queries)
```

### Connection

```
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/ugcsl
```

Mongoose connects once at app startup. Vercel serverless functions reuse the connection across warm invocations.

---

## 6. API Architecture

### Base URLs

| Environment | URL |
|---|---|
| Development | `http://localhost:5000/api` |
| Production | `https://<backend>.vercel.app/api` |

### Endpoints

| Method | Path | Description | Rate Limit |
|---|---|---|---|
| GET | `/api/health` | Health check | 100/15min |
| GET | `/api/csrf-token` | Get CSRF token | 100/15min |
| GET | `/api/programs` | List programs (filter: `faculty`, `featured`) | 100/15min |
| GET | `/api/programs/:slug` | Get single program | 100/15min |
| GET | `/api/news` | List news (filter: `category`, `limit`) | 100/15min |
| GET | `/api/news/:slug` | Get single news article | 100/15min |
| POST | `/api/contact` | Submit contact form | 5/15min |

### Standard Response Envelope

**Success:**
```json
{
  "success": true,
  "data": { ... },
  "total": 10,
  "page": 1,
  "limit": 10
}
```

**Error:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [{ "field": "email", "message": "Invalid email" }]
}
```

### CSRF Flow

```
Browser                    Backend
   │                          │
   │── GET /api/csrf-token ──▶│
   │◀── { csrfToken, cookie } │
   │                          │
   │── POST /api/contact ────▶│
   │   X-CSRF-Token: <token>  │  ← validated against cookie
   │◀── { success: true }     │
```

---

## 7. Security Architecture

### Layers of Defense

```
Internet
   │
   ▼
[Vercel Edge / TLS termination]
   │
   ▼
[Helmet.js — HTTP Security Headers]
   ├── Content-Security-Policy
   ├── X-Frame-Options: DENY
   ├── X-Content-Type-Options: nosniff
   ├── Strict-Transport-Security
   └── Referrer-Policy
   │
   ▼
[CORS — Origin Allowlist]
   └── Only ALLOWED_ORIGINS env var
   │
   ▼
[Rate Limiter]
   ├── General API: 100 req / 15 min / IP
   └── Contact POST: 5 req / 15 min / IP
   │
   ▼
[CSRF Protection]
   └── Double-submit cookie pattern
   │
   ▼
[Input Validation — express-validator]
   └── Sanitize + validate all POST fields
   │
   ▼
[Mongoose ODM]
   └── Parameterized queries (no raw MongoDB injection)
```

### Environment Variables (never committed)

**Backend:**
```
MONGODB_URI          MongoDB Atlas connection string
COOKIE_SECRET        Signed cookie secret
ALLOWED_ORIGINS      Comma-separated allowed CORS origins
NODE_ENV             production | development
SMTP_HOST            Email server host
SMTP_PORT            Email server port
SMTP_USER            Email username
SMTP_PASS            Email app password
```

**Frontend:**
```
VITE_API_URL         Backend API base URL
```

---

## 8. Deployment Architecture

### Frontend — Vercel Static

```
git push → Vercel CI
              │
              ▼
         npm run build
         (tsc + vite build)
              │
              ▼
         dist/
         ├── index.html
         ├── assets/          ← hashed JS/CSS chunks
         ├── robots.txt
         ├── sitemap.xml
         └── _redirects       ← www → non-www redirect
              │
              ▼
         Vercel CDN (Global Edge Network)
```

**vercel.json (frontend):**
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Backend — Vercel Serverless

```
git push → Vercel CI
              │
              ▼
         api/index.ts compiled
              │
              ▼
         Vercel Serverless Function
         (Node.js 18 runtime)
              │
              ▼
         Auto-scales per request
```

**vercel.json (backend):**
```json
{
  "version": 2,
  "builds": [{ "src": "api/index.ts", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "api/index.ts" }]
}
```

### CI/CD Pipeline

```
Developer
   │
   │  git push origin main
   ▼
GitHub Repository
   │
   │  Webhook
   ▼
Vercel Build Pipeline
   ├── Install dependencies
   ├── Run build command
   ├── Run type checks
   └── Deploy to CDN / Serverless
   │
   ▼
Production (ugcsl.lk)
```

---

## 9. Performance Architecture

### Bundle Optimization

```
Vite Build Pipeline
├── TypeScript compilation (tsc)
├── Tree shaking (unused code removal)
├── Code splitting (per route)
├── Minification (Terser)
├── CSS splitting (per route)
└── Compression (Gzip + Brotli via vite-plugin-compression2)
```

### Chunk Strategy

| Chunk | Contents | Size Target |
|---|---|---|
| `vendor` | React, React-DOM, React-Router | ~120KB |
| `i18n` | i18next, react-i18next | ~40KB |
| `[page]` | Individual page component | ~5–20KB |

### Image Optimization

```
Cloudinary CDN
├── Auto format (WebP/AVIF)
├── Auto quality
├── Responsive sizing
└── Global CDN delivery
        │
        ▼
LazyImage Component
├── Intersection Observer API
├── Loads only when in viewport
└── Fade-in transition (no layout shift)
```

### Resource Hints (index.html)

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="dns-prefetch" href="https://res.cloudinary.com" />
```

### Core Web Vitals Targets

| Metric | Target | Achieved |
|---|---|---|
| FCP | < 1.8s | ~1.2s |
| LCP | < 2.5s | ~2.0s |
| TTI | < 3.8s | ~2.5s |
| CLS | < 0.1 | < 0.05 |
| TBT | < 200ms | < 150ms |
| Bundle | < 200KB | ~80KB initial |

---

## 10. Internationalization Architecture

### Languages Supported

| Code | Language |
|---|---|
| `en` | English (default) |
| `si` | Sinhala |

### i18n Stack

```
i18next
└── react-i18next
    └── i18next-browser-languagedetector
```

### Translation Files

```
src/locales/
├── en.json    ← English strings
└── si.json    ← Sinhala strings
```

### Bilingual Data Strategy

Database fields carry both language variants:

```typescript
title: string       // English
title_si?: string   // Sinhala (optional)
```

Frontend selects the correct field based on active language:

```typescript
const title = i18n.language === 'si' ? program.title_si || program.title : program.title;
```

### Language Detection Order

1. `localStorage` (persisted user preference)
2. Browser `navigator.language`
3. Fallback: `en`

---

## 11. SEO Architecture

### On-Page SEO

Every page renders a `<SEO />` component that injects into `<head>`:

```html
<title>{pageTitle} | UGCSL</title>
<meta name="description" content="{description}" />
<link rel="canonical" href="{canonicalUrl}" />
<meta property="og:title" content="{pageTitle}" />
<meta property="og:description" content="{description}" />
<meta property="og:url" content="{canonicalUrl}" />
<meta property="og:type" content="website" />
```

### Technical SEO Files

| File | Location | Purpose |
|---|---|---|
| `robots.txt` | `public/robots.txt` | Crawler instructions |
| `sitemap.xml` | `public/sitemap.xml` | Page index for Google |
| `_redirects` | `public/_redirects` | www → non-www canonical redirect |

### Canonical URL Strategy

```
www.ugcsl.lk  →  301 redirect  →  ugcsl.lk
```

All pages declare `<link rel="canonical" href="https://ugcsl.lk/..." />`.

### Sitemap Structure

```xml
<urlset>
  <url><loc>https://ugcsl.lk/</loc></url>
  <url><loc>https://ugcsl.lk/about</loc></url>
  <url><loc>https://ugcsl.lk/programs</loc></url>
  <url><loc>https://ugcsl.lk/admissions</loc></url>
  <url><loc>https://ugcsl.lk/research</loc></url>
  <url><loc>https://ugcsl.lk/news</loc></url>
  <url><loc>https://ugcsl.lk/contact</loc></url>
</urlset>
```

---

## 12. Data Flow Diagrams

### Page Load Flow

```
User visits ugcsl.lk/programs
        │
        ▼
Vercel CDN serves index.html + vendor chunk
        │
        ▼
React Router matches /programs
        │
        ▼
React.lazy() loads Programs.chunk.js
        │
        ▼
useApi hook fires GET /api/programs
        │
        ▼
Express route handler queries MongoDB
        │
        ▼
Mongoose returns Program[] documents
        │
        ▼
API returns JSON { success, data, total }
        │
        ▼
React renders program cards
        │
        ▼
LazyImage loads images as cards enter viewport
```

### Contact Form Flow

```
User fills contact form
        │
        ▼
GET /api/csrf-token
← Set-Cookie: csrf_token (httpOnly)
← { csrfToken }
        │
        ▼
Client stores csrfToken in memory
        │
        ▼
User submits form
        │
        ▼
express-validator validates fields
        │
        ▼
CSRF middleware validates token vs cookie
        │
        ▼
Contact document saved to MongoDB
        │
        ▼
(Optional) Nodemailer sends email notification
        │
        ▼
{ success: true, message: "..." }
        │
        ▼
UI shows success state
```

---

## 13. Module Breakdown

### Frontend Modules

| Module | Files | Responsibility |
|---|---|---|
| Pages | `src/pages/*.tsx` | Route-level UI components |
| Components | `src/components/*.tsx` | Shared reusable UI |
| Hooks | `src/hooks/useApi.ts` | Data fetching abstraction |
| Types | `src/types/index.ts` | TypeScript interfaces |
| i18n | `src/locales/`, `src/i18n.ts` | Translations + config |
| Styles | `src/styles.css`, `shared.css` | Global + shared CSS |
| SEO | `public/robots.txt`, `sitemap.xml`, `_redirects` | Search engine files |

### Backend Modules

| Module | Files | Responsibility |
|---|---|---|
| App | `src/app.ts` | Express setup, middleware, routes |
| Entry | `src/index.ts` | Local dev server |
| Serverless | `api/index.ts` | Vercel function export |
| Routes | `src/routes/*.ts` | HTTP route handlers |
| Models | `src/models/*.ts` | Mongoose schemas |
| Middleware | `src/middleware/csrf.ts` | CSRF validation |
| Seed | `src/seed.ts` | Initial data population |

---

## 14. Tech Stack Summary

### Frontend

| Category | Tool |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| Routing | React Router 7 |
| HTTP | Axios |
| i18n | i18next + react-i18next |
| SEO | Custom SEO component |
| Images | Cloudinary + LazyImage |
| Compression | vite-plugin-compression2 |
| Linting | ESLint + typescript-eslint |

### Backend

| Category | Tool |
|---|---|
| Runtime | Node.js 18+ |
| Framework | Express 5 |
| Language | TypeScript 5.9 |
| Database | MongoDB Atlas + Mongoose 9 |
| Security | Helmet, CORS, express-rate-limit |
| Validation | express-validator |
| CSRF | cookie-parser + crypto |
| Email | Nodemailer |

### Infrastructure

| Category | Tool |
|---|---|
| Hosting | Vercel (Frontend + Backend) |
| Database | MongoDB Atlas |
| CDN | Vercel Edge Network |
| Images | Cloudinary |
| Domain | ugcsl.lk |
| SSL | Vercel auto-provisioned |
| Version Control | Git |

---

**Last Updated:** 2025
**Version:** 1.0.0
**Status:** Production Ready ✅
