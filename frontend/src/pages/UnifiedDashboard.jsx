import { useState, useEffect } from "react";

export default function UnifiedDashboard() {
  const [messages, setMessages] = useState([]);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [suggestedPrompt, setSuggestedPrompt] = useState("");
  const [aiReply, setAiReply] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const [sortBy, setSortBy] = useState("timestamp");

  useEffect(() => {
    fetch("/api/dashboard/messages")
      .then(res => res.json())
      .then(data => setMessages(data.messages || []));
  }, []);

  const onUpload = async () => {
    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("reply_to", "ai-tag-preview");

    const res = await fetch("/api/upload-media", {
      method: "POST",
      body: formData
    });
    const data = await res.json();
    if (data.suggested_prompt) {
      setSuggestedPrompt(data.suggested_prompt);
    }
  };

  const handleAIReply = async (msg) => {
    const res = await fetch("/api/openai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: msg.message })
    });
    const data = await res.json();
    setAiReply(data.reply || "No response");
  };

  const sortedMessages = [...messages].sort((a, b) =>
    sortBy === "sender" ? a.sender.localeCompare(b.sender) : new Date(b.timestamp) - new Date(a.timestamp)
  );

  return (
    <div className="flex flex-col lg:flex-row h-screen text-white">
      <aside className="w-full lg:w-1/4 bg-gray-900 p-4 space-y-4">
        <img src="/avatar.png" className="rounded-full w-32 h-32 mx-auto border-4 border-pink-500" alt="Avatar" />
        <p className="text-center font-bold">Welcome back, Jordi</p>

        <div className="space-y-2">
          <input
            type="file"
            onChange={(e) => {
              setUploadFile(e.target.files[0]);
              setMediaPreview(URL.createObjectURL(e.target.files[0]));
            }}
            className="text-black"
          />
          {mediaPreview && <img src={mediaPreview} alt="preview" className="rounded" />}
          <button onClick={onUpload} className="bg-pink-600 px-3 py-1 rounded w-full">Upload + Analyze</button>
          {suggestedPrompt && (
            <div className="text-sm mt-2 bg-gray-700 p-2 rounded">
              <strong>AI Prompt:</strong> {suggestedPrompt}
            </div>
          )}
        </div>
      </aside>

      <main className="flex-1 bg-gray-800 p-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">📨 Inbox + Sent Messages</h2>
          <select onChange={(e) => setSortBy(e.target.value)} value={sortBy} className="text-black px-2 py-1 rounded">
            <option value="timestamp">Sort by Time</option>
            <option value="sender">Sort by Sender</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-700 text-left">
                <th className="p-2">Sender</th>
                <th className="p-2">Message</th>
                <th className="p-2">Media</th>
                <th className="p-2">Time</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedMessages.map((msg, i) => (
                <tr key={i} className="border-b border-gray-600 hover:bg-gray-700">
                  <td className="p-2 font-semibold text-pink-300">@{msg.sender}</td>
                  <td className="p-2">{msg.message}</td>
                  <td className="p-2">
                    {msg.media_url && <a href={msg.media_url} className="text-blue-300" target="_blank" rel="noreferrer">View</a>}
                  </td>
                  <td className="p-2 text-xs text-gray-400">{new Date(msg.timestamp).toLocaleString()}</td>
                  <td className="p-2">
                    <button onClick={() => handleAIReply(msg)} className="bg-blue-600 px-2 py-1 rounded text-xs">💡 Suggest</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {aiReply && (
          <div className="bg-gray-900 p-3 rounded mt-4">
            <strong className="text-green-300">AI Suggestion:</strong> {aiReply}
          </div>
        )}
      </main>

      {/* Chat always shown */}
      <div className="fixed bottom-4 right-4 w-96 max-w-full">
        <div className="bg-gray-900 border border-pink-500 rounded-xl shadow-lg p-3 space-y-2">
          <h3 className="text-lg font-bold">💬 Chat with JordiBot</h3>
          {/* Your existing chat component can be embedded here */}
          <input className="w-full text-black p-2 rounded" placeholder="Ask JordiBot..." />
          <button className="bg-pink-600 px-3 py-1 rounded w-full">Send</button>
        </div>
      </div>
    </div>
  );
}