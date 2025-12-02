import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // Rate limiting - prevent spam
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const rateLimitKey = `ratelimit:${ip}`;
  const submissionCount = await kv.get(rateLimitKey) || 0;
  
  if (submissionCount > 5) {
    return res.status(429).json({ error: 'Too many submissions. Please wait.' });
  }

  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
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
      judgeName: judgeName.substring(0, 100), // Limit name length
      rankings,
      comments: comments ? comments.substring(0, 500) : '', // Limit comments
      timestamp: new Date().toISOString(),
      ip: ip.substring(0, 45) // Store IP for spam detection
    };

    const existingSubmissions = await kv.get('rankings') || [];
    existingSubmissions.push(submission);
    await kv.set('rankings', existingSubmissions);

    // Increment rate limit
    await kv.set(rateLimitKey, submissionCount + 1, { ex: 3600 }); // 1 hour expiry

    return res.status(200).json({ 
      success: true, 
      message: 'Rankings submitted successfully!' 
    });
  } catch (error) {
    console.error('Error submitting ranking:', error);
    return res.status(500).json({ error: 'Failed to save submission' });
  }
}
