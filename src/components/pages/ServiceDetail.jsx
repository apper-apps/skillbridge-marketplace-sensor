import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Avatar from '@/components/atoms/Avatar';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import StarRating from '@/components/atoms/StarRating';
import ReviewCard from '@/components/molecules/ReviewCard';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import { getServiceById } from '@/services/api/serviceService';
import { getReviews } from '@/services/api/reviewService';
import { createOrder } from '@/services/api/orderService';

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    loadServiceDetail();
  }, [id]);

  const loadServiceDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const serviceData = await getServiceById(parseInt(id));
      setService(serviceData);
      
      const reviewsData = await getReviews(parseInt(id));
      setReviews(reviewsData);
      
    } catch (err) {
      setError(err.message || 'Failed to load service details');
    } finally {
      setLoading(false);
    }
  };

  const handleOrderNow = async () => {
    if (!service) return;
    
    try {
      const selectedPkg = service.packages[selectedPackage];
      const order = await createOrder({
        serviceId: service.Id,
        package: selectedPkg.name,
        price: selectedPkg.price,
        deliveryTime: selectedPkg.deliveryTime
      });
      
      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch (err) {
      toast.error(err.message || 'Failed to place order');
    }
  };

  const handleContactSeller = () => {
    navigate(`/messages?user=${service.sellerId}`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
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
          onRetry={loadServiceDetail}
          type="services"
        />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Error 
          message="Service not found" 
          type="services"
        />
      </div>
    );
  }

  const tabs = [
    { id: 'description', label: 'Description', icon: 'FileText' },
    { id: 'reviews', label: 'Reviews', icon: 'Star' },
    { id: 'faq', label: 'FAQ', icon: 'HelpCircle' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <button 
              onClick={() => navigate('/browse')}
              className="hover:text-primary"
            >
              Browse Services
            </button>
          </li>
          <li><ApperIcon name="ChevronRight" size={16} /></li>
          <li>
            <button 
              onClick={() => navigate(`/browse?category=${service.category}`)}
              className="hover:text-primary"
            >
              {service.category}
            </button>
          </li>
          <li><ApperIcon name="ChevronRight" size={16} /></li>
          <li className="text-gray-900 font-medium">
            {service.title}
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Service Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="primary">
                {service.category}
              </Badge>
              <div className="flex items-center gap-1">
                <StarRating rating={service.rating} size={16} />
                <span className="text-sm text-gray-600">
                  {service.rating} ({service.reviewCount} reviews)
                </span>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {service.title}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <Avatar 
                src={service.seller?.avatar} 
                name={service.seller?.name}
                size="md"
              />
              <div>
                <button 
                  onClick={() => navigate(`/user/${service.sellerId}`)}
                  className="font-medium text-gray-900 hover:text-primary"
                >
                  {service.seller?.name}
                </button>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Level {service.seller?.level || 2} Seller</span>
                  <span>•</span>
                  <span>{service.seller?.responseTime || '1 hour'} response time</span>
                </div>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="mb-8">
            <div className="relative mb-4">
              <img 
                src={service.images[selectedImageIndex]} 
                alt={service.title}
                className="w-full h-80 object-cover rounded-card"
              />
              <button className="absolute top-4 right-4 w-10 h-10 bg-white bg-opacity-80 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-200">
                <ApperIcon name="Heart" size={20} className="text-gray-600" />
              </button>
            </div>
            
            <div className="flex gap-2 overflow-x-auto">
              {service.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImageIndex === index 
                      ? 'border-primary' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${service.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200 mb-6">
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
                    {tab.id === 'reviews' && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                        {reviews.length}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="min-h-96">
              {activeTab === 'description' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="prose max-w-none"
                >
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  
                  <h3 className="text-lg font-semibold mb-4">What you'll get:</h3>
                  <ul className="space-y-2 mb-6">
                    {service.packages[selectedPackage]?.features?.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <ApperIcon name="Check" size={16} className="text-secondary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <h3 className="text-lg font-semibold mb-4">Tags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {reviews.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-600">No reviews yet</p>
                    </div>
                  ) : (
                    reviews.map(review => (
                      <ReviewCard key={review.Id} review={review} />
                    ))
                  )}
                </motion.div>
              )}

              {activeTab === 'faq' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="text-center py-8">
                    <p className="text-gray-600">FAQ content coming soon</p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            {/* Package Selection */}
            <div className="bg-white rounded-card p-6 shadow-soft">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Choose Package</h3>
                <div className="flex items-center gap-1">
                  <ApperIcon name="Clock" size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {service.packages[selectedPackage]?.deliveryTime} days delivery
                  </span>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                {service.packages.map((pkg, index) => (
                  <div
                    key={index}
                    className={`package-card ${selectedPackage === index ? 'selected' : ''} ${index === 1 ? 'popular' : ''}`}
                    onClick={() => setSelectedPackage(index)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{pkg.name}</h4>
                      <span className="text-lg font-bold text-primary">
                        {formatPrice(pkg.price)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {pkg.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <ApperIcon name="Clock" size={14} />
                        {pkg.deliveryTime} days
                      </span>
                      <span className="flex items-center gap-1">
                        <ApperIcon name="RotateCcw" size={14} />
                        {pkg.revisions} revisions
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3">
                <Button 
                  variant="primary" 
                  size="md" 
                  onClick={handleOrderNow}
                  className="w-full"
                >
                  Order Now - {formatPrice(service.packages[selectedPackage]?.price)}
                </Button>
                
                <Button 
                  variant="outline" 
                  size="md" 
                  onClick={handleContactSeller}
                  className="w-full"
                  icon="MessageCircle"
                >
                  Contact Seller
                </Button>
              </div>
            </div>

            {/* Seller Info */}
            <div className="bg-white rounded-card p-6 shadow-soft">
              <h3 className="text-lg font-semibold mb-4">About the Seller</h3>
              
              <div className="flex items-center gap-4 mb-4">
                <Avatar 
                  src={service.seller?.avatar} 
                  name={service.seller?.name}
                  size="lg"
                />
                <div>
                  <h4 className="font-medium text-gray-900">
                    {service.seller?.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    Level {service.seller?.level || 2} Seller
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <StarRating rating={service.seller?.rating || 4.8} size={14} />
                    <span className="text-sm text-gray-600">
                      ({service.seller?.reviewCount || 245})
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Response time</span>
                  <span className="text-sm font-medium">
                    {service.seller?.responseTime || '1 hour'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Recent delivery</span>
                  <span className="text-sm font-medium">
                    {service.seller?.recentDelivery || '2 days'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Orders in queue</span>
                  <span className="text-sm font-medium">
                    {service.seller?.ordersInQueue || 3}
                  </span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate(`/user/${service.sellerId}`)}
                className="w-full mt-4"
              >
                View Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;