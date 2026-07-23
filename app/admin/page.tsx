'use client'

import { useState } from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import { AuroraBackground } from '@/components/aurora-background'
import { NexusLogo } from '@/components/nexus-logo'
import { useTheme } from '@/components/theme-provider'
import {
  Users, FolderOpen, CreditCard, Zap, Server, TrendingUp,
  Search, Sun, Moon, MoreHorizontal, Ban, Plus,
  Activity, Globe, CheckCircle2
} from 'lucide-react'
import Link from 'next/link'

const stats = [
  { label: 'Total Users', value: '12,847', change: '+8.2%', icon: Users },
  { label: 'Total Projects', value: '48,293', change: '+12.5%', icon: FolderOpen },
  { label: 'Monthly Revenue', value: '$84.2k', change: '+6.1%', icon: CreditCard },
  { label: 'AI Generations', value: '284k', change: '+24.8%', icon: Zap },
  { label: 'Deployments', value: '9,481', change: '+18.3%', icon: Globe },
  { label: 'Active Sessions', value: '1,293', change: '+3.7%', icon: Activity },
]

const users = [
  { id: '1', name: 'Alex Chen', email: 'alex@example.com', plan: 'Pro', credits: 480, projects: 12, status: 'Active', joined: '2 months ago' },
  { id: '2', name: 'Maria Santos', email: 'maria@example.com', plan: 'Team', credits: 1800, projects: 34, status: 'Active', joined: '4 months ago' },
  { id: '3', name: 'James Lee', email: 'james@example.com', plan: 'Free', credits: 12, projects: 3, status: 'Active', joined: '1 week ago' },
  { id: '4', name: 'Sarah Kim', email: 'sarah@example.com', plan: 'Pro', credits: 210, projects: 8, status: 'Suspended', joined: '6 months ago' },
  { id: '5', name: 'Omar Farouk', email: 'omar@example.com', plan: 'Team', credits: 1950, projects: 29, status: 'Active', joined: '3 months ago' },
]

const planColors: Record<string, string> = {
  Free: 'var(--muted-foreground)',
  Pro: 'var(--nexus-cyan)',
  Team: 'var(--nexus-blue)',
}

