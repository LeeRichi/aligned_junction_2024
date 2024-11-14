"use client";

import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

import { TiFlowParallel } from "react-icons/ti";
import { SiGoogledocs } from "react-icons/si";
import { IoNotifications } from "react-icons/io5";
import { TiHeartOutline } from "react-icons/ti";
import { PiSignOutBold } from "react-icons/pi";

const Sidebar = ({isOpen}) => {
	const [query, setQuery] = useState("");

  // const toggleSidebar = () => {
  //   // setIsOpen(!isOpen);
  // };

  return (
    <div className="relative">
      <div
				className={`fixed top-0 left-0 z-50 w-[23%] h-full bg-white p-10 transition-transform transform border-r-2 pt-20
					${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
				<h3 className="text-2xl mb-4">
					Ailigned x <span className="text-red-500">FINGRID</span>
				</h3>
				<div className="flex items-center w-64 max-w-md bg-white rounded border-2 overflow-hidden">
					<CiSearch className="text-gray-500 ml-2" />
					<input
						type="text"
						placeholder="Search..."
						className="w-auto px-4 py-2 text-gray-700 focus:outline-none"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
				</div>
        <ul className="">
          <li className="flex items-center py-6 pl-6 pr-2 border-b border-gray-300 hover:underline hover:cursor-pointer">
            <TiFlowParallel className="mr-2"/>
						<a href="#">Tracker</a>
          </li>
          <li className="flex items-center py-6 pl-6 pr-2 border-b border-gray-300 hover:underline hover:cursor-pointer">
            <SiGoogledocs className="mr-2"/>
						<a href="#">Docs</a>
          </li>
          <li className="flex items-center py-6 pl-6 pr-2 border-b border-gray-300 hover:underline hover:cursor-pointer">
            <IoNotifications className="mr-2"/>
						<a href="#">Notification</a>
          </li>
          <li className="flex items-center py-6 pl-6 pr-2 border-b border-gray-300 hover:underline hover:cursor-pointer">
            <TiHeartOutline className="mr-2"/>
						<a href="#">Followed</a>
          </li>
          <li className="flex items-center py-6 pl-6 pr-2 border-b border-gray-300 hover:underline hover:cursor-pointer text-red-600">
            <PiSignOutBold className="mr-2"/>
						<a href="#">Signout</a>
          </li>
        </ul>
      </div>
      {/* Toggle Button */}
      {/* <button
        onClick={toggleSidebar}
        className={`absolute top-5 z-50 text-black p-2 rounded-full ${isOpen ? 'left-80' : 'left-8'}`}
      >
				{isOpen ? <RxHamburgerMenu size={25} /> : <RxHamburgerMenu size={25} />}
      </button> */}
    </div>
  );
};

export default Sidebar;
