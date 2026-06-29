import { useState, useEffect } from 'react'

export function useLocalTime() {
  const [time, setTime] = useState(new Date())
  const [timezone, setTimezone] = useState('')

  useEffect(() => {
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone)
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const formatted = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })

  return { time, formatted, timezone }
}
