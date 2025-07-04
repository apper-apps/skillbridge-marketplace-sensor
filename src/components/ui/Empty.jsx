import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ 
  title, 
  description, 
  action, 
  onAction,
  icon = 'Search',
  type = 'general' 
}) => {
  const emptyStates = {
    services: {
      title: "No services found",
      description: "Try adjusting your search filters or browse different categories to find what you're looking for.",
      action: "Browse All Services",
      icon: "Search"
    },
    messages: {
      title: "No messages yet",
      description: "Start a conversation with a service provider to begin your project collaboration.",
      action: "Browse Services",
      icon: "MessageCircle"
    },
    orders: {
      title: "No orders yet",
      description: "When you purchase services, they'll appear here. Start by browsing our marketplace.",
      action: "Find Services",
      icon: "ShoppingBag"
    },
    favorites: {
      title: "No favorites yet",
      description: "Save services you're interested in to easily find them later.",
      action: "Explore Services",
      icon: "Heart"
    },
    reviews: {
      title: "No reviews yet",
      description: "Reviews from your clients will appear here after they complete their orders.",
      action: "View My Services",
      icon: "Star"
    },
    general: {
      title: "Nothing here yet",
      description: "This area is empty right now, but that's about to change!",
      action: "Get Started",
      icon: "Plus"
    }
  };

  const state = emptyStates[type] || emptyStates.general;
  const finalTitle = title || state.title;
  const finalDescription = description || state.description;
  const finalAction = action || state.action;
  const finalIcon = icon || state.icon;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-8 text-center"
    >
      <div className="w-32 h-32 bg-gradient-to-br from-primary via-secondary to-accent rounded-full flex items-center justify-center mb-8 shadow-soft">
        <ApperIcon name={finalIcon} size={64} className="text-white" />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        {finalTitle}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
        {finalDescription}
      </p>
      
      {onAction && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAction}
          className="btn-primary text-white px-8 py-3 rounded-full font-medium shadow-soft hover:shadow-soft-lg transition-all duration-200 flex items-center gap-2"
        >
          <ApperIcon name="ArrowRight" size={20} />
          {finalAction}
        </motion.button>
      )}
      
      <div className="mt-8 flex items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <ApperIcon name="Shield" size={16} />
          <span>Secure</span>
        </div>
        <div className="flex items-center gap-1">
          <ApperIcon name="Clock" size={16} />
          <span>Fast</span>
        </div>
        <div className="flex items-center gap-1">
          <ApperIcon name="Users" size={16} />
          <span>Trusted</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Empty;