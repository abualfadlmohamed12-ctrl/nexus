'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Paperclip, Mic, Send, Zap, ClipboardList, MessageSquare,
  Sparkles, X, StopCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'

type Mode = 'build' | 'plan' | 'chat'

const modes: { id: Mode; label: string; icon: React.ReactNode; desc: string }[] = [
  { id: 'build', label: 'Build', icon: <Zap size={14} />, desc: 'Generate complete applications' },
  { id: 'plan', label: 'Plan', icon: <ClipboardList size={14} />, desc: 'Create architecture & specs' },
  { id: 'chat', label: 'Chat', icon: <MessageSquare size={14} />, desc: 'Discuss and refine ideas' },
]

interface AttachedFile { name: string; type: string; id: string }

interface PromptBuilderProps {
  compact?: boolean
  onSubmit?: (text: string, mode: Mode) => void
  className?: string
}

export function PromptBuilder({ compact = false, onSubmit, className }: PromptBuilderProps) {
  const [text, setText] = useState('')
  const [mode, setMode] = useState<Mode>('build')
  const [modeOpen, setModeOpen] = useState(false)
  const [files, setFiles] = useState<AttachedFile[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = 'auto'
    const newH = Math.min(ta.scrollHeight, 200)
    ta.style.height = `${newH}px`
  }, [text])

  const handleSubmit = () => {
    if (!text.trim() || isGenerating) return
    setIsGenerating(true)
    if (onSubmit) {
      onSubmit(text, mode)
    } else {
      // Landing page: store prompt and navigate
      sessionStorage.setItem('nexus-prompt', text)
      sessionStorage.setItem('nexus-mode', mode)
      setTimeout(() => router.push('/auth/signup'), 400)
    }
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && !e.nativeEvent.isComposing) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const added = Array.from(e.target.files ?? []).map(f => ({
      name: f.name,
      type: f.type,
      id: Math.random().toString(36).slice(2),
    }))
    setFiles(prev => [...prev, ...added])
    e.target.value = ''
  }

  const removeFile = (id: string) => setFiles(prev => prev.filter(f => f.id !== id))

  const currentMode = modes.find(m => m.id === mode)!

  return (
    <div className={cn('relative w-full', className)}>
      {/* Mode dropdown */}
      {modeOpen && (
        <div
          className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50 glass-card-sm px-1 py-1 min-w-[200px]"
          onMouseLeave={() => setModeOpen(false)}
        >
          {modes.map(m => (
            <button
              key={m.id}
              onClick={() => { setMode(m.id); setModeOpen(false) }}
              className={cn(
                'w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left transition-all duration-150',
                mode === m.id
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/10'
              )}
              style={mode === m.id ? { background: 'var(--glass-border)' } : {}}
            >
              <span className={cn('flex-shrink-0', mode === m.id && 'text-[var(--nexus-cyan)]')}>{m.icon}</span>
              <div>
                <div className="text-xs font-medium">{m.label}</div>
                <div className="text-[11px] opacity-60">{m.desc}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Main card */}
      <div
        className={cn(
          'glass-card transition-all duration-300',
          compact ? 'rounded-2xl' : 'rounded-[2rem]',
          text.length > 0 && 'nexus-glow'
        )}
      >
        {/* Attached files */}
        {files.length > 0 && (
          <div className="flex flex-wrap gap-1.5 px-4 pt-3">
            {files.map(f => (
              <span
                key={f.id}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs glass-card-sm text-muted-foreground"
              >
                <Paperclip size={10} />
                {f.name}
                <button onClick={() => removeFile(f.id)} className="ml-0.5 hover:text-foreground transition-colors">
                  <X size={10} />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Describe the app you want to build..."
          rows={compact ? 2 : 3}
          className={cn(
            'w-full bg-transparent resize-none outline-none text-foreground placeholder:text-muted-foreground/60',
            'leading-relaxed text-sm',
            compact ? 'px-4 pt-3 pb-1 min-h-[56px]' : 'px-5 pt-5 pb-2 min-h-[80px]'
          )}
        />

        {/* Toolbar */}
        <div className={cn('flex items-center gap-2', compact ? 'px-3 pb-2.5' : 'px-4 pb-4')}>
          {/* Attach */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,.pdf,.doc,.docx,.txt,.js,.ts,.tsx,.jsx,.py,.go,.rs"
            className="sr-only"
            onChange={handleFileChange}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all duration-200"
            aria-label="Attach file"
          >
            <Paperclip size={15} />
          </button>

          {/* Mode selector */}
          <button
            onClick={() => setModeOpen(!modeOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl glass-card-sm text-muted-foreground hover:text-foreground transition-all duration-200 text-xs"
          >
            <span className="text-[var(--nexus-cyan)]">{currentMode.icon}</span>
            <span>{currentMode.label}</span>
          </button>

          <div className="flex-1" />

          {/* Mic */}
          <button
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all duration-200"
            aria-label="Voice input"
          >
            <Mic size={15} />
          </button>

          {/* Send / Stop */}
          <button
            onClick={isGenerating ? () => setIsGenerating(false) : handleSubmit}
            disabled={!text.trim() && !isGenerating}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-200',
              'disabled:opacity-40 disabled:cursor-not-allowed',
              isGenerating
                ? 'bg-destructive/20 text-destructive hover:bg-destructive/30'
                : text.trim()
                ? 'hover:scale-105 hover:nexus-glow-sm'
                : 'glass-card-sm text-muted-foreground'
            )}
            style={text.trim() && !isGenerating ? {
              background: 'linear-gradient(135deg, var(--nexus-cyan), var(--nexus-blue))',
              color: 'oklch(0.1 0.015 240)',
            } : {}}
          >
            {isGenerating ? (
              <><StopCircle size={14} /><span>Stop</span></>
            ) : (
              <><Send size={14} /><span className="hidden sm:inline">Send</span></>
            )}
          </button>
        </div>
      </div>

      <p className={cn('text-center text-[11px] text-muted-foreground/50 mt-2', compact && 'hidden')}>
        Press <kbd className="px-1 py-0.5 rounded text-[10px] glass-card-sm">⌘ Enter</kbd> to send
      </p>
    </div>
  )
}
