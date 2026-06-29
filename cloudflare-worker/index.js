// Only these origins get a valid CORS response.
// Add 'http://localhost:5173' temporarily while testing locally, remove before shipping.
const ALLOWED_ORIGINS = ['https://deathtimeleft.com', 'https://www.deathtimeleft.com', 'http://localhost:5173']

// Per-IP cap. Groq's free tier has generous rate limits, but this
// per-IP number stops one visitor/bot from hammering the shared quota.
const DAILY_LIMIT_PER_IP = 8

function corsHeaders(origin) {
  const allowOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || ''

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders(origin) })
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: corsHeaders(origin) })
    }

    // --- Rate limit by IP (real protection — this stops curl/scripts too) ---
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown'
    const today = new Date().toISOString().slice(0, 10)
    const key = `rl:${ip}:${today}`

    const countRaw = await env.RATE_LIMIT_KV.get(key)
    const count = countRaw ? parseInt(countRaw, 10) : 0

    if (count >= DAILY_LIMIT_PER_IP) {
      return new Response(
        JSON.stringify({ error: 'Daily AI limit reached. Try again tomorrow.' }),
        { status: 429, headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' } }
      )
    }

    let body
    try {
      body = await request.json()
    } catch {
      return new Response('Invalid JSON', { status: 400, headers: corsHeaders(origin) })
    }

    const { messages, system } = body
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response('Missing messages', { status: 400, headers: corsHeaders(origin) })
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 300,
        messages: [
          { role: 'system', content: system },
          ...messages,
        ],
      }),
    })

    const data = await response.json()

    // Increment only after the Anthropic call actually fired (so failed calls don't burn quota)
    await env.RATE_LIMIT_KV.put(key, String(count + 1), { expirationTtl: 60 * 60 * 26 })

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' }
    })
  }
}