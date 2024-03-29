// frontend/src/components/LoginFormPage/index.js
import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return (
        <Redirect to="/" />
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    const handleDemo = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential: 'demo@user.io', password: 'password' })).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            }
        );
    };

    return (
        <div className='login-div'>
            <form onSubmit={handleSubmit}>
                <div className='log-in-title'>Log In</div>
                <ul className='errors'>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <div className='user-input'>
                    <input
                        type="text"
                        value={credential}
                        className='login-input'
                        placeholder='Enter email or username'
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </div>
                <div className='password-input'>
                    <input
                        type="password"
                        value={password}
                        className='login-input'
                        placeholder='Enter password'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className='submit-login'>
                    <button type="submit" className='login-form-button'>Log In</button>
                </div>
            </form>
            <form onSubmit={handleDemo}>
                <div className='demo-login'>
                    <button
                        type='submit'
                        className='login-form-button'
                    >Demo</button>
                </div>
            </form>
        </div>
    );
}

export default LoginFormPage;