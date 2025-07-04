import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import OrderCard from '@/components/molecules/OrderCard';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import { getOrders } from '@/services/api/orderService';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Orders', count: 0 },
    { id: 'pending', label: 'Pending', count: 0 },
    { id: 'active', label: 'Active', count: 0 },
    { id: 'delivered', label: 'Delivered', count: 0 },
    { id: 'completed', label: 'Completed', count: 0 }
  ];

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [orders, activeFilter]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      setError(err.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const applyFilter = () => {
    let filtered = orders;
    
    if (activeFilter !== 'all') {
      filtered = orders.filter(order => order.status === activeFilter);
    }
    
    setFilteredOrders(filtered);
    
    // Update filter counts
    filters.forEach(filter => {
      if (filter.id === 'all') {
        filter.count = orders.length;
      } else {
        filter.count = orders.filter(order => order.status === filter.id).length;
      }
    });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Orders
          </h1>
          <p className="text-gray-600">
            Track and manage your service orders
          </p>
        </div>
        <Loading type="orders" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Orders
          </h1>
          <p className="text-gray-600">
            Track and manage your service orders
          </p>
        </div>
        <Error 
          message={error} 
          onRetry={loadOrders}
          type="orders"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          My Orders
        </h1>
        <p className="text-gray-600">
          Track and manage your service orders
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {filters.map(filter => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter(filter.id)}
              className="flex items-center gap-2"
            >
              {filter.label}
              <Badge 
                variant={activeFilter === filter.id ? 'default' : 'secondary'}
                size="sm"
                className="bg-white bg-opacity-20"
              >
                {filter.count}
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <Empty 
          type="orders"
          title={activeFilter === 'all' ? 'No orders yet' : `No ${activeFilter} orders`}
          description={
            activeFilter === 'all' 
              ? 'When you purchase services, they\'ll appear here. Start by browsing our marketplace.'
              : `You don't have any ${activeFilter} orders at the moment.`
          }
          onAction={() => window.location.href = '/browse'}
        />
      ) : (
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {filteredOrders.map((order, index) => (
            <motion.div
              key={order.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <OrderCard order={order} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Orders;