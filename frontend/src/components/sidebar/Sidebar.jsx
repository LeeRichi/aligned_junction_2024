"use client";

import React, { useState } from "react";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";

const Sidebar = ({isOpen, setIsOpen}) => {
  // const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div
				className={`fixed top-0 left-0 z-50 w-2/12 h-full bg-white p-10 transition-transform transform border-r-2 mt-4
					${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <h2 className="text-2xl mb-4">Ailigned</h2>
        <ul className="">
          <li className="py-6 pl-6 pr-2 border-b border-gray-300 hover:underline hover:cursor-pointer">
            <a href="#">Tracker</a>
          </li>
          <li className="py-6 pl-6 pr-2 border-b border-gray-300 hover:underline hover:cursor-pointer">
            <a href="#">Docs</a>
          </li>
          <li className="py-6 pl-6 pr-2 border-b border-gray-300 hover:underline hover:cursor-pointer">
            <a href="#">Notification</a>
          </li>
          <li className="py-6 pl-6 pr-2 border-b border-gray-300 hover:underline hover:cursor-pointer">
            <a href="#">Profile</a>
          </li>
          <li className="py-6 pl-6 pr-2 border-b border-gray-300 hover:underline hover:cursor-pointer">
            <a href="#">Signout</a>
          </li>
        </ul>
      </div>
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`absolute top-5 z-50 text-black p-2 rounded-full ${isOpen ? 'left-48' : 'left-4'}`}
      >
				{isOpen ? <RxHamburgerMenu size={25} /> : <RxHamburgerMenu size={25} />}
      </button>
    </div>
  );
};

export default Sidebar;