function AdminInner() {
  const { theme, toggleTheme } = useTheme()
  const [search, setSearch] = useState('')
  const [activeSection, setActiveSection] = useState<'overview' | 'users' | 'plans'>('overview')
  const [menuOpen, setMenuOpen] = useState<string | null>(null)

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AuroraBackground className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-20 glass border-b border-white/8 px-5 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <NexusLogo size="sm" />
            <div className="h-4 w-px bg-white/15" />
            <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: 'var(--nexus-cyan)/10', color: 'var(--nexus-cyan)' }}>
              Admin
            </span>
          </div>
          <nav className="hidden sm:flex items-center gap-1">
            {(['overview', 'users', 'plans'] as const).map(s => (
              <button
                key={s}
                onClick={() => setActiveSection(s)}
                className="px-3 py-1.5 rounded-xl text-xs capitalize transition-all"
                style={activeSection === s ? { background: 'var(--nexus-cyan)/15', color: 'var(--nexus-cyan)' } : { color: 'var(--muted-foreground)' }}
              >
                {s}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className="p-1.5 rounded-lg glass-card-sm text-muted-foreground hover:text-foreground transition-all">
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <Link href="/dashboard" className="px-3 py-1.5 rounded-xl glass-card-sm text-xs text-muted-foreground hover:text-foreground transition-all">
              Back to App
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-6 max-w-6xl mx-auto w-full space-y-6">

        {/* Overview stats */}
        {activeSection === 'overview' && (
          <>
            <h2 className="text-lg font-semibold">Platform Overview</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {stats.map(({ label, value, change, icon: Icon }) => (
                <div key={label} className="glass-card p-4 hover:scale-[1.02] transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <Icon size={14} style={{ color: 'var(--nexus-cyan)' }} />
                    <span className="text-[11px] font-medium" style={{ color: 'oklch(0.72 0.16 150)' }}>
                      {change}
                    </span>
                  </div>
                  <p className="text-xl font-bold mb-0.5">{value}</p>
                  <p className="text-[11px] text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>

            {/* Charts placeholders */}
            <div className="grid lg:grid-cols-2 gap-4">
              <div className="glass-card p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold">Revenue Over Time</h3>
                  <span className="text-xs text-muted-foreground">Last 30 days</span>
                </div>
                <div className="flex items-end gap-1.5 h-24">
                  {[40, 55, 45, 70, 60, 80, 65, 90, 75, 95, 85, 100].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm transition-all hover:opacity-80 cursor-pointer"
                      style={{
                        height: `${h}%`,
                        background: `linear-gradient(180deg, var(--nexus-cyan), var(--nexus-blue))`,
                        opacity: 0.6 + (h / 100) * 0.4,
                      }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
                  <span>Jun 1</span><span>Jun 30</span>
                </div>
              </div>

              <div className="glass-card p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold">Plan Distribution</h3>
                  <span className="text-xs text-muted-foreground">Current</span>
                </div>
                <div className="space-y-3">
                  {[
                    { plan: 'Free', pct: 62, count: '7,965' },
                    { plan: 'Pro', pct: 30, count: '3,854' },
                    { plan: 'Team', pct: 8, count: '1,028' },
                  ].map(({ plan, pct, count }) => (
                    <div key={plan}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium" style={{ color: planColors[plan] }}>{plan}</span>
                        <span className="text-xs text-muted-foreground">{count} users ({pct}%)</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-border overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${pct}%`,
                            background: `linear-gradient(90deg, ${planColors[plan]}, var(--nexus-blue))`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent deployments */}
            <div className="glass-card p-5">
              <h3 className="text-sm font-semibold mb-4">Recent Deployments</h3>
              <div className="space-y-2">
                {[
                  { user: 'Alex Chen', app: 'restaurant-booking', url: 'restaurant-booking.nexus.app', status: 'Live', time: '2m ago' },
                  { user: 'Maria Santos', app: 'saas-dashboard', url: 'saas-dashboard.nexus.app', status: 'Live', time: '15m ago' },
                  { user: 'James Lee', app: 'ai-assistant', url: 'ai-assistant.nexus.app', status: 'Building', time: '1h ago' },
                  { user: 'Omar Farouk', app: 'marketplace-v2', url: 'marketplace-v2.nexus.app', status: 'Failed', time: '3h ago' },
                ].map((d, i) => (
                  <div key={i} className="flex items-center gap-3 py-2.5 border-b border-white/5 last:border-0">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, var(--nexus-cyan)/20, var(--nexus-blue)/20)', color: 'var(--nexus-cyan)' }}>
                      {d.user.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{d.app}</p>
                      <p className="text-[11px] text-muted-foreground truncate">{d.url}</p>
                    </div>
                    <span
                      className="text-[11px] px-2 py-0.5 rounded-full font-medium flex-shrink-0"
                      style={{
                        background: d.status === 'Live' ? 'oklch(0.72 0.16 150)/15' : d.status === 'Building' ? 'var(--nexus-cyan)/10' : 'var(--destructive)/10',
                        color: d.status === 'Live' ? 'oklch(0.72 0.16 150)' : d.status === 'Building' ? 'var(--nexus-cyan)' : 'var(--destructive)',
                      }}
                    >
                      {d.status}
                    </span>
                    <span className="text-[11px] text-muted-foreground flex-shrink-0">{d.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Users management */}
        {activeSection === 'users' && (
          <>
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold">User Management</h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search users..."
                    className="glass-card-sm pl-7 pr-3 py-1.5 text-xs outline-none w-44"
                  />
                </div>
              </div>
            </div>

            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/8">
                      {['User', 'Plan', 'Credits', 'Projects', 'Status', 'Joined', ''].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-[11px] text-muted-foreground font-medium uppercase tracking-wider whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(user => (
                      <tr key={user.id} className="border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0"
                              style={{ background: 'linear-gradient(135deg, var(--nexus-cyan)/20, var(--nexus-blue)/20)', color: 'var(--nexus-cyan)' }}>
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-xs font-medium">{user.name}</p>
                              <p className="text-[11px] text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs font-medium" style={{ color: planColors[user.plan] }}>{user.plan}</span>
                        </td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">{user.credits}</td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">{user.projects}</td>
                        <td className="px-4 py-3">
                          <span
                            className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-medium"
                            style={{
                              background: user.status === 'Active' ? 'oklch(0.72 0.16 150)/12' : 'var(--destructive)/10',
                              color: user.status === 'Active' ? 'oklch(0.72 0.16 150)' : 'var(--destructive)',
                            }}
                          >
                            {user.status === 'Active' && <CheckCircle2 size={9} />}
                            {user.status === 'Suspended' && <Ban size={9} />}
                            {user.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-[11px] text-muted-foreground whitespace-nowrap">{user.joined}</td>
                        <td className="px-4 py-3">
                          <div className="relative">
                            <button
                              onClick={() => setMenuOpen(menuOpen === user.id ? null : user.id)}
                              className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all"
                            >
                              <MoreHorizontal size={13} />
                            </button>
                            {menuOpen === user.id && (
                              <div
                                className="absolute right-0 top-full mt-1 w-44 glass-card p-1 z-10"
                                onMouseLeave={() => setMenuOpen(null)}
                              >
                                {[
                                  { label: 'View Profile', icon: Users },
                                  { label: 'Adjust Credits', icon: Plus },
                                  { label: 'Change Plan', icon: Zap },
                                  { label: user.status === 'Active' ? 'Suspend User' : 'Restore User', icon: Ban },
                                ].map(({ label, icon: Icon }) => (
                                  <button
                                    key={label}
                                    onClick={() => setMenuOpen(null)}
                                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-white/8 transition-all"
                                  >
                                    <Icon size={11} />{label}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Plans */}
        {activeSection === 'plans' && (
          <>
            <h2 className="text-lg font-semibold">Plan Management</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { name: 'Free', price: '$0', users: 7965, features: ['50 credits/month', '3 projects max', 'Nexus subdomain', 'Community support'], color: 'var(--muted-foreground)' },
                { name: 'Pro', price: '$29', users: 3854, features: ['500 credits/month', 'Unlimited projects', 'Custom domains', 'Priority support', 'Advanced analytics'], color: 'var(--nexus-cyan)' },
                { name: 'Team', price: '$99', users: 1028, features: ['2000 credits/month', 'Multiple team members', 'Shared workspaces', 'Dedicated support', 'SSO & SAML', 'Custom integrations'], color: 'var(--nexus-blue)' },
              ].map(plan => (
                <div key={plan.name} className="glass-card p-5 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-semibold" style={{ color: plan.color }}>{plan.name}</h3>
                      <p className="text-xl font-bold mt-0.5">{plan.price}<span className="text-xs text-muted-foreground font-normal">/mo</span></p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">{plan.users.toLocaleString()}</p>
                      <p className="text-[11px] text-muted-foreground">users</p>
                    </div>
                  </div>
                  <ul className="space-y-2 flex-1">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: plan.color }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button className="glass-card-sm py-2 text-xs font-medium transition-all hover:scale-[1.02]" style={{ color: plan.color }}>
                    Edit Plan
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </AuroraBackground>
  )
}

export default function AdminPage() {
  return (
    <ThemeProvider>
      <AdminInner />
    </ThemeProvider>
  )
}
