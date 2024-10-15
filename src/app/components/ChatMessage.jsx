import React from 'react';

export default function ChatMessage({ message }) {
  return (
    <div className="flex items-start space-x-3">
      <div className="flex-shrink-0">
        <img
          className="h-10 w-10 rounded-full"
          src={message.sender.avatar || 'https://via.placeholder.com/40'}
          alt={message.sender.name}
        />
      </div>
      <div className="flex-1 bg-gray-100 rounded-lg p-3">
        <p className="text-sm font-medium text-gray-900">{message.sender.name}</p>
        <p className="mt-1 text-sm text-gray-700">{message.content}</p>
      </div>
      <span className="text-xs text-gray-500 self-end">
        {new Date(message.timestamp).toLocaleTimeString()}
      </span>
    </div>
  );
}