// import React, { useState, useRef, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
// import {
//   Plus,
//   ChevronDown,
//   MoveLeft,
//   MoveRight,
//   MessageCircle,
// } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// const ClaudeSidebar = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const profileRef = useRef(null);
//   const history = useHistory();

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (profileRef.current && !profileRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <motion.div
//         className="flex flex-col  bg-[#1e1e1e] border-r border-[#2e2e2e]"
//         animate={{
//           width: isSidebarOpen ? 288 : 64
//         }}
//         transition={{
//           type: "spring",
//           stiffness: 300,
//           damping: 30
//         }}
//       >
//         {/* Toggle Button */}
//         <button
//           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//           className="p-2 rounded-md hover:bg-[#3e3e3e] transition-colors flex justify-center"
//         >
//           <div className="flex items-center p-2 border-b border-gray-800 w-full">
//             {isSidebarOpen ? (
//               <>
//                 <MoveLeft className="w-5 h-5 mr-2 flex-shrink-0" />
//                 <motion.span
//                   initial={{ opacity: 1 }}
//                   animate={{ opacity: isSidebarOpen ? 1 : 0 }}
//                   className="text-white font-medium whitespace-nowrap"
//                 >
//                   Claude
//                 </motion.span>
//               </>
//             ) : (
//               <div className="flex justify-center w-full">
//                 <MoveRight className="w-5 h-5 flex-shrink-0" />
//               </div>
//             )}
//           </div>
//         </button>

//         {/* New Chat Button - Centered when closed */}
//         <div className="flex justify-center">
//           <button onClick={() => history.push("/")} className="w-full flex items-center mx-4 my-3 px-3 py-2 rounded-md hover:bg-[#3e3e3e] transition-colors">
//             <Plus className="w-5 h-5 flex-shrink-0" />
//             {isSidebarOpen && (
//               <motion.span
//                 initial={{ opacity: 1 }}
//                 animate={{ opacity: isSidebarOpen ? 1 : 0 }}
//                 className="ml-2 whitespace-nowrap"
//               >
//                 New chat
//               </motion.span>
//             )}
//           </button>
//         </div>

//         {/* Navigation - Centered when closed */}
//         <div className="flex justify-center">
//         <button onClick={() => history.push("/chats")} className="w-full flex items-center mx-4 my-3 px-3 py-2 rounded-md hover:bg-[#3e3e3e] transition-colors">
//             <MessageCircle className="w-5 h-5 flex-shrink-0" />
//             {isSidebarOpen && (
//               <motion.span
//                 initial={{ opacity: 1 }}
//                 animate={{ opacity: isSidebarOpen ? 1 : 0 }}
//                 className="ml-2 whitespace-nowrap"
//               >
//                 Chats
//               </motion.span>
//             )}
//           </button>
//         </div>

//         {/* Recents Section - No icon, just text */}
//         {isSidebarOpen && (
//           <div className="px-4 mt-4">
//             <motion.div
//               initial={{ opacity: 1 }}
//               animate={{ opacity: isSidebarOpen ? 1 : 0 }}
//               className="text-sm text-gray-400 whitespace-nowrap"
//             >
//               Recents
//             </motion.div>
//             <div className="mt-2">
//               <button className="w-full px-3 py-2 text-sm rounded-md hover:bg-gray-800 transition-colors text-left">
//                 <motion.span
//                   initial={{ opacity: 1 }}
//                   animate={{ opacity: isSidebarOpen ? 1 : 0 }}
//                   className="whitespace-nowrap truncate"
//                 >
//                   Fetch Stock Data from Yahoo Finance...
//                 </motion.span>
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Profile Section - Centered when closed */}
//         <div className="mt-auto border-t border-gray-800 relative" ref={profileRef}>
//           <div
//             className="flex items-center justify-center p-4 cursor-pointer hover:bg-[#2e2e2e] transition-colors"
//             onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//           >
//             <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-600 text-white font-semibold flex-shrink-0">
//               SK
//             </div>
//             {isSidebarOpen && (
//               <motion.div
//                 initial={{ opacity: 1 }}
//                 animate={{ opacity: isSidebarOpen ? 1 : 0 }}
//                 className="ml-3 overflow-hidden flex-grow"
//               >
//                 <div className="font-semibold text-white whitespace-nowrap">Shashant Kumar</div>
//                 <div className="text-xs text-gray-400 whitespace-nowrap">Free plan</div>
//               </motion.div>
//             )}
//             {isSidebarOpen && (
//               <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
//             )}
//           </div>

