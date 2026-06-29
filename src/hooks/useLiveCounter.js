import { useState, useEffect, useRef } from 'react'

export function useLiveCounter(dobTimestamp) {
  const [counters, setCounters] = useState({
    seconds: 0,
    days: 0,
    hours: 0,
    weeks: 0,
  })
  const intervalRef = useRef(null)

  useEffect(() => {
    if (!dobTimestamp) return
    const update = () => {
      const diff = Date.now() - dobTimestamp
      setCounters({
        seconds: Math.floor(diff / 1000),
        days: Math.floor(diff / 86400000),
        hours: Math.floor(diff / 3600000),
        weeks: Math.floor(diff / 604800000),
      })
    }
    update()
    intervalRef.current = setInterval(update, 1000)
    return () => clearInterval(intervalRef.current)
  }, [dobTimestamp])

  return counters
}
