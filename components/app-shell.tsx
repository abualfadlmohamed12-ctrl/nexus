'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NexusLogo } from '@/components/nexus-logo'
import { useTheme } from '@/components/theme-provider'
import {
  Home, FolderOpen, LayoutTemplate, Puzzle, Settings,
  Bell, Sun, Moon, ChevronDown, LogOut, CreditCard,
  User, Menu, X, Zap
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Home' },
  { href: '/dashboard/projects', icon: FolderOpen, label: 'Projects' },
  { href: '/dashboard/templates', icon: LayoutTemplate, label: 'Templates' },
  { href: '/dashboard/integrations', icon: Puzzle, label: 'Integrations' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
]

interface UserData {
  name: string
  email: string
  plan: string
  credits: number
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme, language, setLanguage } = useTheme()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [user, setUser] = useState<UserData | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('nexus-user')
    if (stored) setUser(JSON.parse(stored))
  }, [])

  const pageTitle = navItems.find(n => n.href === pathname)?.label ?? 'Dashboard'

  const Sidebar = (
    <aside
      className={cn(
        'fixed top-0 left-0 h-full z-40 flex flex-col',
        'glass-strong border-r border-white/8',
        'w-56 transition-transform duration-300 ease-in-out',
        'md:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/8">
        <Link href="/dashboard" onClick={() => setSidebarOpen(false)}>
          <NexusLogo size="sm" />
        </Link>
        <button className="md:hidden text-muted-foreground" onClick={() => setSidebarOpen(false)}>
          <X size={16} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                'flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-all duration-200',
                active
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/6'
              )}
              style={active ? {
                background: 'linear-gradient(135deg, var(--nexus-cyan)/12, var(--nexus-blue)/10)',
                boxShadow: '0 0 0 1px var(--nexus-cyan)/20, 0 0 12px var(--nexus-glow)',
                color: 'var(--nexus-cyan)',
              } : {}}
            >
              <Icon size={16} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom: user + credits */}
      <div className="px-2 py-3 border-t border-white/8 space-y-2">
        {/* Credits */}
        <div className="glass-card-sm px-3 py-2.5 mx-1">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] text-muted-foreground">Credits</span>
            <span className="text-[11px] font-medium" style={{ color: 'var(--nexus-cyan)' }}>
              {user?.credits ?? 50} left
            </span>
          </div>
          <div className="h-1 rounded-full bg-border overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(((user?.credits ?? 50) / 500) * 100, 100)}%`,
                background: 'linear-gradient(90deg, var(--nexus-cyan), var(--nexus-blue))',
              }}
            />
          </div>
          <p className="text-[10px] text-muted-foreground/60 mt-1">Resets in 12 days</p>
        </div>

        {/* User */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/6 transition-colors cursor-pointer">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, var(--nexus-cyan), var(--nexus-blue))', color: 'oklch(0.1 0.015 240)' }}
          >
            {(user?.name ?? 'U').charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate">{user?.name ?? 'User'}</p>
            <p className="text-[10px] text-muted-foreground truncate">{user?.plan ?? 'Free'} Plan</p>
          </div>
        </div>
      </div>
    </aside>
  )

  return (
    <div className="flex h-screen aurora-bg">
      {/* Sidebar */}
      {Sidebar}

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-56 min-h-screen">
        {/* Top header */}
        <header className="sticky top-0 z-20 glass border-b border-white/8 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                className="md:hidden p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size={18} />
              </button>
              <h1 className="text-sm font-semibold">{pageTitle}</h1>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                className="hidden sm:flex px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground rounded-lg glass-card-sm transition-all"
              >
                {language === 'en' ? 'EN' : 'عر'}
              </button>

              <button
                onClick={toggleTheme}
                className="p-1.5 rounded-lg glass-card-sm text-muted-foreground hover:text-foreground transition-all"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
              </button>

              <button className="p-1.5 rounded-lg glass-card-sm text-muted-foreground hover:text-foreground transition-all relative">
                <Bell size={14} />
                <span
                  className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full"
                  style={{ background: 'var(--nexus-cyan)' }}
                />
              </button>

              {/* Profile */}
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-1.5 pl-1.5 pr-2 py-1 rounded-xl glass-card-sm hover:scale-[1.02] transition-all"
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium"
                    style={{ background: 'linear-gradient(135deg, var(--nexus-cyan), var(--nexus-blue))', color: 'oklch(0.1 0.015 240)' }}
                  >
                    {(user?.name ?? 'U').charAt(0)}
                  </div>
                  <ChevronDown size={11} className="text-muted-foreground" />
                </button>

                {profileOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 w-52 glass-card p-1 z-50"
                    onMouseLeave={() => setProfileOpen(false)}
                  >
                    <div className="px-3 py-2.5 border-b border-white/8 mb-1">
                      <p className="text-xs font-medium">{user?.name}</p>
                      <p className="text-[11px] text-muted-foreground">{user?.email}</p>
                      <span
                        className="inline-flex items-center gap-1 mt-1 px-1.5 py-0.5 rounded text-[10px] font-medium"
                        style={{ background: 'var(--nexus-cyan)/15', color: 'var(--nexus-cyan)' }}
                      >
                        <Zap size={9} />{user?.plan} Plan
                      </span>
                    </div>
                    {[
                      { icon: User, label: 'Account Settings', href: '/dashboard/settings' },
                      { icon: CreditCard, label: 'Billing', href: '/dashboard/billing' },
                    ].map(({ icon: Icon, label, href }) => (
                      <Link
                        key={label}
                        href={href}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-white/8 transition-all"
                        onClick={() => setProfileOpen(false)}
                      >
                        <Icon size={13} />{label}
                      </Link>
                    ))}
                    <button
                      onClick={() => { localStorage.removeItem('nexus-user'); window.location.href = '/' }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/8 transition-all mt-1 border-t border-white/8 pt-2"
                    >
                      <LogOut size={13} />Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
