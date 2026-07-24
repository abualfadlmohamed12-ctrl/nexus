'use client'

import { ThemeProvider } from '@/components/theme-provider'
import { AuroraBackground } from '@/components/aurora-background'
import { Header } from '@/components/header'
import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <ThemeProvider>
      <AuroraBackground>
        <Header />
        <main className="flex flex-col items-center px-4 pt-32 pb-24">
          <div className="glass-card p-8 max-w-2xl w-full">
            <h1 className="text-2xl font-semibold mb-2">Privacy Policy</h1>
            <p className="text-xs text-muted-foreground mb-8">Last updated: July 2025</p>
            <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
              <section>
                <h2 className="text-base font-semibold text-foreground mb-2">Data We Collect</h2>
                <p>We collect information you provide directly, such as your name, email, and usage data. We also collect technical data like IP addresses and browser type to improve our service.</p>
              </section>
              <section>
                <h2 className="text-base font-semibold text-foreground mb-2">How We Use Your Data</h2>
                <p>We use your data to provide and improve the Nexus platform, send product updates, and ensure security. We never sell your personal data to third parties.</p>
              </section>
              <section>
                <h2 className="text-base font-semibold text-foreground mb-2">Data Storage</h2>
                <p>Your data is stored securely on servers in the United States. We use industry-standard encryption in transit and at rest.</p>
              </section>
              <section>
                <h2 className="text-base font-semibold text-foreground mb-2">Contact</h2>
                <p>For privacy questions, contact us at <a href="mailto:privacy@nexus.ai" className="underline hover:text-foreground transition-colors">privacy@nexus.ai</a>.</p>
              </section>
            </div>
          </div>
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
