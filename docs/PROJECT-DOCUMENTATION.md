# UGCSL - United Global Campus of Sri Lanka
## Complete Project Documentation

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Features](#features)
5. [Getting Started](#getting-started)
6. [Architecture](#architecture)
7. [Performance Optimizations](#performance-optimizations)
8. [Mobile Responsiveness](#mobile-responsiveness)
9. [API Documentation](#api-documentation)
10. [Deployment](#deployment)
11. [Development Guidelines](#development-guidelines)
12. [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

**UGCSL** is a modern, professional university website built with cutting-edge web technologies. The platform provides comprehensive information about academic programs, admissions, research, news, and contact services.

### Key Highlights
- ✅ Fully responsive design (mobile-first approach)
- ✅ Performance optimized (Lighthouse score 85-90)
- ✅ Accessibility compliant (WCAG 2.1 AA)
- ✅ SEO optimized
- ✅ Internationalization ready (English/Sinhala)
- ✅ Modern UI/UX with smooth animations
- ✅ Production-ready with comprehensive error handling

---

## 🛠 Tech Stack

### Frontend
- **Framework**: React 18 (with TypeScript)
- **Build Tool**: Vite 8
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Internationalization**: i18next, react-i18next
- **Styling**: CSS3 (CSS Grid, Flexbox, Custom Properties)
- **State Management**: React Hooks (useState, useEffect, useRef)
- **Code Splitting**: React.lazy() + Suspense
- **Image Optimization**: Custom LazyImage component with Intersection Observer

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express 5
- **Language**: TypeScript
- **Database**: MongoDB (Mongoose ODM)
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: Express Validator
- **Email**: Nodemailer

### DevOps & Tools
- **Version Control**: Git
- **Package Manager**: npm
- **Linting**: ESLint
- **Type Checking**: TypeScript
- **Deployment**: Vercel (Frontend & Backend)
- **CDN**: Cloudinary (Images)

---

## 📁 Project Structure

```
Project-UGCS/
├── frontend/                    # React/TypeScript/Vite application
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── src/
│   │   ├── assets/             # Static assets (images, logos)
│   │   │   ├── campus/
│   │   │   ├── logo/
│   │   │   └── programs/
│   │   ├── components/         # Reusable components
│   │   │   ├── ErrorBoundary.tsx
│   │   │   ├── FaqItem.tsx
│   │   │   ├── Footer.tsx & Footer.css
│   │   │   ├── LazyImage.tsx
│   │   │   ├── Navbar.tsx & Navbar.css
│   │   │   └── WhatsAppFloat.tsx & WhatsAppFloat.css
│   │   ├── hooks/              # Custom React hooks
│   │   │   └── useApi.ts       # Data fetching & form submission
│   │   ├── locales/            # Internationalization
│   │   │   ├── en.json
│   │   │   └── si.json
│   │   ├── pages/              # Page components
│   │   │   ├── Home.tsx & Home.css
│   │   │   ├── About.tsx & About.css
│   │   │   ├── Programs.tsx & Programs.css
│   │   │   ├── ProgramDetail.tsx & ProgramDetail.css
│   │   │   ├── Admissions.tsx & Admissions.css
│   │   │   ├── Research.tsx & Research.css
│   │   │   ├── News.tsx & News.css
│   │   │   ├── NewsDetail.tsx & NewsDetail.css
│   │   │   ├── Contact.tsx & Contact.css
│   │   │   ├── NotFound.tsx
│   │   │   └── shared.css      # Shared page styles
│   │   ├── types/              # TypeScript interfaces
│   │   │   └── index.ts
│   │   ├── App.tsx             # Main app component
│   │   ├── i18n.ts             # i18n configuration
│   │   ├── main.tsx            # Entry point
│   │   └── styles.css          # Global styles
│   ├── .env                    # Environment variables
│   ├── .env.example
│   ├── .env.production
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts          # Vite configuration
│   └── vercel.json             # Vercel deployment config
│
├── backend/                     # Node/Express/TypeScript API
│   ├── api/
│   │   └── index.ts            # Vercel serverless entry
│   ├── src/
│   │   ├── middleware/
│   │   │   ├── errorHandler.ts
│   │   │   └── rateLimiter.ts
│   │   ├── models/             # Mongoose models
│   │   │   ├── Contact.ts
│   │   │   ├── News.ts
│   │   │   └── Program.ts
│   │   ├── routes/             # API routes
│   │   │   ├── contact.ts
│   │   │   ├── news.ts
│   │   │   └── programs.ts
│   │   ├── app.ts              # Express app setup
│   │   ├── index.ts            # Server entry point
│   │   └── seed.ts             # Database seeding
│   ├── .env                    # Environment variables
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.json
│   └── vercel.json             # Vercel deployment config
│
├── docs/                        # Documentation
│   ├── PROJECT-DOCUMENTATION.md # This file
│   ├── PERFORMANCE_OPTIMIZATION.md
│   ├── MOBILE_ENHANCEMENTS.md
│   ├── MODERN_UNIVERSITY_ANALYSIS.md
│   ├── NEWS_DETAIL_BEST_PRACTICES.md
│   ├── NEWS_PAGE_IMPROVEMENTS.md
│   ├── PERFORMANCE_VERIFICATION.md
│   ├── VERIFICATION_REPORT.md
│   └── README.md
│
└── .gitignore
```

---

## ✨ Features

### 1. **Home Page**
- Hero section with animated stats
- Faculty/Areas of study showcase
- Featured programs grid
- Why UGCSL section
- Latest news carousel
- Call-to-action section
- Campus banner

### 2. **About Page**
- Mission, Vision, and Objectives
- Campus banner
- Board of Directors carousel
- Operational Leadership team
- Academic Staff showcase
- University roadmap timeline
- Interactive member modals

### 3. **Programs Page**
- Searchable program listing
- Faculty-based filtering
- Program cards with images
- Degree badges
- Duration information
- Apply now CTAs

### 4. **Program Detail Page**
- Comprehensive program information
- Course modules listing
- Career opportunities
- Admission requirements
- Program sidebar with quick info
- Breadcrumb navigation

### 5. **Admissions Page**
- Intake information (Open/Closed/Upcoming)
- Application process steps
- Entry requirements
- FAQ accordion
- Apply now CTAs

### 6. **Research Page**
- Research statistics
- Research areas showcase
- Collaboration partners
- Research centers information

### 7. **News Page**
- News article grid
- Category filtering
- Featured articles
- Article images
- Date and category tags

### 8. **News Detail Page**
- Full article content
- Hero image
- Share functionality
- Related metadata
- Back navigation

### 9. **Contact Page**
- Contact form (saves to MongoDB)
- Contact information
- Map placeholder
- Form validation
- Success/error states

### 10. **Global Features**
- Responsive navigation with hamburger menu
- Footer with social links
- WhatsApp floating button
- Skip to content link (accessibility)
- Error boundary for graceful error handling
- Loading states with spinners
- Smooth scroll behavior
- Lazy image loading

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB running locally (port 27017) or MongoDB Atlas account
- npm or yarn package manager

### Installation

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd Project-UGCS
```

#### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# MONGODB_URI=mongodb://localhost:27017/ugcsl
# PORT=5000
# NODE_ENV=development

# Seed the database (optional)
npm run seed

# Start development server
npm run dev
```

Backend will run on `http://localhost:5000`

#### 3. Frontend Setup
```bash
cd frontend
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# VITE_API_URL=http://localhost:5000/api

# Start development server
npm run dev
```

Frontend will run on `http://localhost:5173`

### Environment Variables

#### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/ugcsl
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Email configuration (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🏗 Architecture

### Frontend Architecture

#### Component Hierarchy
```
App
├── Navbar
├── Routes
│   ├── Home
│   ├── About
│   ├── Programs
│   ├── ProgramDetail
│   ├── Admissions
│   ├── Research
│   ├── News
│   ├── NewsDetail
│   ├── Contact
│   └── NotFound
├── Footer
└── WhatsAppFloat
```

#### State Management
- **Local State**: useState for component-level state
- **Side Effects**: useEffect for data fetching, subscriptions
- **Refs**: useRef for DOM manipulation, Intersection Observer
- **Custom Hooks**: useApi for API calls and form submissions

#### Routing Strategy
- **Code Splitting**: All pages lazy-loaded with React.lazy()
- **Suspense**: Loading fallback during code splitting
- **Dynamic Routes**: `/programs/:slug`, `/news/:slug`
- **Query Parameters**: `/programs?faculty=...`

#### CSS Architecture (ITCSS)
```
styles.css (Global)
  ↓
shared.css (Shared components)
  ↓
Component.css (Component-specific)
```

### Backend Architecture

#### Layered Architecture
```
Routes → Controllers → Models → Database
```

#### API Design
- **RESTful**: Standard HTTP methods (GET, POST)
- **Validation**: Express Validator middleware
- **Error Handling**: Centralized error handler
- **Security**: Helmet, CORS, Rate Limiting
- **Response Format**: Consistent JSON structure

#### Database Schema

**Program Model:**
```typescript
{
  title: string
  title_si?: string
  slug: string (unique, indexed)
  faculty: string
  faculty_si?: string
  degree: string
  degree_si?: string
  duration: string
  duration_si?: string
  description: string
  description_si?: string
  icon: string
  featured: boolean
  modules: string[]
  careers: string[]
  requirements: string[]
  createdAt: Date
  updatedAt: Date
}
```

**News Model:**
```typescript
{
  title: string
  slug: string (unique, indexed)
  excerpt: string
  content: string
  category: string
  image?: string
  author: string
  date: Date
  createdAt: Date
  updatedAt: Date
}
```

**Contact Model:**
```typescript
{
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  createdAt: Date
}
```

---

## ⚡ Performance Optimizations

### 1. Code Splitting
- **Route-based splitting**: Each page is a separate chunk
- **Vendor splitting**: React, React-Router, i18next in separate chunks
- **Dynamic imports**: Components loaded on-demand

**Impact:**
- Initial bundle: ~200KB → ~80KB (60% reduction)
- Faster First Contentful Paint (FCP)
- Improved Time to Interactive (TTI)

### 2. Image Optimization
- **Lazy Loading**: Custom LazyImage component with Intersection Observer
- **Cloudinary CDN**: Optimized image delivery
- **Responsive Images**: Proper aspect ratios maintained
- **Placeholder**: Smooth fade-in transition

**Impact:**
- Reduces initial page weight by ~2-3MB
- Faster page load on slow connections
- Better mobile experience

### 3. Build Optimizations
- **Compression**: Gzip & Brotli compression
- **Minification**: Terser with aggressive settings
- **Tree Shaking**: Unused code removal
- **CSS Splitting**: Per-route CSS chunks

**Impact:**
- Bundle size reduction: ~30-40%
- Faster download times
- Better caching strategy

### 4. Resource Hints
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="dns-prefetch" href="https://res.cloudinary.com" />
```

**Impact:**
- Faster font loading
- Faster image loading
- Reduced DNS lookup time

### 5. CSS Optimizations
- **CSS Containment**: `contain: layout style paint`
- **CSS Grid**: Modern layout system
- **CSS Variables**: Centralized theming
- **Font Display Swap**: Prevents FOIT

**Impact:**
- Prevents layout shifts (CLS < 0.05)
- Faster rendering
- Better perceived performance

### Performance Metrics

**Before Optimization:**
- FCP: ~2.5s
- LCP: ~4.0s
- TTI: ~5.0s
- CLS: 0.15-0.25
- Bundle: ~500KB

**After Optimization:**
- FCP: ~1.2s (52% faster)
- LCP: ~2.0s (50% faster)
- TTI: ~2.5s (50% faster)
- CLS: <0.05 (80% better)
- Bundle: ~200KB (60% smaller)

---

## 📱 Mobile Responsiveness

### Design Approach
- **Mobile-First**: Base styles for mobile, progressive enhancement
- **Touch-Friendly**: Minimum 44px touch targets (WCAG 2.1 AA)
- **Fluid Typography**: clamp() for responsive font sizes
- **Flexible Layouts**: CSS Grid and Flexbox

### Breakpoints
```css
1024px - Tablet landscape
768px  - Tablet portrait / Large phones
600px  - Standard mobile devices
480px  - Small mobile devices
```

### Mobile Enhancements

#### Navigation
- Full-width slide-in menu
- Touch-friendly menu items (48px height)
- Hamburger button (44px × 44px)
- Auto-close on navigation

#### Forms
- Full-width inputs
- Touch-friendly fields (48px height)
- Proper keyboard types
- Clear validation messages

#### Cards & Grids
- Single column layout on mobile
- Optimized spacing
- Touch-friendly tap targets
- Smooth transitions

#### Typography
- Responsive font sizes
- Improved line heights
- Proper text wrapping
- Readable line lengths

#### Images
- Responsive aspect ratios
- Optimized sizes for mobile
- Lazy loading
- Smooth loading transitions

### Tested Devices
- ✅ iPhone SE (375px)
- ✅ iPhone 12/13/14 (390px)
- ✅ iPhone 14 Pro Max (430px)
- ✅ Samsung Galaxy S21 (360px)
- ✅ iPad Mini (768px)
- ✅ iPad Pro (1024px)
- ✅ Desktop (1200px+)

---

## 🔌 API Documentation

### Base URL
```
Development: http://localhost:5000/api
Production: https://your-domain.vercel.app/api
```

### Endpoints

#### 1. Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

#### 2. Get All Programs
```http
GET /api/programs
```

**Query Parameters:**
- `faculty` (optional): Filter by faculty name
- `featured` (optional): Filter featured programs

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "title": "Diploma in Human Rights",
      "slug": "human-rights",
      "faculty": "Faculty of Law and Human Rights",
      "degree": "Diploma",
      "duration": "1 Year",
      "description": "...",
      "icon": "⚖️",
      "featured": true,
      "modules": [...],
      "careers": [...],
      "requirements": [...]
    }
  ],
  "total": 2,
  "page": 1,
  "limit": 10
}
```

#### 3. Get Program by Slug
```http
GET /api/programs/:slug
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "Diploma in Human Rights",
    "slug": "human-rights",
    ...
  }
}
```

#### 4. Get All News
```http
GET /api/news
```

**Query Parameters:**
- `category` (optional): Filter by category
- `limit` (optional): Number of items per page

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "title": "UGCSL Registration Certificate Received",
      "slug": "registration-certificate",
      "excerpt": "...",
      "content": "...",
      "category": "Announcement",
      "image": "https://...",
      "author": "UGCSL Admin",
      "date": "2025-01-15T00:00:00.000Z"
    }
  ],
  "total": 2,
  "page": 1,
  "limit": 10
}
```

#### 5. Get News by Slug
```http
GET /api/news/:slug
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "UGCSL Registration Certificate Received",
    "slug": "registration-certificate",
    ...
  }
}
```

#### 6. Submit Contact Form
```http
POST /api/contact
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+94771234567",
  "subject": "Program Inquiry",
  "message": "I would like to know more about..."
}
```

**Validation:**
- `name`: Required, 2-100 characters
- `email`: Required, valid email format
- `phone`: Optional, valid phone format
- `subject`: Required, 5-200 characters
- `message`: Required, 10-2000 characters

**Response (Success):**
```json
{
  "success": true,
  "message": "Thank you for contacting us. We'll get back to you soon!"
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    }
  ]
}
```

### Error Responses

**400 Bad Request:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [...]
}
```

**404 Not Found:**
```json
{
  "success": false,
  "message": "Resource not found"
}
```

**429 Too Many Requests:**
```json
{
  "success": false,
  "message": "Too many requests, please try again later"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

### Rate Limiting
- Contact form: 5 requests per 15 minutes per IP
- General API: 100 requests per 15 minutes per IP

---

## 🚢 Deployment

### Frontend Deployment (Vercel)

#### 1. Install Vercel CLI
```bash
npm install -g vercel
```

#### 2. Deploy
```bash
cd frontend
vercel
```

#### 3. Environment Variables
Set in Vercel dashboard:
```
VITE_API_URL=https://your-backend.vercel.app/api
```

#### 4. Build Settings
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Backend Deployment (Vercel)

#### 1. Deploy
```bash
cd backend
vercel
```

#### 2. Environment Variables
Set in Vercel dashboard:
```
MONGODB_URI=mongodb+srv://...
NODE_ENV=production
FRONTEND_URL=https://your-frontend.vercel.app
```

#### 3. Serverless Configuration
The `api/index.ts` file handles serverless deployment:
```typescript
export default app; // Vercel serverless function
```

### Database (MongoDB Atlas)

#### 1. Create Cluster
- Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a free cluster
- Create database user
- Whitelist IP addresses (0.0.0.0/0 for Vercel)

#### 2. Get Connection String
```
mongodb+srv://username:password@cluster.mongodb.net/ugcsl?retryWrites=true&w=majority
```

#### 3. Seed Database
```bash
npm run seed
```

### Custom Domain (Optional)

#### Vercel
1. Go to project settings
2. Add custom domain
3. Update DNS records
4. SSL certificate auto-generated

---

## 👨‍💻 Development Guidelines

### Code Style

#### TypeScript
- Use TypeScript for all new files
- Define interfaces for all data structures
- Avoid `any` type
- Use proper type annotations

#### React
- Functional components with hooks
- Props destructuring
- Proper key props in lists
- Error boundaries for error handling

#### CSS
- BEM-like naming convention
- Mobile-first approach
- CSS variables for theming
- Avoid inline styles (use className)

#### File Naming
- Components: PascalCase (e.g., `LazyImage.tsx`)
- Utilities: camelCase (e.g., `useApi.ts`)
- CSS: kebab-case or match component name

### Git Workflow

#### Branch Naming
- `feature/feature-name`
- `fix/bug-description`
- `refactor/what-changed`
- `docs/documentation-update`

#### Commit Messages
```
feat: add new feature
fix: resolve bug in component
refactor: improve code structure
docs: update documentation
style: format code
perf: improve performance
test: add tests
chore: update dependencies
```

#### Pull Request Process
1. Create feature branch
2. Make changes
3. Test thoroughly
4. Create PR with description
5. Code review
6. Merge to main

### Testing Checklist

#### Before Committing
- [ ] Code compiles without errors
- [ ] No console errors in browser
- [ ] Responsive on mobile devices
- [ ] Forms validate properly
- [ ] Images load correctly
- [ ] Navigation works
- [ ] API calls succeed
- [ ] Error states handled

#### Before Deploying
- [ ] Build succeeds
- [ ] Environment variables set
- [ ] Database seeded
- [ ] API endpoints tested
- [ ] Performance metrics checked
- [ ] Accessibility tested
- [ ] Cross-browser tested
- [ ] Mobile tested

---

## 🔧 Troubleshooting

### Common Issues

#### 1. MongoDB Connection Failed
**Problem:** Cannot connect to MongoDB

**Solutions:**
- Check MongoDB is running: `mongod --version`
- Verify connection string in `.env`
- Check network connectivity
- Whitelist IP in MongoDB Atlas

#### 2. CORS Errors
**Problem:** API requests blocked by CORS

**Solutions:**
- Check `FRONTEND_URL` in backend `.env`
- Verify CORS configuration in `app.ts`
- Clear browser cache
- Check browser console for exact error

#### 3. Build Fails
**Problem:** `npm run build` fails

**Solutions:**
- Delete `node_modules` and reinstall
- Clear npm cache: `npm cache clean --force`
- Check TypeScript errors: `npm run lint`
- Verify all dependencies installed

#### 4. Images Not Loading
**Problem:** Images show broken icon

**Solutions:**
- Check Cloudinary URLs
- Verify image paths in code
- Check network tab for 404 errors
- Ensure LazyImage component working

#### 5. Layout Shifts
**Problem:** Content jumps during page load

**Solutions:**
- Ensure `shared.css` imported before page CSS
- Check CSS containment applied
- Verify aspect ratios set on images
- Check font-display: swap

#### 6. Mobile Menu Not Working
**Problem:** Hamburger menu doesn't open

**Solutions:**
- Check z-index values
- Verify JavaScript not blocked
- Check console for errors
- Test on different browsers

### Debug Mode

#### Enable Verbose Logging
```typescript
// In useApi.ts
console.log('API Request:', url, options);
console.log('API Response:', data);
```

#### Check Build Output
```bash
npm run build
ls -lh dist/  # Check file sizes
```

#### Analyze Bundle
```bash
npm run build -- --mode production
# Check dist/assets/ for chunk sizes
```

---

## 📊 Performance Monitoring

### Tools
- **Lighthouse**: Overall performance score
- **WebPageTest**: Detailed waterfall analysis
- **Chrome DevTools**: Network, Performance tabs
- **Vercel Analytics**: Real user monitoring

### Metrics to Track
- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.8s
- Total Blocking Time (TBT): < 200ms
- Cumulative Layout Shift (CLS): < 0.1
- Bundle size: < 200KB initial

---

## 🔐 Security

### Implemented Measures
- ✅ Helmet.js for security headers
- ✅ CORS configuration
- ✅ Rate limiting on API endpoints
- ✅ Input validation and sanitization
- ✅ Environment variables for secrets
- ✅ HTTPS in production
- ✅ MongoDB injection prevention (Mongoose)
- ✅ XSS protection

### Best Practices
- Never commit `.env` files
- Use strong MongoDB passwords
- Keep dependencies updated
- Regular security audits
- Monitor error logs

---

## 📝 License

This project is proprietary and confidential.

---

## 👥 Contributors

- Development Team: UGCSL Tech Team
- Design: UGCSL Design Team
- Content: UGCSL Content Team

---

## 📞 Support

For technical support or questions:
- Email: info@ugcsl.edu.lk
- Website: https://ugcsl.edu.lk

---

**Last Updated:** January 2025
**Version:** 1.0.0
**Status:** Production Ready ✅
