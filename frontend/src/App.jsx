import TabLayout from "./components/TabLayout";
import ChatBot from "./components/ChatBot";
import Upload from "./components/Upload";
import Scheduler from "./components/Scheduler";
import Analytics from "./components/Analytics";
// src/App.jsx
import React from 'react';

<TabLayout
  tabs={{
    Chat: <ChatBot />,
    Upload: <Upload />,
    Schedule: <Scheduler />,
    Analytics: <Analytics />,
  }}
/>






function App() {
  return (
    <div className="min-h-screen p-8 text-white bg-gray-900">
      <h1 className="text-3xl font-bold">EchoMedia.ai Dashboard</h1>
    </div>
  );
}

export default App;
