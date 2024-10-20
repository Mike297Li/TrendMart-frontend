import React, { useState } from 'react';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom'; // For navigation
import { signInWithGooglePopup, auth, signInWithEmailPassword } from '../firebase.utils'; // Firebase config file

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Use useNavigate for navigation

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Firebase login with email and password
            const userCredential = await signInWithEmailPassword(email, password);
            console.log("User Logged In: ", userCredential.user);
            // Redirect to homePage after successful login
            navigate('/homePage');
        } catch (error) {
            console.error("Login failed:", error);
            setError("Login failed. Please check your email or password.");
        }
    };

    const logGoogleUser = async () => {
        try {
            // Firebase login using Google Popup
            const response = await signInWithGooglePopup();
            console.log("Google User Logged In: ", response);
            // Redirect to homePage after successful login
            navigate('/homePage');
        } catch (error) {
            console.error("Google login failed:", error);
            setError("Google login failed. Please try again.");
        }
    };

    const handleForgotPassword = () => {
        navigate('/reset-password'); // Redirect to reset password page
    };

    return (
        <div className="login-container">
            <h2>Login</h2>

            {/* Show error message if there's an error */}
            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleLogin}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>

                {/* Login button */}
                <button type="submit">Login</button>

                {/* Google login button */}
                <button type="button" className="google-login" onClick={logGoogleUser}>
                    Google login
                </button>

                {/* Forgot password link */}
                <button
                    type="button"
                    className="forgot-password-link"
                    onClick={handleForgotPassword}
                >
                    Forgot Password?
                </button>
            </form>
        </div>
    );
};

export default Login;
