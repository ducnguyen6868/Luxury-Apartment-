import React, { useState, useEffect } from 'react';
import '../../css/form.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkResult, setCheckResult] = useState(false);
    const [checkPassword, setCheckPassword] = useState(true);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Xử lý đăng nhập
        //console.log('Logging in with:', email, password);
        try {
            const response = await axios.post('http://localhost:5000/login', { email, password }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            //console.log(response);
            if (response.data.success) {
                //console.log("Verified account");
                localStorage.setItem('token', response.data.token);
                setCheckResult(true);
                setCheckPassword(true);
            } else {
                setCheckPassword(false);
            }
        } catch (error) {
            console.error('There was an error logging in!', error);
        }
    };
    // Giả sử bạn sẽ đặt checkResult thành true khi đăng nhập thành công thành công
    useEffect(() => {
        if (checkResult) {
            const timer = setTimeout(() => {
                setCheckResult(false);
                navigate('/');
            }, 1000); // 1000ms = 1s

            // Xóa bộ đếm thời gian khi component bị unmount hoặc checkResult thay đổi
            return () => clearTimeout(timer);
        }
    }, [checkResult,navigate]);
    const goBack=()=>{
        navigate('/');
    }
    return (
        <>
            <section className='access-form'>
                <div className='form-container'>
                    {checkResult && (<h1 className={!checkResult ? 'hidden' : ''} style={{ textAlign: 'center', color: 'white', backgroundColor: 'green', position: 'absolute', zIndex: '4', width: '100%', padding: '5px 0px', transition: 'opaciy 1s ease-in-out', fontSize: '20px' }}>Đăng nhập thành công !!!</h1>)}
                    <form method='post' onSubmit={handleSubmit}>
                        <i style={{ position: 'absolute', top: '0px', left: '0px', fontSize: 'larger', cursor: 'pointer', padding: '10px' }} onClick={goBack} className="fa-solid fa-delete-left"></i>
                        <div className='box-name'>
                            <img style={{ width: '100px', height: 'auto' }} src='../logo.png' alt='Logo'></img>
                            <span style={{ fontWeight: 'bold', fontSize: 'larger', textTransform: 'uppercase' }}>Villa Agency</span>
                        </div>
                        <h2 style={{ textAlign: 'center' }}>Login</h2>
                        <div className='box-info'>
                            <label className='label'>Email:</label>
                            <input value={email} type='email' id='email-login' onChange={() => {
                                setEmail(document.getElementById('email-login').value);
                            }} required />
                        </div>
                        <div className='box-info'>
                            <label className='label'>Password:</label>
                            <input value={password} type='password' id='password-login' onChange={() => {
                                setPassword(document.getElementById('password-login').value);
                            }} required />
                            {!checkPassword && (<span style={{ color: 'red' }}>Email hoặc mật khẩu không chính xác !</span>)}
                        </div>
                        <div className='box-button' style={{ textAlign: 'center', margin: '10px 0px' }}>
                            <button id='button-login' type='submit' style={{ border: 'none', padding: '5px 20px', borderRadius: '10px', fontSize: 'larger', color: '#fff', backgroundColor: 'var(--main-color)' }}>Login</button>
                        </div>
                        <div className='box-help'>
                            <Link to='#'>Forgot Password?</Link>
                        </div>
                    </form>
                    <img style={{ width: '400px' }} src='/images/single-property.jpg' alt='view access' />
                </div>
            </section>
        </>
    );
};

export default LoginForm;
