import React, { useState, useRef, useEffect } from "react";
import {
  Plus,
  X,
  Paperclip,
  Camera,
  Github,
  ArrowUp,
  Leaf,
  ChevronDown,
  Send,
  User
} from "lucide-react";

const ClaudeUI = () => {
  const [inputValue, setInputValue] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isStyleMenuOpen, setIsStyleMenuOpen] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState("Normal");
  const [conversation, setConversation] = useState([]);
  const [hasConversationStarted, setHasConversationStarted] = useState(false);
  
  const fileInputRef = useRef(null);
  const styleMenuRef = useRef(null);
  const menuRef = useRef(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-resize textarea as content grows
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "24px";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  // Scroll to bottom of conversation
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        styleMenuRef.current &&
        !styleMenuRef.current.contains(event.target) &&
        !event.target.closest(".style-toggle-btn")
      ) {
        setIsStyleMenuOpen(false);
      }

      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !event.target.closest(".menu-toggle-btn")
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) console.log("Selected file:", file.name);
  };

  const handleStyleChange = (style) => {
    setSelectedStyle(style);
    setIsStyleMenuOpen(false);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const newUserMessage = {
      role: "user",
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setConversation([...conversation, newUserMessage]);
    setInputValue("");
    setHasConversationStarted(true);
    
    // Simulate Claude's response (in a real app, this would be an API call)
    setTimeout(() => {
      let claudeResponse;
      
      // Simulate different responses based on input for demo purposes
      if (inputValue.toLowerCase().includes("meditation")) {
        claudeResponse = {
          role: "assistant",
          content: "Meditation offers numerous benefits for both mental and physical wellbeing:\n\n1. Reduced stress and anxiety through lowered cortisol levels\n2. Improved focus and concentration\n3. Better emotional regulation and resilience\n4. Enhanced self-awareness\n5. Better sleep quality\n6. Potential benefits for cardiovascular health\n\nEven brief daily meditation practices of 5-10 minutes can yield noticeable improvements in overall wellbeing. Would you like me to explain any specific benefit in more detail or suggest some beginner meditation techniques?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      } else {
        claudeResponse = {
          role: "assistant",
          content: "I'm happy to help with your question about \"" + inputValue + "\". What specifically would you like to know more about?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      }
      
      setConversation(prev => [...prev, claudeResponse]);
    }, 1000);
  };

  const resetConversation = () => {
    setConversation([]);
    setHasConversationStarted(false);
  };

  const StyleIcon = () => <Leaf className="w-5 h-5 text-gray-400" />;

  const renderWelcomeView = () => (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col items-center justify-start pt-40 px-4">
      <div className="text-sm flex items-center justify-center px-4 py-2 rounded-md bg-gray-800">
        Free plan <span className="mx-2 text-gray-600">·</span>
        <a href="#" className="text-blue-400 hover:underline">
          Upgrade
        </a>
      </div>

      <div className="flex items-center text-center my-10">
        <div className="text-3xl pr-2">✴️</div>
        <h2 className="text-4xl font-serif text-gray-100">
          Hi Rishabh, How are you?
        </h2>
      </div>

      <div className="relative w-full max-w-2xl rounded-lg border border-gray-700 bg-[#2b2b2b]">
        <textarea
          ref={textareaRef}
          className="w-full bg-transparent p-4 text-gray-200 resize-none outline-none min-h-[24px]"
          placeholder="How can I help you today?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />

        {/* Claude version dropdown */}
        <div className="absolute bottom-14 right-4 flex items-center bg-gray-800 rounded-md px-3 py-1.5 text-sm text-gray-300">
          Claude 3.7 Sonnet <ChevronDown className="ml-1 w-4 h-4" />
        </div>

        <div className="flex items-center justify-between p-2">
          <div className="flex items-center space-x-2">
            {/* Plus Button with Dropdown */}
            <div className="relative">
              <button
                className="menu-toggle-btn p-2 rounded-md text-gray-400 hover:text-gray-300 hover:bg-gray-700 transition-colors duration-200"
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
                  setIsStyleMenuOpen(false);
                }}
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Plus className="w-5 h-5" />
                )}
              </button>

              {isMenuOpen && (
                <div
                  ref={menuRef}
                  className="absolute left-0 top-full mt-2 z-50 w-64 rounded-lg bg-gray-900 border border-gray-700 p-2 origin-top-left shadow-lg transition-opacity duration-150"
                >
                  <div className="flex flex-col space-y-1">
                    <button
                      onClick={handleUploadClick}
                      className="flex items-center p-3 hover:bg-gray-800 text-gray-300 rounded-lg transition-colors duration-150"
                    >
                      <Paperclip className="w-6 h-6 mr-4" /> Upload a file
                    </button>
                    <button
                      className="flex items-center p-3 hover:bg-gray-800 text-gray-300 rounded-lg transition-colors duration-150"
                    >
                      <Camera className="w-6 h-6 mr-4" /> Take a screenshot
                    </button>
                    <button
                      className="flex items-center p-3 hover:bg-gray-800 text-gray-300 rounded-lg transition-colors duration-150"
                    >
                      <Github className="w-6 h-6 mr-4" /> Add from GitHub
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Style Button with Dropdown */}
            <div className="relative group">
              <button
                className={`style-toggle-btn p-2 rounded-md transition-colors duration-200 ${
                  isStyleMenuOpen
                    ? "bg-gray-700 text-gray-300"
                    : "text-gray-400 hover:text-gray-300 hover:bg-gray-700"
                }`}
                onClick={() => {
                  setIsStyleMenuOpen(!isStyleMenuOpen);
                  setIsMenuOpen(false);
                }}
              >
                <StyleIcon />
              </button>
              <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 text-sm text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                Style
              </span>

              {isStyleMenuOpen && (
                <div
                  ref={styleMenuRef}
                  className="absolute left-0 top-full mt-2 w-64 rounded-lg bg-gray-900 border border-gray-700 p-2 z-50 shadow-lg transition-opacity duration-150"
                >
                  {["Normal", "Concise", "Explanatory", "Formal"].map(
                    (style) => (
                      <button
                        key={style}
                        onClick={() => handleStyleChange(style)}
                        className={`flex items-center p-3 hover:bg-gray-800 rounded-lg w-full transition-colors duration-150 ${
                          selectedStyle === style
                            ? "text-blue-500"
                            : "text-gray-300"
                        }`}
                      >
                        <StyleIcon />{" "}
                        <span className="text-lg ml-4">{style}</span>
                        {selectedStyle === style && (
                          <svg
                            className="w-5 h-5 ml-auto"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          </div>

          <button
            className={`p-2 rounded-md ${
              inputValue.trim() 
                ? "bg-[#8a4a36] hover:bg-[#a04e3e] text-white" 
                : "bg-gray-700 text-gray-500 cursor-not-allowed"
            } transition-colors duration-200`}
            disabled={!inputValue.trim()}
            onClick={handleSendMessage}
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderConversationView = () => (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-800">
        <div className="text-sm flex items-center justify-center px-4 py-2 rounded-md bg-gray-800">
          Free plan <span className="mx-2 text-gray-600">·</span>
          <a href="#" className="text-blue-400 hover:underline">
            Upgrade
          </a>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={resetConversation}
            className="text-gray-400 hover:text-gray-300 text-sm"
          >
            New Chat
          </button>
          <div className="text-gray-400">Claude 3.7 Sonnet</div>
        </div>
      </div>

      {/* Conversation Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {conversation.map((message, index) => (
          <div
            key={index}
            className={`max-w-3xl mx-auto ${message.role === "user" ? "ml-auto" : "mr-auto"} opacity-100 transform translate-y-0 transition-all duration-300`}
          >
            <div className="flex items-start gap-4">
              {message.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-[#8a4a36] flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">✴️</span>
                </div>
              )}
              
              <div className={`flex-1 p-4 rounded-lg ${
                message.role === "user" ? "bg-gray-800" : "bg-[#2b2b2b]"
              }`}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-gray-300">
                    {message.role === "user" ? "You" : "Claude"}
                  </span>
                  <span className="text-xs text-gray-500">{message.timestamp}</span>
                </div>
                <div className="text-gray-200 whitespace-pre-wrap">
                  {message.content}
                </div>
              </div>

              {message.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-gray-300" />
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4">
        <div className="max-w-3xl mx-auto">
          <div className="relative w-full rounded-lg border border-gray-700 bg-[#2b2b2b]">
            <textarea
              ref={textareaRef}
              className="w-full bg-transparent p-4 text-gray-200 resize-none outline-none min-h-[24px] max-h-[200px] overflow-y-auto"
              placeholder="Message Claude..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />

            {/* Claude version dropdown */}
            <div className="absolute bottom-14 right-4 flex items-center bg-gray-800 rounded-md px-3 py-1.5 text-sm text-gray-300">
              Claude 3.7 Sonnet <ChevronDown className="ml-1 w-4 h-4" />
            </div>

            <div className="flex items-center justify-between p-2">
              <div className="flex items-center space-x-2">
                {/* Plus Button with Dropdown */}
                <div className="relative">
                  <button
                    className="menu-toggle-btn p-2 rounded-md text-gray-400 hover:text-gray-300 hover:bg-gray-700 transition-colors duration-200"
                    onClick={() => {
                      setIsMenuOpen(!isMenuOpen);
                      setIsStyleMenuOpen(false);
                    }}
                  >
                    {isMenuOpen ? (
                      <X className="w-5 h-5" />
                    ) : (
                      <Plus className="w-5 h-5" />
                    )}
                  </button>

                  {isMenuOpen && (
                    <div
                      ref={menuRef}
                      className="absolute left-0 bottom-full mb-2 z-50 w-64 rounded-lg bg-gray-900 border border-gray-700 p-2 origin-bottom-left shadow-lg transition-opacity duration-150"
                    >
                      <div className="flex flex-col space-y-1">
                        <button
                          onClick={handleUploadClick}
                          className="flex items-center p-3 hover:bg-gray-800 text-gray-300 rounded-lg transition-colors duration-150"
                        >
                          <Paperclip className="w-6 h-6 mr-4" /> Upload a file
                        </button>
                        <button
                          className="flex items-center p-3 hover:bg-gray-800 text-gray-300 rounded-lg transition-colors duration-150"
                        >
                          <Camera className="w-6 h-6 mr-4" /> Take a screenshot
                        </button>
                        <button
                          className="flex items-center p-3 hover:bg-gray-800 text-gray-300 rounded-lg transition-colors duration-150"
                        >
                          <Github className="w-6 h-6 mr-4" /> Add from GitHub
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Style Button with Dropdown */}
                <div className="relative group">
                  <button
                    className={`style-toggle-btn p-2 rounded-md transition-colors duration-200 ${
                      isStyleMenuOpen
                        ? "bg-gray-700 text-gray-300"
                        : "text-gray-400 hover:text-gray-300 hover:bg-gray-700"
                    }`}
                    onClick={() => {
                      setIsStyleMenuOpen(!isStyleMenuOpen);
                      setIsMenuOpen(false);
                    }}
                  >
                    <StyleIcon />
                  </button>
                  <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 text-sm text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    Style
                  </span>

                  {isStyleMenuOpen && (
                    <div
                      ref={styleMenuRef}
                      className="absolute left-0 bottom-full mb-2 w-64 rounded-lg bg-gray-900 border border-gray-700 p-2 z-50 shadow-lg transition-opacity duration-150"
                    >
                      {["Normal", "Concise", "Explanatory", "Formal"].map(
                        (style) => (
                          <button
                            key={style}
                            onClick={() => handleStyleChange(style)}
                            className={`flex items-center p-3 hover:bg-gray-800 rounded-lg w-full transition-colors duration-150 ${
                              selectedStyle === style
                                ? "text-blue-500"
                                : "text-gray-300"
                            }`}
                          >
                            <StyleIcon />{" "}
                            <span className="text-lg ml-4">{style}</span>
                            {selectedStyle === style && (
                              <svg
                                className="w-5 h-5 ml-auto"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>

              <button
                className={`p-2 rounded-md ${
                  inputValue.trim() 
                    ? "bg-[#8a4a36] hover:bg-[#a04e3e] text-white" 
                    : "bg-gray-700 text-gray-500 cursor-not-allowed"
                } transition-colors duration-200`}
                disabled={!inputValue.trim()}
                onClick={handleSendMessage}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col flex-1 mx-auto w-full">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
      
      {hasConversationStarted ? renderConversationView() : renderWelcomeView()}
    </div>
  );
};

export default ClaudeUI;