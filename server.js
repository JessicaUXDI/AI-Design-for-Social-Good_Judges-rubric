const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Initialize database
const db = new sqlite3.Database('./judging.db', (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
    // Create tables
    db.run(`CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      judge_name TEXT NOT NULL,
      project_name TEXT,
      category_a_score INTEGER,
      category_a_feedback TEXT,
      category_b_score INTEGER,
      category_b_feedback TEXT,
      category_c_score INTEGER,
      category_c_feedback TEXT,
      category_d_score INTEGER,
      category_d_feedback TEXT,
      category_e_score INTEGER,
      category_e_feedback TEXT,
      category_f_score INTEGER,
      category_f_feedback TEXT,
      category_g_score INTEGER,
      category_g_feedback TEXT,
      category_h_score INTEGER,
      category_h_feedback TEXT,
      category_i_score INTEGER,
      category_i_feedback TEXT,
      category_j_score INTEGER,
      category_j_feedback TEXT,
      general_feedback TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
  }
});

// API Routes

// Submit scores
app.post('/api/submit', (req, res) => {
  const {
    judgeName,
    projectName,
    scores,
    feedback
  } = req.body;

  const stmt = db.prepare(`INSERT INTO submissions (
    judge_name, project_name,
    category_a_score, category_a_feedback,
    category_b_score, category_b_feedback,
    category_c_score, category_c_feedback,
    category_d_score, category_d_feedback,
    category_e_score, category_e_feedback,
    category_f_score, category_f_feedback,
    category_g_score, category_g_feedback,
    category_h_score, category_h_feedback,
    category_i_score, category_i_feedback,
    category_j_score, category_j_feedback,
    general_feedback
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

  stmt.run(
    judgeName || 'Anonymous',
    projectName || '',
    scores?.A || null, feedback?.A || '',
    scores?.B || null, feedback?.B || '',
    scores?.C || null, feedback?.C || '',
    scores?.D || null, feedback?.D || '',
    scores?.E || null, feedback?.E || '',
    scores?.F || null, feedback?.F || '',
    scores?.G || null, feedback?.G || '',
    scores?.H || null, feedback?.H || '',
    scores?.I || null, feedback?.I || '',
    scores?.J || null, feedback?.J || '',
    feedback?.general || '',
    (err) => {
      if (err) {
        console.error('Error inserting submission:', err);
        res.status(500).json({ error: 'Failed to save submission' });
      } else {
        res.json({ success: true, message: 'Scores submitted successfully!' });
      }
    }
  );
  stmt.finalize();
});

// Get all submissions (admin view)
app.get('/api/submissions', (req, res) => {
  db.all('SELECT * FROM submissions ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      console.error('Error fetching submissions:', err);
      res.status(500).json({ error: 'Failed to fetch submissions' });
    } else {
      res.json(rows);
    }
  });
});

// Get summary statistics
app.get('/api/summary', (req, res) => {
  db.all(`
    SELECT 
      project_name,
      COUNT(*) as judge_count,
      AVG(category_a_score) as avg_a,
      AVG(category_b_score) as avg_b,
      AVG(category_c_score) as avg_c,
      AVG(category_d_score) as avg_d,
      AVG(category_e_score) as avg_e,
      AVG(category_f_score) as avg_f,
      AVG(category_g_score) as avg_g,
      AVG(category_h_score) as avg_h,
      AVG(category_i_score) as avg_i,
      AVG(category_j_score) as avg_j
    FROM submissions
    WHERE project_name IS NOT NULL AND project_name != ''
    GROUP BY project_name
  `, (err, rows) => {
    if (err) {
      console.error('Error fetching summary:', err);
      res.status(500).json({ error: 'Failed to fetch summary' });
    } else {
      res.json(rows);
    }
  });
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve admin page
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Judge form: http://localhost:${PORT}`);
  console.log(`Admin dashboard: http://localhost:${PORT}/admin`);
});

