import React from 'react'

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 p-4">
      <h2 className="text-xl font-bold mb-4">EchoMedia AI</h2>
      <ul>
        <li className="mb-2">Dashboard</li>
        <li className="mb-2">Analytics</li>
        <li className="mb-2">Media</li>
      </ul>
    </div>
  )
}