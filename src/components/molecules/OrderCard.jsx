import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Avatar from '@/components/atoms/Avatar';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import { format } from 'date-fns';

const OrderCard = ({ order, className = '' }) => {
  const navigate = useNavigate();

  const getStatusVariant = (status) => {
    const variants = {
      pending: 'warning',
      active: 'info',
      delivered: 'secondary',
      completed: 'success',
      disputed: 'error'
    };
    return variants[status] || 'default';
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: 'Clock',
      active: 'Play',
      delivered: 'Package',
      completed: 'CheckCircle',
      disputed: 'AlertTriangle'
    };
    return icons[status] || 'Circle';
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDate = (date) => {
    return format(new Date(date), 'MMM dd, yyyy');
  };

  const handleViewService = () => {
    navigate(`/service/${order.serviceId}`);
  };

  const handleViewMessages = () => {
    navigate(`/messages?user=${order.sellerId}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-card p-6 shadow-soft hover:shadow-soft-lg transition-all duration-200 ${className}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar 
            src={order.seller?.avatar} 
            name={order.seller?.name}
            size="md"
          />
          <div>
            <h3 className="font-semibold text-gray-800">
              {order.service?.title}
            </h3>
            <p className="text-sm text-gray-600">
              with {order.seller?.name}
            </p>
          </div>
        </div>
        
        <Badge 
          variant={getStatusVariant(order.status)}
          className="flex items-center gap-1"
        >
          <ApperIcon name={getStatusIcon(order.status)} size={14} />
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">Order Date</p>
          <p className="font-medium text-gray-800">
            {formatDate(order.createdAt)}
          </p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500 mb-1">Delivery Date</p>
          <p className="font-medium text-gray-800">
            {formatDate(order.deliveryDate)}
          </p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500 mb-1">Total Amount</p>
          <p className="font-bold text-lg text-primary">
            {formatPrice(order.price)}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleViewService}
          className="flex-1"
        >
          View Service
        </Button>
        
        <Button 
          variant="primary" 
          size="sm"
          icon="MessageCircle"
          onClick={handleViewMessages}
          className="flex-1"
        >
          Message
        </Button>
        
        {order.status === 'delivered' && (
          <Button 
            variant="secondary" 
            size="sm"
            icon="Star"
            className="flex-1"
          >
            Review
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default OrderCard;