import React, { useState } from 'react';
import { BookOpen, Plus, ChevronDown, Send, Paperclip, Layout, MessageCircle, MoveLeft, MoveRight } from 'lucide-react';
import ClaudeInputArea from './ClaudeInputArea';

const ClaudeApp = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <div className={`flex flex-col transition-all duration-300 ${isSidebarOpen ? 'w-72' : 'w-16'} bg-gray-900 border-r border-gray-800`}>

        {/* Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-3 hover:bg-gray-800 transition-colors"
        >
          {/* Header */}
        <div className="flex items-center p-4 border-b border-gray-800">
          {isSidebarOpen? <MoveLeft className="w-5 h-5 mr-2" />: <MoveRight className="w-5 h-5" />}
          {isSidebarOpen && <h1 className="text-xl font-medium">Claude</h1>}
        </div>
        </button>

        

        {/* New Chat Button */}
        <button className="flex items-center mx-4 my-3 px-3 py-2 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors">
          <Plus className="w-5 h-5" />
          {isSidebarOpen && <span className="ml-2">New chat</span>}
        </button>

        {/* Navigation */}
        <div className="px-4 py-2">
          <button className="flex items-center w-full px-3 py-2 rounded-md hover:bg-gray-800 transition-colors">
            <MessageCircle className="w-5 h-5" />
            {isSidebarOpen && <span className="ml-2">Chats</span>}
          </button>
        </div>

        {/* Recents Section */}
        <div className="px-4 mt-4">
          {isSidebarOpen && <div className="text-sm text-gray-400">Recents</div>}
          <div className="mt-2">
            <button className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-gray-800 transition-colors">
              {isSidebarOpen ? (
                <span>Fetch Stock Data from Yahoo Finance...</span>
              ) : (
                <span className="truncate">FSDFYF...</span>
              )}
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
              {isSidebarOpen && (
                <div className="ml-3">
                  <div className="font-medium">Shashant Kumar</div>
                  <div className="text-xs text-gray-400">Free plan</div>
                </div>
              )}
            </div>
            {isSidebarOpen && <ChevronDown className="w-5 h-5 text-gray-400" />}
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
        <ClaudeInputArea />
      </div>
    </div>
  );
};

export default ClaudeApp;
