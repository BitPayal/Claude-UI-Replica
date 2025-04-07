import React, { useState } from 'react';
import { BookOpen, Plus, ChevronDown, ChevronUp } from 'lucide-react';

const ClaudeSidebar = () => {
  const [isRecentsExpanded, setIsRecentsExpanded] = useState(true);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white w-72">
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

      {/* Profile Section (at bottom) */}
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
  );
};

export default ClaudeSidebar;