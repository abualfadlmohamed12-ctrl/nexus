'use client'

import { ThemeProvider } from '@/components/theme-provider'
import { AuroraBackground } from '@/components/aurora-background'
import { Header } from '@/components/header'
import { ArrowRight, LayoutTemplate, Zap, Globe, ShoppingBag, MessageSquare, BarChart3, Calendar, Users } from 'lucide-react'
import Link from 'next/link'

const categories = ['All', 'SaaS', 'E-commerce', 'AI', 'Dashboard', 'Landing Page']

const templates = [
  { icon: <BarChart3 size={20} />, name: 'SaaS Dashboard', category: 'Dashboard', desc: 'Full-featured admin dashboard with analytics, user management, and billing.', time: '~2 min' },
  { icon: <ShoppingBag size={20} />, name: 'E-commerce Store', category: 'E-commerce', desc: 'Complete online store with cart, checkout, and product management.', time: '~3 min' },
  { icon: <MessageSquare size={20} />, name: 'AI Chat App', category: 'AI', desc: 'Real-time AI assistant with conversation history and streaming responses.', time: '~2 min' },
  { icon: <Globe size={20} />, name: 'SaaS Landing Page', category: 'Landing Page', desc: 'High-converting landing page with pricing, features, and CTA sections.', time: '~1 min' },
  { icon: <Calendar size={20} />, name: 'Booking Platform', category: 'SaaS', desc: 'Appointment scheduling system with calendar, reminders, and payments.', time: '~3 min' },
  { icon: <Users size={20} />, name: 'CRM System', category: 'SaaS', desc: 'Customer relationship manager with contacts, deals, and pipeline view.', time: '~4 min' },
]

export default function TemplatesPage() {
  return (
    <ThemeProvider>
      <AuroraBackground>
        <Header />

        <main className="flex flex-col items-center px-4 pt-32 pb-24">

          {/* Header */}
          <section className="text-center max-w-2xl mx-auto mb-12">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card-sm mb-6 text-xs font-medium"
              style={{ color: 'var(--nexus-cyan)' }}
            >
              <LayoutTemplate size={12} />
              Ready-to-deploy templates
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-balance leading-tight mb-4">
              Start with a{' '}
              <span className="text-gradient-cyan">template</span>
            </h1>
            <p className="text-base text-muted-foreground text-balance max-w-lg mx-auto">
              Production-ready starting points. Pick one, describe your changes, and ship in minutes.
            </p>
          </section>

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat, i) => (
              <button
                key={cat}
                className="px-3.5 py-1.5 rounded-xl text-sm transition-all duration-200 hover:scale-105"
                style={i === 0 ? {
                  background: 'linear-gradient(135deg, var(--nexus-cyan)/20, var(--nexus-blue)/20)',
                  color: 'var(--nexus-cyan)',
                  border: '1px solid var(--nexus-cyan)',
                } : {
                  background: 'var(--glass)',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--muted-foreground)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Templates grid */}
          <section className="w-full max-w-5xl grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {templates.map((t) => (
              <div
                key={t.name}
                className="glass-card p-5 flex flex-col gap-4 hover:scale-[1.02] transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <span
                    className="flex items-center justify-center w-10 h-10 rounded-xl"
                    style={{
                      background: 'linear-gradient(135deg, var(--nexus-cyan)/20, var(--nexus-blue)/20)',
                      color: 'var(--nexus-cyan)',
                      boxShadow: '0 0 0 1px var(--glass-border)',
                    }}
                  >
                    {t.icon}
                  </span>
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)', color: 'var(--muted-foreground)' }}
                  >
                    {t.category}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="text-sm font-semibold mb-1">{t.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground/50">Builds in {t.time}</span>
                  <Link
                    href="/auth/signup"
                    className="inline-flex items-center gap-1 text-xs font-medium transition-all"
                    style={{ color: 'var(--nexus-cyan)' }}
                  >
                    Use template
                    <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </section>

          {/* CTA */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">Don't see what you need? Describe it from scratch.</p>
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold transition-all hover:scale-105 nexus-glow"
              style={{
                background: 'linear-gradient(135deg, var(--nexus-cyan), var(--nexus-blue))',
                color: 'oklch(0.1 0.015 240)',
              }}
            >
              Start from Scratch <ArrowRight size={14} />
            </Link>
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
