import { useEffect, useState } from 'react';
import ListApartments from '../components/ListApartments';
import Contact from '../components/Contact';
import Searching from '../components/SearchingApartments';
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
            <div className="main-banner">
                <div className="owl-carousel owl-banner">
                    <div className="item item-1">
                        <div className="header-text">
                            <span className="category">Toronto, <em>Canada</em></span>
                            <h2>Hurry!<br />Get the Best Villa for you</h2>
                        </div>
                    </div>
                    <div className="item item-2">
                        <div className="header-text">
                            <span className="category">Melbourne, <em>Australia</em></span>
                            <h2>Be Quick!<br />Get the best villa in town</h2>
                        </div>
                    </div>
                    <div className="item item-3">
                        <div className="header-text">
                            <span className="category">Miami, <em>South Florida</em></span>
                            <h2>Act Now!<br />Get the highest level penthouse</h2>
                        </div>
                    </div>

                </div>

            </div>
            <div className='section' style={{padding:'0 80px'}}>
                <div className='section-container'>
                    <p>| Properties</p>

                    <h2>We Provide The Best <br />Property You Like</h2>
                </div>
                {<Searching/>}
                <div>
                    <h3>Gợi ý cho bạn</h3>
                </div>
                <div className='section-products'>
                    
                    {apartments.length > 0 ? (
                        apartments.map(apartment => (
                            <ListApartments key={apartment._id} apartment={apartment} />

                        ))
                    ) : (
                        <p>Loading apartments...</p>
                    )}
                </div>
            </div>
            <Contact />

        </>
    );
};

export default Home;
