'use client'

import { ThemeProvider } from '@/components/theme-provider'
import { AuroraBackground } from '@/components/aurora-background'
import { Header } from '@/components/header'
import { PromptBuilder } from '@/components/prompt-builder'
import {
  Brain, Layers, Zap, Rocket, ArrowRight, CheckCircle2,
  Code2, Database, Globe
} from 'lucide-react'
import Link from 'next/link'

const examples = [
  { label: 'Build a SaaS dashboard', icon: <Layers size={14} /> },
  { label: 'Create a booking platform', icon: <Globe size={14} /> },
  { label: 'Generate an AI assistant', icon: <Brain size={14} /> },
  { label: 'Build an e-commerce store', icon: <Zap size={14} /> },
]

const features = [
  {
    icon: <Brain size={20} />,
    title: 'AI Architecture',
    desc: 'Nexus plans your entire system — from database schema to component structure — before writing a single line of code.',
  },
  {
    icon: <Zap size={20} />,
    title: 'Instant Preview',
    desc: 'See your application come to life in real-time as Nexus generates and assembles your codebase.',
  },
  {
    icon: <Code2 size={20} />,
    title: 'Full Stack Generation',
    desc: 'Frontend, backend, database, authentication — everything is generated and connected automatically.',
  },
  {
    icon: <Rocket size={20} />,
    title: 'One-Click Deploy',
    desc: 'Ship to production instantly. Your app is optimized, tested, and deployed with a single click.',
  },
]

export default function LandingPage() {
  return (
    <ThemeProvider>
      <AuroraBackground>
        <Header />

        <main className="flex flex-col items-center px-4 pt-28 pb-24">

          {/* ── HERO ── */}
          <section className="flex flex-col items-center text-center max-w-2xl mx-auto pt-12 pb-8">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card-sm mb-6 text-xs font-medium tracking-wide"
              style={{ color: 'var(--nexus-cyan)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--nexus-cyan)] animate-pulse" />
              AI Software Engineering Platform
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-balance leading-tight mb-4">
              Turn ideas into{' '}
              <span className="text-gradient-cyan">production-ready</span>{' '}
              apps
            </h1>

            {/* Description */}
            <p className="text-base text-muted-foreground text-balance leading-relaxed max-w-lg">
              Nexus designs, builds, and deploys software from a single conversation. Describe your idea and your AI engineer will handle the rest.
            </p>
          </section>

          {/* ── PROMPT BOX ── */}
          <section className="w-full max-w-2xl mb-8">
            <PromptBuilder />
          </section>

          {/* ── EXAMPLES ── */}
          <section className="flex flex-wrap justify-center gap-2 mb-24">
            {examples.map((ex) => (
              <button
                key={ex.label}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl glass-card-sm text-sm text-muted-foreground hover:text-foreground hover:scale-105 transition-all duration-200 group"
              >
                <span className="text-[var(--nexus-cyan)] group-hover:scale-110 transition-transform">{ex.icon}</span>
                {ex.label}
                <ArrowRight size={12} className="opacity-0 group-hover:opacity-60 transition-opacity -ml-1" />
              </button>
            ))}
          </section>

          {/* ── FEATURES ── */}
          <section className="w-full max-w-4xl mb-24">
            <div className="text-center mb-10">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">How it works</p>
              <h2 className="text-2xl font-semibold tracking-tight text-balance">Everything you need to ship faster</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="glass-card p-5 flex flex-col gap-3 hover:scale-[1.02] transition-all duration-300 cursor-default group"
                >
                  <span
                    className="flex items-center justify-center w-9 h-9 rounded-xl group-hover:nexus-glow-sm transition-all"
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
            </div>
          </section>

          {/* ── TRUST ── */}
          <section className="w-full max-w-2xl mb-24">
            <div className="glass-card p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg font-semibold mb-2 text-balance">Built for serious engineers</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Nexus generates production-grade code with proper architecture, security, and performance built in from the start.
                </p>
                <ul className="mt-4 space-y-2">
                  {['Type-safe full-stack generation', 'Automated testing & quality checks', 'One-click Vercel deployment'].map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 size={14} style={{ color: 'var(--nexus-cyan)' }} className="flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Mini stats */}
              <div className="flex sm:flex-col gap-6 flex-shrink-0">
                {[
                  { value: '10x', label: 'Faster builds' },
                  { value: '99%', label: 'Uptime SLA' },
                  { value: '50k+', label: 'Apps deployed' },
                ].map(stat => (
                  <div key={stat.label} className="text-center">
                    <div className="text-xl font-semibold text-gradient-cyan">{stat.value}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── FINAL CTA ── */}
          <section className="flex flex-col items-center text-center gap-6 mb-8">
            <h2 className="text-3xl font-semibold tracking-tight text-balance">
              The future of building software<br />starts here
            </h2>
            <p className="text-muted-foreground text-balance max-w-md">
              Join thousands of engineers who are building faster with AI.
            </p>
            <Link
              href="/auth/signup"
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 hover:scale-105 nexus-glow"
              style={{
                background: 'linear-gradient(135deg, var(--nexus-cyan), var(--nexus-blue))',
                color: 'oklch(0.1 0.015 240)',
              }}
            >
              Start Building
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-xs text-muted-foreground/50">Free to start. No credit card required.</p>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 px-6 py-6">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground/50">
            <span>© 2025 Nexus AI Platform. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <Link href="#" className="hover:text-muted-foreground transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-muted-foreground transition-colors">Terms</Link>
              <Link href="#" className="hover:text-muted-foreground transition-colors">Status</Link>
            </div>
          </div>
        </footer>
      </AuroraBackground>
    </ThemeProvider>
  )
}
