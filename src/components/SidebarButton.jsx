import { motion } from "framer-motion";

const SidebarButton = ({ icon: Icon, label, to, isSidebarOpen, history }) => {
  return (
    <div className={`w-full ${!isSidebarOpen ? 'flex justify-center items-center' : ''}`}>
      <button
        onClick={() => history.push(to)}
        className={`w-full px-3 py-2 rounded-md hover:bg-[#3e3e3e] transition-colors 
          ${isSidebarOpen ? 'flex items-center' : 'flex justify-center mx-3'}`}
      >
        <Icon className="w-5 h-5 text-gray-400 flex-shrink-0" />
        {isSidebarOpen && (
          <motion.span
            initial={{ opacity: 1 }}
            animate={{ opacity: isSidebarOpen ? 1 : 0 }}
            className="text-sm ml-2 whitespace-nowrap"
          >
            {label}
          </motion.span>
        )}
      </button>
    </div>
  );
};

export default SidebarButton;
