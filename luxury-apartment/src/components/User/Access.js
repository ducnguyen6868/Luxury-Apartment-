import { Link } from "react-router-dom"
const Access = () => {
    return (
        <>
            <div>
                <Link to='login'>
                    <span style={{ padding: '0px 5px', cursor: 'pointer' }}>Đăng nhập</span>
                </Link>

                <span style={{ padding: '0px 5px', cursor: 'pointer' }}>|</span>
                <Link to='register'>
                    <span style={{ padding: '0px 5px', cursor: 'pointer' }}>Đăng ký</span>
                </Link>

            </div>
        </>
    )
}
export default Access;