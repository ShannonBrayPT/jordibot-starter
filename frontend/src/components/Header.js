import React from 'react';

const logo = process.env.PUBLIC_URL + '/logo.png';
const avatar = process.env.PUBLIC_URL + '/avatar.png';

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow">
      <div className="flex items-center space-x-3">
        <img src={logo} alt="EchoMediaAI" className="h-10" />
        <h1 className="text-2xl font-bold tracking-wide">EchoMediaAI</h1>
      </div>
      <div className="flex items-center space-x-3">
        <span className="hidden sm:block text-sm">Welcome back, JordiBot</span>
        <img src={avatar} alt="User Avatar" className="h-10 w-10 rounded-full border-2 border-white" />
      </div>
    </header>
  );
}