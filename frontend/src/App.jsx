
import React from 'react'
import Sidebar from './components/Sidebar.jsx'

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-4 w-full">
        <h1 className="text-2xl font-bold">Welcome to JordiBot</h1>
      </div>
    </div>
  )
}

export default App
