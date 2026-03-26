'use client'

import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#0D0D0D' }}>
      <Sidebar onNewTask={() => setIsModalOpen(true)} />
      <Dashboard isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  )
}
