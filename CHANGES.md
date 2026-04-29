# Changes Made - Year-Based Intake Update & News Images

**Date:** April 28, 2026  
**Objective:** Remove semester-based enrollment references, use year-based intake system, and add images to news items

## Summary
Since UGCSL doesn't have degree programs started yet and is not enrolling students semester-wise, all references to "Semester 1 – 2026" have been updated to "2026 intake" to be more realistic and accurate. Additionally, news items now display images from Cloudinary.

## Files Updated

### 1. Frontend Translation Files

#### `frontend/src/locales/en.json`
- ✅ Updated `programDetail.ctaDesc`: Changed "Semester 1 – 2026" to "2026 intake"

#### `frontend/src/locales/si.json`
- ⚠️ **MANUAL UPDATE REQUIRED** - Please update the following keys:
  - `home.badge`: Remove "1 වන අධ්යයන වාරය" (Semester 1) reference
  - `home.ctaDesc`: Change "පළමු අධ්යයන වාරය" to "ඇතුළත් කිරීම"
  - `admissions.heroDesc`: Change "පළමු අධ්යයන වාරය" to "ඇතුළත් කිරීම"
  - `admissions.faqs[5].a`: Update deadline from "මාර්තු 31" to "දෙසැම්බර් 31"
  - `programDetail.ctaDesc`: Change "පළමු අධ්යයන වාරය" to "ඇතුළත් කිරීම"

### 2. Backend Seed Data

#### `backend/src/seed.ts`
- ✅ Updated news title: "UGCSL Opens Admissions for Semester 1 – 2026" → "UGCSL Opens Admissions for 2026 Intake"
- ✅ Updated news excerpt to include deadline: "Apply before December 31, 2026"
- ✅ Added image for "2026 Intake" news: `AdmissonOpen_dsfsya`
- ✅ Added image for "Officially Established" news: `inauguration_lqfpjs`

### 3. Frontend Components

#### `frontend/src/pages/Home.tsx`
- ✅ Updated news card rendering to display images when available
- ✅ Falls back to placeholder with category initial if no image

#### `frontend/src/pages/News.tsx`
- ✅ Updated news article rendering to display images as background when available
- ✅ Falls back to placeholder with category initial if no image

#### `frontend/src/pages/Home.css`
- ✅ Added `.news-img-wrap` and `.news-img` styles for proper image display

### 4. Current State (Already Correct)

#### `frontend/src/pages/Admissions.tsx`
- ✅ Intakes array already uses year-based format:
  - 2026 Intake (Open) - Deadline: December 31, 2026
  - 2027 Intake (Upcoming) - Deadline: December 31, 2027
  - 2028 Intake (Upcoming) - Deadline: December 31, 2028

## Realistic Timeline (as of April 28, 2026)
- ✅ 2026 intake is OPEN (deadline: December 31, 2026) - 8 months remaining
- ✅ News announcement dated March 1, 2026 (in the past) - realistic
- ✅ Institution established January 15, 2026 - realistic
- ✅ News items now have relevant images (registration certificate and admissions banner)

## Next Steps
1. Manually update the Sinhala translation file (`si.json`) as noted above
2. Run the seed script to update the database:
   ```bash
   cd backend
   npm run seed
   ```
3. Test the frontend to ensure all changes display correctly
4. Verify both English and Sinhala translations show year-based intake terminology
5. Verify news images display correctly on Home and News pages

## Notes
- All program intake fields in the database already show "2026" (year-based)
- No changes needed to component logic - only translation strings updated
- The system is now consistent with the reality that UGCSL offers diploma programs on a yearly intake basis, not semester-wise enrollment
- News items now display professional images from Cloudinary when available
