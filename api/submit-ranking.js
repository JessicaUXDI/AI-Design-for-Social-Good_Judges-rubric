import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { judgeName, rankings, comments } = req.body;

    if (!judgeName || !rankings) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const rankValues = Object.values(rankings);
    if (rankValues.length !== 3 || !rankValues.includes(1) || !rankValues.includes(2) || !rankValues.includes(3)) {
      return res.status(400).json({ error: 'Invalid rankings' });
    }

    const submission = {
      id: Date.now().toString(),
      judgeName,
      rankings,
      comments: comments || '',
      timestamp: new Date().toISOString()
    };

    const existingSubmissions = await kv.get('rankings') || [];
    existingSubmissions.push(submission);
    await kv.set('rankings', existingSubmissions);

    return res.status(200).json({ 
      success: true, 
      message: 'Rankings submitted successfully!' 
    });
  } catch (error) {
    console.error('Error submitting ranking:', error);
    return res.status(500).json({ error: 'Failed to save submission' });
  }
}
