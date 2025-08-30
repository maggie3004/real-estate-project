import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiStar, 
  FiUser, 
  FiCalendar, 
  FiThumbsUp, 
  FiMessageSquare,
  FiEdit3,
  FiTrash2,
  FiCheckCircle,
  FiFlag
} from 'react-icons/fi';

const ReviewCard = ({ review, onHelpful, onDelete, onEdit }) => {
  const [showFullComment, setShowFullComment] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleHelpfulClick = () => {
    if (!hasVoted) {
      onHelpful(review.id);
      setHasVoted(true);
    }
  };

  const truncateText = (text, maxLength = 200) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const shouldTruncate = review.comment.length > 200;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          {/* User Avatar */}
                          <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
            {review.name ? review.name.charAt(0).toUpperCase() : 'A'}
          </div>

          {/* User Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-gray-900">
                {review.name || 'Anonymous'}
              </h4>
              {review.verified && (
                <FiCheckCircle className="w-4 h-4 text-green-500" title="Verified Reviewer" />
              )}
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <FiCalendar className="w-4 h-4" />
                <span>{formatDate(review.date)}</span>
              </div>
              {review.email && (
                <span className="text-gray-400">•</span>
              )}
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <FiStar
              key={star}
              className={`w-4 h-4 ${
                star <= review.rating 
                  ? 'text-yellow-400 fill-current' 
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="ml-2 text-sm font-medium text-gray-700">
            {review.rating}/5
          </span>
        </div>
      </div>

      {/* Review Title */}
      <h5 className="text-lg font-semibold text-gray-900 mb-3">
        {review.title}
      </h5>

      {/* Review Comment */}
      <div className="mb-4">
        <p className="text-gray-700 leading-relaxed">
          {showFullComment ? review.comment : truncateText(review.comment)}
        </p>
        {shouldTruncate && (
          <button
            onClick={() => setShowFullComment(!showFullComment)}
                            className="text-red-600 hover:text-red-700 font-medium text-sm mt-2 transition-colors duration-200"
          >
            {showFullComment ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>

      {/* Review Stats */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4">
          {/* Helpful Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleHelpfulClick}
            disabled={hasVoted}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              hasVoted
                ? 'bg-green-100 text-green-700 cursor-default'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FiThumbsUp className={`w-4 h-4 ${hasVoted ? 'fill-current' : ''}`} />
            <span>
              {hasVoted ? 'Thanked' : 'Helpful'} 
              {review.helpful > 0 && ` (${review.helpful})`}
            </span>
          </motion.button>

          {/* Report Button */}
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200">
            <FiFlag className="w-4 h-4" />
            <span>Report</span>
          </button>
        </div>

        {/* Action Buttons (for admin/owner) */}
        {(onEdit || onDelete) && (
          <div className="flex items-center gap-2">
            {onEdit && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onEdit(review)}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                title="Edit Review"
              >
                <FiEdit3 className="w-4 h-4" />
              </motion.button>
            )}
            
            {onDelete && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onDelete(review.id)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                title="Delete Review"
              >
                <FiTrash2 className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        )}
      </div>

      {/* Review Tags (if any) */}
      {review.tags && review.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
          {review.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Review Images (if any) */}
      {review.images && review.images.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex gap-2 overflow-x-auto">
            {review.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Review image ${index + 1}`}
                className="w-20 h-20 object-cover rounded-lg border border-gray-200"
              />
            ))}
          </div>
        </div>
      )}

      {/* Response from Owner (if any) */}
      {review.ownerResponse && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
              O
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-blue-900">Property Owner</span>
                <span className="text-xs text-blue-600">Response</span>
              </div>
              <p className="text-blue-800 text-sm leading-relaxed">
                {review.ownerResponse}
              </p>
              <span className="text-xs text-blue-600 mt-2 block">
                {formatDate(review.ownerResponseDate)}
              </span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ReviewCard; 