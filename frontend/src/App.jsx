import OnlyFansInbox from "@/pages/OnlyFansInbox";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import Dashboard from "@/pages/Dashboard";
import { Upload } from "@/pages/Upload";
import { Scheduler } from "@/pages/Scheduler";
import { Analytics } from "@/pages/Analytics";
import { Templates } from "@/pages/Templates";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col md:flex-row h-screen dark:bg-gray-950 bg-gray-100">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Topbar />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <Routes>
              <Route path="/inbox" element={<OnlyFansInbox />} />
              <Route path="/chatbot" element={<Dashboard />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/schedule" element={<Scheduler />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
