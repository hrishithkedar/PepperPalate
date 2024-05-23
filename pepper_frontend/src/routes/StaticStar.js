import React from 'react';
import PropTypes from 'prop-types';

const StaticStarRating = ({ rating, className }) => {
  const renderStar = (index) => {
    const starValue = index + 1;
    if (starValue <= rating) {
      return "★"; // Fully filled star
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
            style={{ color: renderStar(index) === "★" ? 'gold' : 'grey' }}
          >
            {renderStar(index)}
          </span>
        );
      })}
    </div>
  );
};

StaticStarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  className: PropTypes.string
};

StaticStarRating.defaultProps = {
  className: ""
};

export default StaticStarRating;
