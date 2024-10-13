import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Import useHistory
import '../styles/ResetPassword.css';


const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const history = useHistory(); // Initialize useHistory

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/reset-password', {
                email,
                newPassword
            });
            setMessage(response.data); // Display success message from the backend
            // Redirect to the login page after successful password reset
            if (response.data === "Password has been reset successfully..") {
                setTimeout(() => {
                    history.push('/login'); // Redirect to login page
                }, 2000); // Delay redirection by 2 seconds
            }
        } catch (error) {
            setMessage('Failed to reset password. Please try again.');
        }
    };

    return (
        <div className="reset-password-container">
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter your email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Enter your new password:
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Reset Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ForgetPassword;
