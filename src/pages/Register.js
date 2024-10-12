import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom
import '../styles/Register.css';  // Import CSS file for styles


const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [isRegistered, setIsRegistered] = useState(false); // To check if registration was successful
    const [error, setError] = useState(''); // To display any error message

    const history = useHistory(); // Initialize useHistory

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', formData);
            console.log(response.data); // Log the response data to check

            if (response.data === "User registered successfully") {
                setIsRegistered(true); // Set success state
                setError(''); // Clear error message

                // Redirect to login page after 2 seconds
                setTimeout(() => {
                    history.push("/login"); // Navigate to login page
                }, 2000);
            } else {
                setError(response.data); // Set error message from response
            }
        } catch (error) {
            console.error(error);
            setError('Registration failed. Please try again.'); // General error message
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>

            {/* Show success message if registration is successful */}
            {isRegistered && <p className="success-message">Registration successful! Redirecting to login...</p>}

            {/* Show error message if there's an error */}
            {error && <p className="error-message">{error}</p>}

            {/* Show registration form only if user is not registered */}
            {!isRegistered && (
                <form onSubmit={handleSubmit} className="register-form">
                    <label>
                        Name:
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </label>
                    <label>
                        Email:
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </label>
                    <button type="submit" className="register-button">Register</button>
                </form>
            )}
        </div>
    );
};

export default Register;
