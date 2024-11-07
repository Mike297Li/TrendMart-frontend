/* eslint-disable */
import React, { useState } from 'react';
import '../styles/loginModal.css';
import { useNavigate } from 'react-router-dom';
import { signInWithGooglePopup, auth, signInWithEmailPassword } from '../firebase.utils';
import { AiOutlineClose } from 'react-icons/ai';

const LoginModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailPassword(email, password);
            if(userCredential.user){
                sessionStorage.setItem('user', JSON.stringify(userCredential.user))
            }
            console.log("User Logged In: ", userCredential.user);
            navigate('/'); // Redirige al homePage después del login
            onClose(); // Cierra el modal después del login exitoso
        } catch (error) {
            console.error("Login failed:", error);
            setError("Login failed. Please check your email or password.");
        }
    };

    const logGoogleUser = async () => {
        try {
            const response = await signInWithGooglePopup();
            if(response.user){
                sessionStorage.setItem('user',  JSON.stringify(response.user))
            }
            console.log("Google User Logged In: ", response);
            navigate('/'); // Redirige al homePage después del login con Google
            onClose(); // Cierra el modal después del login exitoso
        } catch (error) {
            console.error("Google login failed:", error);
            setError("Google login failed. Please try again.");
        }
    };

    const handleForgotPassword = () => {
        navigate('/reset-password');
        onClose(); // Cierra el modal
    };

    return (
        <div className={`login-modal ${isOpen ? 'show' : ''}`}>
            <div className="modal-content">
                {/* Botón de cerrar en la esquina superior derecha */}
                <button className="close-button" onClick={onClose}>×</button>

                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div className="button-row">
                        <button type="submit">Login</button>
                        <button 
                            type="button" 
                            className="forgot-password-link" 
                            onClick={handleForgotPassword}
                        >
                            Forgot Password?
                        </button>
                    </div>
                    <button 
                        type="button" 
                        onClick={logGoogleUser} 
                        className="google-login-button"
                    >
                        Google Login
                    </button>
                    <button 
                        type="button" 
                        onClick={() => navigate('/register')} 
                        className="google-login-button"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
