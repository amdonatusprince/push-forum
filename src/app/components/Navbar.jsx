"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import CreateGroupModal from "./CreateGroupModal";
import logo from "../../public/logo.svg";

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
                <div className="w-[25.53px] h-[25.53px] mr-1">
                  <Image
                    width={26}
                    height={26}
                    src={logo}
                    alt="TechFiesta Logo"
                  />
                </div>
                <span className="text-[22.67px] sm:text-[18.35px] lg:text-[25.53px] text-black">
                  tech
                  <span className="inline bg-gradient-to-r from-[#0F5EFE] to-[#0F5EFE] text-transparent bg-clip-text font-bold">
                    Fiesta
                  </span>
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#0F5EFE] text-white px-4 py-2 rounded-md shadow-md transition duration-300 hover:bg-white hover:text-[#0F5EFE] hover:border-[#0F5EFE] hover:border-2"
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
