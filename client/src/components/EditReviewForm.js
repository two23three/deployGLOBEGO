import React, { useState } from 'react';
import axios from 'axios';

const EditReviewForm = ({ review, onReviewUpdated }) => {
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const jwtToken = localStorage.getItem('jwt_token');
    if (!jwtToken) {
      alert("JWT token is missing. Please log in again.");
      return;
    }

    try {
      const response = await axios.patch(`/traveler/user_reviews/${review.id}`, {
        rating,
        comment
      }, {
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'Content-Type': 'application/json' 
        }
      });

      if (response.status === 200) {
        onReviewUpdated();
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error updating review:', error);
      alert('Failed to update review. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Rating:
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="5"
          required
        />
      </label>
      <label>
        Comment:
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </label>
      <button type="submit">Update Review</button>
    </form>
  );
};

export default EditReviewForm;
