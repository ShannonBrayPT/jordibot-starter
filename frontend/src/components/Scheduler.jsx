import React, { useState } from "react";

const Scheduler = () => {
  const [time, setTime] = useState("");
  const [result, setResult] = useState("");

  const handleSchedule = async () => {
    const res = await fetch("http://localhost:8000/schedule/schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ time }),
    });
    const data = await res.json();
    setResult(`Scheduled: ${data.scheduled_time}`);
  };

  return (
    <div>
      <h2>Schedule</h2>
      <input value={time} onChange={(e) => setTime(e.target.value)} />
      <button onClick={handleSchedule}>Schedule</button>
      <p>{result}</p>
    </div>
  );
};

export default Scheduler;
