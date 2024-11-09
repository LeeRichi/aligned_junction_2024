"use client";

import React from "react";

const TrackerSidebar = ({ issues }) => {
  return (
    <div className="mt-20 w-1">
      <h2 className="text-2xl mb-4">Issues</h2>
      {issues && issues.length > 0 ? (
        <div>
          {issues.map((issue, index) => (
            <div key={index}>
              <p className="">{issue.title}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No issues available.</p>
      )}
    </div>
  );
};

export default TrackerSidebar;
