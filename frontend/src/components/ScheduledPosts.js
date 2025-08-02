import React from 'react';

export default function ScheduledPosts() {
  return (
    <div className="p-4 bg-white rounded shadow border">
      <h2 className="text-xl font-bold text-blue-700 mb-2">📅 Scheduled Posts</h2>
      <ul className="space-y-2">
        <li className="text-gray-700">✅ Friday @ 9:00 AM — Beach photo</li>
        <li className="text-gray-700">🕒 Saturday @ 8:00 PM — Voice Message</li>
        <li className="text-gray-700">🕓 Sunday @ 10:00 AM — Fan Q&A</li>
      </ul>
    </div>
  );
}