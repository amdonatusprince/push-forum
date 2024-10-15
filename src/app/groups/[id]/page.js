"use client"
import { useParams, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import EmojiPicker from 'emoji-picker-react';
import { FiSend, FiImage, FiSmile, FiX } from 'react-icons/fi';
import ReactEmoji from 'react-emoji-render';

export default function GroupChatPage() {
  const { id } = useParams();
  const router = useRouter();
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
        sender: { name: 'You', avatar: `https://api.dicebear.com/9.x/micah/svg?seed=${"justholder"}.svg` },
        timestamp: new Date().toISOString(),
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleExitChat = () => {
    router.push('/');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const message = {
          id: Date.now(),
          content: event.target.result,
          sender: { name: 'You', avatar: `https://api.dicebear.com/9.x/micah/svg?seed=${"placeholder"}.svg` },
          timestamp: new Date().toISOString(),
        };
        setMessages([...messages, message]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setNewMessage((prevMessage) => prevMessage + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] p-4 bg-gradient-to-br from-[#E6ECF7] via-[#EDF0F7] to-[#F0EDF7]">
      <div className="flex-grow bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden">
        <div className="bg-gradient-to-r from-[#3779FD] via-[#C7D9F9] to-[#3779FD] text-white p-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Group Chat: {id}</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleExitChat}
              className="bg-white text-[#0F5EFE] px-3 py-1 rounded-full hover:bg-[#7DA8FB] hover:text-white transition-colors duration-300 flex items-center"
            >
              <FiX className="mr-1" /> Exit Chat
            </button>
          </div>
        </div>
        <div className="flex-grow overflow-y-auto p-6" ref={chatContainerRef}>
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="text-[#0F5EFE] hover:text-blue-700 transition-colors"
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
              className="text-[#0F5EFE] hover:text-blue-700 transition-colors"
            >
              <FiSmile size={24} />
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-[#0F5EFE] focus:border-transparent"
              placeholder="Type your message..."
            />
            <button
              type="submit"
              className="bg-[#0F5EFE] text-white px-6 py-2 rounded-r-full hover:bg-white hover:text-[#0F5EFE] border border-[#0F5EFE] transition duration-300 flex items-center"
            >
              <FiSend size={20} className="mr-2" />
              Send
            </button>
          </div>
        </form>
      </div>
      {showEmojiPicker && (
        <div className="absolute bottom-20 right-8">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
}

function ChatMessage({ message }) {
  const isImage = message.content.startsWith('data:image') || message.content.match(/\.(jpeg|jpg|gif|png)$/) != null;
  const isGif = message.content.match(/\.gif$/) != null;

  return (
    <div className="flex items-start space-x-4 mb-6 animate-fade-in">
      <div className="flex-shrink-0">
        <Image
          className="h-12 w-12 rounded-full border-2 border-[#0F5EFE]"
          src={message.sender.avatar}
          alt={message.sender.name}
          width={48}
          height={48}
        />
      </div>
      <div className="flex-1">
        <div className="bg-gray-100 rounded-2xl shadow-sm p-4">
          <p className="text-sm font-medium text-[#0F5EFE] mb-1">{message.sender.name}</p>
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
            <p className="text-gray-800">
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
