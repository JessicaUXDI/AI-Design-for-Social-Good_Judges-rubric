# Quick Start Guide

## Running Locally

1. **Start the server:**
   ```bash
   cd hackathon-judging-app
   npm start
   ```

2. **Access the application:**
   - **Judge Form**: Open http://localhost:3000 in your browser
   - **Admin Dashboard**: Open http://localhost:3000/admin in your browser

## Sharing the Application

### For Local Network Sharing

If you want judges on your local network to access it:

1. Find your computer's IP address:
   - Mac: System Preferences → Network
   - Or run: `ifconfig | grep "inet "`

2. Start the server with your IP:
   ```bash
   PORT=3000 npm start
   ```

3. Share the URL: `http://YOUR_IP_ADDRESS:3000`

### For Internet Sharing (Recommended)

Deploy to a cloud service:

**Option 1: Render (Easiest)**
1. Push code to GitHub
2. Go to render.com
3. Create new Web Service
4. Connect GitHub repo
5. Deploy (it's free!)

**Option 2: Railway**
1. Push code to GitHub  
2. Go to railway.app
3. New Project → Deploy from GitHub
4. Done!

**Option 3: Heroku**
```bash
heroku create your-app-name
git push heroku main
```

## Category Customization

To update category names, edit these files:
- `public/app.js` (line 2-12)
- `public/admin.js` (line 1-11)

Change the category names in the `categories` object.

## Notes

- All data is stored in `judging.db` (SQLite database)
- The admin dashboard auto-refreshes every 30 seconds
- Judges can submit multiple times (each submission is tracked separately)

