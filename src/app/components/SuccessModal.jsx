"use client"
import { useState } from "react";

export default function SuccessModal({ isOpen, onClose, groupId }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(groupId);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4 sm:px-0">
      <div className="bg-white rounded-lg p-6 sm:p-8 w-full max-w-md">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-green-600">Group Created Successfully!</h2>
        <p className="mb-3 sm:mb-4 text-sm sm:text-base">Your new group has been created. Here&apos;s the group ID:</p>
        <div className="bg-gray-100 p-3 sm:p-4 rounded-md mb-4 sm:mb-6">
          <code className="text-xs sm:text-sm break-all block mb-3">{groupId}</code>
          <button
            onClick={handleCopyClick}
            className="w-full px-3 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
          >
            {isCopied ? "Copied!" : "Copy Group ID"}
          </button>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
