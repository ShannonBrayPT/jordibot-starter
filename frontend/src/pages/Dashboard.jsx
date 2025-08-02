
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [subscriberMessages, setSubscriberMessages] = useState([]);
  const [sentReplies, setSentReplies] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [offset, setOffset] = useState(0);
  const limit = 5;

  useEffect(() => {
    fetch("/api/dashboard/messages")
      .then(res => res.json())
      .then(data => setSubscriberMessages(data.messages || []));
  }, []);

  useEffect(() => {
    fetch("/api/dashboard/replies")
      .then(res => res.json())
      .then(data => setSentReplies(data.replies || []));
  }, []);

  const filteredMessages = subscriberMessages.filter((msg) =>
    msg.sender.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="text-white max-w-screen-md mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold">📥 Dashboard: Subscriber Messages</h2>
      <input
        className="text-black w-full p-2 rounded"
        placeholder="Filter by sender..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />

      {filteredMessages.slice(offset, offset + limit).map((msg, i) => (
        <div key={i} className="bg-gray-800 p-4 rounded-lg space-y-1">
          <p className="text-pink-400 font-semibold">@{msg.sender}</p>
          <p className="text-sm text-gray-100">{msg.message}</p>
          <div className="text-xs text-gray-400">🕒 {new Date(msg.timestamp).toLocaleString()}</div>
        </div>
      ))}

      <div className="flex justify-between text-sm mt-2">
        <button
          className="bg-gray-600 px-3 py-1 rounded disabled:opacity-50"
          onClick={() => setOffset(Math.max(0, offset - limit))}
          disabled={offset === 0}
        >
          Previous
        </button>
        <button
          className="bg-gray-600 px-3 py-1 rounded disabled:opacity-50"
          onClick={() => setOffset(offset + limit)}
          disabled={offset + limit >= filteredMessages.length}
        >
          Next
        </button>
      </div>

      <h3 className="text-xl font-bold mt-6">📤 Sent Replies</h3>
      <div className="grid gap-4">
        {sentReplies.map((r, i) => (
          <div key={i} className="bg-gray-700 p-3 rounded">
            <p className="text-sm text-blue-300">To: @{r.sender}</p>
            <p className="text-sm text-gray-100">"{r.response}"</p>
            {r.vision_tags && (
              <p className="text-xs text-yellow-300 mt-1">🧠 Tags: {r.vision_tags}</p>
            )}
            <div className="text-xs text-gray-400">🕒 {new Date(r.timestamp).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
