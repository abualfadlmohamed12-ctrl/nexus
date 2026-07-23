'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { NexusLogo } from '@/components/nexus-logo'
import { Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react'

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  )
}

function GoogleIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}
import { cn } from '@/lib/utils'

export default function SignupPage() {
  const [step, setStep] = useState<'options' | 'email'>('options')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [savedPrompt, setSavedPrompt] = useState('')
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const router = useRouter()

  useEffect(() => {
    const p = sessionStorage.getItem('nexus-prompt')
    if (p) setSavedPrompt(p)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (form.password.length < 8) { setError('Password must be at least 8 characters'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    // Store mock session
    localStorage.setItem('nexus-user', JSON.stringify({ name: form.name, email: form.email, plan: 'Free', credits: 50 }))
    router.push('/dashboard')
  }

  const handleOAuth = async (provider: string) => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    localStorage.setItem('nexus-user', JSON.stringify({ name: 'Demo User', email: 'demo@nexus.ai', plan: 'Free', credits: 50 }))
    router.push('/dashboard')
  }

  return (
    <div className="w-full max-w-sm">
      {savedPrompt && (
        <div className="glass-card-sm px-4 py-3 mb-4 text-sm text-muted-foreground">
          <span style={{ color: 'var(--nexus-cyan)' }}>Your idea was saved:</span>{' '}
          <span className="italic truncate">"{savedPrompt}"</span>
        </div>
      )}

      <div className="glass-card p-7 w-full">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <NexusLogo size="md" />
        </div>

        <h1 className="text-lg font-semibold text-center mb-1">Build your first app with AI</h1>
        <p className="text-sm text-muted-foreground text-center mb-6">Create your free Nexus account</p>

        {step === 'options' ? (
          <div className="flex flex-col gap-3">
            <button
              onClick={() => handleOAuth('google')}
              className="glass-card-sm flex items-center justify-center gap-2.5 py-2.5 text-sm font-medium hover:scale-[1.02] transition-all duration-200"
            >
              <GoogleIcon size={16} />
              Continue with Google
            </button>
            <button
              onClick={() => handleOAuth('github')}
              className="glass-card-sm flex items-center justify-center gap-2.5 py-2.5 text-sm font-medium hover:scale-[1.02] transition-all duration-200"
            >
              <span className="text-foreground"><GithubIcon size={16} /></span>
              Continue with GitHub
            </button>

            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <button
              onClick={() => setStep('email')}
              className="glass-card-sm flex items-center justify-center gap-2 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:scale-[1.02] transition-all duration-200"
            >
              Continue with email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {error && (
              <div className="glass-card-sm px-3 py-2 text-xs text-destructive border border-destructive/20">
                {error}
              </div>
            )}

            {['name', 'email', 'password'].map((field) => (
              <div key={field} className="relative">
                <input
                  type={field === 'password' ? (showPass ? 'text' : 'password') : field === 'email' ? 'email' : 'text'}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={form[field as keyof typeof form]}
                  onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))}
                  required
                  autoComplete={field === 'password' ? 'new-password' : field}
                  className="w-full glass-card-sm px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:ring-1 ring-[var(--nexus-cyan)]/40 transition-all duration-200"
                />
                {field === 'password' && (
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-[1.02] nexus-glow disabled:opacity-60 disabled:cursor-not-allowed mt-1"
              style={{
                background: 'linear-gradient(135deg, var(--nexus-cyan), var(--nexus-blue))',
                color: 'oklch(0.1 0.015 240)',
              }}
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : <ArrowRight size={14} />}
              {loading ? 'Creating account...' : 'Create Account'}
            </button>

            <button
              type="button"
              onClick={() => setStep('options')}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors text-center"
            >
              Back to all options
            </button>
          </form>
        )}

        <p className="text-xs text-muted-foreground/50 text-center mt-5">
          By signing up, you agree to our{' '}
          <Link href="#" className="hover:text-muted-foreground underline underline-offset-2">Terms</Link>
          {' '}and{' '}
          <Link href="#" className="hover:text-muted-foreground underline underline-offset-2">Privacy Policy</Link>
        </p>
      </div>

      <p className="text-center text-sm text-muted-foreground mt-4">
        Already have an account?{' '}
        <Link href="/auth/login" className="hover:text-foreground transition-colors underline underline-offset-2">
          Sign in
        </Link>
      </p>
    </div>
  )
}
