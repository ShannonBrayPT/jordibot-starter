import React from "react";

export default function Avatar() {
  return (
    <div className="flex items-center space-x-4 mb-6">
      <img src="/logo.png" alt="Avatar" className="w-16 h-16 rounded-full border" />
      <div>
        <h2 className="text-xl font-semibold">JordiBot</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Creator Mode</p>
      </div>
    </div>
  );
}