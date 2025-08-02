import React, { useEffect, useState } from 'react';

export default function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/messages')
      .then(res => res.json())
      .then(setMessages);
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow border">
      <h2 className="text-xl font-bold text-blue-700 mb-2">📬 Subscriber Messages</h2>
      {messages.length === 0 ? (
        <p className="text-gray-500">No messages received yet.</p>
      ) : (
        <ul className="space-y-2 max-h-64 overflow-y-auto">
          {messages.map((msg, idx) => (
            <li key={idx} className="border-b pb-2">
              <strong className="text-purple-700">{msg.username}</strong>: {msg.last_message}
              <div className="text-xs text-gray-400">{new Date(msg.timestamp).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}