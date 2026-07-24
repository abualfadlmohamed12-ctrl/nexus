'use client'

import { AppShell } from '@/components/app-shell'
import { CheckCircle2, Plus } from 'lucide-react'

const integrations = [
  { name: 'Vercel', desc: 'Deploy your apps instantly to Vercel.', connected: true, logo: '▲' },
  { name: 'GitHub', desc: 'Sync your projects to GitHub repositories.', connected: true, logo: '' },
  { name: 'Supabase', desc: 'Connect a Supabase database to your app.', connected: false, logo: '⚡' },
  { name: 'Stripe', desc: 'Add payments to your app with Stripe.', connected: false, logo: 'S' },
  { name: 'Resend', desc: 'Send transactional emails via Resend.', connected: false, logo: 'R' },
  { name: 'Cloudflare', desc: 'CDN and DNS management via Cloudflare.', connected: false, logo: '☁' },
  { name: 'PlanetScale', desc: 'Serverless MySQL with PlanetScale.', connected: false, logo: 'P' },
  { name: 'Upstash', desc: 'Serverless Redis for caching and queues.', connected: false, logo: 'U' },
]

export default function IntegrationsPage() {
  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl font-semibold mb-1">Integrations</h1>
          <p className="text-sm text-muted-foreground">Connect your favourite tools and services.</p>
        </div>

        {/* Connected */}
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Connected</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {integrations.filter(i => i.connected).map((integration) => (
              <div key={integration.name} className="glass-card p-4 flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0"
                  style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)' }}
                >
                  {integration.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold">{integration.name}</h3>
                  <p className="text-xs text-muted-foreground truncate">{integration.desc}</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs flex-shrink-0" style={{ color: 'var(--nexus-cyan)' }}>
                  <CheckCircle2 size={13} />
                  Connected
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Available */}
        <div>
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Available</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {integrations.filter(i => !i.connected).map((integration) => (
              <div key={integration.name} className="glass-card p-4 flex items-center gap-4 hover:scale-[1.01] transition-all">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0"
                  style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)' }}
                >
                  {integration.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold">{integration.name}</h3>
                  <p className="text-xs text-muted-foreground truncate">{integration.desc}</p>
                </div>
                <button
                  className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg flex-shrink-0 transition-all hover:scale-105"
                  style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)', color: 'var(--muted-foreground)' }}
                >
                  <Plus size={11} /> Connect
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
