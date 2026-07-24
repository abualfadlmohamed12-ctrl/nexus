'use client'

import { ThemeProvider } from '@/components/theme-provider'
import { AuroraBackground } from '@/components/aurora-background'
import { Header } from '@/components/header'
import { ArrowRight, BookOpen, Zap, Code2, Rocket, Settings, Shield } from 'lucide-react'
import Link from 'next/link'

const sections = [
  {
    icon: <Zap size={18} />,
    title: 'Getting Started',
    desc: 'Set up your account and build your first app in under 5 minutes.',
    links: ['Quick Start', 'Creating your first project', 'Understanding credits'],
  },
  {
    icon: <Code2 size={18} />,
    title: 'Building Apps',
    desc: 'Learn how to describe, generate, and refine your applications.',
    links: ['Writing effective prompts', 'Iterating on your app', 'Using templates'],
  },
  {
    icon: <Rocket size={18} />,
    title: 'Deployment',
    desc: 'Ship your app to production with one click.',
    links: ['One-click deploy', 'Custom domains', 'Environment variables'],
  },
  {
    icon: <Settings size={18} />,
    title: 'Configuration',
    desc: 'Customize your workspace and project settings.',
    links: ['Project settings', 'Integrations', 'API access'],
  },
  {
    icon: <Shield size={18} />,
    title: 'Security',
    desc: 'Keep your apps and data secure.',
    links: ['Authentication', 'Access control', 'Data privacy'],
  },
  {
    icon: <BookOpen size={18} />,
    title: 'API Reference',
    desc: 'Full reference for the Nexus API and SDKs.',
    links: ['REST API', 'Webhooks', 'SDKs'],
  },
]

export default function DocsPage() {
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
              <BookOpen size={12} />
              Documentation
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-balance leading-tight mb-4">
              Everything you need to{' '}
              <span className="text-gradient-cyan">build</span>
            </h1>
            <p className="text-base text-muted-foreground text-balance max-w-lg mx-auto">
              Guides, references, and examples to help you get the most out of Nexus.
            </p>

            {/* Search bar */}
            <div className="mt-8 w-full max-w-md mx-auto">
              <div className="glass-card-sm flex items-center gap-3 px-4 py-3 rounded-2xl">
                <BookOpen size={15} className="text-muted-foreground flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search docs..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/50"
                />
              </div>
            </div>
          </section>

          {/* Sections */}
          <section className="w-full max-w-5xl grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sections.map((s) => (
              <div key={s.title} className="glass-card p-5 flex flex-col gap-4 hover:scale-[1.01] transition-all duration-300">
                <div className="flex items-center gap-3">
                  <span
                    className="flex items-center justify-center w-8 h-8 rounded-xl flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, var(--nexus-cyan)/20, var(--nexus-blue)/20)',
                      color: 'var(--nexus-cyan)',
                      boxShadow: '0 0 0 1px var(--glass-border)',
                    }}
                  >
                    {s.icon}
                  </span>
                  <h3 className="text-sm font-semibold">{s.title}</h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                <ul className="space-y-1.5">
                  {s.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors group"
                      >
                        <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform flex-shrink-0" style={{ color: 'var(--nexus-cyan)' }} />
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
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
