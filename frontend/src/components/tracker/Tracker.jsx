"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Modal from "../../components/Modal"
import { FiFilter } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa";
import { IoBackspaceOutline } from "react-icons/io5";

const Tracker = ({isOpen, issues}) =>
{
	const [backendIssuesIds, setBackendIssuesIds] = useState([])
	const [firstIssue, setFirstIssue] = useState({})
	const [releaseDetails, setReleaseDetails] = useState(null); // State to hold the release details
	const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

	const today = new Date();
	const todayString = today.toISOString().slice(0, 10);

	useEffect(() => {
		const fetchIssues = async () => {
			try {
				const setOfIdsRes = await fetch(`${backendUrl}/v1/company/tracker`);
				console.log(setOfIdsRes)
				if (!setOfIdsRes.ok) throw new Error("Network response was not ok");
				const setOfIdsdata = await setOfIdsRes.json();
				console.log(setOfIdsdata.releases)
				setBackendIssuesIds(setOfIdsdata.releases);
			} catch (error) {
				console.error("Fetch error:", error);
			}
		};

		fetchIssues();
	}, []);

	const fetchReleaseDetails = async (id) => {
    try {
      const res = await fetch(`${backendUrl}/v1/company/tracker${id}`);
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      setReleaseDetails(data); // Store fetched details
      setIsModalOpen(true); // Open modal with release details
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

	const handleIssueClick = (id) => {
    fetchReleaseDetails(id); // Fetch release details on click
  };
	// console.log(backendIssuesIds)
	// console.log(backendIssuesIds[0])
	// console.log(JSON.stringify(backendIssuesIds, null, 2));
	console.log(JSON.stringify(issues[0]))

  const monthsOfYear = [
    { name: "January", days: 31 },
    { name: "February", days: 29 },
    { name: "March", days: 31 },
    { name: "April", days: 30 },
    { name: "May", days: 31 },
    { name: "June", days: 30 },
    { name: "July", days: 31 },
    { name: "August", days: 31 },
    { name: "September", days: 30 },
    { name: "October", days: 31 },
    { name: "November", days: 30 },
    { name: "December", days: 31 },
  ];

	const [selectedIssue, setSelectedIssue] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

  const timelineRef = useRef(null);
	const [scrollPosition, setScrollPosition] = useState(0);
	const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };
	const router = useRouter()

  const handleIssueDetailClick = (issue) => {
		setSelectedIssue(issue);
		setIsModalOpen(true)
  };

	const calculateLeftPosition = (dateString) =>
	{
    const startDate = new Date("2024-01-01");
		const date = new Date(dateString);
		const daysDifference = (date - startDate) / (1000 * 60 * 60 * 24);

		return `${(daysDifference * 32)- scrollPosition}px`;
  };

  const calculateWidth = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
		const daysDifference = (end - start) / (1000 * 60 * 60 * 24);

    return `${((daysDifference + 1)* 32)}px`;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current) {
        setScrollPosition(timelineRef.current.scrollLeft);
      }
    };

    if (timelineRef.current) {
      timelineRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (timelineRef.current) {
        timelineRef.current.removeEventListener("scroll", handleScroll);
      }
    };
	}, []);

	useEffect(() =>
	{
		const fetchFirstIssue = async () =>
		{
			if (backendIssuesIds.length > 0)
			{
				const firstIssueId = backendIssuesIds[backendIssuesIds.length - 1];
				console.log(firstIssueId)
        const firstIssueRes = await fetch(`${backendUrl}/v1/company/tracker/${firstIssueId}`);
        if (firstIssueRes.ok) {
					const firstIssueData = await firstIssueRes.json();
					console.log(firstIssueData)
					setFirstIssue(firstIssueData.data)
          console.log("Fetched first issue:", firstIssueData);
        } else {
          console.error("Failed to fetch first issue");
        }
      }
    };

    fetchFirstIssue();
	}, [backendIssuesIds.length]);

	console.log(JSON.stringify(firstIssue))

	return (
		<div className={`flex mt-96 max-w-[70%] overflow-hidden pl-24 ml-[20%]`}>
      <div className="flex-1 ml-4 mt-28 w-full">
        <h1 className="text-3xl mb-6">Tracker</h1>
        <div className="flex space-x-4 mb-4">
					<button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold border-b-2 hover:text-white py-2 px-4 focus:border-b-2 focus:border-b-blue-500 focus:outline-none">
						Releases
					</button>
					<button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold border-b-2 hover:text-white py-2 px-4 focus:border-b-2 focus:border-b-blue-500 focus:outline-none">
						Business requests
					</button>
					<div className="flex items-center w-60 max-w-md mx-auto bg-white rounded border-2 overflow-hidden">
						<CiSearch className="text-gray-500 ml-3" />
						<input
							type="text"
							placeholder="Search..."
							className="w-full px-4 py-2 text-gray-700 focus:outline-none"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
						/>
					</div>
					<button className="flex items-center bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-24">
						<FiFilter className="mr-2" /> {/* Adds some space between icon and text */}
						Filter
					</button>
        </div>
        <div
          ref={timelineRef}
          className="overflow-x-auto relative w-full h-24"
        >
          <div className="flex min-w-max mr-10">
            {monthsOfYear.map((month, monthIndex) => (
              <div key={monthIndex} className="flex flex-col items-center">
                <div className="text-center font-semibold">{month.name}</div>
                <div className="flex flex-wrap justify-start">
                    {Array.from({ length: month.days }, (_, dayIndex) => {
											const currentDay = new Date(today.getFullYear(), monthIndex, dayIndex + 1).toISOString().slice(0, 10);
											const isToday = currentDay === todayString;
											return (
												<div
													key={dayIndex}
													className={`w-8 h-8 flex items-center justify-center border ${
														isToday ? "bg-red-500 text-white" : ""
													}`}
												>
													{dayIndex + 1}
												</div>
											);
										})}
                </div>
              </div>
            ))}
          </div>
				</div>
				<div className="relative w-full h-48 mt-8">
					<div className="flex items-center -ml-28 border-b-2 cursor-pointer">
						{/* {[...backendIssuesIds].sort((a, b) => b - a).map((id, index) => (
							<li key={index} className="flex items-center py-2 border-b">
								<FaChevronDown className="mr-2"/>
								{`Release v${id}`}
							</li>
						))} */}
						 {backendIssuesIds.length > 0 && (
							<li className="flex items-center py-2 border-b">
								<FaChevronDown className="mr-2" />
								{`Release v${backendIssuesIds[backendIssuesIds.length - 1]}`}
							</li>
						)}
					</div>
					{/* real data */}

					{/* mockdata */}
          {issues?.map((issue, index) => (
						<div key={issue.name} className="relative group">
              <div
                className="absolute bg-black"
                style={{
                  left: 0,
                  top: `${index * 30}px`,
                }}
              >
                <div className="-ml-28 h-5 pb-7 text-xs text-black border-b-2">{issue.name}</div>
              </div>

              <div
                className="absolute flex items-center cursor-pointer"
                style={{
									left: calculateLeftPosition(issue.start),
                  width: calculateWidth(issue.start, issue.finish),
                  top: `${index * 30}px`,
                  height: "20px",
                  backgroundColor: "rgba(79, 70, 229, 0.6)",
                  color: "black",
                }}
                onClick={() => handleIssueDetailClick(issue)}
							>
								{/* dots */}
								<div
									className="absolute text-xs -ml-1"
									style={{
										top: "50%",
										transform: "translateY(-50%)",
										width: "12px",
										height: "12px",
										backgroundColor: "grey",
										borderRadius: "50%",
									}}
								>
									{issue.start.slice(5)}
								</div>
								{/* <div
									className="absolute text-xs"
									style={{
										left: `${parseInt(calculateLeftPosition(issue.update)) - parseInt(calculateLeftPosition(issue.start))}px`,
										top: "50%",
										transform: "translateY(-50%)",
										width: "12px",
										height: "12px",
										backgroundColor: "red",
										borderRadius: "50%",
									}}
								>
									{issue.update.slice(5)}
								</div> */}
								<div
									className="absolute text-xs"
									style={{
										left: `${parseInt(calculateLeftPosition(issue.finish)) - parseInt(calculateLeftPosition(issue.start)) + 24}px`,
										top: "50%",
										transform: "translateY(-50%)",
										width: "12px",
										height: "12px",
										backgroundColor: "green",
										borderRadius: "50%",
									}}
								>
									{issue.finish.slice(5)}
								</div>
              </div>
            </div>
					))}
				</div>
				<div className="flex items-center -ml-28 cursor-pointer">
					<ul className="flex flex-col mt-2">
						{[...backendIssuesIds]
							.sort((a, b) => b - a)
							.slice(1)
							.map((id, index) => (
								<li key={index} className="flex items-center py-2 mb-2">
									<FaChevronDown className="mr-2" />
									{`Release v${id}`}
								</li>
							))}
					</ul>
				</div>
			</div>
			 <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        issue={selectedIssue}
      />
    </div>
  );
};

export default Tracker;
