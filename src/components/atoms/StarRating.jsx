import ApperIcon from '@/components/ApperIcon';

const StarRating = ({ 
  rating = 0, 
  maxRating = 5, 
  size = 16, 
  readonly = true,
  onRatingChange,
  className = '' 
}) => {
  const handleStarClick = (starIndex) => {
    if (!readonly && onRatingChange) {
      onRatingChange(starIndex + 1);
    }
  };

  return (
    <div className={`star-rating ${className}`}>
      {[...Array(maxRating)].map((_, index) => {
        const isFilled = index < rating;
        const isPartiallyFilled = index < rating && rating % 1 !== 0 && index === Math.floor(rating);
        
        return (
          <button
            key={index}
            type="button"
            onClick={() => handleStarClick(index)}
            disabled={readonly}
            className={`star ${isFilled ? 'text-yellow-400' : 'text-gray-300'} ${!readonly ? 'cursor-pointer hover:text-yellow-400' : 'cursor-default'}`}
          >
            <ApperIcon 
              name={isFilled ? 'Star' : 'Star'} 
              size={size}
              fill={isFilled ? 'currentColor' : 'none'}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;