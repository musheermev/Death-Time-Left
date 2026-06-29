export function fmt(n) {
  if (n >= 1e9) return (n / 1e9).toFixed(2) + 'B'
  if (n >= 1e6) return (n / 1e6).toFixed(2) + 'M'
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K'
  return n.toLocaleString()
}

export function calcExactAge(dob, now = new Date()) {
  let y = now.getFullYear() - dob.getFullYear()
  let m = now.getMonth() - dob.getMonth()
  let d = now.getDate() - dob.getDate()
  if (d < 0) {
    m--
    d += new Date(now.getFullYear(), now.getMonth(), 0).getDate()
  }
  if (m < 0) { y--; m += 12 }
  return { years: y, months: m, days: d }
}

export function calcDeathDate(dob, lifeExpectancy = 72.6) {
  const d = new Date(dob)
  d.setFullYear(d.getFullYear() + Math.floor(lifeExpectancy))
  return d
}

export function calcPersonalizedLE(baseLE, factors) {
  const adj = Object.values(factors).reduce((a, b) => a + b, 0)
  return Math.max(50, baseLE + adj)
}

export function calcLifeProgress(ageYears, lifeExpectancy = 72.6) {
  return Math.min(100, (ageYears / lifeExpectancy) * 100)
}

export function getZodiac(month, day) {
  const signs = [
    'Capricorn','Aquarius','Pisces','Aries','Taurus','Gemini',
    'Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius'
  ]
  const cutoffs = [19,18,20,19,20,20,22,22,22,22,21,21]
  const i = month - 1
  return day <= cutoffs[i] ? signs[i] : signs[(i + 1) % 12]
}

export function getChineseZodiac(year) {
  const animals = [
    'Rat','Ox','Tiger','Rabbit','Dragon','Snake',
    'Horse','Goat','Monkey','Rooster','Dog','Pig'
  ]
  return animals[(year - 1900) % 12]
}

export function getSeason(month) {
  if ([3,4,5].includes(month)) return 'Spring'
  if ([6,7,8].includes(month)) return 'Summer'
  if ([9,10,11].includes(month)) return 'Autumn'
  return 'Winter'
}

export function getMoonPhase(date) {
  const base = new Date('2000-01-06')
  const diff = (date - base) / 86400000
  const phase = ((diff % 29.53) + 29.53) % 29.53
  if (phase < 1.85) return 'New Moon'
  if (phase < 7.38) return 'Waxing Crescent'
  if (phase < 9.22) return 'First Quarter'
  if (phase < 14.77) return 'Waxing Gibbous'
  if (phase < 16.61) return 'Full Moon'
  if (phase < 22.15) return 'Waning Gibbous'
  if (phase < 23.99) return 'Last Quarter'
  return 'Waning Crescent'
}

export function getGeneration(year) {
  if (year >= 2013) return {
    name: 'Gen Alpha', years: '2013–present',
    desc: 'Born fully into the AI era. iPads before pencils. The first generation raised alongside large language models and smart devices from birth.'
  }
  if (year >= 1997) return {
    name: 'Gen Z', years: '1997–2012',
    desc: 'Digital natives shaped by smartphones, social media, climate anxiety, and a global pandemic during formative years.'
  }
  if (year >= 1981) return {
    name: 'Millennial', years: '1981–1996',
    desc: 'Shaped by the internet revolution, 9/11, the 2008 financial crash, and the rise of social media.'
  }
  if (year >= 1965) return {
    name: 'Gen X', years: '1965–1980',
    desc: 'The latchkey generation — fiercely independent, skeptical, caught between analog roots and digital futures.'
  }
  if (year >= 1946) return {
    name: 'Baby Boomer', years: '1946–1964',
    desc: 'Post-WWII optimism, unprecedented economic growth, the cultural revolution of the 60s and 70s.'
  }
  return {
    name: 'Silent Generation', years: '1928–1945',
    desc: 'Shaped by the Great Depression and WWII. Known for discipline, conformity, and quiet resilience.'
  }
}

