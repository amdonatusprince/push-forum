"use client"
import { useParams } from 'next/navigation';
import GroupChat from '@/components/GroupChat';
import ChatMessage from '@/components/ChatMessage';
import { useState } from 'react';

export default function GroupChatPage() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, { id: Date.now(), text: newMessage, sender: 'You' }]);
      setNewMessage('');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Group Chat: {id}</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        {isLoadingMessages ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mb-4"></div>
            <p className="text-xl font-semibold text-gray-700">Loading Group Messages...</p>
          </div>
        ) : isConnected ? (
          messages.map((message, index) => (
            <ChatMessage key={index} message={message} currentUserAddress={address} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-xl font-semibold text-gray-700">Please connect your wallet to view messages.</p>
          </div>
        )}
        <form onSubmit={handleSendMessage} className="mt-4">
          <div className="flex">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Type your message..."
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700 transition duration-300"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
