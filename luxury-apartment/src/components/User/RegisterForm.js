import React, { useState,useEffect } from 'react';
import '../../css/form.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState(true);
    const [checkEmail, setCheckEmail] = useState(false);
    const [checkResult, setCheckResult] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Xử lý đăng ký
        //console.log('Registering with:', name, email, password);
        if (password !== confirmPassword) {
            setCheckPassword(false);
        } else {
            setCheckPassword(true);
            try {
                const response = await axios.post("http://localhost:5000/register", { name, email, password });
                if (response.data.result === 'false') {
                    setCheckEmail(true);
                } else {
                    setCheckResult(true);
                    
                }
            } catch (error) {
                console.log("Error :", error);
            }
        }

    };
    // Giả sử bạn sẽ đặt checkResult thành true khi đăng ký thành công
    useEffect(() => {
        if (checkResult) {
            const timer = setTimeout(() => {
                setCheckResult(false);
                navigate('/login')
            }, 1000); // 1000ms = 1s

            // Xóa bộ đếm thời gian khi component bị unmount hoặc checkResult thay đổi
            return () => clearTimeout(timer);
        }
    }, [checkResult,navigate]);
    const goBack=()=>{
        navigate(-1);
    }
    return (
        <>
            <section className='access-form'>

                <div className='form-container'>
                    {checkResult && (<h1 className={!checkResult ? 'hidden':''} style={{ textAlign: 'center', color: 'white', backgroundColor: 'green', position: 'absolute', zIndex: '4', width: '100%', padding: '5px 0px', transition:'opaciy 1s ease-in-out', fontSize:'20px'}}>Đăng ký thành công !!!</h1>)}
                    <form method='post' onSubmit={handleSubmit}>
                        <i style={{ position: 'absolute', top: '0px', left: '0px', fontSize: 'larger', cursor: 'pointer', padding: '10px' }} onClick={goBack}className="fa-solid fa-delete-left"></i>
                        <div className='box-name'>
                            <img style={{ width: '100px', height: 'auto' }} src='../logo.png' alt='Logo'></img>
                            <span style={{ fontWeight: 'bold', fontSize: 'larger', textTransform: 'uppercase' }}>Villa Agency</span>
                        </div>
                        <h2 style={{ textAlign: 'center' }}>Register</h2>
                        <div className='box-info'>
                            <label className='label'>Your name:</label>
                            <input type='text' required value={name} onChange={(e) => { setName(e.target.value) }} />
                        </div>
                        <div className='box-info'>
                            <label className='label'>Email:</label>
                            <input type='email' required value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            {checkEmail && (
                                <div>
                                    <span style={{ color: 'red' }}>Email đã được đăng ký</span>
                                </div>)}
                        </div>
                        <div className='box-info'>
                            <label className='label'>Password:</label>
                            <input type='password' required value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                        <div className='box-info'>
                            <label className='label'>Confirm Password:</label>
                            <input type='password' required value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} />
                            {!checkPassword && (<div><span style={{ color: 'red' }}>Mật khẩu xác nhận không trùng khớp</span></div>)}
                        </div>
                        <div className='box-button' style={{ textAlign: 'center', margin: '10px 0px' }}>
                            <button id='button-login' type='submit' style={{ border: 'none', padding: '5px 20px', borderRadius: '10px', fontSize: 'larger', color: '#fff', backgroundColor: 'var(--main-color)' }}>Sign up</button>
                        </div>
                        <div className='box-help'>
                            <span>Did have account ?</span>
                            <Link to='/login'>Login</Link>
                        </div>
                    </form>
                    <img style={{ width: '400px' }} src='/images/single-property.jpg' alt='view access' />
                </div>
            </section>
        </>
    );
};

export default RegisterForm;
