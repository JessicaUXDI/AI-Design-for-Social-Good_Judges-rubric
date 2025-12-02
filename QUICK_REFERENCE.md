# 🚀 DEPLOYMENT QUICK REFERENCE

## ⚡ Fastest Path to Production

### 1️⃣ Push to GitHub (5 minutes)
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_URL
git push -u origin main
```

### 2️⃣ Deploy to Render (5 minutes)
1. Go to render.com → Sign up
2. New + → PostgreSQL → Create database
3. Copy "Internal Database URL"
4. New + → Web Service → Connect GitHub repo
5. Add environment variables:
   ```
   ADMIN_PASSWORD=YourPassword123
   SESSION_SECRET=randomString32chars
   DATABASE_URL=[paste from step 3]
   NODE_ENV=production
   ```
6. Click "Create Web Service"
7. Wait 3 minutes → DONE! ✅

### 3️⃣ Test (2 minutes)
- Visit your-app.onrender.com
- Submit test score
- Visit your-app.onrender.com/admin
- Login with your password
- Verify test score appears

### 4️⃣ Share (1 minute)
Send judges: `https://your-app.onrender.com`
Keep private: `https://your-app.onrender.com/admin`

---

## 🎯 Day-of-Event

**Before event starts:**
- Visit URL to wake up app (Render free tier)
- Test one submission
- Login to admin
- Keep admin dashboard open

**During event:**
- Auto-refreshes every 30 seconds
- Or click "Refresh" button manually

**After event:**
- Review "Summary by Project" table
- Screenshot or export data
- Click "Logout"

---

## 🔑 Required Passwords

Set these in your hosting platform:

| Variable | Example | Where to Set |
|----------|---------|--------------|
| ADMIN_PASSWORD | AI_Social_2024! | Render/Railway env vars |
| SESSION_SECRET | xK9mP2nQ7vL8sR4tY3... | Render/Railway env vars |
| DATABASE_URL | postgresql://... | Auto-set by database |

---

## 🆘 Quick Fixes

| Problem | Solution |
|---------|----------|
| Can't login | Check ADMIN_PASSWORD spelling |
| Slow first load | Visit URL 5 min before event |
| Database error | Verify DATABASE_URL exists |
| Judge can't submit | Check all required fields filled |

---

## 📞 Support Resources

- Full docs: `README.md`
- Quick start: `QUICKSTART.md`
- Render guide: `DEPLOY_RENDER.md`
- Railway guide: `DEPLOY_RAILWAY.md`
- Setup summary: `SETUP_SUMMARY.md`

---

## ✅ Pre-Event Checklist

- [ ] Pushed to GitHub
- [ ] Deployed to Render/Railway
- [ ] Set ADMIN_PASSWORD
- [ ] Set SESSION_SECRET
- [ ] Tested judge form submission
- [ ] Tested admin login
- [ ] Shared judge URL with team
- [ ] Saved admin URL privately

---

**Your app will be live at:**
`https://[your-app-name].onrender.com`

**Time to deploy: ~15 minutes total**

Good luck! 🎉
