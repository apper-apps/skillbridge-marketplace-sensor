import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Error = ({ message, onRetry, type = 'general' }) => {
  const errorMessages = {
    network: "Unable to connect to the server. Please check your internet connection.",
    services: "Failed to load services. Please try again.",
    messages: "Failed to load messages. Please try again.",
    orders: "Failed to load orders. Please try again.",
    profile: "Failed to load profile information. Please try again.",
    general: "Something went wrong. Please try again."
  };

  const displayMessage = message || errorMessages[type] || errorMessages.general;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-8 text-center"
    >
      <div className="w-24 h-24 bg-gradient-to-br from-error to-warning rounded-full flex items-center justify-center mb-6">
        <ApperIcon name="AlertCircle" size={48} className="text-white" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        Oops! Something went wrong
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
        {displayMessage}
      </p>
      
      {onRetry && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="btn-primary text-white px-8 py-3 rounded-full font-medium shadow-soft hover:shadow-soft-lg transition-all duration-200 flex items-center gap-2"
        >
          <ApperIcon name="RotateCcw" size={20} />
          Try Again
        </motion.button>
      )}
      
      <div className="mt-8 text-sm text-gray-500">
        <p>If the problem persists, please contact support.</p>
      </div>
    </motion.div>
  );
};

export default Error;