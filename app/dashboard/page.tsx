'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Plus, ArrowRight, Clock, Zap, Globe, Brain, MoreHorizontal,
  Rocket, Trash2, Copy, Pencil, Search, Filter, FolderOpen
} from 'lucide-react'
import { cn } from '@/lib/utils'

type ProjectStatus = 'Draft' | 'Building' | 'Live' | 'Archived'

interface Project {
  id: string
  name: string
  description: string
  status: ProjectStatus
  updatedAt: string
}

const mockProjects: Project[] = [
  { id: '1', name: 'Restaurant Booking App', description: 'Full-stack booking platform with payments', status: 'Live', updatedAt: '2 hours ago' },
  { id: '2', name: 'SaaS Analytics Dashboard', description: 'Real-time analytics with charts and reports', status: 'Building', updatedAt: '1 day ago' },
  { id: '3', name: 'AI Chat Assistant', description: 'Conversational AI with memory and tools', status: 'Draft', updatedAt: '3 days ago' },
]

const templates = [
  { label: 'SaaS Dashboard', icon: <Zap size={14} /> },
  { label: 'Landing Page', icon: <Globe size={14} /> },
  { label: 'Marketplace', icon: <Brain size={14} /> },
  { label: 'Booking App', icon: <Clock size={14} /> },
]

const activity = [
  { text: 'Deployed Restaurant Booking App', time: '2h ago', icon: <Rocket size={12} /> },
  { text: 'Generated SaaS Dashboard components', time: '1d ago', icon: <Zap size={12} /> },
  { text: 'Created AI Chat Assistant project', time: '3d ago', icon: <Plus size={12} /> },
  { text: 'Updated database schema', time: '4d ago', icon: <FolderOpen size={12} /> },
]

const statusConfig: Record<ProjectStatus, { label: string; color: string }> = {
  Draft: { label: 'Draft', color: 'oklch(0.6 0.02 240)' },
  Building: { label: 'Building', color: 'var(--nexus-cyan)' },
  Live: { label: 'Live', color: 'oklch(0.72 0.16 150)' },
  Archived: { label: 'Archived', color: 'oklch(0.5 0.02 240)' },
}

