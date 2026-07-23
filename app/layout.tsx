import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Nexus — AI Software Engineering Platform',
  description: 'Describe your idea and Nexus will design, build, and deploy your software. The future of software creation.',
  generator: 'Nexus',
  keywords: ['AI', 'software engineering', 'app builder', 'code generation', 'deploy'],
  openGraph: {
    title: 'Nexus — AI Software Engineering Platform',
    description: 'Turn ideas into production-ready apps. Nexus designs, builds, and deploys software from a single conversation.',
    type: 'website',
    siteName: 'Nexus',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nexus — AI Software Engineering Platform',
    description: 'Turn ideas into production-ready apps.',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1b191b' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      {/* Inline script prevents flash-of-wrong-theme before React hydrates */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('nexus-theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(t===null&&d)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="antialiased font-sans bg-background">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
