import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = ({ currentPath, onNavigate }) => {
  const { logout } = useAuth();
  const navItems = [
    { path: '/', label: 'Beranda' },
    { path: '/game', label: 'Game' },
    { path: '/shop', label: 'Toko' },
  ];

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <div className="flex space-x-4">
        {navItems.map((item) => (
          <a
            key={item.path}
            href={item.path}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(item.path);
            }}
            className={`hover:underline ${currentPath === item.path ? 'font-bold' : ''}`}
          >
            {item.label}
          </a>
        ))}
      </div>
      <button onClick={logout} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded">
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
