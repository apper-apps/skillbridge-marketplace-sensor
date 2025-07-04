import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Avatar from '@/components/atoms/Avatar';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import StarRating from '@/components/atoms/StarRating';
import ServiceCard from '@/components/molecules/ServiceCard';
import ReviewCard from '@/components/molecules/ReviewCard';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { getUserProfile } from '@/services/api/userService';
import { getServicesBySeller } from '@/services/api/serviceService';
import { getReviewsByUser } from '@/services/api/reviewService';

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('services');

  useEffect(() => {
    loadUserProfile();
  }, [id]);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const userData = await getUserProfile(parseInt(id));
      setUser(userData);
      
      if (userData.userType === 'seller' || userData.userType === 'both') {
        const servicesData = await getServicesBySeller(parseInt(id));
        setServices(servicesData);
      }
      
      const reviewsData = await getReviewsByUser(parseInt(id));
      setReviews(reviewsData);
      
    } catch (err) {
      setError(err.message || 'Failed to load user profile');
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
          onRetry={loadUserProfile}
          type="profile"
        />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Error 
          message="User not found" 
          type="profile"
        />
      </div>
    );
  }

  const tabs = [
    { id: 'services', label: 'Services', icon: 'Grid', count: services.length },
    { id: 'reviews', label: 'Reviews', icon: 'Star', count: reviews.length },
    { id: 'about', label: 'About', icon: 'User' }
  ];

  const stats = [
    { label: 'Total Reviews', value: user.reviewCount, icon: 'Star' },
    { label: 'Active Services', value: services.length, icon: 'Grid' },
    { label: 'Response Time', value: user.responseTime || '1 hour', icon: 'Clock' },
    { label: 'Member Since', value: new Date(user.joinDate).getFullYear(), icon: 'Calendar' }
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
            online={user.online}
          />
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {user.name}
            </h1>
            <p className="text-gray-600 mb-4">
              {user.bio || 'Professional freelancer on SkillBridge'}
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
                <ApperIcon name="MapPin" size={16} />
                <span>{user.location || 'Global'}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="primary" 
                size="sm"
                icon="MessageCircle"
              >
                Contact Me
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                icon="Heart"
              >
                Follow
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
                {tab.count !== undefined && (
                  <Badge variant="secondary" size="sm">
                    {tab.count}
                  </Badge>
                )}
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
        {activeTab === 'services' && (
          <div>
            {services.length === 0 ? (
              <Empty 
                title="No services yet"
                description="This user hasn't created any services yet."
                icon="Grid"
              />
            ) : (
              <div className="services-grid">
                {services.map((service, index) => (
                  <motion.div
                    key={service.Id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ServiceCard service={service} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            {reviews.length === 0 ? (
              <Empty 
                title="No reviews yet"
                description="This user hasn't received any reviews yet."
                icon="Star"
              />
            ) : (
              reviews.map((review, index) => (
                <motion.div
                  key={review.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ReviewCard review={review} />
                </motion.div>
              ))
            )}
          </div>
        )}

        {activeTab === 'about' && (
          <div className="bg-white rounded-card p-6 shadow-soft">
            <h3 className="text-lg font-semibold mb-6">About {user.name}</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Bio</h4>
                <p className="text-gray-600 leading-relaxed">
                  {user.bio || 'This user hasn\'t added a bio yet.'}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {user.skills?.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  )) || (
                    <p className="text-gray-600">No skills listed</p>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {user.languages?.map((language, index) => (
                    <Badge key={index} variant="primary">
                      {language}
                    </Badge>
                  )) || (
                    <p className="text-gray-600">No languages listed</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default UserProfile;