export default function DashboardPage() {
  const [user, setUser] = useState<{ name: string } | null>(null)
  const [projects, setProjects] = useState(mockProjects)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'All' | ProjectStatus>('All')
  const [menuOpen, setMenuOpen] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [newPrompt, setNewPrompt] = useState('')
  const [newMode, setNewMode] = useState<'Build' | 'Plan'>('Build')
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('nexus-user')
    if (stored) setUser(JSON.parse(stored))
    else router.replace('/auth/login')
  }, [router])

  const filtered = projects.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'All' || p.status === filter
    return matchSearch && matchFilter
  })

  const handleCreate = () => {
    if (!newPrompt.trim()) return
    const newProject: Project = {
      id: Date.now().toString(),
      name: newPrompt.slice(0, 40) + (newPrompt.length > 40 ? '...' : ''),
      description: `${newMode} mode generation`,
      status: 'Building',
      updatedAt: 'Just now',
    }
    setProjects(p => [newProject, ...p])
    setModalOpen(false)
    setNewPrompt('')
    router.push('/workspace')
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-1">
            Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}
          </h2>
          <p className="text-sm text-muted-foreground">Ready to build something new?</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 nexus-glow self-start sm:self-auto"
          style={{
            background: 'linear-gradient(135deg, var(--nexus-cyan), var(--nexus-blue))',
            color: 'oklch(0.1 0.015 240)',
          }}
        >
          <Plus size={15} />
          Create New App
        </button>
      </div>

      {/* Projects */}
      <div>
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <h3 className="text-sm font-semibold flex-1">Projects</h3>
          {/* Search */}
          <div className="relative">
            <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search..."
              className="glass-card-sm pl-7 pr-3 py-1.5 text-xs outline-none w-40 focus:w-52 transition-all duration-200"
            />
          </div>
          {/* Filter */}
          <div className="flex items-center gap-1">
            {(['All', 'Draft', 'Building', 'Live', 'Archived'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  'px-2.5 py-1 rounded-lg text-xs transition-all duration-200',
                  filter === f ? 'text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-white/8'
                )}
                style={filter === f ? { background: 'var(--nexus-cyan)/15', color: 'var(--nexus-cyan)' } : {}}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="glass-card p-12 flex flex-col items-center text-center gap-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: 'var(--nexus-cyan)/10' }}
            >
              <FolderOpen size={20} style={{ color: 'var(--nexus-cyan)' }} />
            </div>
            <div>
              <p className="font-medium mb-1">No apps yet</p>
              <p className="text-sm text-muted-foreground">Start with an idea and Nexus will build it.</p>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105"
              style={{ background: 'var(--nexus-cyan)/15', color: 'var(--nexus-cyan)' }}
            >
              <Plus size={14} />Create your first app
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(project => {
              const sc = statusConfig[project.status]
              return (
                <div
                  key={project.id}
                  className="glass-card p-4 hover:scale-[1.02] transition-all duration-300 cursor-pointer group relative"
                >
                  {/* Menu */}
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={e => { e.stopPropagation(); setMenuOpen(menuOpen === project.id ? null : project.id) }}
                      className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <MoreHorizontal size={14} />
                    </button>
                    {menuOpen === project.id && (
                      <div
                        className="absolute right-0 top-full mt-1 w-40 glass-card p-1 z-10"
                        onMouseLeave={() => setMenuOpen(null)}
                      >
                        {[
                          { icon: ArrowRight, label: 'Open' },
                          { icon: Pencil, label: 'Rename' },
                          { icon: Copy, label: 'Duplicate' },
                          { icon: Trash2, label: 'Delete' },
                        ].map(({ icon: Icon, label }) => (
                          <button
                            key={label}
                            onClick={() => { setMenuOpen(null); if (label === 'Open') router.push('/workspace') }}
                            className={cn(
                              'w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-all',
                              label === 'Delete'
                                ? 'text-destructive hover:bg-destructive/10'
                                : 'text-muted-foreground hover:text-foreground hover:bg-white/8'
                            )}
                          >
                            <Icon size={11} />{label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: 'linear-gradient(135deg, var(--nexus-cyan)/15, var(--nexus-blue)/15)' }}
                  >
                    <Zap size={14} style={{ color: 'var(--nexus-cyan)' }} />
                  </div>

                  <h4 className="text-sm font-semibold mb-1 pr-6 truncate">{project.name}</h4>
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{project.description}</p>

                  <div className="flex items-center justify-between">
                    <span
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium"
                      style={{ background: `${sc.color}/15`, color: sc.color }}
                    >
                      {project.status === 'Building' && (
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: sc.color }} />
                      )}
                      {project.status}
                    </span>
                    <span className="text-[11px] text-muted-foreground">{project.updatedAt}</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Templates + Activity row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Templates */}
        <div>
          <h3 className="text-sm font-semibold mb-3">Templates</h3>
          <div className="grid grid-cols-2 gap-2">
            {templates.map(t => (
              <button
                key={t.label}
                className="glass-card-sm p-3 flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground hover:scale-[1.02] transition-all duration-200 text-left"
              >
                <span style={{ color: 'var(--nexus-cyan)' }}>{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Activity */}
        <div>
          <h3 className="text-sm font-semibold mb-3">Recent Activity</h3>
          <div className="glass-card p-3 space-y-1">
            {activity.map((a, i) => (
              <div key={i} className="flex items-start gap-2.5 py-2 border-b border-white/5 last:border-0">
                <span
                  className="flex-shrink-0 w-5 h-5 rounded-lg flex items-center justify-center mt-0.5"
                  style={{ background: 'var(--nexus-cyan)/10', color: 'var(--nexus-cyan)' }}
                >
                  {a.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-foreground truncate">{a.text}</p>
                  <p className="text-[11px] text-muted-foreground">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={e => { if (e.target === e.currentTarget) setModalOpen(false) }}
        >
          <div className="glass-card p-6 w-full max-w-md">
            <h3 className="text-base font-semibold mb-1">Create New App</h3>
            <p className="text-sm text-muted-foreground mb-4">What do you want to build?</p>

            <textarea
              value={newPrompt}
              onChange={e => setNewPrompt(e.target.value)}
              placeholder="Describe your app idea..."
              rows={3}
              className="w-full glass-card-sm px-3.5 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none resize-none focus:ring-1 ring-[var(--nexus-cyan)]/30 mb-4 transition-all"
            />

            <div className="flex items-center gap-2 mb-5">
              {(['Build', 'Plan'] as const).map(m => (
                <button
                  key={m}
                  onClick={() => setNewMode(m)}
                  className={cn(
                    'flex-1 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                    newMode === m ? 'text-[oklch(0.1_0.015_240)]' : 'glass-card-sm text-muted-foreground hover:text-foreground'
                  )}
                  style={newMode === m ? { background: 'linear-gradient(135deg, var(--nexus-cyan), var(--nexus-blue))' } : {}}
                >
                  {m}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setModalOpen(false)}
                className="flex-1 py-2 rounded-xl glass-card-sm text-sm text-muted-foreground hover:text-foreground transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!newPrompt.trim()}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-medium transition-all hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(135deg, var(--nexus-cyan), var(--nexus-blue))', color: 'oklch(0.1 0.015 240)' }}
              >
                <Zap size={14} />Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
