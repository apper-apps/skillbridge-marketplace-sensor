import { format } from 'date-fns';
import Avatar from '@/components/atoms/Avatar';
import StarRating from '@/components/atoms/StarRating';

const ReviewCard = ({ review, className = '' }) => {
  const formatDate = (date) => {
    return format(new Date(date), 'MMM dd, yyyy');
  };

  return (
    <div className={`review-card ${className}`}>
      <div className="review-header">
        <Avatar 
          src={review.reviewer?.avatar} 
          name={review.reviewer?.name}
          size="md"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-800">
              {review.reviewer?.name}
            </h4>
            <StarRating rating={review.rating} size={16} />
          </div>
          <p className="text-sm text-gray-600">
            {review.reviewer?.country}
          </p>
        </div>
      </div>
      
      <div className="review-content">
        {review.comment}
      </div>
      
      <div className="review-date">
        {formatDate(review.createdAt)}
      </div>
    </div>
  );
};

export default ReviewCard;