import { useState, useEffect } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('dtl-theme')
    if (saved) return saved
    return 'device'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      root.classList.remove('light')
    } else if (theme === 'light') {
      root.classList.add('light')
      root.classList.remove('dark')
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (prefersDark) {
        root.classList.add('dark')
        root.classList.remove('light')
      } else {
        root.classList.add('light')
        root.classList.remove('dark')
      }
    }
    localStorage.setItem('dtl-theme', theme)
  }, [theme])

  return { theme, setTheme }
}
