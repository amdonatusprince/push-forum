"use client"
import { useParams } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import EmojiPicker from 'emoji-picker-react';
import { FiSend, FiImage, FiSmile } from 'react-icons/fi';
import ReactEmoji from 'react-emoji-render';

export default function GroupChatPage() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        content: newMessage,
        sender: { name: 'You', avatar: 'https://via.placeholder.com/40' },
        timestamp: new Date().toISOString(),
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const message = {
          id: Date.now(),
          content: event.target.result,
          sender: { name: 'You', avatar: 'https://via.placeholder.com/40' },
          timestamp: new Date().toISOString(),
        };
        setMessages([...messages, message]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setNewMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  return (
    <div className="container mx-auto px-4 py-8 h-screen flex flex-col">
      <h1 className="text-3xl font-bold mb-6">Group Chat: {id}</h1>
      <div className="flex-grow bg-white rounded-lg shadow-md p-6 flex flex-col">
        <div className="flex-grow overflow-y-auto mb-4" ref={chatContainerRef}>
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="mt-4">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="text-blue-500 hover:text-blue-600"
            >
              <FiImage size={24} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*,image/gif"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="text-yellow-500 hover:text-yellow-600"
            >
              <FiSmile size={24} />
            </button>
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
              <FiSend size={20} />
            </button>
          </div>
        </form>
        {showEmojiPicker && (
          <div className="absolute bottom-20 right-8">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>
    </div>
  );
}


function ChatMessage({ message }) {
  const isImage = message.content.startsWith('data:image') || message.content.match(/\.(jpeg|jpg|gif|png)$/) != null;
  const isGif = message.content.match(/\.gif$/) != null;

  return (
    <div className="flex items-start space-x-3 mb-4 animate-fade-in">
      <div className="flex-shrink-0">
        <Image
          className="h-10 w-10 rounded-full border-2 border-indigo-500"
          src={message.sender.avatar}
          alt={message.sender.name}
          width={40}
          height={40}
        />
      </div>
      <div className="flex-1">
        <div className="bg-gray-100 rounded-lg shadow-sm p-3">
          <p className="text-sm font-medium text-indigo-600">{message.sender.name}</p>
          {isImage ? (
            <Image
              src={message.content}
              alt="Shared image"
              width={300}
              height={200}
              className="mt-2 rounded-lg"
            />
          ) : isGif ? (
            <img src={message.content} alt="Shared GIF" className="mt-2 rounded-lg" />
          ) : (
            <p className="mt-1 text-sm text-gray-700">
              <ReactEmoji text={message.content} />
            </p>
          )}
        </div>
        <span className="text-xs text-gray-500 mt-1 block">
          {new Date(message.timestamp).toLocaleString()}
        </span>
      </div>
    </div>
  );
}