//           {/* Dropdown */}
//           <AnimatePresence>
//             {isDropdownOpen && (
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: 10 }}
//                 transition={{ duration: 0.15 }}
//                 className="absolute bottom-full mb-2 left-2` w-[19vw] bg-[#1e1e1e] border border-[#333] rounded-xl shadow-lg text-sm z-[10] overflow-hidden"
//               >
//                 <div className="px-5 py-3 text-gray-400 border-b border-gray-700 whitespace-nowrap">
//                   shashant.sah@gmail.com
//                 </div>

//                 <div className="flex items-center px-5 py-3 border-b border-gray-700">
//                   <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-600 text-white font-semibold mr-3 flex-shrink-0">
//                     SK
//                   </div>
//                   <div className="overflow-hidden">
//                     <div className="text-white font-semibold whitespace-nowrap">Personal</div>
//                     <div className="text-xs text-gray-400 whitespace-nowrap">Free plan</div>
//                   </div>
//                   <div className="ml-auto text-blue-400">✔</div>
//                 </div>

//                 <ul className="py-2">
//                   <li className="px-5 py-2 hover:bg-[#2a2a2a] cursor-pointer transition-colors whitespace-nowrap">Settings</li>
//                   <li className="px-5 py-2 hover:bg-[#2a2a2a] cursor-pointer transition-colors flex justify-between items-center whitespace-nowrap">
//                     View all plans <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-md ml-2">New</span>
//                   </li>
//                   <li className="px-5 py-2 hover:bg-[#2a2a2a] cursor-pointer transition-colors flex items-center whitespace-nowrap">
//                     Language <span className="ml-2 text-xs bg-gray-600 px-2 py-0.5 rounded-md">BETA</span>
//                   </li>
//                   <li className="px-5 py-2 hover:bg-[#2a2a2a] cursor-pointer transition-colors whitespace-nowrap">Get help</li>
//                   <li className="px-5 py-2 hover:bg-[#2a2a2a] cursor-pointer transition-colors whitespace-nowrap">Learn more</li>
//                   <li className="px-5 py-2 hover:bg-[#2a2a2a] cursor-pointer transition-colors whitespace-nowrap">Download Claude for Mac</li>
//                 </ul>

//                 <div className="px-5 py-3 text-red-400 hover:bg-[#2a2a2a] cursor-pointer border-t border-gray-700 transition-colors whitespace-nowrap">
//                   Log out
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </motion.div>
//   );
// };

// export default ClaudeSidebar;



