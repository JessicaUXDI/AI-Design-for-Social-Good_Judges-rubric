import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { rankings, comments } = req.body;

    if (!rankings) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const submission = {
      id: Date.now().toString(),
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
    console.error('Error:', error);
    return res.status(500).json({ error: 'Failed to save submission' });
  }
}
