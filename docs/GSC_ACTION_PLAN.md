# Google Search Console Issues - Action Plan

## Current Status (May 7, 2026)
- **Indexed Pages**: 5
- **Not Indexed**: 1-2 pages
- **Impressions**: 1-2/day (very low)
- **Critical Issues**: 2

---

## Issue #1: Alternative page with proper canonical tag (1 page)

### Problem
Multiple URLs pointing to same content (www vs non-www, http vs https, trailing slashes)

### Solutions Implemented ✅
1. Created `frontend/public/_redirects` - redirects all variations to https://ugcsl.lk
2. Created `frontend/src/components/SEO.tsx` - dynamic canonical tags per page
3. Updated `frontend/src/pages/Home.tsx` - added SEO component

### Next Steps
1. **Add SEO component to ALL pages**:
   - About.tsx
   - Programs.tsx
   - ProgramDetail.tsx
   - Admissions.tsx
   - Research.tsx
   - News.tsx
   - NewsDetail.tsx
   - Contact.tsx

2. **Verify in hosting platform**:
   - If using Netlify/Vercel: `_redirects` file works automatically
   - If using custom server: Configure nginx/Apache redirects
   - Test: `curl -I https://www.ugcsl.lk` should redirect to `https://ugcsl.lk`

3. **Update Google Search Console**:
   - Go to Settings → Change of address
   - Set preferred domain to `https://ugcsl.lk` (non-www)

---

## Issue #2: Crawled - currently not indexed (1 page)

### Problem
Google crawled but didn't index due to low quality/value signals

### Solutions Implemented ✅
1. Created `frontend/public/robots.txt` - guides crawlers
2. Created `frontend/public/sitemap.xml` - lists all pages

### Next Steps
1. **Submit sitemap to GSC**:
   - Go to Google Search Console
   - Sitemaps → Add new sitemap
   - Enter: `https://ugcsl.lk/sitemap.xml`

2. **Identify the non-indexed page**:
   - In GSC → Pages → Not indexed → Crawled - currently not indexed
   - Click to see which URL
   - Common culprits: 404 pages, thin content, duplicate content

3. **Fix the specific page**:
   - Add unique, valuable content (min 300 words)
   - Add proper headings (H1, H2, H3)
   - Add internal links to/from other pages
   - Add images with alt text
   - Ensure mobile-friendly

4. **Request re-indexing**:
   - In GSC → URL Inspection
   - Enter the URL
   - Click "Request Indexing"

---

## Issue #3: Low Impressions (1-2/day)

### Problem
Very low search visibility

### Solutions to Implement

#### A. Content Optimization
1. **Add more content pages**:
   - Blog posts about online education in Sri Lanka
   - Student success stories
   - Faculty profiles
   - Program comparison guides
   - Career guides for each diploma

2. **Optimize existing pages**:
   - Add FAQ sections (people also ask)
   - Add more keywords naturally
   - Increase content length (aim for 800+ words on main pages)
   - Add structured data (JSON-LD) for courses

#### B. Technical SEO
1. **Improve page speed**:
   ```bash
   # Test current speed
   npm run build
   # Check bundle size
   ```
   - Optimize images (use WebP format)
   - Enable compression (already done with vite-plugin-compression2)
   - Lazy load images (already implemented)

2. **Add structured data to program pages**:
   ```json
   {
     "@context": "https://schema.org",
     "@type": "Course",
     "name": "Diploma in Human Rights",
     "description": "...",
     "provider": {
       "@type": "EducationalOrganization",
       "name": "UGCSL"
     },
     "offers": {
       "@type": "Offer",
       "category": "Diploma"
     }
   }
   ```

#### C. Off-Page SEO
1. **Build backlinks**:
   - Submit to Sri Lankan education directories
   - Partner with educational institutions
   - Guest posts on education blogs
   - Social media presence (Facebook, LinkedIn)

2. **Local SEO**:
   - Create Google Business Profile
   - Add to local directories
   - Get reviews from students

#### D. Content Marketing
1. **Create blog section**:
   - "How to choose the right diploma program"
   - "Benefits of online education in Sri Lanka"
   - "Career opportunities after diploma"
   - Industry news and updates

2. **Target long-tail keywords**:
   - "online diploma programs sri lanka"
   - "human rights course sri lanka"
   - "distance learning sri lanka"
   - "part time diploma sri lanka"

---

## Implementation Checklist

### Immediate (This Week)
- [ ] Deploy _redirects file
- [ ] Deploy robots.txt
- [ ] Deploy sitemap.xml
- [ ] Submit sitemap to GSC
- [ ] Add SEO component to all pages
- [ ] Set preferred domain in GSC
- [ ] Identify non-indexed page
- [ ] Request re-indexing for fixed pages

### Short-term (This Month)
- [ ] Add structured data to all program pages
- [ ] Optimize all images (convert to WebP)
- [ ] Add FAQ sections to main pages
- [ ] Increase content on thin pages (300+ words minimum)
- [ ] Create 5-10 blog posts
- [ ] Set up Google Business Profile
- [ ] Submit to education directories

### Long-term (Next 3 Months)
- [ ] Publish 2-3 blog posts per week
- [ ] Build 10+ quality backlinks
- [ ] Get 10+ student reviews
- [ ] Add video content
- [ ] Create downloadable resources (program guides, brochures)
- [ ] Monitor GSC weekly and fix new issues

---

## Monitoring & Tracking

### Weekly Checks
1. Google Search Console:
   - Check indexing status
   - Monitor new issues
   - Track impressions/clicks
   - Review search queries

2. Analytics:
   - Organic traffic trends
   - Top landing pages
   - Bounce rate
   - Conversion rate

### Monthly Reports
- Indexed pages count
- Total impressions
- Average position
- Click-through rate (CTR)
- New backlinks
- Page speed scores

---

## Expected Results

### After 1 Week
- All pages properly indexed
- No critical issues
- Canonical tags working correctly

### After 1 Month
- 10-20 impressions/day
- 15-20 indexed pages
- Improved average position

### After 3 Months
- 50-100 impressions/day
- 30+ indexed pages
- 5-10 clicks/day
- Top 10 rankings for branded keywords

---

## Resources

### Tools
- Google Search Console: https://search.google.com/search-console
- Google PageSpeed Insights: https://pagespeed.web.dev/
- Schema Markup Validator: https://validator.schema.org/
- Mobile-Friendly Test: https://search.google.com/test/mobile-friendly

### Documentation
- Google SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Canonical URLs: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Sitemaps: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap

---

## Contact for Help
If issues persist after implementing these fixes:
1. Check GSC for specific error messages
2. Use URL Inspection tool to debug individual pages
3. Consider hiring SEO consultant for advanced issues
