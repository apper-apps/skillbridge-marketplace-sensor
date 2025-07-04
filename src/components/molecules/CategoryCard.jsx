import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';

const CategoryCard = ({ category, className = '' }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/browse?category=${category.name}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={`bg-white rounded-card p-6 shadow-soft hover:shadow-soft-lg cursor-pointer transition-all duration-200 text-center ${className}`}
    >
      <div className="category-icon mx-auto mb-4">
        <ApperIcon name={category.icon} size={24} />
      </div>
      
      <h3 className="font-semibold text-gray-800 mb-2">
        {category.name}
      </h3>
      
      <p className="text-sm text-gray-600 mb-3">
        {category.description}
      </p>
      
      <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
        <span>{category.serviceCount} services</span>
        <span>•</span>
        <span>Starting ${category.startingPrice}</span>
      </div>
    </motion.div>
  );
};

export default CategoryCard;