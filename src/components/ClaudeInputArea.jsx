import React, { useState, useRef, useEffect } from 'react';
import { Plus, X, Paperclip, Camera, ArrowUp, Copy, ThumbsUp, ThumbsDown, RotateCcw, Leaf, Github } from 'lucide-react';

const ClaudeInputArea = () => {
    const [inputValue, setInputValue] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isStyleMenuOpen, setIsStyleMenuOpen] = useState(false);
    const [selectedStyle, setSelectedStyle] = useState('Normal');
    const fileInputRef = useRef(null);
    const styleMenuRef = useRef(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (styleMenuRef.current && !styleMenuRef.current.contains(event.target)) {
                setIsStyleMenuOpen(false);
                
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const StyleIcon = () => <Leaf className="w-5 h-5 text-gray-400" />;

    return (
        <div className="relative w-full bg-gray-900 p-4">
            {/* Action bar */}
            <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Reply</span>
                <div className="flex items-center space-x-4">
                    <Copy className="w-5 h-5 text-gray-400 cursor-pointer" />
                    <ThumbsUp className="w-5 h-5 text-gray-400 cursor-pointer" />
                    <ThumbsDown className="w-5 h-5 text-gray-400 cursor-pointer" />
                    <button className="text-gray-300 hover:text-gray-200 flex items-center">
                        <span className="mr-1">Retry</span>
                        <RotateCcw className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Warning */}
            <div className="text-right mb-2 text-gray-400 text-sm">
                Claude can make mistakes. Please double-check responses.
            </div>

            {/* Hidden file input */}
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
            />

            {/* Menu Dropdown */}
            {isMenuOpen && (
                <div className="absolute z-50 bottom-full mb-2 left-0 w-64 rounded-lg bg-gray-900 border border-gray-700 p-2">
                    <div className="flex flex-col">
                        <button
                            onClick={handleUploadClick}
                            className="flex items-center p-3 text-gray-300 hover:bg-gray-800 rounded-lg"
                        >
                            <Paperclip className="w-6 h-6 mr-4" />
                            Upload a file
                        </button>
                        <button className="flex items-center p-3 text-gray-300 hover:bg-gray-800 rounded-lg">
                            <Camera className="w-6 h-6 mr-4" />
                            Take a screenshot
                        </button>
                        <button className="flex items-center p-3 text-gray-300 hover:bg-gray-800 rounded-lg">
                            <Github className="w-6 h-6 mr-4" />
                            Add from GitHub
                        </button>
                    </div>
                </div>
            )}

            {/* Style Dropdown */}
            {isStyleMenuOpen && (
                <div
                    ref={styleMenuRef}
                    className="absolute z-50 bottom-full mb-2 left-24 w-64 rounded-lg bg-gray-900 border border-gray-700 p-2"
                >
                    {['Normal', 'Concise', 'Explanatory', 'Formal'].map((style) => (
                        <button
                            key={style}
                            className={`flex items-center p-3 hover:bg-gray-800 rounded-lg ${selectedStyle === style ? 'text-blue-500' : 'text-gray-300'}`}
                            onClick={() => handleStyleChange(style)}
                        >
                            <StyleIcon />
                            <span className="text-lg ml-4">{style}</span>
                            {selectedStyle === style && (
                                <svg className="w-5 h-5 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </button>
                    ))}
                    <div className="border-t border-gray-700 my-2"></div>
                    <button className="flex items-center p-3 text-gray-300 hover:bg-gray-800 rounded-lg">
                        <Plus className="w-5 h-5 mr-4" />
                        Create & edit styles
                    </button>
                </div>
            )}

            {/* Input box with controls */}
            <div className="relative flex flex-col rounded-lg border border-gray-700 bg-gray-800">
                <textarea
                    className="w-full bg-transparent p-4 outline-none resize-none text-gray-200 min-h-[24px]"
                    placeholder="Message Claude..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    rows={1}
                />

                {/* Control row */}
                <div className="flex items-center justify-between p-2">
                    {/* Left controls */}
                    <div className="flex items-center space-x-2">
                        <button
                            className="p-2 rounded-md text-gray-400 hover:text-gray-300 hover:bg-gray-700"
                            onClick={() => {
                                setIsMenuOpen(!isMenuOpen);
                                setIsStyleMenuOpen(false);
                            }}
                        >
                            {isMenuOpen ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                        </button>

                        <div className="relative group">
                            <button
                                className={`p-2 rounded-md hover:bg-gray-700 ${isStyleMenuOpen ? 'bg-gray-700 text-gray-300' : 'text-gray-400 hover:text-gray-300'}`}
                                onClick={() => {
                                    setIsStyleMenuOpen(!isStyleMenuOpen);
                                    setIsMenuOpen(false);
                                }}
                            >
                                <StyleIcon />
                            </button>

                            <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 text-sm text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                                Style
                            </span>
                        </div>
                    </div>

                    {/* Right controls */}
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center text-gray-400 px-2">
                            <span className="text-sm mr-1">Claude 3.7 Sonnet</span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        <button
                            className="p-2 rounded-md bg-orange-600 hover:bg-orange-700 text-white"
                            disabled={!inputValue.trim()}
                        >
                            <ArrowUp className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClaudeInputArea;