// import React, { useState, useRef, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
// import { ChevronRight , Info, ShieldCheck, Lock} from 'lucide-react'; 
// import {
//   Plus,
//   ChevronDown,
//   MoveLeft,
//   MoveRight,
//   MessageCircle,
// } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// const ClaudeSidebar = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [learnMoreOpen, setLearnMoreOpen] = useState(false);
//   const profileRef = useRef(null);
//   const history = useHistory();

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (profileRef.current && !profileRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <motion.div
//         className="flex flex-col  bg-[#1e1e1e] border-r border-[#2e2e2e]"

//         animate={{
//           width: isSidebarOpen ? 288 : 64
//         }}
//         transition={{
//           type: "spring",
//           stiffness: 300,
//           damping: 30
//         }}
//       >
//         {/* Toggle Button */}
//         <button
//           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//           className="p-2 rounded-md hover:bg-[#3e3e3e] transition-colors flex justify-center"
//         >
//           <div className="flex items-center p-2 border-b border-gray-800 w-full">
//             {isSidebarOpen ? (
//               <>
//                 <MoveLeft className="w-5 h-5 mr-2 flex-shrink-0" />
//                 <motion.span
//                   initial={{ opacity: 1 }}
//                   animate={{ opacity: isSidebarOpen ? 1 : 0 }}
//                   className="text-white font-medium whitespace-nowrap"
//                 >
//                   Claude
//                 </motion.span>
//               </>
//             ) : (
//               <div className="flex justify-center w-full">
//                 <MoveRight className="w-5 h-5 flex-shrink-0" />
//               </div>
//             )}
//           </div>
//         </button>

//         {/* New Chat Button - Centered when closed */}
//         <div className="flex justify-center">
//           <button onClick={() => history.push("/")} className="w-full flex items-center mx-4 my-3 px-3 py-2 rounded-md hover:bg-[#3e3e3e] transition-colors">
//             <Plus className="w-5 h-5 flex-shrink-0" />
//             {isSidebarOpen && (
//               <motion.span
//                 initial={{ opacity: 1 }}
//                 animate={{ opacity: isSidebarOpen ? 1 : 0 }}
//                 className="ml-2 whitespace-nowrap"
//               >
//                 New chat
//               </motion.span>
//             )}
//           </button>
//         </div>

//         {/* Navigation - Centered when closed */}
//         <div className="flex justify-center">
//         <button onClick={() => history.push("/chats")} className="w-full flex items-center mx-4 my-3 px-3 py-2 rounded-md hover:bg-[#3e3e3e] transition-colors">
//             <MessageCircle className="w-5 h-5 flex-shrink-0" />
//             {isSidebarOpen && (
//               <motion.span
//                 initial={{ opacity: 1 }}
//                 animate={{ opacity: isSidebarOpen ? 1 : 0 }}
//                 className="ml-2 whitespace-nowrap"
//               >
//                 Chats
//               </motion.span>
//             )}
//           </button>
//         </div>

//         {/* Recents Section - No icon, just text */}
//         {isSidebarOpen && (
//           <div className="px-4 mt-4">
//             <motion.div
//               initial={{ opacity: 1 }}
//               animate={{ opacity: isSidebarOpen ? 1 : 0 }}
//               className="text-sm text-gray-400 whitespace-nowrap"
//             >
//               Recents
//             </motion.div>
//             <div className="mt-2">
//               <button className="w-full px-3 py-2 text-sm rounded-md hover:bg-gray-800 transition-colors text-left">
//                 <motion.span
//                   initial={{ opacity: 1 }}
//                   animate={{ opacity: isSidebarOpen ? 1 : 0 }}
//                   className="whitespace-nowrap truncate"
//                 >
//                   Fetch Stock Data from Yahoo Finance...
//                 </motion.span>
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Profile Section - Centered when closed */}
//         <div className="mt-auto border-t border-gray-800 relative" ref={profileRef}>
//           <div
//             className="flex items-center justify-center p-4 cursor-pointer hover:bg-[#2e2e2e] transition-colors"
//             onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//           >
//             <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-600 text-white font-semibold flex-shrink-0">
//               SK
//             </div>
//             {isSidebarOpen && (
//               <motion.div
//                 initial={{ opacity: 1 }}
//                 animate={{ opacity: isSidebarOpen ? 1 : 0 }}
//                 className="ml-3 overflow-hidden flex-grow"
//               >
//                 <div className="font-semibold text-white whitespace-nowrap">Shashant Kumar</div>
//                 <div className="text-xs text-gray-400 whitespace-nowrap">Free plan</div>
//               </motion.div>
//             )}
//             {isSidebarOpen && (
//               <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
//             )}
//           </div>

//           {/* Dropdown */}
//           <AnimatePresence>
//             {isDropdownOpen && (
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: 10 }}
//                 transition={{ duration: 0.15 }}
//                 className="absolute bottom-full mb-2 left-2 w-[19vw] bg-[#1e1e1e] border border-[#333] rounded-xl shadow-lg text-sm z-[10] overflow-visible"
//               >
//                 <div className="px-5 py-3 text-gray-400 border-b border-gray-700 whitespace-nowrap">
//                   shashant.sah@gmail.com
//                 </div>

