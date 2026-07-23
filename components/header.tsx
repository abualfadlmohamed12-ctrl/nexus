'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTheme } from '@/components/theme-provider'
import { NexusLogo } from '@/components/nexus-logo'
import { Sun, Moon, Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Products', href: '#' },
  { label: 'Templates', href: '/templates' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Enterprise', href: '#' },
  { label: 'Docs', href: '#' },
]

export function Header({ variant = 'landing' }: { variant?: 'landing' | 'app' }) {
  const { theme, toggleTheme, language, setLanguage } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl">
      <div className="glass rounded-2xl px-4 py-2.5 shadow-lg shadow-black/5">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <NexusLogo size="sm" />
          </Link>

          {/* Center nav — desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-xl transition-all duration-200 hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right controls */}
          <div className="hidden md:flex items-center gap-2">
            {/* Language */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground rounded-lg glass-card-sm transition-all duration-200 hover:scale-105"
            >
              {language === 'en' ? 'EN / العربية' : 'العربية / EN'}
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-muted-foreground hover:text-foreground rounded-xl glass-card-sm transition-all duration-200 hover:scale-105"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Auth buttons */}
            <Link
              href="/auth/login"
              className="px-3.5 py-1.5 text-sm text-foreground rounded-xl glass-card-sm hover:scale-105 transition-all duration-200"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="px-3.5 py-1.5 text-sm font-medium rounded-xl transition-all duration-200 hover:scale-105 hover:nexus-glow-sm"
              style={{
                background: 'linear-gradient(135deg, var(--nexus-cyan), var(--nexus-blue))',
                color: 'oklch(0.1 0.015 240)',
              }}
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl glass-card-sm text-muted-foreground hover:text-foreground transition-all"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-white/10 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-xl hover:bg-white/10 transition-all"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/10">
              <button
                onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                className="flex-1 py-1.5 text-xs text-muted-foreground rounded-lg glass-card-sm"
              >
                {language === 'en' ? 'EN / العربية' : 'العربية / EN'}
              </button>
              <button onClick={toggleTheme} className="p-2 rounded-xl glass-card-sm text-muted-foreground">
                {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            </div>
            <div className="flex gap-2 mt-1">
              <Link href="/auth/login" className="flex-1 text-center py-2 text-sm rounded-xl glass-card-sm text-foreground">
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="flex-1 text-center py-2 text-sm font-medium rounded-xl text-[oklch(0.1_0.015_240)]"
                style={{ background: 'linear-gradient(135deg, var(--nexus-cyan), var(--nexus-blue))' }}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
