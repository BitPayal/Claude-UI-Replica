import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ClaudeSidebar from "./components/ClaudeSidebar";
import ClaudeInputArea from "./components/ClaudeInputArea";
import ChatHistory from "./components/chatHistory";

function App() {
  return (
    <>
    <div className="flex h-screen bg-black text-white font-sans relative">
      {/* Sidebar with spring animation */}
      <ClaudeSidebar/>
      {/* Main Chat Area */}
      <Switch>
        <Route exact path="/" component={ClaudeInputArea} />
        <Route exact path="/chats" component={ChatHistory} />
      </Switch>
      </div>
    </>
  );
}

export default App;
