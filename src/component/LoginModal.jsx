 /* eslint-disable */
import React, { useState } from 'react';
import '../styles/loginModal.css';
import { useNavigate } from 'react-router-dom';
import { signInWithGooglePopup, auth, signInWithEmailPassword } from '../firebase.utils';

const LoginModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailPassword(email, password);
            console.log("User Logged In: ", userCredential.user);
            navigate('/homePage'); // Redirige al homePage después del login
            onClose(); // Cierra el modal después del login exitoso
        } catch (error) {
            console.error("Login failed:", error);
            setError("Login failed. Please check your email or password.");
        }
    };

    const logGoogleUser = async () => {
        try {
            const response = await signInWithGooglePopup();
            console.log("Google User Logged In: ", response);
            navigate('/homePage'); // Redirige al homePage después del login con Google
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

    // Función para manejar el clic en el fondo
    const handleClickOutside = (e) => {
        if (e.target.classList.contains('login-modal')) {
            onClose(); // Cierra el modal si el clic es en el fondo
        }
    };

    return (
        <div 
            className={`login-modal ${isOpen ? 'show' : ''}`} 
            onClick={handleClickOutside} // Detecta el clic en el fondo
        >
            <div className="modal-content">
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
                        className="register-button"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
