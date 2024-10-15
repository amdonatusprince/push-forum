import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import EmojiPicker from 'emoji-picker-react';
import { FiSend, FiImage, FiSmile } from 'react-icons/fi';

export default function GroupChat({ groupId, messages, sendMessage }) {
  const [input, setInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        sendMessage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setInput((prevInput) => prevInput + emojiObject.emoji);
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 rounded-lg shadow-lg">
      <div className="flex-1 overflow-y-auto p-4" ref={chatContainerRef}>
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-4 border-t border-gray-200">
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
            accept="image/*"
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
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-colors"
          >
            <FiSend size={20} />
          </button>
        </div>
        {showEmojiPicker && (
          <div className="absolute bottom-16 right-4">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </form>
    </div>
  );
}
