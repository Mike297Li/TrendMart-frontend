import React, { useState } from 'react';
import { auth } from '../firebase.utils'; // Correctly imported Firebase auth
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import the function
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate(); // Use useNavigate for navigation

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            // Firebase method to create a user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("User Registered: ", userCredential.user);

            // Redirect to login page after successful registration
            navigate('/login'); // Use navigate instead of history.push
        } catch (error) {
            // Error handling based on Firebase's error codes
            if (error.code === 'auth/email-already-in-use') {
                setError("This email is already registered.");
            } else if (error.code === 'auth/weak-password') {
                setError("Password is too weak. Please choose a stronger password.");
            } else {
                setError("Error during registration: " + error.message);
            }
        }
    };

    return (
        <div>
            <h2>Register</h2>
            {error && <p className="error-message">{error}</p>} {/* Optionally add a class for styling */}
            <form onSubmit={handleRegister}>
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
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
