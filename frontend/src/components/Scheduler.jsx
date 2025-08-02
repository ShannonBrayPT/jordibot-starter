import React, { useState } from 'react';

const Scheduler = () => {
  const [time, setTime] = useState("");

  const handleSchedule = async () => {
    await fetch("http://localhost:8000/api/schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ time }),
    });
    alert("Scheduled");
  };

  return (
    <div className="p-4 border rounded bg-white h-full flex flex-col gap-2">
      <input type="datetime-local" value={time} onChange={(e) => setTime(e.target.value)} />
      <button className="bg-purple-600 text-white px-4 py-2 rounded" onClick={handleSchedule}>
        Schedule Post
      </button>
    </div>
  );
};

export default Scheduler;