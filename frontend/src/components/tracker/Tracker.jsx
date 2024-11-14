"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Modal from "../../components/Modal"
import { FiFilter } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import Requests from "../requests/Requests";

const Tracker = ({ isOpen, issues }) =>
{
	const [backendIssuesIds, setBackendIssuesIds] = useState([])
	const [firstIssue, setFirstIssue] = useState({})
	const [releaseDetails, setReleaseDetails] = useState(null); // State to hold the release details
	const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

	const today = new Date();
	const todayString = today.toISOString().slice(0, 10);

	const timelineRef = useRef(null);
	const [scrollPosition, setScrollPosition] = useState(0);
	const [query, setQuery] = useState("");
	const [selectedIssue, setSelectedIssue] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [areIssuesVisible, setAreIssuesVisible] = useState(true);

	const [requestsOpen, setRequestsOpen] = useState(false)

	// Toggle the visibility of the issues
	const toggleIssuesVisibility = () =>
	{
		setAreIssuesVisible(!areIssuesVisible);
	};

	const startDate = new Date("2024-01-01");
	const pixelsPerDay = 32; // The width you are using for each day

	// Calculate today’s position from the start date in pixels
	const todayPosition = Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) * pixelsPerDay;

	// Scroll the timeline to make today’s date appear in the middle
	useEffect(() =>
	{
		if (timelineRef.current)
		{
			const timelineWidth = timelineRef.current.scrollWidth;
			const viewportWidth = timelineRef.current.clientWidth;
			const initialScroll = todayPosition - viewportWidth / 2;

			// Set initial scroll position to center today's date
			timelineRef.current.scrollLeft = Math.max(0, initialScroll);
			setScrollPosition(Math.max(0, initialScroll));
		}
	}, [todayPosition]);

	useEffect(() =>
	{
		const fetchIssues = async () =>
		{
			try
			{
				const setOfIdsRes = await fetch(`${backendUrl}/v1/company/tracker`);
				console.log(setOfIdsRes)
				if (!setOfIdsRes.ok) throw new Error("Network response was not ok");
				const setOfIdsdata = await setOfIdsRes.json();
				console.log(setOfIdsdata.releases)
				setBackendIssuesIds(setOfIdsdata.releases);
			} catch (error)
			{
				console.error("Fetch error:", error);
			}
		};

		fetchIssues();
	}, []);

	const fetchReleaseDetails = async (id) =>
	{
		try
		{
			const res = await fetch(`${backendUrl}/v1/company/tracker${id}`);
			if (!res.ok) throw new Error("Network response was not ok");
			const data = await res.json();
			setReleaseDetails(data); // Store fetched details
			setIsModalOpen(true); // Open modal with release details
		} catch (error)
		{
			console.error("Fetch error:", error);
		}
	};

	const handleIssueClick = (id) =>
	{
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

	const handleSearch = () =>
	{
		if (onSearch)
		{
			onSearch(query);
		}
	};
	const router = useRouter()

	const handleIssueDetailClick = (issue) =>
	{
		setSelectedIssue(issue);
		setIsModalOpen(true)
	};

	const calculateLeftPosition = (dateString) =>
	{
		const startDate = new Date("2024-01-01");
		const date = new Date(dateString);
		const daysDifference = (date - startDate) / (1000 * 60 * 60 * 24);

		return `${(daysDifference * 32) - scrollPosition - 5}px`;
	};

	const calculateWidth = (startDate, endDate) =>
	{
		const start = new Date(startDate);
		const end = new Date(endDate);
		const daysDifference = (end - start) / (1000 * 60 * 60 * 24);

		return `${((daysDifference + 1) * 32) - 20}px`;
	};

	useEffect(() =>
	{
		const handleScroll = () =>
		{
			if (timelineRef.current)
			{
				setScrollPosition(timelineRef.current.scrollLeft);
			}
		};

		if (timelineRef.current)
		{
			timelineRef.current.addEventListener("scroll", handleScroll);
		}

		return () =>
		{
			if (timelineRef.current)
			{
				timelineRef.current.removeEventListener("scroll", handleScroll);
			}
		};
	}, []);

	// useEffect(() =>
	// {
	// 	const fetchFirstIssue = async () =>
	// 	{
	// 		if (backendIssuesIds.length > 0)
	// 		{
	// 			const firstIssueId = backendIssuesIds[backendIssuesIds.length - 1];
	// 			console.log(firstIssueId)
	//       const firstIssueRes = await fetch(`${backendUrl}/v1/company/tracker/${firstIssueId}`);
	//       if (firstIssueRes.ok) {
	// 				const firstIssueData = await firstIssueRes.json();
	// 				console.log(firstIssueData)
	// 				setFirstIssue(firstIssueData.data)
	//         console.log("Fetched first issue:", firstIssueData);
	//       } else {
	//         console.error("Failed to fetch first issue");
	//       }
	//     }
	//   };

	//   fetchFirstIssue();
	// }, [backendIssuesIds.length]);

	// console.log(JSON.stringify(firstIssue))

	return (
		<div className={`flex max-w-[100%] overflow-hidden`}>
			<div className="flex-1 w-full">
				<h1 className="text-3xl mb-6">Tracker</h1>
				<div className="flex justify-between space-x-4 mb-4">
					<div className="flex">
						<button className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold border-b-2 hover:text-white py-2 px-4 ${requestsOpen ? '' : 'border-b-blue-500'}`}
							onClick={() => setRequestsOpen((prev) => !prev)}
						>
							Releases
						</button>
						<button className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold border-b-2 hover:text-white py-2 px-4  ${requestsOpen ? 'border-b-blue-500' : ''}`}
							onClick={() => setRequestsOpen((prev) => !prev)}
						>
							Business requests
						</button>
					</div>
					<div className="flex gap-2 ml-auto">
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
						<button className="flex items-center bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded shadow w-24 border-2">
							<FiFilter className="mr-2" /> {/* Adds some space between icon and text */}
							Filter
						</button>
					</div>
				</div>
				{requestsOpen ?
					(
						<Requests />
					)
					:
					(
						<>
							<div className="flex">
								<div className="w-3/12 flex items-center justify-center">
									Timeline
								</div>
								<div
									ref={timelineRef}
									className="flex overflow-x-auto flex-grow relative w-full h-20 bg-blue-100 rounded-md shadow-md"
								>
									<div className="flex min-w-max mr-10">
										{/* time line */}
										{monthsOfYear.map((month, monthIndex) => (
											<div className="flex flex-col">
												<div className="font-semibold text-lg text-blue-700 border-l-2">{month.name}</div>
												<div className="flex flex-wrap justify-start text-center">
													{Array.from({ length: month.days }, (_, dayIndex) =>
													{
														const currentDay = new Date(today.getFullYear(), monthIndex, dayIndex + 1).toISOString().slice(0, 10);
														const isToday = currentDay === todayString;
														return (
															<div
																key={dayIndex}
																className={`w-8 h-8 flex items-center justify-center rounded-sm
																	${isToday ? "bg-blue-500 text-white" : ""}`}
															>
																{dayIndex}
															</div>
														);
													})}
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
							<div className="relative w-full h-auto mt-8 border-2 rounded-md overflow-hidden">
								<div className="flex items-center cursor-pointer p-2" onClick={toggleIssuesVisibility}>
									{[...backendIssuesIds].sort((a, b) => b - a).map((id, index) => (
										<li key={index} className="flex items-center py-2 border-b">
											<FaChevronDown className="mr-2" />
											{`Release v${id}`}
										</li>
									))}
									{backendIssuesIds.length > 0 ? (
										<li className="flex items-center py-2">
											<FaChevronDown className="mr-2" />
											{`Release v${backendIssuesIds[backendIssuesIds.length - 1]}`}
										</li>
									) :
										<li className="flex items-center py-2 font-bold">
											<FaChevronDown className="mr-2" />
											{`Mock data v3`}
										</li>
									}
								</div>
								{/* real data */}
								{areIssuesVisible && (
									<div>
										{issues?.map((issue, index) => (
											<div key={issue.name} className="relative flex items-center group border-b-2 bg-blue-50 rounded-sm">
												{/* Name Block */}
												<div
													className="w-3/12 h-10 text-sm text-black flex items-center justify-center z-10 bg-blue-50 border-r-2"
													style={{
														top: `${index * 30}px`,
													}}
												>
													{issue.name}
												</div>
												{/* Timeline Bar */}
												<div
													className="relative flex-1"
												>
													<div
														className="absolute flex items-center cursor-pointer"
														style={{
															left: calculateLeftPosition(issue.start),
															width: calculateWidth(issue.start, issue.finish),
															top: `-5px`,
															height: "10px",
															backgroundColor: issue.status.finish === "unsuccessful" ? "rgba(255, 0, 0, 0.2)" : "#22c55e",
															color: "black",
														}}
														onClick={() => handleIssueDetailClick(issue)}>
														{/* Dots on the Timeline Bar */}
														<div
															className="absolute text-xs -ml-1 bg-red-500"
															style={{
																top: "50%",
																transform: "translateY(-50%)",
																width: "30px",
																height: "30px",
																borderRadius: "50%",
																display: "flex",
																justifyContent: "center",
																alignItems: "center",
															}}>
															<div className={`relative flex items-center justify-center ${issue.status.start === 'unsuccessful' ? 'bg-red-500' : 'bg-green-500'} rounded-full w-full h-full`}>
																{issue.status.start === 'unsuccessful' ? <IoIosWarning size={20} className="text-white mb-0.5" /> : <FaCheck size={20} className="text-white mb-0.5" />}
																<span
																	className="absolute left-full ml-2 p-1 bg-black text-white text-xs rounded opacity-0 transition-opacity duration-200"
																	style={{
																		top: "50%",
																		transform: "translateY(-50%)",
																	}}
																>
																	{issue.start.slice(5)}
																	<p>Unsuccessful</p>
																</span>
															</div>
														</div>
														<style jsx>{`
															div > div:hover span {
																opacity: 1;
															}
														`}</style>
														<div
															className="absolute text-xs"
															style={{
																left: `${parseInt(calculateLeftPosition(issue.update)) - parseInt(calculateLeftPosition(issue.start))}px`,
																top: "50%",
																transform: "translateY(-50%)",
																width: "30px",
																height: "30px",
																backgroundColor: "green",
																borderRadius: "50%",
																display: "flex",
																justifyContent: "center",
																alignItems: "center",
															}}
														>
															<div className={`relative flex items-center justify-center ${issue.status.update === 'unsuccessful' ? 'bg-red-500' : 'bg-green-500'} rounded-full w-full h-full`}>
																{issue.status.update === 'unsuccessful' ? <IoIosWarning size={20} className="text-white mb-0.5" /> : <FaCheck size={20} className="text-white mb-0.5" />}
																<span
																	className="absolute left-full ml-2 p-1 bg-black text-white text-xs rounded opacity-0 transition-opacity duration-200"
																	style={{
																		top: "50%",
																		transform: "translateY(-50%)",
																	}}
																>
																	{issue.update.slice(5)}
																	<p>Successful</p>
																</span>
															</div>
														</div>
														<div
															className="absolute text-xs"
															style={{
																left: `${parseInt(calculateLeftPosition(issue.finish)) - parseInt(calculateLeftPosition(issue.start))}px`,
																top: "50%",
																transform: "translateY(-50%)",
																width: "30px",
																height: "30px",
																backgroundColor: "green",
																borderRadius: "50%",
															}}
														>
															<div className={`relative flex items-center justify-center ${issue.status.finish === 'unsuccessful' ? 'bg-red-500' : 'bg-green-500'} rounded-full w-full h-full`}>
																{issue.status.finish === 'unsuccessful' ? <IoIosWarning size={20} className="text-white mb-0.5" /> : <FaCheck size={20} className="text-white mb-0.5" />}
																<span
																	className="absolute left-full ml-2 p-1 bg-black text-white text-xs rounded opacity-0 transition-opacity duration-200"
																	style={{
																		top: "50%",
																		transform: "translateY(-50%)",
																	}}
																>
																	{issue.finish.slice(5)}
																	<p>{issue.status.finish}</p>
																</span>
															</div>
														</div>
													</div>
												</div>
											</div>
										))}
									</div>
								)}
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
						</>
					)}
			</div>
			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				issue={selectedIssue}
			/>
		</div>
	);
}

export default Tracker;
