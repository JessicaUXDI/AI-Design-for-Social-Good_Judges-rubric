# 🚀 QUICK DEPLOYMENT GUIDE

## Step-by-Step (15 minutes total)

### Step 1: Set Up Vercel KV Database (5 min)

1. Go to [vercel.com](https://vercel.com/dashboard)
2. Click on your project: `ai-design-for-social-good-scoring`
3. Click "Storage" tab at the top
4. Click "Create Database"
5. Select **"KV"** (Key-Value store)
6. Name it: `rankings-db`
7. Click "Create"
8. ✅ Done! Environment variables are automatically set

### Step 2: Change Admin Password (1 min)

1. Open `admin.html`
2. Find line 210:
   ```javascript
   const ADMIN_PASSWORD = 'AI_SocialGood_2024'; // Change this!
   ```
3. Change it to your secure password:
   ```javascript
   const ADMIN_PASSWORD = 'YourPassword123!';
   ```
4. Save the file

### Step 3: Upload Files to GitHub (5 min)

Replace your current files with these new ones:

```bash
# In your local project folder
git add .
git commit -m "Simplified to 3-team ranking system"
git push
```

Your files should look like this:
```
your-repo/
├── index.html          ← New simplified form
├── admin.html          ← New admin dashboard  
├── package.json        ← Updated
├── vercel.json         ← New config file
└── api/
    ├── submit-ranking.js   ← New API
    └── get-rankings.js     ← New API
```

### Step 4: Vercel Auto-Deploys (2 min)

Vercel automatically deploys when you push to GitHub. Wait 2 minutes, then:

1. Check deployment status at [vercel.com/dashboard](https://vercel.com/dashboard)
2. Should say "Ready" with a green checkmark ✅

### Step 5: Test It! (2 min)

**Test Judge Form:**
1. Visit: `https://ai-design-for-social-good-scoring.vercel.app/`
2. Enter your name
3. Rank the three teams (1st, 2nd, 3rd)
4. Click "Submit Rankings"
5. Should see success message ✅

**Test Admin Dashboard:**
1. Visit: `https://ai-design-for-social-good-scoring.vercel.app/admin.html`
2. Enter your password (from Step 2)
3. Should see your test ranking ✅
4. Click "Refresh" to update

---

## 🎯 URLs to Share

**Give to Judges (PUBLIC):**
```
https://ai-design-for-social-good-scoring.vercel.app/
```

**Your Admin URL (PRIVATE):**
```
https://ai-design-for-social-good-scoring.vercel.app/admin.html
Password: [your password from admin.html]
```

---

## ⚠️ Troubleshooting

### "Failed to save submission"

→ You forgot Step 1. Create the KV database in Vercel.

### "Can't login to admin"

→ Check your password in `admin.html` line 210. It's case-sensitive!

### "No data showing in admin"

→ Submit a test ranking first, then refresh the admin dashboard.

### "Vercel deployment failed"

→ Check that you have `package.json` with `@vercel/kv` dependency.

---

## 🔄 Resetting Data

Need to start fresh?

1. Go to Vercel Dashboard
2. Storage → `rankings-db`
3. Data tab
4. Delete the `rankings` key
5. Done! ✅

---

## 📋 Day-of-Event Checklist

**30 minutes before:**
- [ ] Visit judge URL (make sure it loads)
- [ ] Submit test ranking
- [ ] Login to admin dashboard
- [ ] Delete test ranking (reset data)

**During event:**
- [ ] Share judge URL with all judges
- [ ] Keep admin dashboard open
- [ ] Auto-refreshes every 30 seconds
- [ ] Or click "Refresh" manually

**After judging:**
- [ ] View "Final Results" in admin dashboard
- [ ] Screenshot or export results
- [ ] Announce winners! 🎉

---

## 🎨 Customization (Optional)

### Change team names?

Edit both `index.html` and `admin.html`:
- Search for "Snapily", "Genie Health", "Harbor"
- Replace with your team names
- Keep the IDs consistent: `snapily`, `genie`, `harbor`

### Change colors?

Edit the CSS in `index.html` and `admin.html`:
- Find `#667eea` (purple) and `#764ba2` (dark purple)
- Replace with your colors

---

**Questions?** Check the full [README.md](README.md) for detailed docs.

**Time to deploy:** 15 minutes
**Ready for:** November 15-16 hackathon! 🚀
