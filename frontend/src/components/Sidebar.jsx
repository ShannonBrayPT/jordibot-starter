import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 p-4">
      <ul className="space-y-4">
        <li className="text-white font-semibold">Dashboard</li>
        <li className="text-white">Messages</li>
        <li className="text-white">Schedule</li>
        <li className="text-white">Media</li>
      </ul>
    </div>
  );
};

export default Sidebar;