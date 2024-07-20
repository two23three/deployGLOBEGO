import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwt_token');
    if (!jwtToken) {
      alert("JWT token is missing. Please log in again.");
      return;
    }

    axios.get('https://globe-gooo.onrender.com/traveler/user_tickets', {
      headers: {
        'Authorization': `Bearer ${jwtToken}`
      }
    })
      .then(response => {
        console.log(response.data);  // Log the response data for inspection
        setTickets(response.data.flat());  // Flatten the nested array
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching tickets:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <h1>My Tickets</h1>
      {tickets.length > 0 ? (
        <ul className="ticket-list">
          {tickets.map(ticket => (
            <li key={ticket.id}>
              <p>Ticket ID: {ticket.id}</p>
              <p>Location ID: {ticket.location_id}</p>
              <p>Price: {ticket.price}</p>
              <p>Means: {ticket.means}</p>
              <p>Seat No: {ticket.seat_no}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have not bought any tickets yet.</p>
      )}
    </div>
  );
};

export default Profile;
