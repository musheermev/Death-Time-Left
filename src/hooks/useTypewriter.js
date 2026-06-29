import { useState, useEffect, useRef } from 'react'

export default function useTypewriter(fullText, speed = 18) {
  const [displayed, setDisplayed] = useState('')
  const indexRef = useRef(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    // Reset on new text
    setDisplayed('')
    indexRef.current = 0

    if (!fullText) return

    intervalRef.current = setInterval(() => {
      indexRef.current += 1
      setDisplayed(fullText.slice(0, indexRef.current))

      if (indexRef.current >= fullText.length) {
        clearInterval(intervalRef.current)
      }
    }, speed)

    // Cleanup on unmount or text change
    return () => clearInterval(intervalRef.current)
  }, [fullText, speed])

  const isDone = displayed.length === fullText?.length && fullText?.length > 0

  return { displayed, isDone }
}