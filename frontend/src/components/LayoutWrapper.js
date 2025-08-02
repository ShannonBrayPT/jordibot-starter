import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import DarkModeToggle from './DarkModeToggle';

export default function LayoutWrapper({ children }) {
  return (
    <div className="flex bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-white">
      <Sidebar />
      <div className="ml-60 flex flex-col w-full">
        <Header />
        <main className="p-6 space-y-6">{children}</main>
        <div className="absolute bottom-4 right-4">
          <DarkModeToggle />
        </div>
      </div>
    </div>
  );
}