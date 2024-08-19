import { Link } from 'react-router-dom';
const Detailapartment = ({ apartmentDetails }) => {

    return (
        <>
            <div className="apartment-details">
                <h1>{apartmentDetails.name}</h1>
                <div style={{display:'grid', gap:'10px',gridTemplateColumns:'repeat(auto-fit, minmax(300px , 1fr )  '}}>
                    {apartmentDetails.images.map((image, index) =>
                        <img style={{width:'100%'}} src={image} key={index} alt={apartmentDetails.name} />
                    )}
                </div>
                <p>{apartmentDetails.description}</p>
                <div className="apartment-location">
                    <h3>Location:</h3>
                    <p>{apartmentDetails.location.address}, {apartmentDetails.location.city}, {apartmentDetails.location.state} {apartmentDetails.location.zipcode}, {apartmentDetails.location.country}</p>
                </div>
                <div className="apartment-price">
                    <h3>Price:</h3>
                    <p>${apartmentDetails.price}</p>
                </div>
                <div className="apartment-features">
                    <h3>Features:</h3>
                    <ul>
                        <li>Area: {apartmentDetails.features.area}</li>
                        <li>Bedrooms: {apartmentDetails.features.bedrooms}</li>
                        <li>Bathrooms: {apartmentDetails.features.bathrooms}</li>
                        <li>Balconies: {apartmentDetails.features.balconies}</li>
                        <li>Floor: {apartmentDetails.features.floor}</li>
                        <li>Furnishing: {apartmentDetails.features.furnishing}</li>
                        <li>Parking: {apartmentDetails.features.parking}</li>
                    </ul>
                </div>
                <div className="apartment-amenities">
                    <h3>Amenities:</h3>
                    <ul>
                        {apartmentDetails.amenities.map((amenity, index) => (
                            <li key={index}>{amenity}</li>
                        ))}
                    </ul>
                </div>
                <div className="apartment-contact">
                    <h3>Contact Info:</h3>
                    <p>{apartmentDetails.contactInfo}</p>
                    <p>{apartmentDetails.contactInfo}</p>
                </div>
                <div className="apartment-nearby-facilities">
                    <h3>Nearby Facilities:</h3>
                    <div>
                        <h4>Shopping Malls:</h4>
                        <ul>
                            {apartmentDetails.nearbyFacilities.shoppingMalls.map((mall, index) => (
                                <li key={index}>{mall}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4>Schools:</h4>
                        <ul>
                            {apartmentDetails.nearbyFacilities.schools.map((school, index) => (
                                <li key={index}>{school}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4>Hospitals:</h4>
                        <ul>
                            {apartmentDetails.nearbyFacilities.hospitals.map((hospital, index) => (
                                <li key={index}>{hospital}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4>Public Transport:</h4>
                        <ul>
                            {apartmentDetails.nearbyFacilities.publicTransport.map((transport, index) => (
                                <li key={index}>{transport}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                {apartmentDetails.videoTour && (
                    <div className="apartment-video-tour">
                        <h3>Video Tour:</h3>
                        <iframe
                            src={'https://www.youtube.com/watch?v=H-5SY_AVpyQ'}
                            title="Video Tour"
                            width="100%"
                            height="500px"
                            style={{ border: '0', borderRadius: '10px', boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.15)' }}
                            allowFullScreen
                        ></iframe>
                <div>
                <Link to={`../bookingFormSchema`}>  
              <button className="schedule-visit-btn" >Hẹn lịch xem phòng</button>
        </Link>
                    </div>
                    </div>
                   
                )}
            </div>
            <style jsx>{`
                .schedule-visit-btn {
                    display: inline-block;
                    margin-top: 20px;
                    padding: 12px 30px;
                    background-color: #28a745;
                    color: #fff;
                    font-size: 18px;
                    font-weight: 600;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: background-color 0.3s, transform 0.3s;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }

                .schedule-visit-btn:hover {
                    background-color: #218838;
                    transform: translateY(-2px);
                }

                .schedule-visit-btn:active {
                    transform: translateY(1px);
                }

                .schedule-visit-btn:focus {
                    outline: none;
                    box-shadow: 0 0 10px rgba(40, 167, 69, 0.5);
                }
            `}</style>
        </>
    )
}

export default Detailapartment;