import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import axios from 'axios';
import '../styles/Login.css';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const navigate = useNavigate(); // Use useNavigate for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });
            if(response.data){
                sessionStorage.setItem('user', JSON.stringify(response.data))
            }
            console.log(response.data);
            navigate('/adminPortal');
            // Handle successful login here
        } catch (error) {
            setError('Login failed. Please check your credentials.'); // Set error message
        }
    };

    return (
        <div className="login-container">
            <h2>Admin Login</h2>

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

                {/* Row with login button */}
                    <button style={{width: "100%"}} type="submit">Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;