import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

function Placeholder({ label }) {
  return <div className="text-white text-xl font-bold">{label} Page</div>;
}

export default function App() {
  return (
    <Router>
      <div className="flex h-screen dark:bg-gray-950">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Topbar />
          <main className="flex-1 overflow-y-auto p-6">
            <Routes>
              <Route path="/chatbot" element={<Placeholder label="Chatbot" />} />
              <Route path="/upload" element={<Placeholder label="Upload" />} />
              <Route path="/schedule" element={<Placeholder label="Schedule" />} />
              <Route path="/analytics" element={<Placeholder label="Analytics" />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}