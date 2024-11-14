const TimelineBar = ({ issue, calculateLeftPosition, calculateWidth, onClick }) => {
  const timelineBarStyle = {
    left: calculateLeftPosition(issue.start),
    width: calculateWidth(issue.start, issue.finish),
    top: "-5px",
    height: "10px",
    backgroundColor: issue.status.start === "unsuccessful" ? "rgba(255, 0, 0, 0.2)" : "#22c55e",
    color: "black",
  };

  const icon = issue.status.start === "unsuccessful" ? <IoIosWarning size={20} className="text-white mb-0.5" /> : <FaCheck size={20} className="text-white mb-0.5" />;

  return (
    <div
      className="absolute flex items-center cursor-pointer"
      style={timelineBarStyle}
      onClick={() => onClick(issue)}
    >
      <div
        className="absolute text-xs -ml-1 bg-red-500"
        style={{ top: "50%", transform: "translateY(-50%)", width: "30px", height: "30px", borderRadius: "50%" }}
      >
        <div className="relative flex items-center justify-center bg-red-500 rounded-full w-full h-full">
          {icon}
        </div>
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
  );
};
