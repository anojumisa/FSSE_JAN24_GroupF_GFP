import React from 'react';

const Sidebar = () => (
  <div className="w-64 p-4 bg-gray-100 h-screen">
    <h2 className="text-2xl font-bold mb-4">LocalBites</h2>
    <nav>
      <ul>
        <li className="mb-2"><a href="/dashboard" className="text-gray-700 hover:text-gray-900">Dashboard</a></li>
      </ul>
    </nav>
  </div>
);

export default Sidebar;
