// src/components/ApartmentDetails.js
import React from 'react';
import '../css/ApartmentDetails.css';
const ApartmentDetails = ({ apartment }) => {
  return (
    <div className="apartment-details">
      {/* {apartment.images.map((image, index) => (
        <image key={index} src={image} alt="Product View"/>
      ))} */}
      <img  className="apartment-image"src={apartment.images[0]} alt="Product View"/>
      <h2 className="apartment-name">{apartment.name}</h2>
      <p className="apartment-description">{apartment.description}</p>

      <h3 className="apartment-location-title">Location</h3>
      <p className="apartment-address">{apartment.location.address}</p>
      <p className="apartment-city">{apartment.location.city}, {apartment.location.state} {apartment.location.zipcode}</p>
      <p className="apartment-country">{apartment.location.country}</p>

      <h3 className="apartment-price-title">Price</h3>
      <p className="apartment-price">${apartment.price.toLocaleString()}</p>

      <h3 className="apartment-features-title">Features</h3>
      <ul className="apartment-features">
        <li className="apartment-feature">Area: {apartment.features.area}</li>
        <li className="apartment-feature">Bedrooms: {apartment.features.bedrooms}</li>
        <li className="apartment-feature">Bathrooms: {apartment.features.bathrooms}</li>
        <li className="apartment-feature">Balconies: {apartment.features.balconies}</li>
        <li className="apartment-feature">Floor: {apartment.features.floor}</li>
        <li className="apartment-feature">Furnishing: {apartment.features.furnishing}</li>
        <li className="apartment-feature">Parking: {apartment.features.parking}</li>
      </ul>
      <div className="visit-apartment">
        <button className="visit-button">Visit Apartment</button>
      </div>
    </div>
  );
};

export default ApartmentDetails;
