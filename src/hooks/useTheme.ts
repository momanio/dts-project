import { useEffect, useState } from 'react'
import { readPreference, writePreference } from '../lib/utils'

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = readPreference('luma-theme')
    return saved === 'dark' || saved === 'light'
      ? saved
      : window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
  })
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    if (themeColor) {
      themeColor.content = getComputedStyle(document.documentElement)
        .getPropertyValue('--canvas')
        .trim()
    }
  }, [theme])
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const sync = (event: MediaQueryListEvent) => {
      if (!readPreference('luma-theme')) setTheme(event.matches ? 'dark' : 'light')
    }
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])
  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    writePreference('luma-theme', next)
    setTheme(next)
  }
  return { theme, toggleTheme }
}
