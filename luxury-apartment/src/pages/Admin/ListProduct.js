import ListApartments from '../../components/Admin/ListApartments';
import { useState, useEffect } from 'react';
import axios from 'axios';
const AdminProduct = () => {
    const [apartments, setApartments] = useState([]);
    useEffect(() => {
        const getApartments = async () => {

            try {
                const response = await axios.get("http://localhost:5000");
                setApartments(response.data);
                console.log(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        getApartments();
    }, []);
    return (
        <>
            <h2>Danh sách căn hộ hiện tại</h2>

            <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr)' }}>
                {apartments.length > 0 ? (
                    apartments.map((apartment) => (
                        <ListApartments key={apartment._id} apartment={apartment} />
                    ))
                ) : (
                    <p>Loadding apartments ...</p>
                )}
            </div>

        </>
    )
}
export default AdminProduct;