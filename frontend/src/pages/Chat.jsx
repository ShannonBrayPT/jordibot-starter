import { useState } from "react";

export function Chat() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi, I'm JordiBot. Ask me anything!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newUserMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setLoading(true);
    const res = await fetch("/api/openai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [...messages, newUserMessage] }),
    });
    const data = await res.json();
    setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    setLoading(false);
  };

  return (
    <div className="text-white max-w-2xl mx-auto space-y-4">
      <h2 className="text-xl font-bold">Chat with JordiBot</h2>
      <div className="border p-4 rounded bg-gray-800 space-y-2 h-80 overflow-y-auto">
        {messages.map((m, i) => (
          <div key={i} className={`text-sm ${m.role === "user" ? "text-right text-pink-400" : "text-left text-blue-400"}`}>
            {m.content}
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          className="text-black p-1 flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask JordiBot anything..."
        />
        <button className="bg-pink-600 px-4 py-1 rounded" onClick={sendMessage} disabled={loading}>
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
