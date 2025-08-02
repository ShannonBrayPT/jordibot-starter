import React from 'react'

export default function Chatbot() {
  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white text-black p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-bold">Chat with JordiBot</h2>
      <textarea className="w-full p-2 mt-2 rounded border" rows="3" placeholder="Type your message..." />
      <button className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded">Send</button>
    </div>
  )
}