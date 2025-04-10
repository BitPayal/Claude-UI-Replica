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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ClaudeInputArea = () => {
  const [inputValue, setInputValue] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isStyleMenuOpen, setIsStyleMenuOpen] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState("Normal");
  const fileInputRef = useRef(null);
  const styleMenuRef = useRef(null);
  const menuRef = useRef(null);

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

  const StyleIcon = () => <Leaf className="w-5 h-5 text-gray-400" />;

  // Animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  const scaleVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
  };

  return (
    <div className="flex flex-col flex-1 mx-auto w-full">
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
          What's new, Shashant?
        </h2>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="relative w-full max-w-2xl rounded-lg border border-gray-700 bg-[#2b2b2b]">
        <textarea
          className="w-full bg-transparent p-4 text-gray-200 resize-none outline-none min-h-[24px]"
          placeholder="Message Claude..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
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

              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    ref={menuRef}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={scaleVariants}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute left-0 top-full mt-2 z-50 w-64 rounded-lg bg-gray-900 border border-gray-700 p-2 origin-top-left shadow-lg"
                  >
                    <div className="flex flex-col space-y-1">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleUploadClick}
                        className="flex items-center p-3 hover:bg-gray-800 text-gray-300 rounded-lg transition-colors duration-150"
                      >
                        <Paperclip className="w-6 h-6 mr-4" /> Upload a file
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center p-3 hover:bg-gray-800 text-gray-300 rounded-lg transition-colors duration-150"
                      >
                        <Camera className="w-6 h-6 mr-4" /> Take a screenshot
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center p-3 hover:bg-gray-800 text-gray-300 rounded-lg transition-colors duration-150"
                      >
                        <Github className="w-6 h-6 mr-4" /> Add from GitHub
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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

              <AnimatePresence>
                {isStyleMenuOpen && (
                  <motion.div
                    ref={styleMenuRef}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={dropdownVariants}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute left-0 top-full mt-2 w-64 rounded-lg bg-gray-900 border border-gray-700 p-2 z-50 shadow-lg"
                  >
                    {["Normal", "Concise", "Explanatory", "Formal"].map(
                      (style) => (
                        <motion.button
                          key={style}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
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
                        </motion.button>
                      )
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-md bg-[#8a4a36] hover:bg-[#a04e3e] text-white transition-colors duration-200"
            disabled={!inputValue.trim()}
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default ClaudeInputArea;