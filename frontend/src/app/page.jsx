"use client";

import { useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import Tracker from "../components/tracker/Tracker";
import { issues } from "../data";

export default function Home() {
  const [isOpen, setIsOpen] = useState(true); // Sidebar starts closed on small screens
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        className={`fixed top-0 h-full z-20 transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          sm:translate-x-0 sm:static sm:w-60`}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 min-h-screen transition-all duration-300 ${
          isOpen ? "ml-[23%]" : "ml-0"
        }`}
      >
        {/* Navbar */}
        <Navbar setIsOpen={setIsOpen} isOpen={isOpen} />

        {/* Main Content below Navbar */}
        <div className="sm:p-12 grid justify-items-center font-[family-name:var(--font-geist-sans)]">
          <Tracker
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isDetailOpen={isDetailOpen}
            setIsDetailOpen={setIsDetailOpen}
            issues={issues}
          />
        </div>
      </div>
    </div>
  );
}
