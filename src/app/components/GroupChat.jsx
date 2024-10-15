import { useState, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import { getMessages, sendMessage } from '../utils/pushProtocol';

export default function GroupChat({ groupId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Fetch messages for the group
    const fetchMessages = async () => {
      const groupMessages = await getMessages(groupId);
      setMessages(groupMessages);
    };
    fetchMessages();
  }, [groupId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      await sendMessage(groupId, newMessage);
      setNewMessage('');
      // Refetch messages or update state
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="space-y-4 h-96 overflow-y-auto mb-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow border rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-r-md"
        >
          Send
        </button>
      </form>
    </div>
  );
}