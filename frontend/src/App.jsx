import React from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Chatbot from './components/Chatbot'

export default function App() {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar />
      <main className="flex-1 p-6">
        <Dashboard />
        <Chatbot />
      </main>
    </div>
  )
}