import React, { useState, useRef, useEffect } from 'react';
import { Plus, X, Paperclip, Camera, ArrowUp, Copy, ThumbsUp, ThumbsDown, RotateCcw } from 'lucide-react';
import { Github } from 'lucide-react';
import CustomStyleIcon from './Icon';

const ClaudeInputArea = () => {
  const [inputValue, setInputValue] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isStyleMenuOpen, setIsStyleMenuOpen] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState('Normal');
  const fileInputRef = useRef(null);
  const styleMenuRef = useRef(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
  };

  const handleStyleChange = (style) => {
    setSelectedStyle(style);
    setIsStyleMenuOpen(false);
  };

  // Close style menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (styleMenuRef.current && !styleMenuRef.current.contains(event.target)) {
        setIsStyleMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Style icon component
  const StyleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
      <path d="M7 21C4.79086 21 3 19.2091 3 17C3 14.7909 4.79086 13 7 13C9.20914 13 11 14.7909 11 17C11 19.2091 9.20914 21 7 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17 7C19.2091 7 21 5.20914 21 3C21 0.790863 19.2091 -1 17 -1C14.7909 -1 13 0.790863 13 3C13 5.20914 14.7909 7 17 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform="translate(0, 4)"/>
      <path d="M7 13V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17 11V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <div className="w-full bg-gray-900 p-4">
      {/* Action buttons at top */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-400">Reply</span>
        <div className="flex items-center space-x-4">
          <Copy className="w-5 h-5 text-gray-400 cursor-pointer" />
          <ThumbsUp className="w-5 h-5 text-gray-400 cursor-pointer" />
          <ThumbsDown className="w-5 h-5 text-gray-400 cursor-pointer" />
          <button className="text-gray-300 hover:text-gray-200">
            <span className="mr-1">Retry</span>
            <RotateCcw className="w-4 h-4 inline" />
          </button>
        </div>
      </div>
      
      {/* Warning text */}
      <div className="text-right mb-2 text-gray-400 text-sm mr-2">
        Claude can make mistakes. Please double-check responses.
      </div>

      {/* File input (hidden) */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      {/* Menu that appears when user clicks on plus button */}
      {isMenuOpen && (
        <div className="rounded-lg bg-gray-900 border border-gray-700 p-2 mb-2">
          <div className="flex flex-col">
            <button
              onClick={handleUploadClick}
              className="flex items-center p-3 text-gray-300 hover:bg-gray-800 rounded-lg"
            >
              <Paperclip className="w-6 h-6 mr-4" />
              <span className="text-lg">Upload a file</span>
            </button>
            <button className="flex items-center p-3 text-gray-300 hover:bg-gray-800 rounded-lg">
              <Camera className="w-6 h-6 mr-4" />
              <span className="text-lg">Take a screenshot</span>
            </button>
            <button className="flex items-center p-3 text-gray-300 hover:bg-gray-800 rounded-lg">
              <Github className="w-6 h-6 mr-4" />
              <span className="text-lg">Add from GitHub</span>
            </button>
          </div>
        </div>
      )}

      {/* Style selector dropdown */}
      {isStyleMenuOpen && (
        <div 
          ref={styleMenuRef}
          className="absolute left-24 bottom-20 z-10 rounded-lg bg-gray-900 border border-gray-700 p-2 w-64"
        >
          <div className="flex flex-col">
          
            <button 
              className={`flex items-center p-3 hover:bg-gray-800 rounded-lg ${selectedStyle === 'Normal' ? 'text-blue-500' : 'text-gray-300'}`}
              onClick={() => handleStyleChange('Normal')}
            >
              <StyleIcon />
              <span className="text-lg ml-4">Normal</span>
              {selectedStyle === 'Normal' && (
                <svg className="w-5 h-5 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            <button 
              className={`flex items-center p-3 hover:bg-gray-800 rounded-lg ${selectedStyle === 'Concise' ? 'text-blue-500' : 'text-gray-300'}`}
              onClick={() => handleStyleChange('Concise')}
            >
              <StyleIcon />
              <span className="text-lg ml-4">Concise</span>
              {selectedStyle === 'Concise' && (
                <svg className="w-5 h-5 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            <button 
              className={`flex items-center p-3 hover:bg-gray-800 rounded-lg ${selectedStyle === 'Explanatory' ? 'text-blue-500' : 'text-gray-300'}`}
              onClick={() => handleStyleChange('Explanatory')}
            >
              <StyleIcon />
              <span className="text-lg ml-4">Explanatory</span>
              {selectedStyle === 'Explanatory' && (
                <svg className="w-5 h-5 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            <button 
              className={`flex items-center p-3 hover:bg-gray-800 rounded-lg ${selectedStyle === 'Formal' ? 'text-blue-500' : 'text-gray-300'}`}
              onClick={() => handleStyleChange('Formal')}
            >
              <StyleIcon />
              <span className="text-lg ml-4">Formal</span>
              {selectedStyle === 'Formal' && (
                <svg className="w-5 h-5 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            <div className="border-t border-gray-700 my-2"></div>
            <button className="flex items-center p-3 text-gray-300 hover:bg-gray-800 rounded-lg">
              <Plus className="w-5 h-5 mr-4" />
              <span className="text-lg">Create & edit styles</span>
            </button>
          </div>
        </div>
      )}

      {/* Input area with buttons */}
      <div className="relative flex items-end rounded-lg border border-gray-700 bg-gray-800">
        <div className="flex-1">
          <textarea
            className="w-full bg-transparent p-4 outline-none resize-none text-gray-200 min-h-[24px]"
            placeholder="Message Claude..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            rows={1}
          />
        </div>

        {/* Control buttons */}
        <div className="flex items-center p-2">
          <button 
            className="p-2 rounded-md text-gray-400 hover:text-gray-300 hover:bg-gray-700"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              setIsStyleMenuOpen(false);
            }}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />} 
          </button>
          
          {/* Style selector button */}
          <button 
            className={`p-2 rounded-md hover:bg-gray-700 ${isStyleMenuOpen ? 'bg-gray-700 text-gray-300' : 'text-gray-400 hover:text-gray-300'}`}
            onClick={() => {
              setIsStyleMenuOpen(!isStyleMenuOpen);
              setIsMenuOpen(false);
            }}
          >
            <StyleIcon />
            {/* <CustomStyleIcon /> */}
            
          </button>



          {/* Model selection */}
          <div className="mx-2 flex items-center bg-transparent text-gray-400 px-2">
            <span className="text-sm mr-1">Claude 3.7 Sonnet</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Send button */}
          <button 
            className="p-2 rounded-md bg-orange-600 hover:bg-orange-700 text-white"
            disabled={!inputValue.trim()}
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClaudeInputArea;