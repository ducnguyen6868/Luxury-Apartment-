import React, { useState, useEffect } from 'react';
import '../../css/LoginForm.css';
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
        try {
            const response = await axios.post('http://localhost:5000/login', { email, password }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.success) {
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

    useEffect(() => {
        if (checkResult) {
            const timer = setTimeout(() => {
                setCheckResult(false);
                navigate('/'); 
            }, 1000); 

            return () => clearTimeout(timer);
        }
    }, [checkResult, navigate]);

    const goBack = () => {
        navigate('/');
    };

    return (
        <section className='access-form'>
            <div className='form-container'>
                {checkResult && (
                    <h1 className='success-message'>Đăng nhập thành công !!!</h1>
                )}
                <form method='post' onSubmit={handleSubmit}>
                    <i
                        className="fa-solid fa-delete-left"
                        onClick={goBack}
                        style={{ position: 'absolute', top: '0', left: '0', fontSize: 'larger', cursor: 'pointer', padding: '10px' }}
                    ></i>
                    <div className='box-name'>
                        <img className='logo' src='../logo.png' alt='Logo' />
                        <span className='agency-name'>Villa Agency</span>
                    </div>
                    <h2 className='form-title'>Login</h2>
                    <div className='box-info'>
                        <label className='label' htmlFor='email-login'>Email:</label>
                        <input
                            value={email}
                            type='email'
                            id='email-login'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className='box-info'>
                        <label className='label' htmlFor='password-login'>Password:</label>
                        <input
                            value={password}
                            type='password'
                            id='password-login'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {!checkPassword && (
                            <span className='error-message'>Email hoặc mật khẩu không chính xác !</span>
                        )}
                    </div>
                    <div className='box-button'>
                        <button
                            id='button-login'
                            type='submit'
                            className='login-button'
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default LoginForm;
