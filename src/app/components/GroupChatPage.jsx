"use client"
import { useParams } from 'next/navigation';
import GroupChat from '@/components/GroupChat';
import ChatMessage from '@/components/ChatMessage';
import { useState } from 'react';

export default function GroupChatPage() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

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
        <GroupChat messages={messages} />
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