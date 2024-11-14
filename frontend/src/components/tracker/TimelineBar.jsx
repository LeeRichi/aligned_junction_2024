// import { useRef } from "react";

// import { FiFilter } from "react-icons/fi";
// import { CiSearch } from "react-icons/ci";
// import { FaChevronDown } from "react-icons/fa";
// import { IoIosWarning } from "react-icons/io";
// import { FaCheck } from "react-icons/fa6";
// import TimelineBar from "./TimelineBar"


// function TimelineComponent({ issues, monthsOfYear, calculateLeftPosition, calculateWidth, handleIssueDetailClick, toggleIssuesVisibility, areIssuesVisible }) {
//   const timelineRef = useRef(null);

//   // Enable drag scrolling for the timeline bar
//   const handleDrag = (event) => {
//     let isDragging = false;
//     let startX;
//     let scrollLeft;

//     const onMouseDown = (e) => {
//       isDragging = true;
//       startX = e.pageX - timelineRef.current.offsetLeft;
//       scrollLeft = timelineRef.current.scrollLeft;
//       e.preventDefault();
//     };

//     const onMouseMove = (e) => {
//       if (!isDragging) return;
//       e.preventDefault();
//       const x = e.pageX - timelineRef.current.offsetLeft;
//       const walk = (x - startX) * 1.5; // Adjust scrolling speed
//       timelineRef.current.scrollLeft = scrollLeft - walk;
//     };

//     const onMouseUp = () => {
//       isDragging = false;
//     };

//     return { onMouseDown, onMouseMove, onMouseUp };
//   };

//   const { onMouseDown, onMouseMove, onMouseUp } = handleDrag();

//   return (
//     <div className="relative w-full h-auto mt-8 border-2 rounded-md overflow-hidden">
//       <div
//         className="flex items-center cursor-pointer p-2"
//         onClick={toggleIssuesVisibility}
//       >
//         {/* {backendIssuesIds.length > 0 && (
//           <li className="flex items-center py-2">
//             <FaChevronDown className="mr-2" />
//             {`Release v${backendIssuesIds[backendIssuesIds.length - 1]}`}
//           </li>
//         )} */}
//       </div>
//       {areIssuesVisible && (
//         <div>
//           {issues?.map((issue, index) => (
//             <div key={issue.name} className="relative flex items-center group border-b-2 bg-blue-50 rounded-sm">
//               {/* Name Block */}
//               <div
//                 className="w-3/12 h-10 text-sm text-black flex items-center justify-center z-10 bg-blue-50 border-r-2"
//                 style={{
//                   top: `${index * 30}px`,
//                 }}
//               >
//                 {issue.name}
//               </div>
//               {/* Timeline Bar */}
//               <div
//                 ref={timelineRef}
//                 className="relative flex-1 overflow-x-auto"
//                 onMouseDown={onMouseDown}
//                 onMouseMove={onMouseMove}
//                 onMouseUp={onMouseUp}
//                 onMouseLeave={() => (isDragging = false)}
//               >
//                 <div
//                   className="absolute flex items-center cursor-pointer"
//                   style={{
//                     left: calculateLeftPosition(issue.start),
//                     width: calculateWidth(issue.start, issue.finish),
//                     top: `-5px`,
//                     height: "10px",
//                     backgroundColor: issue.status.finish === "unsuccessful" ? "rgba(255, 0, 0, 0.2)" : "#22c55e",
//                     color: "black",
//                   }}
//                   onClick={() => handleIssueDetailClick(issue)}
//                 >
//                   {/* Dots on the Timeline Bar */}
//                   <div
//                     className="absolute text-xs -ml-1 bg-red-500"
//                     style={{
//                       top: "50%",
//                       transform: "translateY(-50%)",
//                       width: "30px",
//                       height: "30px",
//                       borderRadius: "50%",
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                     }}
//                   >
//                     <div
//                       className={`relative flex items-center justify-center ${
//                         issue.status.start === "unsuccessful" ? "bg-red-500" : "bg-green-500"
//                       } rounded-full w-full h-full`}
//                     >
//                       {issue.status.start === "unsuccessful" ? (
//                         <IoIosWarning size={20} className="text-white mb-0.5" />
//                       ) : (
//                         <FaCheck size={20} className="text-white mb-0.5" />
//                       )}
//                       <span
//                         className="absolute left-full ml-2 p-1 bg-black text-white text-xs rounded opacity-0 transition-opacity duration-200"
//                         style={{
//                           top: "50%",
//                           transform: "translateY(-50%)",
//                         }}
//                       >
//                         {issue.start.slice(5)}
//                         <p>Unsuccessful</p>
//                       </span>
//                     </div>
//                   </div>
//                   {/* Add additional dots here for 'update' and 'finish' with similar styling */}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default TimelineComponent;
