'use client'

import { cn } from '@/lib/utils'

export function AuroraBackground({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div className={cn('relative aurora-bg min-h-screen', className)}>
      {children}
    </div>
  )
}
