import { useState } from 'react';
import { Link } from "react-router-dom";
import AlertLogout from '../../components/User/AlertLogout';
import '../../css/account.css';
const Account =({infoUser})=>{
    const [alertLogout, setAlertLogout]= useState(false);
    if(!infoUser){
        return(
            <>
            <p>Không tìm thấy</p>
            </>
        )
    }
    const HideAlertLogout=()=>{
        setAlertLogout(false);
    }
    return (
        <>
        <div className="account">
            <img style={{borderRadius:'50%',width:'55px',height:'55px'}}src={infoUser.avatar} alt='avatar'/>
            <span style={{padding:"0 10px", fontWeight:'bolder'}}>{infoUser.name}</span>
            <ul className="account-option">
                <li><i className="fa-solid fa-user"></i>My account</li>
                <li><i className="fa-solid fa-gear"></i><Link to= 'formEditProfile'>Settings</Link></li>
                <li onClick={()=>setAlertLogout(true)}><i className="fa-solid fa-right-from-bracket"></i>Logout</li>
            </ul>
        </div>
        {alertLogout && (<AlertLogout onClose={HideAlertLogout}/>)}
        </>
    )
}
export default Account;