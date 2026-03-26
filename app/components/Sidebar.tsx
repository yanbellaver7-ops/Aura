'use client'

import { useState } from 'react'

const navItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <defs>
          <linearGradient id="dash-grad" x1="0" y1="0" x2="18" y2="18" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0EA5E9" />
          </linearGradient>
        </defs>
        <rect x="0.5" y="0.5" width="7.5" height="7.5" rx="2" fill="url(#dash-grad)" />
        <rect x="10" y="0.5" width="7.5" height="7.5" rx="2" fill="url(#dash-grad)" />
        <rect x="0.5" y="10" width="7.5" height="7.5" rx="2" fill="url(#dash-grad)" />
        <rect x="10" y="10" width="7.5" height="7.5" rx="2" fill="url(#dash-grad)" />
      </svg>
    ),
  },
  {
    id: 'tarefas',
    label: 'Tarefas',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="task-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
        </defs>
        {/* Document body */}
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h9" stroke="url(#task-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 2h.5A1.5 1.5 0 0 1 20 3.5V12" stroke="url(#task-grad)" strokeWidth="2.2" strokeLinecap="round" />
        {/* Check marks */}
        <path d="M7 8l1.5 1.5L11 6" stroke="url(#task-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 12.5l1.5 1.5 2.5-3" stroke="url(#task-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 17l1.5 1.5 2.5-3" stroke="url(#task-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Lines */}
        <line x1="13" y1="8" x2="17" y2="8" stroke="url(#task-grad)" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="13" y1="12.5" x2="17" y2="12.5" stroke="url(#task-grad)" strokeWidth="2.2" strokeLinecap="round" />
        {/* Pencil */}
        <path d="M16.5 19.5l4-4 2 2-4 4-2.5.5.5-2.5z" stroke="url(#task-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'projetos',
    label: 'Projetos',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="proj-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
        </defs>
        {/* Clipboard body */}
        <rect x="3" y="5" width="14" height="16" rx="2.5" stroke="url(#proj-grad)" strokeWidth="2.2" strokeLinecap="round" />
        {/* Clip at top */}
        <path d="M8 5V4a2 2 0 1 1 4 0v1" stroke="url(#proj-grad)" strokeWidth="2.2" strokeLinecap="round" />
        {/* Chart line inside */}
        <path d="M6 13l2.5-3 2.5 3 2-2.5" stroke="url(#proj-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Horizontal line */}
        <line x1="6" y1="17" x2="13" y2="17" stroke="url(#proj-grad)" strokeWidth="2.2" strokeLinecap="round" />
        {/* Pencil */}
        <line x1="20" y1="3" x2="20" y2="19" stroke="url(#proj-grad)" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M17.5 19.5l2.5 2 2.5-2" stroke="url(#proj-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18.5 3.5A1.5 1.5 0 0 1 21.5 3.5" stroke="url(#proj-grad)" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'configuracoes',
    label: 'Configurações',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="cfg-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
        </defs>
        {/* Gear outer shape with wavy teeth */}
        <path
          d="M12 2
             c.6 0 1 .5 1.2 1.1l.4 1.3a7 7 0 0 1 1.6.9l1.3-.4c.6-.2 1.2 0 1.5.5l1 1.7c.3.5.2 1.2-.3 1.6l-1 .9c0 .3.1.6.1.9s0 .6-.1.9l1 .9c.5.4.6 1.1.3 1.6l-1 1.7c-.3.5-.9.7-1.5.5l-1.3-.4a7 7 0 0 1-1.6.9l-.4 1.3c-.2.6-.6 1-1.2 1h-2c-.6 0-1-.4-1.2-1l-.4-1.3a7 7 0 0 1-1.6-.9l-1.3.4c-.6.2-1.2 0-1.5-.5l-1-1.7c-.3-.5-.2-1.2.3-1.6l1-.9c0-.3-.1-.6-.1-.9s0-.6.1-.9l-1-.9c-.5-.4-.6-1.1-.3-1.6l1-1.7c.3-.5.9-.7 1.5-.5l1.3.4a7 7 0 0 1 1.6-.9l.4-1.3C9 2.5 9.4 2 10 2h2z"
          stroke="url(#cfg-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        />
        {/* Inner circle open arc */}
        <path d="M15 12a3 3 0 1 1-3-3" stroke="url(#cfg-grad)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
]

interface SidebarProps {
  onNewTask: () => void
}

export default function Sidebar({ onNewTask }: SidebarProps) {
  const [active, setActive] = useState('dashboard')

  return (
    <aside
      style={{
        width: 260,
        height: '100vh',
        background: '#111111',
        borderRight: '1px solid #2A2A2A',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 16px',
        flexShrink: 0,
        overflowY: 'auto',
      }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 36, paddingLeft: 4 }}>
        <img
          src="/logo.png"
          alt="Aurafarm"
          style={{ height: 150, width: 'auto', objectFit: 'contain' }}
        />
      </div>

      {/* Nova Tarefa */}
      <button
        onClick={onNewTask}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          padding: '10px 12px',
          borderRadius: 10,
          background: 'linear-gradient(135deg, #0EA5E9, #2DD4BF)',
          border: 'none',
          color: '#fff',
          fontSize: 13,
          fontWeight: 700,
          cursor: 'pointer',
          marginBottom: 20,
          transition: 'opacity 0.15s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
      >
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 5v14M5 12h14" />
        </svg>
        Nova Tarefa
      </button>

      {/* Nav */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
        {navItems.map((item) => {
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 12px',
                borderRadius: 10,
                background: isActive ? '#252525' : 'transparent',
                border: isActive ? '1px solid #333' : '1px solid transparent',
                color: isActive ? '#fff' : '#8A8A8A',
                fontSize: 14,
                fontWeight: isActive ? 600 : 400,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s',
                width: '100%',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = '#1A1A1A'
                  e.currentTarget.style.color = '#ccc'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = '#8A8A8A'
                }
              }}
            >
              {item.icon}
              {item.label}
            </button>
          )
        })}
      </nav>

      {/* Premium card */}
      <div
        style={{
          background: 'linear-gradient(145deg, #1B3045, #0D1E2B)',
          border: '1px solid #1E3A52',
          borderRadius: 16,
          padding: '20px 16px',
          marginBottom: 16,
        }}
      >
        <p style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 6, lineHeight: 1.3 }}>
          Aura+ Premium
        </p>
        <p style={{ fontSize: 12, color: '#8A8A8A', lineHeight: 1.5, marginBottom: 14 }}>
          Desbloqueie análises avançadas e metas ilimitadas
        </p>
        <button
          style={{
            width: '100%',
            padding: '9px 0',
            borderRadius: 9999,
            background: '#fff',
            border: 'none',
            color: '#0D1E2B',
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'opacity 0.15s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          Assinar Agora
        </button>
      </div>

      {/* Logout */}
      <button
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '10px 12px',
          borderRadius: 10,
          background: 'transparent',
          border: '1px solid transparent',
          color: '#8A8A8A',
          fontSize: 14,
          cursor: 'pointer',
          width: '100%',
          transition: 'all 0.15s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#1A1A1A'
          e.currentTarget.style.color = '#F87171'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.color = '#8A8A8A'
        }}
      >
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        Sair
      </button>
    </aside>
  )
}
