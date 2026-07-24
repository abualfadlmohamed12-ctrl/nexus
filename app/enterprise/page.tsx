'use client'

import { ThemeProvider } from '@/components/theme-provider'
import { AuroraBackground } from '@/components/aurora-background'
import { Header } from '@/components/header'
import { CheckCircle2, Shield, Zap, Users, ArrowRight, Lock, Globe } from 'lucide-react'
import Link from 'next/link'

const features = [
  { icon: <Shield size={18} />, title: 'Enterprise Security', desc: 'SOC 2 Type II, SSO, SAML, and audit logs built in.' },
  { icon: <Users size={18} />, title: 'Team Collaboration', desc: 'Shared workspaces, role-based access, and real-time collaboration.' },
  { icon: <Lock size={18} />, title: 'Private Deployments', desc: 'Deploy to your own infrastructure or private cloud.' },
  { icon: <Globe size={18} />, title: 'Global Scale', desc: 'Multi-region deployments with 99.99% uptime SLA.' },
  { icon: <Zap size={18} />, title: 'Unlimited Credits', desc: 'No limits on AI usage — build as much as you need.' },
  { icon: <CheckCircle2 size={18} />, title: 'Dedicated Support', desc: 'Slack connect, dedicated CSM, and 24/7 priority support.' },
]

export default function EnterprisePage() {
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
              <Shield size={12} />
              Enterprise-grade AI engineering
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-balance leading-tight mb-4">
              Built for{' '}
              <span className="text-gradient-cyan">teams at scale</span>
            </h1>
            <p className="text-base text-muted-foreground text-balance max-w-lg mx-auto">
              The power of Nexus with the security, compliance, and support your enterprise demands.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
              <a
                href="mailto:enterprise@nexus.ai"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold transition-all hover:scale-105 nexus-glow"
                style={{
                  background: 'linear-gradient(135deg, var(--nexus-cyan), var(--nexus-blue))',
                  color: 'oklch(0.1 0.015 240)',
                }}
              >
                Contact Sales <ArrowRight size={14} />
              </a>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-medium glass-card-sm transition-all hover:scale-105"
              >
                View Pricing
              </Link>
            </div>
          </section>

          {/* Features */}
          <section className="w-full max-w-4xl grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
            {features.map((f) => (
              <div key={f.title} className="glass-card p-5 flex flex-col gap-3 hover:scale-[1.02] transition-all duration-300">
                <span
                  className="flex items-center justify-center w-9 h-9 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, var(--nexus-cyan)/20, var(--nexus-blue)/20)',
                    color: 'var(--nexus-cyan)',
                    boxShadow: '0 0 0 1px var(--glass-border)',
                  }}
                >
                  {f.icon}
                </span>
                <div>
                  <h3 className="text-sm font-semibold mb-1">{f.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </section>

          {/* CTA */}
          <div className="glass-card p-8 max-w-xl w-full text-center">
            <h2 className="text-xl font-semibold mb-2">Ready to get started?</h2>
            <p className="text-sm text-muted-foreground mb-6">Talk to our team and get a custom plan for your organization.</p>
            <a
              href="mailto:enterprise@nexus.ai"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, var(--nexus-cyan), var(--nexus-blue))',
                color: 'oklch(0.1 0.015 240)',
              }}
            >
              Get in Touch <ArrowRight size={14} />
            </a>
          </div>
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
