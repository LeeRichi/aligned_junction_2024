import React from 'react';
import { FaQuestionCircle, FaBell, FaUserCircle } from 'react-icons/fa'; // Import icons from Font Awesome

const Navbar = () => {
  return (
    <div className="flex border-b-2 w-full h-14 items-center justify-between px-4">
      {/* Breadcrumbs / Page Path */}
      <div className="text-lg">
        Home / Tracker / Releases
      </div>

      {/* Right side buttons */}
      <div className="flex items-center gap-4">
        {/* Question Icon */}
        <button className="text-2xl">
          <FaQuestionCircle />
        </button>

        {/* Notifications Icon */}
        <button className="text-2xl">
          <FaBell />
        </button>

        {/* User Avatar and Dropdown */}
        <div className="relative flex items-center gap-2">
          <button className="flex items-center gap-1">
            <FaUserCircle className="text-2xl" /> {/* User icon */}
            <span>Username</span>
          </button>

          {/* Dropdown Placeholder */}
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg hidden">
            <a href="#" className="block px-4 py-2 text-sm">Profile</a>
            <a href="#" className="block px-4 py-2 text-sm">Settings</a>
            <a href="#" className="block px-4 py-2 text-sm">Logout</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
