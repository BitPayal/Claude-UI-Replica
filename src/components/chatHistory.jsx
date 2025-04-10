import { useState } from "react";
import { MessageCircle, Search, Check } from "lucide-react";
import { useHistory } from 'react-router-dom';

const ChatHistory = ({ onNewChat }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectionMode, setSelectionMode] = useState(false);
  const history = useHistory();
  return (
    <div className="flex flex-col h-full w-full bg-[#1a1a1a] px-6 py-6 text-white overflow-y-auto">
      {/* Top Heading and New Chat Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Your chat history</h2>
        <button
  onClick={() => history.push("/")}
  className="px-4 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-900 transition"
>
  + New chat
</button>

      </div>

      {/* Centered Search Bar */}
      <div className="flex justify-center mb-2">
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-3 top-2.5 text-black w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your chats..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
      </div>

      {/* Info Section or Select Mode Controls */}
      <div className="flex justify-center mb-6">
        <div className="w-full max-w-xl flex justify-between items-center">
          {!selectionMode ? (
            <p className="text-sm text-white">
              {searchQuery
                ? <>There are 0 chats matching “<span className="font-medium">{searchQuery}</span>”</>
                : "You have 0 previous chats with Claude"}{" "}
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => setSelectionMode(true)}
              >
                Select
              </span>
            </p>
          ) : (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-1 text-sm text-blue-600">
                <Check className="w-4 h-4" />
                0 selected chats
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => setSelectionMode(false)}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button className="px-3 py-1 text-sm text-white bg-[#eecfcf] hover:bg-[#e2bebe] rounded-md">
                  Delete Selected
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Empty State */}
      {!searchQuery && (
        <div className="flex flex-col items-center justify-center text-center mt-24 space-y-4">
          <MessageCircle className="w-14 h-14 text-white" />
          <p className="text-lg font-medium text-white">Ready for your first chat?</p>
          <p className="text-sm text-white max-w-md">
            Talk to Claude about anything—it's literally always up for a yap.
            Chats will show up here.
          </p>
          <button
  onClick={() => history.push("/")}
  className="px-4 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-900 transition"
>
  + New chat
</button>

        </div>
      )}
    </div>
  );
};

export default ChatHistory;