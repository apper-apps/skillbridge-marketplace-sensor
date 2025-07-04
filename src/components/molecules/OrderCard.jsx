import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Avatar from "@/components/atoms/Avatar";
import Button from "@/components/atoms/Button";
import Messages from "@/components/pages/Messages";

const OrderCard = ({ order, className = '' }) => {
  const navigate = useNavigate();

  // Early return if order is not provided
  if (!order) {
    return null;
  }

  // Helper function to get status variant for Badge component
  const getStatusVariant = (status) => {
    const variants = {
      pending: 'warning',
      active: 'info',
      delivered: 'secondary',
      completed: 'success',
      disputed: 'error'
    };
    return variants[status] || 'secondary';
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

  // Helper function to format price
  const formatPrice = (price) => {
    if (typeof price !== 'number') return '$0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  // Helper function to format date
  const formatDate = (date) => {
    if (!date) return 'No date';
    try {
      return format(new Date(date), 'MMM dd, yyyy');
    } catch (error) {
      return 'Invalid date';
    }
  };

  // Navigation handlers
  const handleViewService = () => {
    if (order.serviceId) {
      navigate(`/services/${order.serviceId}`);
    }
  };

  const handleViewMessages = () => {
    if (order.sellerId) {
      navigate(`/messages?user=${order.sellerId}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`bg-white rounded-card border border-gray-200 p-6 hover:shadow-soft-lg transition-shadow duration-300 ${className}`}
    >
      {/* Header with status badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {order.seller?.avatar && (
            <Avatar 
              src={order.seller.avatar} 
              alt={order.seller?.name || 'Seller'} 
              size="sm" 
            />
          )}
          <div>
            <h3 className="font-medium text-gray-900">
              {order.service?.title || 'Service Title'}
            </h3>
            <p className="text-sm text-gray-500">
              by {order.seller?.name || 'Unknown Seller'}
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

      {/* Order details */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Package:</span>
          <span className="text-sm font-medium text-gray-900">
            {order.package || 'Standard'}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Price:</span>
          <span className="text-sm font-medium text-gray-900">
            {formatPrice(order.price)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Order Date:</span>
          <span className="text-sm font-medium text-gray-900">
            {formatDate(order.createdAt)}
          </span>
        </div>
        {order.deliveryDate && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Delivery Date:</span>
            <span className="text-sm font-medium text-gray-900">
              {formatDate(order.deliveryDate)}
            </span>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleViewService}
          className="flex-1"
        >
          <ApperIcon name="Eye" size={16} />
          View Service
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleViewMessages}
          className="flex-1"
        >
          <ApperIcon name="MessageCircle" size={16} />
          Messages
        </Button>
      </div>
    </motion.div>
  );
};

export default OrderCard;