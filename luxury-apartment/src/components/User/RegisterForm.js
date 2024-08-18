import React, { useState, useEffect, useCallback } from 'react';
import '../../css/Registerform.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState(true);
    const [checkEmail, setCheckEmail] = useState(false);
    const [checkResult, setCheckResult] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        
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
                console.error("Error during registration:", error);
                // Consider displaying an error message to the user here
            }
        }
    }, [name, email, password, confirmPassword]);
    useEffect(() => {
        if (checkResult) {
            const timer = setTimeout(() => {
                setCheckResult(false);
                navigate('/login');
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [checkResult, navigate]);

    const goBack = useCallback(() => {
        navigate('/');
    }, [navigate]);

    return (
        <section className='register-form'>
            <div className='form-container'>
                {checkResult && (
                    <div className='success-message'>
                        Đăng ký thành công !!!
                    </div>
                )}
                <form method='post' onSubmit={handleSubmit}>
                    <i className="fa-solid fa-delete-left back-icon" onClick={goBack}></i>
                    <div className='box-name'>
                        <img className='logo' src='../logo.png' alt='Logo' />
                        <span className='agency-name'>Villa Agency</span>
                    </div>
                    <h2 className='form-title'>Sign up</h2>
                    <div className='box-info'>
                        <label className='label' htmlFor='name'>Your name:</label>
                        <input id='name' type='text' required value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='box-info'>
                        <label className='label' htmlFor='email'>Email:</label>
                        <input id='email' type='email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                        {checkEmail && (
                            <div className='error-message'>
                                Email đã được đăng ký
                            </div>
                        )}
                    </div>
                    <div className='box-info'>
                        <label className='label' htmlFor='password'>Password:</label>
                        <input id='password' type='password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='box-info'>
                        <label className='label' htmlFor='confirmPassword'>Confirm Password:</label>
                        <input id='confirmPassword' type='password' required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        {!checkPassword && (
                            <div className='error-message'>
                                Mật khẩu xác nhận không trùng khớp
                            </div>
                        )}
                    </div>
                    <div className='box-button'>
                        <button type='submit' className='submit-button'>Sign up</button>
                        <div className='box-help'>
                            <span>Did you have an account? </span>
                            <Link to='/login'>Login</Link>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default RegisterForm;
