import React, { useState } from 'react';
import Link from 'next/link';
import { HiArrowLeftCircle, HiArrowRightCircle } from 'react-icons/hi2';

const Sidebar = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className={`relative p-4 bg-amber-400 h-screen ${isMinimized ? 'w-16' : 'w-64'} transition-width duration-300`}>
      <button 
        onClick={toggleSidebar} 
        className="absolute top-4 right-4 mb-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
      >
        {isMinimized ? <HiArrowRightCircle size={24}/> : <HiArrowLeftCircle size={24}/>}
      </button>
      {!isMinimized && (
        <>
          <Link href="/">
            <h2 className="text-2xl font-bold mb-4">LocalBites</h2>
          </Link>
          <nav>
            <ul>
              <li className="mb-2">
                <a href="/pembelian" className="text-gray-700 hover:text-gray-900">Pembelian</a>
              </li>
              <li className="mb-2">
                <a href="/payment_page" className="text-gray-700 hover:text-gray-900">Menunggu Pembayaran</a>
              </li>
              <li className="mb-2">
                <a href="/daftar-transaksi" className="text-gray-700 hover:text-gray-900">Daftar Transaksi</a>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};

export default Sidebar;