'use client'

import { AppShell } from '@/components/app-shell'
import { CreditCard, Zap, ArrowRight, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

const plans = [
  { name: 'Free', price: '$0/mo', credits: 50, current: true },
  { name: 'Pro', price: '$29/mo', credits: 500, current: false },
  { name: 'Enterprise', price: 'Custom', credits: null, current: false },
]

const invoices = [
  { date: 'Jul 1, 2026', amount: '$0.00', status: 'Free', desc: 'Free Plan' },
  { date: 'Jun 1, 2026', amount: '$0.00', status: 'Free', desc: 'Free Plan' },
]

export default function BillingPage() {
  return (
    <AppShell>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-xl font-semibold mb-1">Billing</h1>
          <p className="text-sm text-muted-foreground">Manage your plan and payment details.</p>
        </div>

        {/* Current Plan */}
        <div className="glass-card p-5">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">Current Plan</h2>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, var(--nexus-cyan)/20, var(--nexus-blue)/20)',
                  color: 'var(--nexus-cyan)',
                  boxShadow: '0 0 0 1px var(--glass-border)',
                }}
              >
                <Zap size={16} />
              </div>
              <div>
                <p className="text-sm font-semibold">Free Plan</p>
                <p className="text-xs text-muted-foreground">50 credits / month · Resets in 12 days</p>
              </div>
            </div>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, var(--nexus-cyan), var(--nexus-blue))',
                color: 'oklch(0.1 0.015 240)',
              }}
            >
              Upgrade Plan <ArrowRight size={13} />
            </Link>
          </div>

          {/* Credit bar */}
          <div className="mt-4 pt-4 border-t border-white/8">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>Credits used this month</span>
              <span>12 / 50</span>
            </div>
            <div className="h-1.5 rounded-full bg-border overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: '24%',
                  background: 'linear-gradient(90deg, var(--nexus-cyan), var(--nexus-blue))',
                }}
              />
            </div>
          </div>
        </div>

        {/* Plan comparison */}
        <div className="glass-card p-5">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">Available Plans</h2>
          <div className="grid grid-cols-3 gap-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="rounded-xl p-4 text-center transition-all"
                style={plan.current ? {
                  background: 'linear-gradient(135deg, var(--nexus-cyan)/10, var(--nexus-blue)/10)',
                  border: '1px solid var(--nexus-cyan)',
                } : {
                  background: 'var(--glass)',
                  border: '1px solid var(--glass-border)',
                }}
              >
                {plan.current && (
                  <div className="text-[10px] font-medium mb-1" style={{ color: 'var(--nexus-cyan)' }}>Current</div>
                )}
                <div className="text-sm font-semibold">{plan.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{plan.price}</div>
                {plan.credits && (
                  <div className="text-[10px] text-muted-foreground/60 mt-1">{plan.credits} credits/mo</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Payment method */}
        <div className="glass-card p-5">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">Payment Method</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <CreditCard size={16} />
              No payment method on file
            </div>
            <button
              className="text-xs px-3 py-1.5 rounded-lg transition-all hover:scale-105"
              style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)', color: 'var(--muted-foreground)' }}
            >
              Add card
            </button>
          </div>
        </div>

        {/* Invoices */}
        <div className="glass-card p-5">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">Invoice History</h2>
          <div className="space-y-2">
            {invoices.map((inv, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <div>
                  <p className="text-sm">{inv.desc}</p>
                  <p className="text-xs text-muted-foreground">{inv.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{inv.amount}</span>
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{ background: 'var(--nexus-cyan)/10', color: 'var(--nexus-cyan)', border: '1px solid var(--nexus-cyan)/20' }}
                  >
                    {inv.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
