'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Plus, Search, Zap, Globe, Brain, Clock,
  MoreHorizontal, ArrowRight, Pencil, Copy, Trash2, Filter
} from 'lucide-react'
import { cn } from '@/lib/utils'

type Status = 'Draft' | 'Building' | 'Live' | 'Archived'

const allProjects = [
  { id: '1', name: 'Restaurant Booking App', description: 'Full-stack booking platform with payments and real-time availability', status: 'Live' as Status, updatedAt: '2 hours ago', tech: 'Next.js' },
  { id: '2', name: 'SaaS Analytics Dashboard', description: 'Real-time analytics with charts, reports, and team collaboration', status: 'Building' as Status, updatedAt: '1 day ago', tech: 'React' },
  { id: '3', name: 'AI Chat Assistant', description: 'Conversational AI with memory, tool use, and streaming responses', status: 'Draft' as Status, updatedAt: '3 days ago', tech: 'Next.js' },
  { id: '4', name: 'E-commerce Marketplace', description: 'Multi-vendor marketplace with payments, reviews, and inventory', status: 'Live' as Status, updatedAt: '1 week ago', tech: 'Next.js' },
  { id: '5', name: 'Team Project Manager', description: 'Kanban-style project management with sprints and time tracking', status: 'Archived' as Status, updatedAt: '2 weeks ago', tech: 'React' },
  { id: '6', name: 'Portfolio Website', description: 'Developer portfolio with projects, blog, and contact form', status: 'Live' as Status, updatedAt: '1 month ago', tech: 'Next.js' },
]

const statusColors: Record<Status, { bg: string; text: string }> = {
  Draft: { bg: 'oklch(0.6 0.02 240)/12', text: 'oklch(0.6 0.02 240)' },
  Building: { bg: 'var(--nexus-cyan)/12', text: 'var(--nexus-cyan)' },
  Live: { bg: 'oklch(0.72 0.16 150)/12', text: 'oklch(0.72 0.16 150)' },
  Archived: { bg: 'oklch(0.45 0.02 240)/12', text: 'oklch(0.45 0.02 240)' },
}

export default function ProjectsPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'All' | Status>('All')
  const [menuOpen, setMenuOpen] = useState<string | null>(null)
  const router = useRouter()

  const filtered = allProjects.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'All' || p.status === filter
    return matchSearch && matchFilter
  })

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-1">Projects</h2>
          <p className="text-sm text-muted-foreground">{allProjects.length} total projects</p>
        </div>
        <button
          onClick={() => router.push('/workspace')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 nexus-glow self-start sm:self-auto"
          style={{ background: 'linear-gradient(135deg, var(--nexus-cyan), var(--nexus-blue))', color: 'oklch(0.1 0.015 240)' }}
        >
          <Plus size={15} />New Project
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full glass-card-sm pl-7 pr-3 py-2 text-xs outline-none focus:ring-1 ring-[var(--nexus-cyan)]/30 transition-all"
          />
        </div>
        <div className="flex items-center gap-1">
          <Filter size={12} className="text-muted-foreground" />
          {(['All', 'Draft', 'Building', 'Live', 'Archived'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn('px-2.5 py-1 rounded-lg text-xs transition-all', filter === f ? '' : 'text-muted-foreground hover:text-foreground hover:bg-white/8')}
              style={filter === f ? { background: 'var(--nexus-cyan)/15', color: 'var(--nexus-cyan)' } : {}}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(project => {
          const sc = statusColors[project.status]
          return (
            <div key={project.id} className="glass-card p-4 group hover:scale-[1.02] transition-all duration-300 relative cursor-pointer"
              onClick={() => router.push('/workspace')}>
              <div className="absolute top-3 right-3">
                <button
                  onClick={e => { e.stopPropagation(); setMenuOpen(menuOpen === project.id ? null : project.id) }}
                  className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100"
                >
                  <MoreHorizontal size={13} />
                </button>
                {menuOpen === project.id && (
                  <div className="absolute right-0 top-full mt-1 w-40 glass-card p-1 z-10" onMouseLeave={() => setMenuOpen(null)}>
                    {[{ icon: ArrowRight, label: 'Open' }, { icon: Pencil, label: 'Rename' }, { icon: Copy, label: 'Duplicate' }, { icon: Trash2, label: 'Delete' }].map(({ icon: Icon, label }) => (
                      <button key={label} onClick={() => setMenuOpen(null)}
                        className={cn('w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-all',
                          label === 'Delete' ? 'text-destructive hover:bg-destructive/10' : 'text-muted-foreground hover:text-foreground hover:bg-white/8')}>
                        <Icon size={10} />{label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3"
                style={{ background: 'linear-gradient(135deg, var(--nexus-cyan)/15, var(--nexus-blue)/15)' }}>
                <Zap size={14} style={{ color: 'var(--nexus-cyan)' }} />
              </div>

              <h4 className="text-sm font-semibold mb-1 pr-8 leading-snug">{project.name}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">{project.description}</p>

              <div className="flex items-center justify-between mt-auto">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium"
                  style={{ background: sc.bg, color: sc.text }}>
                  {project.status === 'Building' && <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: sc.text }} />}
                  {project.status}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-1.5 py-0.5 rounded glass-card-sm text-muted-foreground">{project.tech}</span>
                  <span className="text-[11px] text-muted-foreground">{project.updatedAt}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
