"use client";

import React, { useState } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import './globals.css';

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <html lang="en">
      <body>
        <div className="flex">
          {/* <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} /> */}
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
};

export default Layout;
