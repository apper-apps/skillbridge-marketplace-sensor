import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Avatar from '@/components/atoms/Avatar';
import StarRating from '@/components/atoms/StarRating';
import Badge from '@/components/atoms/Badge';

const ServiceCard = ({ service, className = '' }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/service/${service.Id}`);
  };

  const handleSellerClick = (e) => {
    e.stopPropagation();
    navigate(`/user/${service.sellerId}`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Design': 'bg-gradient-to-r from-pink-100 to-purple-100 text-pink-800',
      'Writing': 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800',
      'Programming': 'bg-gradient-to-r from-green-100 to-teal-100 text-green-800',
      'Marketing': 'bg-gradient-to-r from-orange-100 to-red-100 text-orange-800',
      'Video': 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800',
      'Music': 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`service-card cursor-pointer ${className}`}
      onClick={handleClick}
    >
      <div className="relative">
        <img 
          src={service.images[0]} 
          alt={service.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <Badge 
            variant="default" 
            size="sm"
            className={getCategoryColor(service.category)}
          >
            {service.category}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <button 
            className="w-8 h-8 bg-white bg-opacity-80 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <ApperIcon name="Heart" size={16} className="text-gray-600" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <button onClick={handleSellerClick}>
            <Avatar 
              src={service.seller?.avatar} 
              name={service.seller?.name}
              size="sm"
            />
          </button>
          <button 
            onClick={handleSellerClick}
            className="text-sm text-gray-600 hover:text-primary font-medium"
          >
            {service.seller?.name}
          </button>
        </div>
        
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 leading-tight">
          {service.title}
        </h3>
        
        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={service.rating} size={14} />
          <span className="text-sm text-gray-600">
            {service.rating} ({service.reviewCount})
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <ApperIcon name="Clock" size={14} />
            <span>{service.deliveryTime} days</span>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Starting at</p>
            <p className="font-bold text-lg text-primary">
              {formatPrice(service.packages[0]?.price || 0)}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;