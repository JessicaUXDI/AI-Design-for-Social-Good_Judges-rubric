import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const rankings = await kv.get('rankings') || [];
    return res.status(200).json({ 
      success: true, 
      rankings: rankings 
    });
  } catch (error) {
    console.error('Error fetching rankings:', error);
    return res.status(500).json({ error: 'Failed to fetch rankings' });
  }
}
