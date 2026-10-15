// Vercel serverless function: AI issue search
// Env vars needed on Vercel: ANTHROPIC_API_KEY (SUPABASE_URL + SUPABASE_ANON_KEY optional, for login-only AI)
module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  const { query, token } = req.body || {};
  if (!query || query.length > 500) return res.status(400).json({ error: 'Invalid query' });

  // Optional: allow only logged-in users
  if (process.env.REQUIRE_LOGIN === 'true') {
    const u = await fetch(process.env.SUPABASE_URL + '/auth/v1/user', {
      headers: { Authorization: 'Bearer ' + token, apikey: process.env.SUPABASE_ANON_KEY },
    });
    if (!u.ok) return res.status(401).json({ error: 'Please sign in to use AI search.' });
  }

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-5-5',
        max_tokens: 900,
        system:
          'You are a senior IT support engineer. Give a short likely cause, then numbered simple fix steps (with exact commands where useful), then one line on when to escalate. Plain text only, no markdown symbols. Reply in the same language as the user.',
        messages: [{ role: 'user', content: query }],
      }),
    });
    const d = await r.json();
    res.json({ answer: d.content?.[0]?.text || d.error?.message || 'No answer' });
  } catch (e) {
    res.status(500).json({ error: 'AI request failed' });
  }
};
