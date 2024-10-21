"use client";
import { useParams, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useAccount, useWalletClient } from 'wagmi';
import { PushAPI, CONSTANTS } from '@pushprotocol/restapi';
import EmojiPicker from 'emoji-picker-react';
import { FiSend, FiSmile, FiX } from 'react-icons/fi';
import { Toaster, toast } from 'react-hot-toast';
import { getPushUserFromStorage } from '../../../../utils/pushUtils';

export default function GroupChatPage() {
  const { id } = useParams();
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { data: signer } = useWalletClient();
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const chatContainerRef = useRef(null);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (!isConnected) {
      router.push('/');
      return;
    }

    const fetchGroupInfo = async () => {
      try {
        const user = await getPushUserFromStorage();
        if (!user) {
          toast.error("Push user not found. Please go back to the home page and reconnect.");
          router.push('/');
          return;
        }

        const groupInfo = await user.chat.group.info(id);
        setName(groupInfo.groupName);
        
        const fetchedMessages = await user.chat.history(id);
        setMessages(fetchedMessages.reverse());
      } catch (error) {
        console.error("Error fetching group info:", error);
        toast.error("Failed to load group information. Please try again.");
      } finally {
        setIsLoadingMessages(false);
      }
    };

    fetchGroupInfo();
  }, [id, isConnected, router]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() && signer) {
      setIsSending(true);
      try {
        // Reinitialize PushAPI with signer for write operations
        const user = await PushAPI.initialize(signer, { env: CONSTANTS.ENV.STAGING });

        await user.chat.send(id, {
          type: 'Text',
          content: newMessage,
        });

        setMessages(prevMessages => [...prevMessages, {
          fromDID: address,
          messageContent: newMessage,
          timestamp: new Date().toISOString()
        }]);
        setNewMessage('');
      } catch (error) {
        console.error("Error sending message:", error);
        toast.error("Failed to send message. Please try again.");
      } finally {
        setIsSending(false);
      }
    }
  };

  const handleExitChat = () => {
    router.push('/');
  };

  const handleEmojiClick = (emojiObject) => {
    setNewMessage((prevMessage) => prevMessage + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  if (!isConnected) {
    return null;
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] p-4 bg-gradient-to-br from-[#E6ECF7] via-[#EDF0F7] to-[#F0EDF7]">
      <Toaster position="top-right" />
      <div className="flex-grow bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden">
        <div className="bg-gradient-to-r from-[#3779FD] via-[#C7D9F9] to-[#3779FD] text-white p-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">{name}</h1>
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
          {isLoadingMessages ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mb-4"></div>
              <p className="text-xl font-semibold text-gray-700">Loading Group Messages...</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <ChatMessage key={index} message={message} currentUserAddress={address} />
            ))
          )}
        </div>
        <form onSubmit={handleSendMessage} className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="text-[#0F5EFE] hover:text-blue-700 transition-colors"
              disabled={isSending}
            >
              <FiSmile size={24} />
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-[#0F5EFE] focus:border-transparent"
              placeholder="Type your message..."
              disabled={isSending}
            />
            <button
              type="submit"
              className="bg-[#0F5EFE] text-white px-6 py-2 rounded-r-full hover:bg-white hover:text-[#0F5EFE] border border-[#0F5EFE] transition duration-300 flex items-center group"
              disabled={isSending}
            >
              {isSending ? (
                <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin group-hover:border-[#0F5EFE]"></div>
              ) : (
                <>
                  <FiSend size={20} className="mr-2" />
                  Send
                </>
              )}
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

function ChatMessage({ message, currentUserAddress }) {
  const isCurrentUser = currentUserAddress && message.fromDID && 
    message.fromDID.slice(-4) === currentUserAddress.slice(-4);
  const content = message.messageContent || '';

  // Function to render message content with clickable links
  const renderContent = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    
    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  const renderMessage = () => (
    <div className={`flex items-start space-x-4 mb-6 animate-fade-in ${isCurrentUser ? 'justify-end' : ''}`}>
      {!isCurrentUser && (
        <div className="flex-shrink-0">
          <Image
            className="h-12 w-12 rounded-full border-2 border-[#0F5EFE]"
            src={`https://api.dicebear.com/9.x/micah/svg?seed=${message.fromDID || 'default'}.svg`}
            alt="User Avatar"
            width={48}
            height={48}
          />
        </div>
      )}
      <div className={`flex-1 ${isCurrentUser ? 'text-right' : ''}`}>
        <div className={`inline-block rounded-2xl shadow-sm p-4 ${
          isCurrentUser ? 'bg-[#E3F2FD] text-[#0F5EFE]' : 'bg-gray-100 text-gray-800'
        }`}>
          <p className={`text-sm font-medium mb-1 ${
            isCurrentUser ? 'text-[#0F5EFE]' : 'text-gray-600'
          }`}>
            {isCurrentUser ? 'You' : `User ${message.fromDID ? `${message.fromDID.slice(0, 6)}...${message.fromDID.slice(-4)}` : 'Unknown'}`}
          </p>
          <p>
            {renderContent(content)}
          </p>
        </div>
        <span className="text-xs text-gray-500 mt-1 block">
          {message.timestamp ? new Date(message.timestamp).toLocaleString() : 'Unknown time'}
        </span>
      </div>
      {isCurrentUser && (
        <div className="flex-shrink-0">
          <Image
            className="h-12 w-12 rounded-full border-2 border-[#0F5EFE]"
            src={`https://api.dicebear.com/9.x/micah/svg?seed=${message.fromDID || 'default'}.svg`}
            alt="Your Avatar"
            width={48}
            height={48}
          />
        </div>
      )}
    </div>
  );

  return message ? renderMessage() : null;
}