export function getBirthstone(month) {
  return ['Garnet','Amethyst','Aquamarine','Diamond','Emerald',
    'Pearl','Ruby','Peridot','Sapphire','Opal','Topaz','Turquoise'][month - 1]
}

export function getBirthFlower(month) {
  return ['Carnation','Violet','Daffodil','Daisy',
    'Lily of the Valley','Rose','Larkspur','Gladiolus',
    'Aster','Marigold','Chrysanthemum','Narcissus'][month - 1]
}

export function getLifeLuckScore(dob) {
  const year = dob.getFullYear()
  const month = dob.getMonth() + 1
  let score = 500
  const factors = []

  if (year >= 1990 && year <= 2010) {
    score += 80
    factors.push({ label: 'Born in a stable, connected decade', value: +80, positive: true })
  } else if (year < 1950) {
    score -= 60
    factors.push({ label: 'Born during wartime era', value: -60, positive: false })
  } else {
    score += 40
    factors.push({ label: 'Born in a peaceful era', value: +40, positive: true })
  }

  if (year >= 1985) {
    score += 120
    factors.push({ label: 'Grew up with the internet', value: +120, positive: true })
  }

  const recessionYears = [1929,1930,1931,1932,1973,1974,1980,1981,1982,2008,2009,2020,2021]
  if (recessionYears.includes(year)) {
    score -= 40
    factors.push({ label: 'Born during recession year', value: -40, positive: false })
  }

  if (year >= 1997 && year <= 2012) {
    score += 60
    factors.push({ label: 'Gen Z — highest projected digital lifespan', value: +60, positive: true })
  }

  if ([6,7,8].includes(month)) {
    score += 30
    factors.push({ label: 'Summer birth — slight developmental advantage', value: +30, positive: true })
  }

  const dayOfWeek = dob.getDay()
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    score += 20
    factors.push({ label: 'Born on a weekend', value: +20, positive: true })
  }

  if (year >= 2000) {
    score += 90
    factors.push({ label: '21st century birth — longest life expectancy in history', value: +90, positive: true })
  }

  const finalScore = Math.min(1000, Math.max(0, score))
  const label =
    finalScore >= 850 ? 'You won the lottery of existence.' :
    finalScore >= 700 ? 'You got a strong hand to play.' :
    finalScore >= 500 ? 'A fair share of luck came your way.' :
    'Life dealt you a challenging hand — respect.'

  return { score: finalScore, factors, label }
}

export function getLifeArchetype(lifestyle) {
  const { sleep, stress, exercise } = lifestyle

  const stressVal = { '-4': 4, '-2': 3, '0': 2, '3': 1 }[stress] || 2
  const sleepVal = { '-3': 1, '-1': 2, '2': 4, '0': 3 }[sleep] || 2
  const exerciseVal = { '0': 1, '2': 2, '4': 3, '6': 4 }[exercise] || 2

  if (stressVal >= 3 && exerciseVal >= 3) return {
    name: 'The Phoenix',
    desc: 'High stress but high drive. You burn bright and recover hard. Most of your best work happens under pressure.',
    color: '#E74C3C'
  }
  if (sleepVal <= 2 && stressVal >= 3) return {
    name: 'The Night Runner',
    desc: 'You sacrifice sleep for your ambitions. Creative, restless, and wired. The night is your domain.',
    color: '#C9A84C'
  }
  if (exerciseVal >= 3 && stressVal <= 2) return {
    name: 'The Warrior Monk',
    desc: 'Disciplined body, calm mind. You have built systems that protect your energy. Few reach this balance.',
    color: '#2ECC71'
  }
  if (sleepVal >= 3 && stressVal <= 2) return {
    name: 'The Silent Storm',
    desc: 'Steady, quiet, and deeply intentional. Your calm is your superpower. Still waters run deep.',
    color: '#3498DB'
  }
  return {
    name: 'The Wanderer',
    desc: "Still finding your rhythm. The best chapters of your life haven't been written yet. That's not a weakness.",
    color: '#9B59B6'
  }
}