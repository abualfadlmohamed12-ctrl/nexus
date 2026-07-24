'use client'

import { ThemeProvider } from '@/components/theme-provider'
import { AuroraBackground } from '@/components/aurora-background'
import { Header } from '@/components/header'
import { CheckCircle2, Zap, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for exploring and side projects.',
    credits: 50,
    features: [
      '50 AI credits / month',
      '3 active projects',
      'Community templates',
      'Basic deployment',
      'Community support',
    ],
    cta: 'Get Started',
    href: '/auth/signup',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: 'per month',
    description: 'For serious builders shipping real products.',
    credits: 500,
    features: [
      '500 AI credits / month',
      'Unlimited projects',
      'All premium templates',
      'One-click Vercel deploy',
      'Custom domains',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    href: '/auth/signup?plan=pro',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact us',
    description: 'For teams that need scale and control.',
    credits: null,
    features: [
      'Unlimited AI credits',
      'Unlimited projects',
      'Private deployments',
      'SSO & SAML',
      'SLA guarantee',
      'Dedicated support',
    ],
    cta: 'Contact Sales',
    href: '/enterprise',
    highlight: false,
  },
]

export default function PricingPage() {
  return (
    <ThemeProvider>
      <AuroraBackground>
        <Header />

        <main className="flex flex-col items-center px-4 pt-32 pb-24">

          {/* Header */}
          <section className="text-center max-w-2xl mx-auto mb-16">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card-sm mb-6 text-xs font-medium"
              style={{ color: 'var(--nexus-cyan)' }}
            >
              <Zap size={12} />
              Simple, transparent pricing
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-balance leading-tight mb-4">
              Build more,{' '}
              <span className="text-gradient-cyan">pay less</span>
            </h1>
            <p className="text-base text-muted-foreground text-balance max-w-lg mx-auto">
              Start free. Upgrade when you need more power. No hidden fees, no surprises.
            </p>
          </section>

          {/* Plans */}
          <section className="w-full max-w-5xl grid sm:grid-cols-3 gap-4 mb-20">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="glass-card p-6 flex flex-col gap-5 relative"
                style={plan.highlight ? {
                  boxShadow: '0 0 0 1.5px var(--nexus-cyan), 0 8px 40px oklch(0 0 0 / 40%)',
                } : {}}
              >
                {plan.highlight && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-semibold"
                    style={{
                      background: 'linear-gradient(135deg, var(--nexus-cyan), var(--nexus-blue))',
                      color: 'oklch(0.1 0.015 240)',
                    }}
                  >
                    Most Popular
                  </div>
                )}

                <div>
                  <h2 className="text-sm font-semibold text-muted-foreground mb-3">{plan.name}</h2>
                  <div className="flex items-end gap-1 mb-1">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-xs text-muted-foreground mb-1">/{plan.period}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{plan.description}</p>
                </div>

                <ul className="flex-1 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--nexus-cyan)' }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className="group flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105"
                  style={plan.highlight ? {
                    background: 'linear-gradient(135deg, var(--nexus-cyan), var(--nexus-blue))',
                    color: 'oklch(0.1 0.015 240)',
                  } : {
                    background: 'var(--glass)',
                    border: '1px solid var(--glass-border)',
                  }}
                >
                  {plan.cta}
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            ))}
          </section>

          {/* FAQ note */}
          <p className="text-xs text-muted-foreground/50 text-center">
            All plans include SSL, CDN, and 99.9% uptime. Credits reset monthly.{' '}
            <Link href="/enterprise" className="underline hover:text-muted-foreground transition-colors">
              Need a custom plan?
            </Link>
          </p>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 px-6 py-6">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground/50">
            <span>© 2025 Nexus AI Platform. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-muted-foreground transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-muted-foreground transition-colors">Terms</Link>
              <Link href="/status" className="hover:text-muted-foreground transition-colors">Status</Link>
            </div>
          </div>
        </footer>
      </AuroraBackground>
    </ThemeProvider>
  )
}
