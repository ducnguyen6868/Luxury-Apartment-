import { useNavigate } from "react-router-dom";
import '../../css/account.css';
const Account =({infoUser})=>{
    const navigate = useNavigate();
    const LogOut=()=>{
        localStorage.removeItem('token');
        navigate('/login');
    }
    if(!infoUser){
        return(
            <>
            <p>Không tìm thấy</p>
            </>
        )
    }
    return (
        <div className="account">
            <img style={{borderRadius:'50%',width:'55px',height:'55px'}}src={infoUser.avatar} alt='avatar'/>
            <span style={{padding:"0 10px", fontWeight:'bolder'}}>{infoUser.name}</span>
            <ul className="account-option">
                <li><i class="fa-solid fa-user"></i>My account</li>
                <li><i class="fa-solid fa-gear"></i>Settings</li>
                <li onClick={LogOut}><i class="fa-solid fa-right-from-bracket"></i>Logout</li>
            </ul>
        </div>
    )
}
export default Account;