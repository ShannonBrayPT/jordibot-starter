import React from 'react';
import UploadMedia from './UploadMedia';
import Messages from './Messages';
import ScheduledPosts from './ScheduledPosts';

export default function DashboardPreview() {
  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-blue-50 via-purple-50 to-white min-h-screen">
      <UploadMedia />
      <Messages />
      <ScheduledPosts />
    </div>
  );
}