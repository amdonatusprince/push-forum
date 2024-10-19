"use client"
import Link from "next/link";
import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect, useWalletClient } from 'wagmi';
import { PushAPI, CONSTANTS } from '@pushprotocol/restapi';
import CreateGroupModal from "./CreateGroupModal";
import SuccessModal from "./SuccessModal";
import logo from "../../public/logo.svg";
import { FiLogOut, FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [createdGroupId, setCreatedGroupId] = useState("");
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: walletClient } = useWalletClient();
  const [pushUser, setPushUser] = useState(null);

  // useEffect(() => {
  //   const initializePushUser = async () => {
  //     if (isConnected && walletClient) {
  //       try {
  //         const user = await PushAPI.initialize(walletClient, { env: CONSTANTS.ENV.STAGING });
  //         setPushUser(user);
  //       } catch (error) {
  //         console.error("Error initializing Push user:", error);
  //       }
  //     }
  //   };

  //   initializePushUser();
  // }, [isConnected, walletClient]);

  // const handleCreateGroup = useCallback(async (groupData) => {
  //   if (!isConnected || !address || !pushUser) {
  //     console.error("Wallet not connected or Push user not initialized");
  //     return;
  //   }

  //   setIsCreatingGroup(true);
  //   try {
  //     console.log("Creating group:", groupData);
  //     const createdGroup = await pushUser.chat.group.create(groupData.name, {
  //       description: groupData.description,
  //       image: 'www.google.com',
  //       private: false,
  //     });
  //     console.log("Group created:", createdGroup);
  //     setCreatedGroupId(createdGroup.chatId);
  //     setIsModalOpen(false);
  //     setIsSuccessModalOpen(true);
  //   } catch (error) {
  //     console.error("Error creating group:", error);
  //   } finally {
  //     setIsCreatingGroup(false);
  //   }
  // }, [isConnected, address, pushUser]);

  const handleDisconnect = () => {
    disconnect();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
              {isConnected ? (
                <>
                  <div className="hidden md:flex items-center space-x-4">
                    {/* <button
                      onClick={() => setIsModalOpen(true)}
                      className="bg-[#0F5EFE] text-white px-4 py-2 rounded-md shadow-md transition duration-300 hover:bg-white hover:text-[#0F5EFE] hover:border-[#0F5EFE] hover:border-2"
                    >
                      Create Group
                    </button> */}
                    <button
                      onClick={handleDisconnect}
                      className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md transition duration-300 hover:bg-white hover:text-red-500 hover:border-red-500 hover:border-2 flex items-center"
                    >
                      <FiLogOut className="mr-2" /> Log Out
                    </button>
                  </div>
                  <div className="md:hidden">
                    <button
                      onClick={toggleMobileMenu}
                      className="text-[#0F5EFE] hover:text-[#0F5EFE] focus:outline-none"
                    >
                      {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                  </div>
                </>
              ) : (
                <ConnectButton />
              )}
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        {isConnected && isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {/* <button
                onClick={() => {
                  setIsModalOpen(true);
                  toggleMobileMenu();
                }}
                className="block w-full text-left bg-[#0F5EFE] text-white px-4 py-2 rounded-md shadow-md transition duration-300 hover:bg-white hover:text-[#0F5EFE] hover:border-[#0F5EFE] hover:border-2"
              >
                Create Group
              </button> */}
              <button
                onClick={() => {
                  handleDisconnect();
                  toggleMobileMenu();
                }}
                className="block w-full text-left bg-red-500 text-white px-4 py-2 rounded-md shadow-md transition duration-300 hover:bg-white hover:text-red-500 hover:border-red-500 hover:border-2 flex items-center"
              >
                <FiLogOut className="mr-2" /> Log Out
              </button>

            </div>
          </div>
        )}
      </nav>
      {isModalOpen && (
        <CreateGroupModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreateGroup={handleCreateGroup}
          isCreatingGroup={isCreatingGroup}
        />
      )}
      {isSuccessModalOpen && (
        <SuccessModal
          isOpen={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
          groupId={createdGroupId}
        />
      )}
    </>
  );
}
