import TabLayout from "./components/TabLayout";
import ChatBot from "./components/ChatBot";
import Upload from "./components/Upload";
import Scheduler from "./components/Scheduler";
import Analytics from "./components/Analytics";
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



export default function App() {
  const [activeTab, setActiveTab] = useState("upload");

  const renderContent = () => {
    switch (activeTab) {
      case "upload":
        return <UploadForm />;
      case "chatbot":
        return <Chatbot />;
      case "scheduler":
        return <Scheduler />;
      case "analytics":
        return <Analytics />;
      default:
        return <UploadForm />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-4 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
}


export { App };  // ❌ not default
