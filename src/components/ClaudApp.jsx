import React from 'react';
import ClaudeInputArea from './ClaudeInputArea';
import ClaudeSidebar from './ClaudeSidebar';

const ClaudeApp = () => {
  return (
    <div className="flex h-screen bg-black text-white font-sans relative">
      {/* Sidebar with spring animation */}
      <ClaudeSidebar/>
      {/* Main Chat Area */}
      <ClaudeInputArea />
    </div>
  );
};

export default ClaudeApp;