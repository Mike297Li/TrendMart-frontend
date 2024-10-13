import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css';
import { useHistory } from 'react-router-dom'; // For navigation

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory(); // Hook to programmatically navigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });
            console.log(response.data);
            // Handle successful login here
        } catch (error) {
            setError('Login failed. Please check your credentials.'); // Set error message
        }
    };

    const handleForgotPassword = () => {
        history.push('/reset-password'); // Redirect to reset password page
    };

    return (
        <div className="login-container">
            <h2>Login</h2>

            {/* Show error message if there's an error */}
            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>

                {/* Row with login button and forgot password link */}
                <div className="button-row">
                    <button type="submit">Login</button>
                    <button className="forgot-password-link" onClick={handleForgotPassword}>
                        Forgot Password?
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
