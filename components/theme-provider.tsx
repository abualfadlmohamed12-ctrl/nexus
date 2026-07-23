'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'
type Language = 'en' | 'ar'

interface ThemeContextValue {
  theme: Theme
  setTheme: (t: Theme) => void
  toggleTheme: () => void
  language: Language
  setLanguage: (l: Language) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark')
  const [language, setLanguageState] = useState<Language>('en')

  useEffect(() => {
    const stored = localStorage.getItem('nexus-theme') as Theme | null
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const initial = stored ?? preferred
    setThemeState(initial)
    document.documentElement.classList.toggle('dark', initial === 'dark')

    const storedLang = localStorage.getItem('nexus-lang') as Language | null
    if (storedLang) setLanguageState(storedLang)
  }, [])

  const setTheme = (t: Theme) => {
    setThemeState(t)
    localStorage.setItem('nexus-theme', t)
    document.documentElement.classList.toggle('dark', t === 'dark')
  }

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  const setLanguage = (l: Language) => {
    setLanguageState(l)
    localStorage.setItem('nexus-lang', l)
    document.documentElement.setAttribute('dir', l === 'ar' ? 'rtl' : 'ltr')
    document.documentElement.setAttribute('lang', l)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, language, setLanguage }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
