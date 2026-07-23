import { ThemeProvider } from '@/components/theme-provider'
import { AuroraBackground } from '@/components/aurora-background'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuroraBackground className="flex items-center justify-center min-h-screen px-4 py-12">
        {children}
      </AuroraBackground>
    </ThemeProvider>
  )
}
