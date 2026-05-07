# Step-by-Step Guide: Deploy SEO Fixes

## ✅ COMPLETED: SEO Component Added to All Pages

I've added the SEO component to all your pages:
- ✅ Home.tsx
- ✅ About.tsx
- ✅ Programs.tsx
- ✅ ProgramDetail.tsx
- ✅ Admissions.tsx
- ✅ Research.tsx
- ✅ News.tsx
- ✅ NewsDetail.tsx
- ✅ Contact.tsx

## Files Created:
- ✅ `frontend/src/components/SEO.tsx` - Dynamic SEO component
- ✅ `frontend/public/_redirects` - URL redirects
- ✅ `frontend/public/robots.txt` - Search engine instructions
- ✅ `frontend/public/sitemap.xml` - Site structure

---

## NEXT STEPS - DO THESE IN ORDER:

### Step 1: Test Locally (5 minutes)

1. **Open terminal in your project folder**
   ```bash
   cd c:\Biaferose\Maben\Projects\Project-UGCS\frontend
   ```

2. **Install dependencies (if needed)**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open browser and test**
   - Go to: http://localhost:5173
   - Right-click → View Page Source
   - Check that you see:
     - `<link rel="canonical" href="https://ugcsl.lk/">`
     - `<meta name="description" content="..."`
     - `<meta name="robots" content="index, follow">`

5. **Test different pages**
   - Click on About, Programs, Contact
   - View source on each page
   - Verify canonical URL changes for each page

6. **If everything looks good, proceed to Step 2**

---

### Step 2: Build for Production (2 minutes)

1. **Stop the dev server** (Ctrl+C in terminal)

2. **Build the project**
   ```bash
   npm run build
   ```

3. **Check the build folder**
   - Look in `frontend/dist/` folder
   - Verify these files exist:
     - `dist/_redirects`
     - `dist/robots.txt`
     - `dist/sitemap.xml`

---

### Step 3: Deploy to Your Hosting (10 minutes)

**If using Netlify:**

1. **Option A - Drag & Drop:**
   - Go to https://app.netlify.com
   - Drag the `frontend/dist` folder to Netlify
   - Wait for deployment to complete

2. **Option B - Git Deploy:**
   ```bash
   git add .
   git commit -m "Add SEO fixes for Google Search Console"
   git push
   ```
   - Netlify will auto-deploy

**If using Vercel:**
   ```bash
   git add .
   git commit -m "Add SEO fixes for Google Search Console"
   git push
   ```
   - Vercel will auto-deploy

**If using other hosting:**
   - Upload contents of `frontend/dist/` folder to your web server
   - Make sure `_redirects`, `robots.txt`, and `sitemap.xml` are in the root

---

### Step 4: Verify Deployment (5 minutes)

1. **Check your live site**
   - Go to: https://ugcsl.lk
   - Right-click → View Page Source
   - Verify canonical tags are there

2. **Test redirects**
   - Try: https://www.ugcsl.lk (should redirect to https://ugcsl.lk)
   - Try: http://ugcsl.lk (should redirect to https://ugcsl.lk)

3. **Check robots.txt**
   - Go to: https://ugcsl.lk/robots.txt
   - Should see the robots.txt content

4. **Check sitemap**
   - Go to: https://ugcsl.lk/sitemap.xml
   - Should see XML with all your pages

---

### Step 5: Submit to Google Search Console (10 minutes)

1. **Go to Google Search Console**
   - Visit: https://search.google.com/search-console
   - Select your property (ugcsl.lk)

2. **Submit Sitemap**
   - Click "Sitemaps" in left menu
   - Click "Add a new sitemap"
   - Enter: `sitemap.xml`
   - Click "Submit"
   - Wait for Google to process (can take a few hours)

3. **Set Preferred Domain**
   - Click "Settings" (gear icon) in left menu
   - Look for "Change of address" or "Preferred domain"
   - Set to: `https://ugcsl.lk` (non-www)
   - Save

4. **Request Indexing for Fixed Pages**
   - Click "URL Inspection" at top
   - Enter: `https://ugcsl.lk/`
   - Click "Request Indexing"
   - Repeat for other important pages:
     - https://ugcsl.lk/programs
     - https://ugcsl.lk/admissions
     - https://ugcsl.lk/about
     - https://ugcsl.lk/contact

---

### Step 6: Identify & Fix Non-Indexed Page (15 minutes)

1. **Find the problem page**
   - In Google Search Console
   - Click "Pages" in left menu
   - Scroll to "Why pages aren't indexed"
   - Click "Crawled - currently not indexed"
   - See which URL is listed

2. **Common issues and fixes:**

   **If it's a 404 page:**
   - Remove from sitemap.xml
   - Add to robots.txt: `Disallow: /that-page`

   **If it's a thin content page:**
   - Add more content (minimum 300 words)
   - Add headings (H2, H3)
   - Add images with alt text
   - Add internal links

   **If it's a duplicate:**
   - Add canonical tag pointing to the main version
   - Or use 301 redirect in _redirects file

3. **After fixing, request re-indexing**
   - URL Inspection → Enter URL → Request Indexing

---

### Step 7: Monitor Results (Ongoing)

**Check Daily (First Week):**
- Google Search Console → Pages
- Look at "Indexed" count (should increase)
- Check for new errors

**Check Weekly (First Month):**
- Impressions (should increase)
- Click-through rate
- Average position
- New issues

**Expected Timeline:**
- **Day 1-3**: Sitemap processed, canonical issues resolved
- **Week 1**: All pages indexed (should go from 5 to 12+ pages)
- **Week 2-4**: Impressions increase (from 1-2/day to 10-20/day)
- **Month 2-3**: Steady growth in traffic

---

## Troubleshooting

### Problem: Canonical tags not showing
**Solution:**
- Clear browser cache
- Check if SEO component is imported
- Verify build includes the changes

### Problem: Redirects not working
**Solution:**
- Check if `_redirects` file is in `dist/` folder
- For Netlify: File must be in root of deploy
- For other hosts: Configure server redirects manually

### Problem: Sitemap not found
**Solution:**
- Verify `sitemap.xml` is in `dist/` folder
- Check file is uploaded to root of website
- Try: https://ugcsl.lk/sitemap.xml in browser

### Problem: Still showing "Crawled - currently not indexed"
**Solution:**
- Add more unique content to the page
- Improve page quality (images, headings, links)
- Wait 1-2 weeks for Google to re-crawl
- Request indexing again

---

## Quick Checklist

Before contacting support, verify:
- [ ] All pages have canonical tags (view source)
- [ ] robots.txt is accessible
- [ ] sitemap.xml is accessible
- [ ] Sitemap submitted to GSC
- [ ] Redirects working (www → non-www)
- [ ] No console errors on website
- [ ] All pages load correctly

---

## Need Help?

If you get stuck:
1. Check the browser console for errors (F12)
2. Verify files are in the correct location
3. Test on a different browser
4. Wait 24-48 hours for Google to process changes
5. Check GSC for specific error messages

---

## Summary

**What we fixed:**
✅ Canonical tag issues (duplicate URLs)
✅ Missing sitemap
✅ Missing robots.txt
✅ No SEO meta tags on pages
✅ No redirects for www/non-www

**What you need to do:**
1. Test locally
2. Build & deploy
3. Submit sitemap to GSC
4. Request re-indexing
5. Monitor results

**Expected results in 2-4 weeks:**
- All pages indexed (12+ pages)
- 20-50 impressions/day
- No critical GSC errors
- Better search rankings
