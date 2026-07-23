'use client'

import { useState, useEffect } from 'react'
import { User, CreditCard, Bell, Shield, Zap } from 'lucide-react'

export default function SettingsPage() {
  const [user, setUser] = useState({ name: 'Alex Chen', email: 'alex@example.com', plan: 'Pro', credits: 480 })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('nexus-user')
    if (stored) setUser(JSON.parse(stored))
  }, [])

  const handleSave = () => {
    localStorage.setItem('nexus-user', JSON.stringify(user))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const sections = [
    {
      id: 'profile', icon: User, title: 'Profile',
      content: (
        <div className="space-y-3">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Full Name</label>
            <input value={user.name} onChange={e => setUser(p => ({ ...p, name: e.target.value }))}
              className="w-full glass-card-sm px-3 py-2 text-sm outline-none focus:ring-1 ring-[var(--nexus-cyan)]/40 transition-all" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Email Address</label>
            <input value={user.email} onChange={e => setUser(p => ({ ...p, email: e.target.value }))}
              type="email"
              className="w-full glass-card-sm px-3 py-2 text-sm outline-none focus:ring-1 ring-[var(--nexus-cyan)]/40 transition-all" />
          </div>
        </div>
      )
    },
    {
      id: 'plan', icon: Zap, title: 'Plan & Billing',
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'var(--nexus-cyan)/10' }}>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--nexus-cyan)' }}>{user.plan} Plan</p>
              <p className="text-xs text-muted-foreground mt-0.5">{user.credits} credits remaining</p>
            </div>
            <button className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, var(--nexus-cyan), var(--nexus-blue))', color: 'oklch(0.1 0.015 240)' }}>
              Upgrade
            </button>
          </div>
          {[
            { name: 'Free', price: '$0', features: ['50 credits/mo', '3 projects', 'Nexus subdomain'] },
            { name: 'Pro', price: '$29', features: ['500 credits/mo', 'Unlimited projects', 'Custom domains'] },
            { name: 'Team', price: '$99', features: ['2000 credits/mo', 'Multiple users', 'Priority support'] },
          ].map(plan => (
            <div key={plan.name} className={`glass-card-sm p-4 transition-all ${user.plan === plan.name ? 'ring-1 ring-[var(--nexus-cyan)]/40' : ''}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{plan.name}</span>
                <span className="text-sm font-semibold">{plan.price}<span className="text-xs text-muted-foreground">/mo</span></span>
              </div>
              <ul className="space-y-1">
                {plan.features.map(f => <li key={f} className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full" style={{ background: 'var(--nexus-cyan)' }} />{f}
                </li>)}
              </ul>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'security', icon: Shield, title: 'Security',
      content: (
        <div className="space-y-3">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Current Password</label>
            <input type="password" placeholder="••••••••" className="w-full glass-card-sm px-3 py-2 text-sm outline-none" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">New Password</label>
            <input type="password" placeholder="••••••••" className="w-full glass-card-sm px-3 py-2 text-sm outline-none" />
          </div>
          <button className="glass-card-sm px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-all">
            Update Password
          </button>
        </div>
      )
    },
    {
      id: 'notifications', icon: Bell, title: 'Notifications',
      content: (
        <div className="space-y-3">
          {['Build completions', 'Deployment alerts', 'Credit warnings', 'Product updates'].map(item => (
            <div key={item} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
              <span className="text-sm text-muted-foreground">{item}</span>
              <div className="w-8 h-4 rounded-full cursor-pointer transition-all" style={{ background: 'var(--nexus-cyan)/40' }}>
                <div className="w-3 h-3 rounded-full m-0.5 ml-auto" style={{ background: 'var(--nexus-cyan)' }} />
              </div>
            </div>
          ))}
        </div>
      )
    },
  ]

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Settings</h2>
        <button
          onClick={handleSave}
          className="px-4 py-1.5 rounded-xl text-sm font-medium transition-all hover:scale-105"
          style={{ background: 'linear-gradient(135deg, var(--nexus-cyan), var(--nexus-blue))', color: 'oklch(0.1 0.015 240)' }}
        >
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      {sections.map(({ id, icon: Icon, title, content }) => (
        <div key={id} className="glass-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'var(--nexus-cyan)/10', color: 'var(--nexus-cyan)' }}>
              <Icon size={14} />
            </span>
            <h3 className="text-sm font-semibold">{title}</h3>
          </div>
          {content}
        </div>
      ))}
    </div>
  )
}
