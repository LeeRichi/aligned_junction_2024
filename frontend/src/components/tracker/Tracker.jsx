"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Modal from "../../components/Modal"
const Tracker = ({isOpen, issues}) =>
{
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
	const router = useRouter()

  const handleIssueClick = (issue) => {
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

	return (
		<div className={`flex mt-auto max-w-full overflow-hidden pl-32 ${isOpen ? 'ml-72' : 'ml-48'}`}>
      <div className="flex-1 ml-4 mt-28 w-full">
        <h2 className="text-3xl">Tracker</h2>
        <div className="flex space-x-4">
          <button>Releases</button>
          <button>Business requests</button>
          <button className="ml-auto">Filter</button>
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
                  {Array.from({ length: month.days }, (_, dayIndex) => (
                    <div key={dayIndex} className="w-8 h-8 flex items-center justify-center border">
                      {dayIndex + 1}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
				</div>


        <div className="relative w-full h-48 mt-8 ">
					<div className="-ml-28 border-b-2">release v19</div>
          {issues.map((issue, index) => (
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
                onClick={() => handleIssueClick(issue)}
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
								<div
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
								</div>
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
