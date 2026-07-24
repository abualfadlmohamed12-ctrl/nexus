'use client'

import { ThemeProvider } from '@/components/theme-provider'
import { AuroraBackground } from '@/components/aurora-background'
import { Header } from '@/components/header'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import Link from 'next/link'

const services = [
  { name: 'AI Generation', status: 'operational' },
  { name: 'Deployments', status: 'operational' },
  { name: 'Authentication', status: 'operational' },
  { name: 'Dashboard', status: 'operational' },
  { name: 'API', status: 'operational' },
  { name: 'CDN', status: 'operational' },
]

export default function StatusPage() {
  const allOperational = services.every(s => s.status === 'operational')

  return (
    <ThemeProvider>
      <AuroraBackground>
        <Header />
        <main className="flex flex-col items-center px-4 pt-32 pb-24">

          <section className="text-center max-w-xl mx-auto mb-10">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card-sm mb-6 text-sm font-medium"
              style={{ color: allOperational ? 'var(--nexus-cyan)' : 'oklch(0.7 0.2 50)' }}
            >
              {allOperational
                ? <><CheckCircle2 size={14} /> All systems operational</>
                : <><AlertCircle size={14} /> Some systems degraded</>
              }
            </div>
            <h1 className="text-3xl font-semibold tracking-tight mb-2">System Status</h1>
            <p className="text-sm text-muted-foreground">Real-time status of all Nexus services.</p>
          </section>

          <div className="glass-card p-6 max-w-xl w-full space-y-2">
            {services.map((service) => (
              <div key={service.name} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
                <span className="text-sm">{service.name}</span>
                <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--nexus-cyan)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--nexus-cyan)]" />
                  Operational
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground/50 mt-6">Last checked: just now</p>
        </main>

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
