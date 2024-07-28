import { useEffect, useState } from 'react';
import ApartmentDetails from '../components/ApartmentDetails';

const Home = () => {
    const [apartments, setApartments] = useState([]);

    useEffect(() => {
        const fetchApartments = async () => {
            try {
                const response = await fetch('http://localhost:5000');
                const json = await response.json();
                if (response.ok) {
                    setApartments(json);
                }
            } catch (error) {
                console.log('Error fetching apartments:', error);
            }
        };

        fetchApartments();
    }, []);

    return (
        <>
            <h1>Welcome to our Website !!!</h1>
            {apartments.length > 0 ? (
                apartments.map(apartment => (
                    <ApartmentDetails key={apartment._id} apartment={apartment} />
                    // <div key={apartment._id}>
                    //     <h2>{apartment.name}</h2>
                    //     <p>{apartment.description}</p>    
                    // </div>
                ))
            ) : (
                <p>Loading apartments...</p>
            )}
        </>
    );
};

export default Home;
