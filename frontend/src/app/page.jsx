"use client";

// import Image from "next/image";
import { useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Tracker from "../components/tracker/Tracker"
import { issues } from "../data"

// console.log(issues)

export default function Home()
{
	const [isOpen, setIsOpen] = useState(true);
	const [isDetailOpen, setIsDetailOpen] = useState(false)

	return (
		<div>
			<Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
			<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
				<Tracker isOpen={isOpen} setIsOpen={setIsOpen} isDetailOpen={isDetailOpen} setIsDetailOpen={setIsDetailOpen} issues={issues} />
			</div>
		</div>
  );
}
