import { useState } from "react";

export default function Dashboard() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Welcome to the JordiBot dashboard!" }
  ]);
  const [input, setInput] = useState("");
  const [media, setMedia] = useState([]);
  const [scheduledAt, setScheduledAt] = useState("");
  const [postContent, setPostContent] = useState("");

  const sendChat = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    const res = await fetch("/api/openai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [...messages, userMsg] }),
    });
    const data = await res.json();
    setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
  };

  const uploadPreview = (e) => {
    const files = Array.from(e.target.files);
    setMedia(files);
  };

  const handlePost = async () => {
    const formData = new FormData();
    media.forEach((file) => formData.append("files", file));
    formData.append("content", postContent);
    formData.append("scheduled_at", scheduledAt);

    const res = await fetch("/api/post", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    alert(result.status || "Posted!");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-white max-w-screen-xl mx-auto px-4 py-6">
      {/* Chat Panel */}
      <section className="bg-gray-800 p-4 rounded-lg h-[32rem] flex flex-col">
        <h2 className="text-lg font-bold mb-2">💬 Chat with JordiBot</h2>
        <div className="flex-1 space-y-1 overflow-y-auto mb-2 bg-black/10 p-2 rounded text-sm">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`px-3 py-2 rounded-lg ${m.role === "user" ? "bg-pink-600" : "bg-white text-black"}`}>
                {m.content}
              </div>
            </div>
          ))}
        </div>
        <div className="flex space-x-2">
          <input
            className="text-black p-2 flex-1 rounded"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Say something..."
          />
          <button onClick={sendChat} className="bg-pink-600 px-4 py-2 rounded">Send</button>
        </div>
      </section>

      {/* Upload & Post Section */}
      <section className="space-y-6">
        {/* Upload Media */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-bold mb-2">📤 Upload Media</h2>
          <input type="file" multiple onChange={uploadPreview} className="mb-2" />
          <ul className="text-sm list-disc pl-5">
            {media.map((file, i) => (
              <li key={i}>{file.name}</li>
            ))}
          </ul>
        </div>

        {/* Schedule Post */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-bold mb-2">🗓 Schedule</h2>
          <input
            type="datetime-local"
            className="text-black p-1 rounded"
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
          />
        </div>

        {/* Compose Post */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-bold mb-2">📝 Message</h2>
          <textarea
            rows="4"
            className="w-full text-black p-2 rounded"
            placeholder="Write your caption or message here..."
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
          <button className="bg-pink-600 px-4 py-2 mt-2 rounded" onClick={handlePost}>Submit Post</button>
        </div>
      </section>
    </div>
  );
}
