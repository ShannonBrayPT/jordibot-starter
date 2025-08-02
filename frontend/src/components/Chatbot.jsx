import React from "react";
const Chatbot = () => (
  <div className="fixed bottom-4 right-4 w-80 bg-white text-black rounded-lg shadow p-4">
    <h2 className="text-xl font-semibold mb-2">JordiBot</h2>
    <div className="h-48 overflow-y-auto border p-2 mb-2">Chat output here...</div>
    <input type="text" className="w-full border rounded p-2" placeholder="Ask me anything..." />
  </div>
);
export default Chatbot;