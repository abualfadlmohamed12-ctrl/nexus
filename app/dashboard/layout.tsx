import { ThemeProvider } from '@/components/theme-provider'
import { AppShell } from '@/components/app-shell'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AppShell>
        {children}
      </AppShell>
    </ThemeProvider>
  )
}
