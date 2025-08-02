import React, { useState, useEffect } from 'react';

export default function RoleGate({ children, allowed }) {
  const [role, setRole] = useState(() => localStorage.getItem("userRole") || "creator");

  useEffect(() => {
    localStorage.setItem("userRole", role);
  }, [role]);

  if (!allowed.includes(role)) {
    return <div className="p-4 bg-red-100 text-red-600">Access Denied for role: {role}</div>;
  }

  return (
    <div>
      <div className="mb-2">
        <label className="mr-2">Current Role:</label>
        <select value={role} onChange={e => setRole(e.target.value)} className="border p-1 rounded">
          <option value="creator">Creator</option>
          <option value="staff">Staff</option>
        </select>
      </div>
      {children}
    </div>
  );
}