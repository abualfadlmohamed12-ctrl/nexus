import { cn } from '@/lib/utils'

interface NexusLogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
}

export function NexusLogo({ className, size = 'md', showText = true }: NexusLogoProps) {
  const sizes = {
    sm: { icon: 20, text: 'text-base' },
    md: { icon: 26, text: 'text-lg' },
    lg: { icon: 36, text: 'text-2xl' },
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {/* Icon mark */}
      <div
        className="relative flex items-center justify-center rounded-xl flex-shrink-0"
        style={{ width: sizes[size].icon * 1.4, height: sizes[size].icon * 1.4 }}
      >
        <svg
          width={sizes[size].icon}
          height={sizes[size].icon}
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer ring glow */}
          <circle cx="13" cy="13" r="12" stroke="url(#nexus-grad)" strokeWidth="1.5" opacity="0.6" />
          {/* Inner star / node pattern */}
          <circle cx="13" cy="13" r="3.5" fill="url(#nexus-grad)" />
          <line x1="13" y1="2" x2="13" y2="7.5" stroke="url(#nexus-grad)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="13" y1="18.5" x2="13" y2="24" stroke="url(#nexus-grad)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="2" y1="13" x2="7.5" y2="13" stroke="url(#nexus-grad)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="18.5" y1="13" x2="24" y2="13" stroke="url(#nexus-grad)" strokeWidth="1.5" strokeLinecap="round" />
          <defs>
            <linearGradient id="nexus-grad" x1="2" y1="2" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop stopColor="#67e8f9" />
              <stop offset="1" stopColor="#6366f1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {showText && (
        <span className={cn('font-semibold tracking-tight text-foreground', sizes[size].text)}>
          Nexus
        </span>
      )}
    </div>
  )
}
