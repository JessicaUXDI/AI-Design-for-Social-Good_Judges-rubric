# Simple Team Ranking App

A simplified ranking application for judging 3 teams at the AI Design for Social Good Hackathon.

## Teams
- Snapily
- Genie Health  
- Harbor

## Features

### Judge Interface (index.html)
- Simple dropdown to rank each team (1st, 2nd, 3rd place)
- Validation to ensure all teams get different ranks
- Optional comments field
- Clean, mobile-friendly design

### Admin Dashboard (admin.html)
- Password-protected access
- View all individual judge rankings
- See final results with point totals
  - 1st place = 3 points
  - 2nd place = 2 points
  - 3rd place = 1 point
- Auto-refreshes every 30 seconds
- Shows breakdown of how many 1st/2nd/3rd each team received

## Deployment to Vercel (Your Current Host)

### Step 1: Set Up Vercel KV Database

1. Go to your Vercel dashboard
2. Select your project: `ai-design-for-social-good-scoring`
3. Go to "Storage" tab
4. Click "Create Database"
5. Select "KV" (Key-Value store)
6. Name it: `rankings-db`
7. Click "Create"

Vercel will automatically set the environment variables (`KV_URL`, `KV_REST_API_URL`, etc.)

### Step 2: Update Your Files

Replace your current files with the new ones:

```
your-project/
├── index.html          (new simplified ranking form)
├── admin.html          (new admin dashboard)
├── package.json        (updated with @vercel/kv)
└── api/
    ├── submit-ranking.js
    └── get-rankings.js
```

### Step 3: Update Admin Password

In `admin.html`, find line 210 and change the password:

```javascript
const ADMIN_PASSWORD = 'YourSecurePassword123'; // Change this!
```

### Step 4: Deploy

```bash
# If using Vercel CLI
vercel --prod

# Or just push to GitHub and Vercel auto-deploys
git add .
git commit -m "Simplified to 3-team ranking"
git push
```

### Step 5: Test

1. Visit: `https://ai-design-for-social-good-scoring.vercel.app/`
2. Test submitting rankings
3. Visit: `https://ai-design-for-social-good-scoring.vercel.app/admin.html`
4. Login with your password
5. Verify rankings appear

## URLs

**Judges (share publicly):**
```
https://ai-design-for-social-good-scoring.vercel.app/
```

**Admin (keep private):**
```
https://ai-design-for-social-good-scoring.vercel.app/admin.html
Password: [your password from admin.html line 210]
```

## How It Works

### Scoring System

Teams receive points based on their rankings:
- **1st place** = 3 points
- **2nd place** = 2 points  
- **3rd place** = 1 point

The team with the most total points wins!

### Example

If you have 5 judges:
- **Snapily**: 2 first places, 2 second places, 1 third place = (2×3) + (2×2) + (1×1) = 11 points
- **Genie Health**: 2 first places, 3 third places = (2×3) + (3×1) = 9 points
- **Harbor**: 1 first place, 1 second place, 3 third places = (1×3) + (1×2) + (3×1) = 8 points

**Winner: Snapily!** 🎉

## Troubleshooting

### "Failed to save submission"

**Problem:** Vercel KV database not set up  
**Solution:** Follow Step 1 above to create KV database

### "Can't login to admin"

**Problem:** Wrong password  
**Solution:** Check `admin.html` line 210 for the correct password (case-sensitive)

### "No rankings appearing"

**Problem:** API endpoints not working  
**Solution:**  
1. Check Vercel deployment logs
2. Verify KV database is created
3. Ensure `@vercel/kv` is in package.json dependencies

### Rankings not saving

**Problem:** API route not found  
**Solution:** Ensure `/api` folder exists with both `.js` files

## Quick Fixes

### Need to reset all data?

In Vercel Dashboard:
1. Go to Storage → Your KV database
2. Click "Data" tab
3. Delete the `rankings` key
4. Fresh start!

### Need to export data?

In admin dashboard:
1. Open browser developer console (F12)
2. In console, type: `copy(document.querySelector('table').outerHTML)`
3. Paste into Excel or Google Sheets
4. Or just screenshot the results!

## Security Notes

- Admin password is stored in `admin.html` (client-side)
- For a quick hackathon, this is fine
- For production, use proper backend authentication
- Change the default password before deploying!

## Support

Issues with Vercel KV setup?
- [Vercel KV Documentation](https://vercel.com/docs/storage/vercel-kv)
- [Vercel Support](https://vercel.com/support)

## Changes from Original

**Simplified from:**
- 10 categories with 1-10 scoring
- Complex feedback fields
- Multiple submissions per judge

**Simplified to:**
- 3 teams with simple ranking (1st, 2nd, 3rd)
- One optional comments field
- One submission per judge (can resubmit if needed)

Much easier for judges and faster judging! ⚡

## Day-of-Event Checklist

- [ ] Test judge form submission
- [ ] Test admin dashboard login
- [ ] Share judge URL with all judges
- [ ] Keep admin URL private
- [ ] Have laptop/tablet ready to monitor
- [ ] Screenshot final results when done

Good luck with your hackathon on November 15-16! 🚀
