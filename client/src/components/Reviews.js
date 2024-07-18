import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditReviewForm from './EditReviewForm.js';  

const UserReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingReviewId, setEditingReviewId] = useState(null);

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        const token = localStorage.getItem('jwt_token');
        if (!token) {
          console.error('User is not authenticated');
          return;
        }

        const response = await axios.get('/traveler/user_reviews', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setReviews(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user reviews:', error);
        setLoading(false);
      }
    };

    fetchUserReviews();
  }, []);

  const handleDeleteReview = async (reviewId) => {
    try {
      const token = localStorage.getItem('jwt_token');
      if (!token) {
        console.error('User is not authenticated');
        return;
      }

      await axios.delete(`/traveler/user_reviews/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setReviews(reviews.filter(review => review.id !== reviewId));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const handleReviewUpdated = () => {
    setEditingReviewId(null);
    axios.get('/traveler/user_reviews', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
      }
    })
    .then(response => setReviews(response.data))
    .catch(error => console.error('Error fetching user reviews:', error));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Your Reviews</h2>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              {editingReviewId === review.id ? (
                <EditReviewForm review={review} onReviewUpdated={handleReviewUpdated} />
              ) : (
                <>
                  <p>Rating: {review.rating}</p>
                  <p>{review.comment}</p>
                  {review.location && (
                    <div>
                      <p>Location:</p>
                      <p>Name: {review.location.name}</p>
                      {review.location.image_url && (
                        <img src={review.location.image_url} alt={review.location.name} style={{ maxWidth: '100px' }} />
                      )}
                    </div>
                  )}
                  <button onClick={() => setEditingReviewId(review.id)}>Edit</button>
                  <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews found</p>
      )}
    </div>
  );
};

export default UserReviews;
