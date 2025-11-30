import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children, currentPath, onNavigate }) => {
  return (
    <>
      <Navbar currentPath={currentPath} onNavigate={onNavigate} />
      <main className="container mx-auto p-4">
        {children}
      </main>
    </>
  );
};

export default Layout;
