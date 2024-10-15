"use client"
import Link from "next/link";
import { useState } from "react";
import CreateGroupModal from "./CreateGroupModal";

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateGroup = async (groupData) => {
    console.log("Creating group:", groupData);
    // Add logic to create the group
    setIsModalOpen(false);
  };

  return (
    <>
      <nav className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500">
                  TechFiesta
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-700 hover:text-indigo-600 transition duration-300">
                Explore
              </Link>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-4 py-2 rounded-md shadow-md transition duration-300 transform hover:scale-105"
              >
                Create Group
              </button>
            </div>
          </div>
        </div>
      </nav>
      {isModalOpen && (
        <CreateGroupModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreateGroup={handleCreateGroup}
        />
      )}
    </>
  );
}
