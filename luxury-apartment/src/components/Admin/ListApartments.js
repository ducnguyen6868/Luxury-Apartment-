// src/components/ApartmentDetails.js
// import {Link} from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../../css/ListApartments.css';

const ListApartments = ({ apartment }) => {
  return (
    <div className="apartment-details">
      {/* {apartment.images.map((image, index) => (
        <image key={index} src={image} alt="Product View"/>
      ))} */}
      <img  className="apartment-image"src={`../../${apartment.images[0]}`} alt="Product View"/>
      <h2 className="apartment-name">{apartment.name}</h2>
      <p className="apartment-description">{apartment.description}</p>

      <h3 className="apartment-location-title">Location</h3>
      <p className="apartment-address">{apartment.location.address}</p>
      <p className="apartment-city">{apartment.location.city}, {apartment.location.state} {apartment.location.zipcode}</p>
      <p className="apartment-country">{apartment.location.country}</p>

      <h3 className="apartment-price-title">Price</h3>
      <p className="apartment-price">${apartment.price.toLocaleString()}</p>
      <p style={{textAlign:'center', margin:'20px 0px'}}>
        <Link to={`${apartment._id}`}style={{textDecoration:'none', backgroundColor:'green', padding:'5px 40px', fontSize:'large', color:'white',borderRadius:'10px'}}>View Details</Link>
        
      </p>
     </div>
    
  );
};

export default ListApartments;
