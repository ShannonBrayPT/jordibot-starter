import TabLayout from "./components/TabLayout";
import ChatBot from "./components/ChatBot";
import Upload from "./components/Upload";
import Scheduler from "./components/Scheduler";
import Analytics from "./components/Analytics";
// src/App.jsx
import React from 'react';
import UploadForm from './components/Form';


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
    <div className="p-8 text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">JordiBot Upload Form</h1>
      <UploadForm />
    </div>
  );
}

export default App;

