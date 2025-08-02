
import React from 'react'

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4">
      <h2 className="text-xl mb-4 font-semibold">JordiBot Menu</h2>
      <ul className="space-y-2">
        <li>Chatbot</li>
        <li>Upload</li>
        <li>Scheduler</li>
        <li>Analytics</li>
      </ul>
    </div>
  )
}
