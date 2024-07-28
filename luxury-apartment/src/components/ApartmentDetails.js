// src/components/ApartmentDetails.js
import React from 'react';

const ApartmentDetails = ({ apartment }) => {
  return (
    <div className="apartment-details">
      <h2>{apartment.name}</h2>
      <p>{apartment.description}</p>

      <h3>Location</h3>
      <p>{apartment.location.address}</p>
      <p>{apartment.location.city}, {apartment.location.state} {apartment.location.zipcode}</p>
      <p>{apartment.location.country}</p>

      <h3>Price</h3>
      <p>${apartment.price.toLocaleString()}</p>

      <h3>Features</h3>
      <ul>
        <li>Area: {apartment.features.area}</li>
        <li>Bedrooms: {apartment.features.bedrooms}</li>
        <li>Bathrooms: {apartment.features.bathrooms}</li>
        <li>Balconies: {apartment.features.balconies}</li>
        <li>Floor: {apartment.features.floor}</li>
        <li>Furnishing: {apartment.features.furnishing}</li>
        <li>Parking: {apartment.features.parking}</li>
      </ul>

      <h3>Amenities</h3>
      <ul>
        {apartment.amenities.map((amenity, index) => (
          <li key={index}>{amenity}</li>
        ))}
      </ul>

      <h3>Images</h3>
      <div className="images">
        {apartment.images.map((image, index) => (
          <img key={index} src={image} alt={`Image ${index + 1}`} />
        ))}
      </div>

      <h3>Video Tour</h3>
      <video width="600" controls>
        <source src={apartment.videoTour} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <h3>Nearby Facilities</h3>
      <h4>Shopping Malls</h4>
      <ul>
        {apartment.nearbyFacilities.shoppingMalls.map((mall, index) => (
          <li key={index}>{mall}</li>
        ))}
      </ul>
      <h4>Schools</h4>
      <ul>
        {apartment.nearbyFacilities.schools.map((school, index) => (
          <li key={index}>{school}</li>
        ))}
      </ul>
      <h4>Hospitals</h4>
      <ul>
        {apartment.nearbyFacilities.hospitals.map((hospital, index) => (
          <li key={index}>{hospital}</li>
        ))}
      </ul>
      <h4>Public Transport</h4>
      <ul>
        {apartment.nearbyFacilities.publicTransport.map((transport, index) => (
          <li key={index}>{transport}</li>
        ))}
      </ul>

      <h3>Contact Information</h3>
      <p>Agent Name: {apartment.contactInfo.agentName}</p>
      <p>Phone: {apartment.contactInfo.agentPhone}</p>
      <p>Email: <a href={`mailto:${apartment.contactInfo.agentEmail}`}>{apartment.contactInfo.agentEmail}</a></p>
    </div>
  );
};

export default ApartmentDetails;
