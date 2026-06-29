export function addDays(date, days) {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

export function addYears(date, years) {
  const d = new Date(date)
  d.setFullYear(d.getFullYear() + years)
  return d
}

export function buildMilestones(dob) {
  return [
    { label: '1,000 Days Old', labelKey: 'ms1', date: addDays(dob, 1000) },
    { label: '10,000 Hours Lived', labelKey: 'ms2', date: addDays(dob, Math.ceil(10000 / 24)) },
    { label: '5,000 Days Old', labelKey: 'ms3', date: addDays(dob, 5000) },
    { label: '1 Million Minutes Lived', labelKey: 'ms4', date: addDays(dob, Math.ceil(1e6 / 1440)) },
    { label: '10,000 Days Old', labelKey: 'ms5', date: addDays(dob, 10000) },
    { label: '1,000 Weeks Lived', labelKey: 'ms6', date: addDays(dob, 7000) },
    { label: '18 Years Old — Legal Age', labelKey: 'ms7', date: addYears(dob, 18) },
    { label: '20 Years Old', labelKey: 'ms8', date: addYears(dob, 20) },
    { label: '25 Years Old', labelKey: 'ms9', date: addYears(dob, 25) },
    { label: '30 Years Old', labelKey: 'ms10', date: addYears(dob, 30) },
    { label: '100 Million Seconds Lived', labelKey: 'ms11', date: addDays(dob, Math.ceil(1e8 / 86400)) },
    { label: '35 Years Old', labelKey: 'ms12', date: addYears(dob, 35) },
    { label: '15,000 Days Old', labelKey: 'ms13', date: addDays(dob, 15000) },
    { label: '1 Billion Seconds Lived', labelKey: 'ms14', date: addDays(dob, Math.ceil(1e9 / 86400)) },
    { label: '40 Years Old', labelKey: 'ms15', date: addYears(dob, 40) },
    { label: '50 Years Old — Half Century', labelKey: 'ms16', date: addYears(dob, 50) },
    { label: '18,250 Days (50 Years Exact)', labelKey: 'ms17', date: addDays(dob, 18250) },
    { label: '60 Years Old', labelKey: 'ms18', date: addYears(dob, 60) },
    { label: '70 Years Old', labelKey: 'ms19', date: addYears(dob, 70) },
    { label: 'WHO Avg. Lifespan (72.6 yrs)', labelKey: 'ms20', date: addDays(dob, Math.ceil(72.6 * 365.25)) },
  ].sort((a, b) => a.date - b.date)
}