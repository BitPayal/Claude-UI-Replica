import React, { useState } from 'react';
import { BookOpen, Plus, ChevronDown, Send, Paperclip } from 'lucide-react';
import ClaudeInputArea from './ClaudeInputArea';

const ClaudeApp = () => {
  const [message, setMessage] = useState('');
  
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <div className="flex flex-col w-72 bg-gray-900 border-r border-gray-800">
        {/* Header */}
        <div className="flex items-center p-4 border-b border-gray-800">
          <BookOpen className="w-5 h-5 mr-2" />
          <h1 className="text-xl font-medium">Claude</h1>
        </div>

        {/* New Chat Button */}
        <button className="flex items-center mx-4 my-3 px-3 py-2 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          <span>New chat</span>
        </button>

        {/* Navigation */}
        <div className="px-4 py-2">
          <button className="flex items-center w-full px-3 py-2 rounded-md hover:bg-gray-800 transition-colors">
            <span>Chats</span>
          </button>
        </div>

        {/* Recents Section */}
        <div className="px-4 mt-4">
          <div className="text-sm text-gray-400">Recents</div>
          <div className="mt-2">
            <button className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-gray-800 transition-colors">
              <span>Fetch Stock Data from Yahoo Finance...</span>
            </button>
          </div>
        </div>

        {/* Profile Section */}
        <div className="mt-auto border-t border-gray-800">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-700 text-white">
                <span>SK</span>
              </div>
              <div className="ml-3">
                <div className="font-medium">Shashant Kumar</div>
                <div className="text-xs text-gray-400">Free plan</div>
              </div>
            </div>
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-col flex-1">
        {/* Plan Information */}
        <div className="flex justify-end p-4">
          <div className="flex items-center text-sm">
            <span className="text-gray-400">Free plan</span>
            <span className="mx-2 text-gray-600">·</span>
            <a href="#" className="text-blue-400 hover:underline">Upgrade</a>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="text-amber-300 text-3xl mb-4">✧</div>
          <h2 className="text-3xl text-gray-300 mb-6">Shashant returns!</h2>
          
          {/* Model Dropdown */}
          <div className="absolute bottom-28 right-6 flex items-center bg-gray-800 rounded-md px-3 py-1.5">
            <span className="text-sm mr-2">Claude 3.7 Sonnet</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        {/* Input Area */}
        {/* <div className="p-4 relative">
          <div className="relative rounded-lg border border-gray-700 bg-gray-800">
            <textarea 
              className="w-full bg-transparent p-4 pr-10 outline-none resize-none text-gray-200"
              placeholder="How can I help you today?"
              rows="1"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="absolute bottom-3 right-3 flex items-center">
              <button className="text-gray-400 hover:text-gray-300 mr-2">
                <Paperclip className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-gray-300">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div> */}
        <ClaudeInputArea />
      </div>
    </div>
  );
};

export default ClaudeApp;