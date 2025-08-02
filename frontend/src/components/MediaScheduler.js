import React, { useState, useEffect } from 'react';

export default function MediaScheduler() {
  const [file, setFile] = useState(null);
  const [scheduleTime, setScheduleTime] = useState('');
  const [media, setMedia] = useState([]);
  const [schedule, setSchedule] = useState([]);

  const fetchMedia = () => {
    fetch('http://localhost:8000/media').then(res => res.json()).then(setMedia);
  };

  const fetchSchedule = () => {
    fetch('http://localhost:8000/schedule').then(res => res.json()).then(setSchedule);
  };

  useEffect(() => {
    fetchMedia();
    fetchSchedule();
  }, []);

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("file", file);
    await fetch('http://localhost:8000/upload', {
      method: 'POST',
      body: formData,
    });
    fetchMedia();
  };

  const schedulePost = async () => {
    await fetch('http://localhost:8000/schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filename: file.name,
        schedule_time: scheduleTime,
        role: localStorage.getItem("userRole") || "creator"
      })
    });
    fetchSchedule();
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-white shadow rounded">
        <h2 className="text-xl font-bold mb-2">Upload & Schedule</h2>
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <input type="datetime-local" className="ml-2 border p-1" value={scheduleTime} onChange={e => setScheduleTime(e.target.value)} />
        <button className="ml-2 px-3 py-1 bg-blue-600 text-white rounded" onClick={uploadFile}>Upload</button>
        <button className="ml-2 px-3 py-1 bg-purple-600 text-white rounded" onClick={schedulePost}>Schedule</button>
      </div>

      <div className="p-4 bg-white shadow rounded">
        <h3 className="text-lg font-semibold mb-2">Media Library</h3>
        <div className="grid grid-cols-4 gap-2">
          {media.map((m, idx) => (
            <div key={idx} className="border p-2 text-center">
              <img src={`http://localhost:8000/media/${m.filename}`} alt={m.filename} className="h-20 object-cover mx-auto" />
              <p className="text-xs mt-1">{m.filename}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-white shadow rounded">
        <h3 className="text-lg font-semibold mb-2">Scheduled Posts</h3>
        <ul>
          {schedule.map((s, idx) => (
            <li key={idx} className="text-sm border-b py-1">
              📆 {s.schedule_time} — <strong>{s.filename}</strong> <em>({s.role})</em>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}