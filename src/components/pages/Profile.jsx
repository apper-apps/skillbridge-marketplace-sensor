import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Avatar from '@/components/atoms/Avatar';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import StarRating from '@/components/atoms/StarRating';
import ServiceCard from '@/components/molecules/ServiceCard';
import OrderCard from '@/components/molecules/OrderCard';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { getUserProfile } from '@/services/api/userService';
import { getOrders } from '@/services/api/orderService';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const userData = await getUserProfile(1); // Mock current user ID
      setUser(userData);
      
      const ordersData = await getOrders();
      setOrders(ordersData);
      
    } catch (err) {
      setError(err.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Loading type="profile" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Error 
          message={error} 
          onRetry={loadProfile}
          type="profile"
        />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Error 
          message="Profile not found" 
          type="profile"
        />
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'User' },
    { id: 'orders', label: 'Orders', icon: 'ShoppingBag' },
    { id: 'reviews', label: 'Reviews', icon: 'Star' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ];

  const stats = [
    { label: 'Total Orders', value: orders.length, icon: 'ShoppingBag' },
    { label: 'Active Orders', value: orders.filter(o => o.status === 'active').length, icon: 'Clock' },
    { label: 'Completed Orders', value: orders.filter(o => o.status === 'completed').length, icon: 'CheckCircle' },
    { label: 'Saved Services', value: 12, icon: 'Heart' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-card p-8 shadow-soft mb-8"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <Avatar 
            src={user.avatar} 
            name={user.name}
            size="xl"
          />
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {user.name}
            </h1>
            <p className="text-gray-600 mb-4">
              {user.bio || 'Welcome to SkillBridge! Connect with skilled professionals worldwide.'}
            </p>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
              <div className="flex items-center gap-2">
                <StarRating rating={user.rating} size={16} />
                <span className="text-sm text-gray-600">
                  {user.rating} ({user.reviewCount} reviews)
                </span>
              </div>
              
              <Badge variant="primary">
                {user.userType === 'both' ? 'Buyer & Seller' : user.userType}
              </Badge>
              
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <ApperIcon name="Calendar" size={16} />
                <span>Member since {new Date(user.joinDate).getFullYear()}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="primary" 
                size="sm"
                icon="Edit"
                onClick={() => setActiveTab('settings')}
              >
                Edit Profile
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                icon="Share"
              >
                Share Profile
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
      >
        {stats.map((stat, index) => (
          <div key={index} className="profile-stat">
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <ApperIcon name={stat.icon} size={16} className="text-white" />
              </div>
            </div>
            <span className="profile-stat-value">{stat.value}</span>
            <span className="profile-stat-label">{stat.label}</span>
          </div>
        ))}
      </motion.div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-600 hover:text-primary hover:border-gray-300'
                }`}
              >
                <ApperIcon name={tab.icon} size={16} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <motion.div 
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-96"
      >
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="bg-white rounded-card p-6 shadow-soft">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                    <ApperIcon name="ShoppingBag" size={16} className="text-green-800" />
                  </div>
                  <div>
                    <p className="font-medium">New order received</p>
                    <p className="text-sm text-gray-600">Logo Design for Tech Startup</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <ApperIcon name="MessageCircle" size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="font-medium">New message</p>
                    <p className="text-sm text-gray-600">From Sarah Johnson</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <Empty 
                type="orders"
                onAction={() => navigate('/browse')}
              />
            ) : (
              orders.slice(0, 5).map((order, index) => (
                <motion.div
                  key={order.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <OrderCard order={order} />
                </motion.div>
              ))
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <Empty 
              type="reviews"
              onAction={() => navigate('/browse')}
            />
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-card p-6 shadow-soft">
            <h3 className="text-lg font-semibold mb-6">Profile Settings</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    defaultValue={user.name}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input 
                    type="email" 
                    defaultValue={user.email}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea 
                  rows={4}
                  defaultValue={user.bio}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div className="flex gap-4">
                <Button variant="primary">
                  Save Changes
                </Button>
                <Button variant="outline">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;