//                 <div className="flex items-center px-5 py-3 border-b border-gray-700">
//                   <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-600 text-white font-semibold mr-3 flex-shrink-0">
//                     SK
//                   </div>
//                   <div className="overflow-hidden">
//                     <div className="text-white font-semibold whitespace-nowrap">Personal</div>
//                     <div className="text-xs text-gray-400 whitespace-nowrap">Free plan</div>
//                   </div>
//                   <div className="ml-auto text-blue-400">✔</div>
//                 </div>

//                 <ul className="py-2">
//                   <li className="px-5 py-2 hover:bg-[#2a2a2a] cursor-pointer transition-colors whitespace-nowrap">Settings</li>
//                   <li className="px-5 py-2 hover:bg-[#2a2a2a] cursor-pointer transition-colors flex justify-between items-center whitespace-nowrap">
//                     View all plans <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-md ml-2">New</span>
//                   </li>
//                   <li className="px-5 py-2 hover:bg-[#2a2a2a] cursor-pointer transition-colors flex items-center whitespace-nowrap">
//                     Language <span className="ml-2 text-xs bg-gray-600 px-2 py-0.5 rounded-md">BETA</span>
//                   </li>
//                   <li className="px-5 py-2 hover:bg-[#2a2a2a] cursor-pointer transition-colors whitespace-nowrap">Get help</li>
//                   <li
//   onMouseEnter={() => setLearnMoreOpen(true)}
//   onMouseLeave={() => setLearnMoreOpen(false)}
//   className="relative px-5 py-2 hover:bg-[#2a2a2a] cursor-pointer transition-colors whitespace-nowrap flex items-center justify-between"
// >
//   Learn more
//   <ChevronRight
//     className={`w-4 h-4 ml-2 transition-transform ${learnMoreOpen ? 'rotate-90' : ''}`}
//   />

//   {/* Sub-dropdown */}
//   <AnimatePresence>
//   {learnMoreOpen && (
//     <div className="absolute top-0 left-full ml-2 w-52 bg-[#1e1e1e] border border-[#333] rounded-xl shadow-lg z-50">
//       <div className="flex items-center gap-2 px-4 py-2 hover:bg-[#2a2a2a] cursor-pointer text-sm text-gray-300">
//         <Info className="w-4 h-4 text-gray-400" />
//         About Anthropic
//       </div>
//       <div className="flex items-center gap-2 px-4 py-2 hover:bg-[#2a2a2a] cursor-pointer text-sm text-gray-300">
//         <ShieldCheck className="w-4 h-4 text-gray-400" />
//         Usage policy
//       </div>
//       <div className="flex items-center gap-2 px-4 py-2 hover:bg-[#2a2a2a] cursor-pointer text-sm text-gray-300">
//         <Lock className="w-4 h-4 text-gray-400" />
//         Privacy policy
//       </div>
//     </div>
//   )}
//   </AnimatePresence>
// </li>



//                   <li className="px-5 py-2 hover:bg-[#2a2a2a] cursor-pointer transition-colors whitespace-nowrap">Download Claude for Mac</li>
//                 </ul>

//                 <div className="px-5 py-3 text-red-400 hover:bg-[#2a2a2a] cursor-pointer border-t border-gray-700 transition-colors whitespace-nowrap">
//                   Log out
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </motion.div>
//   );
// };

// export default ClaudeSidebar;

