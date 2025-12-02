# Hackathon Judging Application

A digital judging rubric application for hackathons that allows judges to submit scores and feedback, with a centralized admin dashboard to view all submissions.

## Features

- **Judge Scoring Form**: Easy-to-use form for judges to submit scores (1-10) and feedback for each category
- **Admin Dashboard**: Centralized view of all judge submissions with statistics and summaries
- **Categories**: Pre-configured categories A-J (customizable)
- **Feedback Fields**: Each category includes a feedback/comments field
- **Real-time Updates**: Admin dashboard refreshes automatically

## Category Mappings

- A = Walnut
- B = OnFire
- C = Genie
- D = BoldSteps
- E = Align
- F = Joy
- G = SnapAlly
- H = Category H (customize as needed)
- I = Category I (customize as needed)
- J = Category J (customize as needed)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

3. Access the application:
   - Judge Form: http://localhost:3000
   - Admin Dashboard: http://localhost:3000/admin

## Deployment

### Option 1: Deploy to Heroku

1. Create a Heroku app
2. Push to Heroku:
```bash
git init
git add .
git commit -m "Initial commit"
heroku create your-app-name
git push heroku main
```

### Option 2: Deploy to Railway

1. Connect your GitHub repository to Railway
2. Railway will auto-detect and deploy

### Option 3: Deploy to Render

1. Create a new Web Service on Render
2. Connect your repository
3. Set build command: `npm install`
4. Set start command: `node server.js`

### Option 4: Deploy to Vercel/Netlify (with serverless functions)

For serverless deployment, you'll need to adapt the backend to use serverless functions.

## Environment Variables

- `PORT`: Server port (defaults to 3000)

## Database

The application uses SQLite for data storage. The database file (`judging.db`) is created automatically on first run.

## Customization

To update category names, edit the `categories` object in:
- `public/app.js` (for the judge form)
- `public/admin.js` (for the admin dashboard)

## Notes

- The database file is stored locally. For production, consider using a cloud database service.
- All submissions are stored with timestamps for tracking.

