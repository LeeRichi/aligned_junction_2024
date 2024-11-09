import React from "react";

const Modal = ({ isOpen, onClose, issue }) => {
  if (!isOpen || !issue) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">{issue.name}</h2>
        <p><strong>Start Date:</strong> {issue.start}</p>
        <p><strong>Last Update:</strong> {issue.update}</p>
        <p><strong>Finish Date:</strong> {issue.finish}</p>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
