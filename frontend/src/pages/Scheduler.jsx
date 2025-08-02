import { useState } from "react";

export function Scheduler() {
  const [content, setContent] = useState("");
  const [scheduledAt, setScheduledAt] = useState("2025-08-02T12:45");
  const [scheduledItems, setScheduledItems] = useState([]);

  const handleSubmit = async () => {
    const res = await fetch("/api/schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, scheduled_at: scheduledAt })
    });
    const result = await res.json();
    setScheduledItems([...scheduledItems, { content, time: scheduledAt }]);
  };

  return (
    <div className="text-white max-w-xl mx-auto space-y-4">
      <h2 className="text-xl font-bold">Schedule Content</h2>
      <input type="text" value={content} onChange={(e) => setContent(e.target.value)} placeholder="What to post" className="text-black p-1 w-full" />
      <input type="datetime-local" value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)} className="text-black p-1" />
      <button onClick={handleSubmit} className="bg-pink-600 px-4 py-2 rounded">Schedule</button>

      <ul className="mt-4 list-disc ml-6">
        {scheduledItems.map((s, i) => (
          <li key={i}>{s.content} – {new Date(s.time).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  );
}
