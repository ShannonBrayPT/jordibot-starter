import React, { useState } from "react";
import Chatbot from "./Chatbot.jsx";
import MediaUpload from "./MediaUpload.jsx";
import Scheduler from "./Scheduler.jsx";
import Analytics from "./Analytics.jsx";

const TabLayout = () => {
  const [tab, setTab] = useState("chatbot");

  const renderTab = () => {
    switch (tab) {
      case "chatbot":
        return <Chatbot />;
      case "upload":
        return <MediaUpload />;
      case "schedule":
        return <Scheduler />;
      case "analytics":
        return <Analytics />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black p-4">
      <div className="flex space-x-4 mb-4">
        <button onClick={() => setTab("chatbot")}>Chatbot</button>
        <button onClick={() => setTab("upload")}>Upload</button>
        <button onClick={() => setTab("schedule")}>Schedule</button>
        <button onClick={() => setTab("analytics")}>Analytics</button>
      </div>
      {renderTab()}
    </div>
  );
};

export default TabLayout;
