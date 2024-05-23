import React, { useState } from 'react';
import PropTypes from 'prop-types';

const StarRating = ({ rating: initialRating, onRatingChange,className }) => {
  const [rating, setRating] = useState(initialRating);

  const handleClick = (newRating) => {
    setRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  const renderStar = (index) => {
    const starValue = index + 1;
    if (starValue <= rating) {
      return "★"; // Fully filled star
    } else if (starValue - 0.5 <= rating && rating < starValue) {
      return "☆"; // Half-filled star
    } else {
      return "☆"; // Empty star
    }
  };

  return (
    <div className={className}>
      {[...Array(5)].map((_, index) => {
        return (
          <span
            key={index}
            style={{ cursor: 'pointer', color: renderStar(index) === "★" ? 'gold' : 'grey' }}
            onClick={() => handleClick(index + 1)}
          >
            {renderStar(index)}
          </span>
        );
      })}
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number,
  onRatingChange: PropTypes.func
};

StarRating.defaultProps = {
  rating: 0,
  onRatingChange: null
};

export default StarRating;