import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChevronRight, Info, ShieldCheck, Lock, ExternalLink, ExternalLinkIcon } from "lucide-react";
import {
  Plus,
  ChevronDown,
  MoveLeft,
  MoveRight,
  MessageCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ClaudeSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [learnMoreOpen, setLearnMoreOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  const profileRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.div
      className="flex flex-col  bg-[#1e1e1e] border-r border-[#2e2e2e]"
      animate={{
        width: isSidebarOpen ? 288 : 64,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="p-2 rounded-md hover:bg-[#3e3e3e] transition-colors flex justify-center"
      >
        <div className="flex items-center p-2 border-b border-gray-800 w-full">
          {isSidebarOpen ? (
            <>
              <MoveLeft className="w-5 h-5 mr-2 flex-shrink-0" />
              <motion.span
                initial={{ opacity: 1 }}
                animate={{ opacity: isSidebarOpen ? 1 : 0 }}
                className="text-white font-medium whitespace-nowrap"
              >
                Claude
              </motion.span>
            </>
          ) : (
            <div className="flex justify-center w-full">
              <MoveRight className="w-5 h-5 flex-shrink-0" />
            </div>
          )}
        </div>
      </button>

      {/* New Chat Button - Centered when closed */}
      <div className="flex justify-center">
        <button
          onClick={() => history.push("/")}
          className="w-full flex items-center mx-4 my-3 px-3 py-2 rounded-md hover:bg-[#3e3e3e] transition-colors"
        >
          <Plus className="w-5 h-5 flex-shrink-0" />
          {isSidebarOpen && (
            <motion.span
              initial={{ opacity: 1 }}
              animate={{ opacity: isSidebarOpen ? 1 : 0 }}
              className="ml-2 whitespace-nowrap"
            >
              New chat
            </motion.span>
          )}
        </button>
      </div>

      {/* Navigation - Centered when closed */}
      <div className="flex justify-center">
        <button
          onClick={() => history.push("/chats")}
          className="w-full flex items-center mx-4 my-3 px-3 py-2 rounded-md hover:bg-[#3e3e3e] transition-colors"
        >
          <MessageCircle className="w-5 h-5 flex-shrink-0" />
          {isSidebarOpen && (
            <motion.span
              initial={{ opacity: 1 }}
              animate={{ opacity: isSidebarOpen ? 1 : 0 }}
              className="ml-2 whitespace-nowrap"
            >
              Chats
            </motion.span>
          )}
        </button>
      </div>

      {/* Recents Section - No icon, just text */}
      {isSidebarOpen && (
        <div className="px-4 mt-4">
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isSidebarOpen ? 1 : 0 }}
            className="text-sm text-gray-400 whitespace-nowrap"
          >
            Recents
          </motion.div>
          <div className="mt-2">
            <button className="w-full px-3 py-2 text-sm rounded-md hover:bg-gray-800 transition-colors text-left">
              <motion.span
                initial={{ opacity: 1 }}
                animate={{ opacity: isSidebarOpen ? 1 : 0 }}
                className="whitespace-nowrap truncate"
              >
                Fetch Stock Data from Yahoo Finance...
              </motion.span>
            </button>
          </div>
        </div>
      )}

      {/* Profile Section - Centered when closed */}
      <div
        className="mt-auto border-t border-gray-800 relative"
        ref={profileRef}
      >
        <div
          className="flex items-center justify-center p-4 cursor-pointer hover:bg-[#2e2e2e] transition-colors"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-600 text-white font-semibold flex-shrink-0">
            SK
          </div>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: isSidebarOpen ? 1 : 0 }}
              className="ml-3 overflow-hidden flex-grow"
            >
              <div className="font-semibold text-white whitespace-nowrap">
                Shashant Kumar
              </div>
              <div className="text-xs text-gray-400 whitespace-nowrap">
                Free plan
              </div>
            </motion.div>
          )}
          {isSidebarOpen && (
            <ChevronDown
              className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          )}
        </div>

        {/* Dropdown */}
        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-full mb-2 left-2 w-[19vw] bg-[#1e1e1e] border border-[#333] rounded-xl shadow-lg text-sm z-[10] overflow-visible"
            >
              <div className="px-5 py-3 text-gray-400 border-b border-gray-700 whitespace-nowrap">
                shashant.sah@gmail.com
              </div>

              <div className="flex items-center px-5 py-3 border-b border-gray-700">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-600 text-white font-semibold mr-3 flex-shrink-0">
                  SK
                </div>
                <div className="overflow-hidden">
                  <div className="text-white font-semibold whitespace-nowrap">
                    Personal
                  </div>
                  <div className="text-xs text-gray-400 whitespace-nowrap">
                    Free plan
                  </div>
                </div>
                <div className="ml-auto text-blue-400">✔</div>
              </div>

              <ul className="py-2">
                <li className="px-5 py-2 hover:bg-[#2a2a2a] cursor-pointer transition-colors whitespace-nowrap">
                  Settings
                </li>
                <li className="px-5 py-2 hover:bg-[#2a2a2a] cursor-pointer transition-colors flex justify-between items-center whitespace-nowrap">
                  View all plans{" "}
                  <span className="text-xs bg-[hsl(210,55.9%,24.6%)] text-white px-2 py-0.5 rounded-md ml-2">
                    New
                  </span>
                </li>

                <li
                  onMouseEnter={() => setLanguageOpen(true)}
                  onMouseLeave={() => setLanguageOpen(false)}
                  className="relative px-5 py-2 hover:bg-[#2a2a2a] cursor-pointer transition-colors whitespace-nowrap flex items-center justify-between"
                >
                  Language
                  <span className="ml-2 text-xs bg-gray-600 px-2 py-0.5 rounded-md">
                    BETA
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 ml-2 transition-transform ${
                      languageOpen ? "rotate-90" : ""
                    }`}
                  />
                  <AnimatePresence>
                    {languageOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute bottom-0 left-full mb-2 w-[13vw] bg-[#1e1e1e] border border-[#333] rounded-xl shadow-lg z-50"
                      >
                        {[
                          "English (United States)",
                          "Français (France)",
                          "Deutsch (Deutschland)",
                          "हिंदी (भारत)",
                          "Indonesia (Indonesia)",
                          "Italiano (Italia)",
                          "日本語 (日本)",
                          "한국어 (대한민국)",
                          "Português (Brasil)",
                          "Español (Latinoamérica)",
                          "Español (España)",
                        ].map((lang, idx) => (
                          <div
                            key={idx}
                            className="px-4 py-2 hover:bg-[#2a2a2a] text-sm text-gray-300 cursor-pointer"
                          >
                            {lang}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>

                <li className="px-5 py-2 hover:bg-[#2a2a2a] cursor-pointer transition-colors whitespace-nowrap">
                  Get help
                </li>
                <li
                  onMouseEnter={() => setLearnMoreOpen(true)}
                  onMouseLeave={() => setLearnMoreOpen(false)}
                  className="relative px-5 py-2 hover:bg-[#2a2a2a] cursor-pointer transition-colors whitespace-nowrap flex items-center justify-between"
                >
                  Learn more
                  <ChevronRight
                    className={`w-4 h-4 ml-2 transition-transform ${
                      learnMoreOpen ? "rotate-90" : ""
                    }`}
                  />
                  {/* Sub-dropdown */}
                  <AnimatePresence>
                    {learnMoreOpen && (
                      <div className="absolute top-0 left-full ml-2 w-[11vw] bg-[#1e1e1e] border border-[#333] rounded-xl shadow-lg z-50">
                        <div className="flex items-center justify-between px-4 py-2 hover:bg-[#2a2a2a] cursor-pointer text-sm text-gray-300">
                        About Anthropic
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                          
                        </div>
                        <div className="flex items-center justify-between px-4 py-2 hover:bg-[#2a2a2a] cursor-pointer text-sm text-gray-300">
                        Usage policy
                          <ExternalLink className="w-4 h-4 text-gray-400" />
                          
                        </div>
                        <div className="flex items-center justify-between px-4 py-2 hover:bg-[#2a2a2a] cursor-pointer text-sm text-gray-300">
                        Privacy policy
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                          
                        </div>
                      </div>
                    )}
                  </AnimatePresence>
                </li>

                <li className="flex items-center justify-between px-5 py-2 hover:bg-[#2a2a2a] cursor-pointer transition-colors whitespace-nowrap">
                  Download Claude for Mac
                <ExternalLinkIcon className="w-4 h-4 text-gray-400 flex-shrink-0"/>
                </li>
              </ul>

              <div className="px-5 py-3 text-red-400 hover:bg-[#2a2a2a] cursor-pointer border-t border-gray-700 transition-colors whitespace-nowrap">
                Log out
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ClaudeSidebar;