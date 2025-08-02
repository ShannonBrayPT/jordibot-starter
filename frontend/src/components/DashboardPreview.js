import React from 'react';

export default function DashboardPreview() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">📋 JordiBot Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 border rounded shadow">
          <h2 className="font-semibold">Post Automation</h2>
          <p>Automate daily posts and preview scheduled content.</p>
        </div>
        <div className="p-4 border rounded shadow">
          <h2 className="font-semibold">DM Inbox</h2>
          <p>See and reply to subscriber messages with GPT-powered replies.</p>
        </div>
        <div className="p-4 border rounded shadow">
          <h2 className="font-semibold">Prompt Submission</h2>
          <p>Submit your scene ideas and approve generated content.</p>
        </div>
        <div className="p-4 border rounded shadow">
          <h2 className="font-semibold">Engagement Metrics</h2>
          <p>Track fan engagement and message performance.</p>
        </div>
      </div>
    </div>
  );
}