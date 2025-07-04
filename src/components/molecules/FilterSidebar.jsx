import { useState } from 'react';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const FilterSidebar = ({ filters, onFiltersChange, className = '' }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const categories = [
    'Design', 'Writing', 'Programming', 'Marketing', 'Video', 'Music'
  ];

  const priceRanges = [
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $250', min: 100, max: 250 },
    { label: '$250 - $500', min: 250, max: 500 },
    { label: '$500+', min: 500, max: Infinity }
  ];

  const deliveryTimes = [
    { label: '24 hours', value: 1 },
    { label: '3 days', value: 3 },
    { label: '7 days', value: 7 },
    { label: '14 days', value: 14 },
    { label: '30 days', value: 30 }
  ];

  const ratings = [
    { label: '4.5+ stars', value: 4.5 },
    { label: '4.0+ stars', value: 4.0 },
    { label: '3.5+ stars', value: 3.5 },
    { label: '3.0+ stars', value: 3.0 }
  ];

  const handleCategoryChange = (category) => {
    const newCategories = localFilters.categories.includes(category)
      ? localFilters.categories.filter(c => c !== category)
      : [...localFilters.categories, category];
    
    setLocalFilters(prev => ({
      ...prev,
      categories: newCategories
    }));
  };

  const handlePriceRangeChange = (range) => {
    setLocalFilters(prev => ({
      ...prev,
      priceRange: prev.priceRange?.min === range.min && prev.priceRange?.max === range.max ? null : range
    }));
  };

  const handleDeliveryTimeChange = (time) => {
    setLocalFilters(prev => ({
      ...prev,
      deliveryTime: prev.deliveryTime === time ? null : time
    }));
  };

  const handleRatingChange = (rating) => {
    setLocalFilters(prev => ({
      ...prev,
      minRating: prev.minRating === rating ? null : rating
    }));
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      categories: [],
      priceRange: null,
      deliveryTime: null,
      minRating: null
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <div className={`filter-sidebar ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleClearFilters}
          className="text-gray-500 hover:text-primary"
        >
          Clear All
        </Button>
      </div>
      
      {/* Categories */}
      <div className="filter-group">
        <h4 className="filter-title">Categories</h4>
        <div className="space-y-2">
          {categories.map(category => (
            <label key={category} className="filter-option">
              <div 
                className={`filter-checkbox ${localFilters.categories.includes(category) ? 'checked' : ''}`}
                onClick={() => handleCategoryChange(category)}
              >
                {localFilters.categories.includes(category) && (
                  <ApperIcon name="Check" size={12} />
                )}
              </div>
              <span className="text-sm text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Price Range */}
      <div className="filter-group">
        <h4 className="filter-title">Price Range</h4>
        <div className="space-y-2">
          {priceRanges.map(range => (
            <label key={range.label} className="filter-option">
              <div 
                className={`filter-checkbox ${localFilters.priceRange?.min === range.min && localFilters.priceRange?.max === range.max ? 'checked' : ''}`}
                onClick={() => handlePriceRangeChange(range)}
              >
                {localFilters.priceRange?.min === range.min && localFilters.priceRange?.max === range.max && (
                  <ApperIcon name="Check" size={12} />
                )}
              </div>
              <span className="text-sm text-gray-700">{range.label}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Delivery Time */}
      <div className="filter-group">
        <h4 className="filter-title">Delivery Time</h4>
        <div className="space-y-2">
          {deliveryTimes.map(time => (
            <label key={time.value} className="filter-option">
              <div 
                className={`filter-checkbox ${localFilters.deliveryTime === time.value ? 'checked' : ''}`}
                onClick={() => handleDeliveryTimeChange(time.value)}
              >
                {localFilters.deliveryTime === time.value && (
                  <ApperIcon name="Check" size={12} />
                )}
              </div>
              <span className="text-sm text-gray-700">{time.label}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Rating */}
      <div className="filter-group">
        <h4 className="filter-title">Rating</h4>
        <div className="space-y-2">
          {ratings.map(rating => (
            <label key={rating.value} className="filter-option">
              <div 
                className={`filter-checkbox ${localFilters.minRating === rating.value ? 'checked' : ''}`}
                onClick={() => handleRatingChange(rating.value)}
              >
                {localFilters.minRating === rating.value && (
                  <ApperIcon name="Check" size={12} />
                )}
              </div>
              <span className="text-sm text-gray-700">{rating.label}</span>
            </label>
          ))}
        </div>
      </div>
      
      <Button 
        variant="primary" 
        size="md"
        onClick={handleApplyFilters}
        className="w-full mt-6"
      >
        Apply Filters
      </Button>
    </div>
  );
};

export default FilterSidebar;