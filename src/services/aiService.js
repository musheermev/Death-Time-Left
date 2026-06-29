const WORKER_URL = 'https://dtl-ai-proxy.death-time-left.workers.dev'
const LANG_NAMES = { en: 'English', ar: 'Arabic', es: 'Spanish', ru: 'Russian' }

export async function getAILifeNarrative(params) {
  const { dob, ageYears, totalDays, generation, lifestyle, lang } = params

  const system = `You are a thoughtful life analyst for Death Time Left (deathtimeleft.com). Generate SHORT, punchy, personalized responses. Maximum 120 words. No lists. Pure flowing sentences. Brutal honesty mixed with wisdom. No filler phrases. Sound like a wise friend, not a generic AI. Never use emojis. Respond entirely in ${LANG_NAMES[lang] || 'English'}.`

  const prompt = `Person: born ${dob.toDateString()}, age ${ageYears}, ${totalDays} days lived. Generation: ${generation}. Lifestyle: sleep ${lifestyle.sleep}hrs, smoking: ${lifestyle.smoke}, stress: ${lifestyle.stress}.

Write a 3-sentence "Life Story So Far" — mention actual world events that happened during their lifetime. Make it feel eerily personal. End with one forward-looking line.`

  return callWorker(system, prompt)
}

export async function getAIBucketList(params) {
  const { ageYears, daysLeft, archetype, lifestyle, lang } = params

  const system = `You are a life coach for Death Time Left. Generate exactly 5 bucket list items. Each item must be one punchy sentence under 15 words. Be specific, not generic. No numbers/bullets — just line breaks. Never use emojis. Respond entirely in ${LANG_NAMES[lang] || 'English'}.`

  const prompt = `Person: age ${ageYears}, approx ${daysLeft} days remaining, archetype: ${archetype || 'unknown'}. Lifestyle clues: stress=${lifestyle.stress}, exercise=${lifestyle.exercise}.

Write 5 specific bucket list items for this exact person. Not generic "travel the world" — be specific.`

  return callWorker(system, prompt)
}

export async function getAIDeathExplainer(params) {
  const { lifestyle, personalLE, baseLE, lang } = params

  const system = `You are a brutally honest health analyst for Death Time Left. Maximum 100 words. No medical disclaimers. Just honest statistical analysis. Sound like a smart friend who knows the data. Never use emojis. Respond entirely in ${LANG_NAMES[lang] || 'English'}.`

  const prompt = `Base life expectancy: ${baseLE} years. This person's estimate: ${personalLE.toFixed(1)} years. Key factors: ${JSON.stringify(lifestyle)}.

In 2-3 short sentences: what are their top 2 risks, and what single change would add the most years?`

  return callWorker(system, prompt)
}

export async function getAIBrainAnalysis(params) {
  const { reflexMs, memoryScore, stroopScore, brainAge, ageYears, lang } = params

  const system = `You are a cognitive performance analyst for Death Time Left. Maximum 80 words. One short paragraph. No medical disclaimers, no lists. Sound like a smart friend reading the numbers, not a generic AI. Never use emojis. Respond entirely in ${LANG_NAMES[lang] || 'English'}.`

  const prompt = `Reflex average: ${Math.round(reflexMs)}ms. Memory score: ${memoryScore}/25. Stroop focus score: ${stroopScore}/100. Estimated brain age: ${brainAge}, real age: ${ageYears}.

In 2 short sentences: what does this combination say about this person's cognitive profile, and one practical note.`

  return callWorker(system, prompt)
}

async function callWorker(system, userMessage) {
  let res
  try {
    res = await fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system,
        messages: [{ role: 'user', content: userMessage }]
      })
    })
  } catch {
    throw new Error('unavailable')
  }

  if (res.status === 429) {
    throw new Error('rate_limit')
  }
  if (!res.ok) {
    throw new Error('unavailable')
  }

  const data = await res.json()
  const text = data?.choices?.[0]?.message?.content
  if (!text) {
    throw new Error('unavailable')
  }
  return text
}