import React from "react";
import Dashboard from "./components/Dashboard.jsx";
import CreatorView from "./components/CreatorView.jsx";
import Chatbot from "./components/Chatbot.jsx";

function App() {
  return (
    <div className="p-4 bg-gray-900 min-h-screen">
      <h1 className="text-white text-3xl font-bold mb-4">EchoMediaAI Dashboard</h1>
      <Dashboard />
      <CreatorView />
      <Chatbot />
    </div>
  );
}

export default App;
