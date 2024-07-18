import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReviewForm from './ReviewForm';
import './LocationDetails.css';

const LocationDetails = () => {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    axios.get(`/traveler/locations/${id}`)
      .then(response => {
        setLocation(response.data);
        setReviews(response.data.reviews);
      })
      .catch(error => {
        console.error('Error fetching location details:', error);
      });
  }, [id]);

  useEffect(() => {
    fetch('/traveler/tickets')
      .then(response => response.json())
      .then(data => setTickets(data))
      .catch(error => console.error('Error fetching tickets:', error));
  }, []);

  const buyTicket = async () => {
    if (!selectedTicket) {
      alert("Please select a ticket to buy.");
      return;
    }

    const selectedTicketData = tickets.find(ticket => ticket.id === parseInt(selectedTicket));
    if (!selectedTicketData) {
      alert("Selected ticket data not found.");
      return;
    }

    const { location_id, price, means, seat_no } = selectedTicketData;
    const ticketData = { location_id, price, means, seat_no, ticket_id: selectedTicket };

    const jwtToken = localStorage.getItem('jwt_token');
    if (!jwtToken) {
      alert("JWT token is missing. Please log in again.");
      return;
    }

    try {
      const response = await fetch('/traveler/buy_ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify(ticketData)
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error buying ticket:', error);
    }
  };

  const handleReviewPosted = () => {
    axios.get(`/traveler/locations/${id}`)
      .then(response => {
        setReviews(response.data.reviews);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  };

  if (!location) return <div>Loading...</div>;

  return (
    <div className="location-details">
      <h1>{location.name}</h1>
      <p>{location.description}</p>
      <h3>Available Tickets</h3>
      <select onChange={(e) => setSelectedTicket(e.target.value)}>
        <option value="">Select a ticket</option>
        {tickets.map(ticket => (
          <option key={ticket.id} value={ticket.id}>
            {`Ticket ID: ${ticket.id}, Price: ${ticket.price}, Means: ${ticket.means}, Seat No: ${ticket.seat_no}, Location ID: ${ticket.location_id}`}
          </option>
        ))}
      </select>
      <button onClick={buyTicket}>Buy Ticket</button>

      <h2>Reviews</h2>
      {reviews.length > 0 ? (
        <ul className="review-list">
          {reviews.map(review => (
            <li key={review.id}>
              <p>Rating: {review.rating}</p>
              <p>{review.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet</p>
      )}
      <ReviewForm locationId={id} onReviewPosted={handleReviewPosted} />
    </div>
  );
};

export default LocationDetails;
