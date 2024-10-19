import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory
import { auth, sendPasswordResetEmail } from '../firebase.utils'; // Import necessary functions
import '../styles/ResetPassword.css';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const history = useHistory(); // Initialize useHistory

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email); // Send reset email
            setMessage('Password reset email sent successfully. Please check your inbox.');
            setTimeout(() => {
                history.push('/login'); // Redirect to login page after a delay
            }, 2000);
        } catch (error) {
            console.error("Error sending password reset email: ", error.message); // Log error to console
            setMessage(`Failed to send reset email: ${error.message}`); // Display detailed error message
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
                <button type="submit">Reset Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ForgetPassword;
