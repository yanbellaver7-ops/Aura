'use client'

import { useState } from 'react'
import type { Task, Priority, Status } from './Dashboard'

interface Props {
  onClose: () => void
  onAdd: (task: Omit<Task, 'id' | 'createdAt'>) => void
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#111111',
  border: '1px solid #2A2A2A',
  borderRadius: 10,
  padding: '10px 14px',
  color: '#fff',
  fontSize: 14,
  outline: 'none',
  transition: 'border-color 0.15s',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 12,
  fontWeight: 600,
  color: '#8A8A8A',
  marginBottom: 6,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
}

export default function TaskModal({ onClose, onAdd }: Props) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'media' as Priority,
    status: 'pendente' as Status,
    dueDate: new Date().toISOString().split('T')[0],
    category: 'Trabalho',
  })
  const [focused, setFocused] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim()) return
    onAdd(form)
    onClose()
  }

  const set = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }))

  const priorityOptions: { value: Priority; label: string; color: string }[] = [
    { value: 'alta', label: 'Alta', color: '#F87171' },
    { value: 'media', label: 'Média', color: '#FCD34D' },
    { value: 'baixa', label: 'Baixa', color: '#4ADE80' },
  ]

  const categories = ['Trabalho', 'Pessoal', 'Saúde', 'Estudos', 'Outro']

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        backdropFilter: 'blur(4px)',
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          background: '#1A1A1A',
          border: '1px solid #2A2A2A',
          borderRadius: 20,
          padding: '28px 28px 24px',
          width: 480,
          maxWidth: '90vw',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 9,
                background: 'linear-gradient(135deg, #0EA5E9, #2DD4BF)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth="2.5">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </div>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: '#fff' }}>Nova Tarefa</h2>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 32,
              height: 32,
              borderRadius: 9999,
              background: '#252525',
              border: '1px solid #333',
              color: '#8A8A8A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Title */}
          <div>
            <label style={labelStyle}>Título *</label>
            <input
              type="text"
              placeholder="Nome da tarefa..."
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              onFocus={() => setFocused('title')}
              onBlur={() => setFocused(null)}
              style={{
                ...inputStyle,
                borderColor: focused === 'title' ? '#38BDF8' : '#2A2A2A',
              }}
              autoFocus
              required
            />
          </div>

          {/* Description */}
          <div>
            <label style={labelStyle}>Descrição</label>
            <textarea
              placeholder="Adicione detalhes sobre a tarefa..."
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              onFocus={() => setFocused('desc')}
              onBlur={() => setFocused(null)}
              rows={3}
              style={{
                ...inputStyle,
                borderColor: focused === 'desc' ? '#38BDF8' : '#2A2A2A',
              }}
            />
          </div>

          {/* Priority & Category row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <label style={labelStyle}>Prioridade</label>
              <div style={{ display: 'flex', gap: 6 }}>
                {priorityOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => set('priority', opt.value)}
                    style={{
                      flex: 1,
                      padding: '8px 0',
                      borderRadius: 9,
                      border: `1px solid ${form.priority === opt.value ? opt.color : '#2A2A2A'}`,
                      background:
                        form.priority === opt.value
                          ? `${opt.color}20`
                          : 'transparent',
                      color: form.priority === opt.value ? opt.color : '#8A8A8A',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={labelStyle}>Categoria</label>
              <select
                value={form.category}
                onChange={(e) => set('category', e.target.value)}
                style={{
                  ...inputStyle,
                  cursor: 'pointer',
                }}
              >
                {categories.map((c) => (
                  <option key={c} value={c} style={{ background: '#111' }}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Due date & Status row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <label style={labelStyle}>Prazo</label>
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) => set('dueDate', e.target.value)}
                onFocus={() => setFocused('date')}
                onBlur={() => setFocused(null)}
                style={{
                  ...inputStyle,
                  borderColor: focused === 'date' ? '#38BDF8' : '#2A2A2A',
                  colorScheme: 'dark',
                }}
              />
            </div>

            <div>
              <label style={labelStyle}>Status</label>
              <select
                value={form.status}
                onChange={(e) => set('status', e.target.value as Status)}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                <option value="pendente" style={{ background: '#111' }}>Pendente</option>
                <option value="em_progresso" style={{ background: '#111' }}>Em Progresso</option>
                <option value="concluida" style={{ background: '#111' }}>Concluída</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '11px 0',
                borderRadius: 9999,
                background: 'transparent',
                border: '1px solid #2A2A2A',
                color: '#8A8A8A',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#252525'
                e.currentTarget.style.color = '#fff'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#8A8A8A'
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              style={{
                flex: 2,
                padding: '11px 0',
                borderRadius: 9999,
                background: 'linear-gradient(135deg, #0EA5E9, #2DD4BF)',
                border: 'none',
                color: '#fff',
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'opacity 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Criar Tarefa
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
