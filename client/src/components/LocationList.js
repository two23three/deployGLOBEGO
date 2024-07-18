import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LocationsList.css'; 

const LocationList = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    console.log("Fetching locations...");
    fetch('/traveler/locations')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Fetched data:", data);
        setLocations(data);
      })
      .catch(error => console.error('Error fetching locations:', error));
  }, []);

  return (
    <div className="location-list">
      <h2>Locations</h2>
      <ul>
        {locations.map(location => (
          <li key={location.id} className="location-item">
            <h3>{location.name}</h3>
            <img src={location.image_url} alt={location.name} />
            <p>{location.description}</p>
            <Link to={`/location/${location.id}`} className="view-details">View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationList;
