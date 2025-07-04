import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ServiceCard from '@/components/molecules/ServiceCard';
import FilterSidebar from '@/components/molecules/FilterSidebar';
import SearchBar from '@/components/molecules/SearchBar';
import Button from '@/components/atoms/Button';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { getServices } from '@/services/api/serviceService';

const BrowseServices = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    categories: searchParams.get('category') ? [searchParams.get('category')] : [],
    priceRange: null,
    deliveryTime: null,
    minRating: null
  });

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  useEffect(() => {
    loadServices();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [services, filters, searchTerm, sortBy]);

  const loadServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getServices();
      setServices(data);
    } catch (err) {
      setError(err.message || 'Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...services];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(service => 
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(service => 
        filters.categories.includes(service.category)
      );
    }

    // Apply price range filter
    if (filters.priceRange) {
      filtered = filtered.filter(service => {
        const minPrice = Math.min(...service.packages.map(p => p.price));
        return minPrice >= filters.priceRange.min && 
               (filters.priceRange.max === Infinity || minPrice <= filters.priceRange.max);
      });
    }

    // Apply delivery time filter
    if (filters.deliveryTime) {
      filtered = filtered.filter(service => 
        service.deliveryTime <= filters.deliveryTime
      );
    }

    // Apply rating filter
    if (filters.minRating) {
      filtered = filtered.filter(service => 
        service.rating >= filters.minRating
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return Math.min(...a.packages.map(p => p.price)) - Math.min(...b.packages.map(p => p.price));
        case 'price-high':
          return Math.min(...b.packages.map(p => p.price)) - Math.min(...a.packages.map(p => p.price));
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'delivery':
          return a.deliveryTime - b.deliveryTime;
        default:
          return 0;
      }
    });

    setFilteredServices(filtered);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      if (term) {
        newParams.set('search', term);
      } else {
        newParams.delete('search');
      }
      return newParams;
    });
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const sortOptions = [
    { value: 'rating', label: 'Best Rating' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' },
    { value: 'delivery', label: 'Fastest Delivery' }
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Browse Services
          </h1>
          <SearchBar onSearch={handleSearch} />
        </div>
        <Loading type="services" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Browse Services
          </h1>
          <SearchBar onSearch={handleSearch} />
        </div>
        <Error 
          message={error} 
          onRetry={loadServices}
          type="services"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Browse Services
        </h1>
        <SearchBar 
          onSearch={handleSearch} 
          placeholder="Search services..."
        />
      </div>

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <Button 
          variant="outline" 
          onClick={() => setShowFilters(!showFilters)}
          icon={showFilters ? "X" : "Filter"}
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`w-full lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <FilterSidebar 
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />
        </div>

        {/* Services Grid */}
        <div className="flex-1">
          {/* Sort and Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="text-gray-600">
              {filteredServices.length} services found
              {searchTerm && (
                <span className="ml-2">
                  for "<span className="font-medium">{searchTerm}</span>"
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <ApperIcon name="Filter" size={20} />
              </Button>
            </div>
          </div>

          {/* Services Grid */}
          {filteredServices.length === 0 ? (
            <Empty 
              type="services"
              title="No services found"
              description="Try adjusting your search terms or filters to find what you're looking for."
              onAction={() => {
                setSearchTerm('');
                setFilters({
                  categories: [],
                  priceRange: null,
                  deliveryTime: null,
                  minRating: null
                });
              }}
              action="Clear Filters"
            />
          ) : (
            <motion.div 
              className="services-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ServiceCard service={service} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseServices;