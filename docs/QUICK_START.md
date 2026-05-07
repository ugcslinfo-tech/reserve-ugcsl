# 🚀 QUICK START - Fix GSC Issues NOW

## ✅ What I Did For You:
- Added SEO component to ALL 9 pages
- Created robots.txt
- Created sitemap.xml  
- Created _redirects file
- Fixed canonical tag issues

---

## 📋 YOUR TO-DO LIST (30 minutes total):

### 1️⃣ TEST (5 min)
```bash
cd c:\Biaferose\Maben\Projects\Project-UGCS\frontend
npm run dev
```
- Open http://localhost:5173
- Right-click → View Source
- Look for: `<link rel="canonical"`

### 2️⃣ BUILD (2 min)
```bash
npm run build
```

### 3️⃣ DEPLOY (5 min)
**Netlify/Vercel:**
```bash
git add .
git commit -m "SEO fixes"
git push
```

**Manual:** Upload `frontend/dist/` folder

### 4️⃣ VERIFY (5 min)
- Visit: https://ugcsl.lk/robots.txt ✓
- Visit: https://ugcsl.lk/sitemap.xml ✓
- Test: https://www.ugcsl.lk → should redirect ✓

### 5️⃣ GOOGLE SEARCH CONSOLE (10 min)
1. Go to: https://search.google.com/search-console
2. Click "Sitemaps"
3. Add: `sitemap.xml`
4. Click "Submit"
5. Click "URL Inspection"
6. Enter: `https://ugcsl.lk/`
7. Click "Request Indexing"

---

## 🎯 Expected Results:

**Week 1:**
- ✅ All pages indexed (5 → 12+ pages)
- ✅ No canonical errors
- ✅ Sitemap processed

**Week 2-4:**
- ✅ Impressions increase (2/day → 20/day)
- ✅ Better rankings
- ✅ More clicks

---

## 📞 Quick Links:
- Google Search Console: https://search.google.com/search-console
- Full Guide: `docs/DEPLOYMENT_GUIDE.md`
- Action Plan: `docs/GSC_ACTION_PLAN.md`

---

## ⚠️ Common Issues:

**"Canonical tag not showing"**
→ Clear cache, rebuild, redeploy

**"Redirects not working"**  
→ Check `_redirects` file in dist folder

**"Sitemap 404"**
→ Verify sitemap.xml uploaded to root

---

## 🆘 Stuck?
1. Check browser console (F12)
2. Wait 24 hours for Google
3. Re-read DEPLOYMENT_GUIDE.md
