"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { Toaster, toast } from 'react-hot-toast';
import { initializePushUser, getPushUserFromStorage } from '../../utils/pushUtils';

export default function Home() {
  const [groups, setGroups] = useState([]);
  const { address, isConnected } = useAccount();
  const [pushUser, setPushUser] = useState(null);
  const { data: signer } = useWalletClient();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initPush = async () => {
      if (isConnected && signer) {
        try {
          let user = await getPushUserFromStorage(signer);
          if (!user) {
            user = await initializePushUser(signer);
          }
          setPushUser(user);
        } catch (error) {
          console.error("Error initializing Push user:", error);
          toast.error("Failed to initialize Push user. Please try again.");
        }
      }
    };

    initPush();
  }, [isConnected, signer]);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      if (pushUser && address) {
        setIsLoading(true);
        const groupIds = [
          '8b19fd494805ab8ee211a9f62152c811fcd8ac44ec1832669d8d1787983f12ed',
          '4ec47f448d3b780b3547fbd5cff36e22eee32cb4f1fb8f1ef15bdbdbe23aa731'
        ];

        const staticIcons = ['💬', '💻'];

        const userAddressSuffix = address.slice(-5).toLowerCase();

        const groupDetails = await Promise.all(
          groupIds.map(async (chatId, index) => {
            try {
              const info = await pushUser.chat.group.info(chatId);
              const joined = info.members.some(member => 
                member.wallet.toLowerCase().endsWith(userAddressSuffix)
              );
              return {
                id: chatId,
                name: info.groupName,
                description: info.groupDescription,
                members: info.members,
                icon: staticIcons[index],
                joined: joined
              };
            } catch (error) {
              console.error(`Error fetching group info for ${chatId}:`, error);
              return null;
            }
          })
        );

        setGroups(groupDetails.filter(group => group !== null));
        setIsLoading(false);
      }
    };

    if (isConnected) {
      fetchGroupDetails();
    }
  }, [pushUser, address, isConnected]);

  const handleJoinGroup = async (groupId) => {
    if (!isConnected) {
      toast.error("Please connect your wallet to join a group.");
      return;
    }

    try {
      setIsLoading(true);
      await pushUser.chat.group.join(groupId);
      
      // Update the group's joined status
      setGroups(prevGroups => prevGroups.map(group => 
        group.id === groupId ? { ...group, joined: true } : group
      ));

      toast.success("Successfully joined the group!");
    } catch (error) {
      console.error("Error joining group:", error);
      
      if (error.message.includes("User has not been approved")) {
        toast.error("You haven't been approved to join this group chat. Please wait for approval.");
      } else if (error.message.includes("User already a part")) {
        setGroups(prevGroups => prevGroups.map(group => 
          group.id === groupId ? { ...group, joined: true } : group
        ));
        toast.success("You're already a member of this group. Redirecting to the group chat.");
      } else {
        toast.error("Failed to join group. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6ECF7] via-[#EDF0F7] to-[#F0EDF7] py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-8">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0F5EFE] to-[#0F5EFE]">
            Welcome Onboard!
          </span>
        </h1>
        <p className="text-xl text-center text-gray-700 max-w-2xl mx-auto mb-12">
          This is your place to network with other developers and tech enthusiasts, ask questions and get ready for an amazing learning experience. 
        </p>
        {!isConnected ? (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden p-8 text-center">
            <svg className="w-24 h-24 mx-auto mb-6 text-[#0F5EFE]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <p className="text-xl text-gray-600 mb-8">
              To join groups and start chatting, please connect your wallet using the button in the navigation bar.
            </p>
          </div>
        ) : isLoading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mb-4"></div>
            <p className="text-xl font-semibold text-gray-700">Loading Group Details...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {groups.map((group) => (
              <div key={group.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:scale-105">
                <div className="bg-gradient-to-r from-[#D8E3F0] via-[#C7D9F9] to-[#3779FD] p-4">
                  <span className="text-4xl">{group.icon}</span>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{group.name}</h2>
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                      {group.members.length}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                        <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                      </svg>
                      {group.id === '8b19fd494805ab8ee211a9f62152c811fcd8ac44ec1832669d8d1787983f12ed' ? '103' : '84'} messages
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{group.description}</p>
                  <div className="flex justify-center">
                    <Link 
                      href={`/groups/${group.id}`}
                      onClick={(e) => {
                        if (!group.joined) {
                          e.preventDefault();
                          handleJoinGroup(group.id);
                        }
                      }}
                      className={`w-full text-center py-2 rounded-md shadow-md transition duration-300 ${
                        group.joined
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : "bg-[#0F5EFE] text-white hover:bg-white hover:text-[#0F5EFE] hover:border-[#0F5EFE] hover:border-2"
                      }`}
                    >
                      {group.joined ? "View Group" : "Join Group"}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
