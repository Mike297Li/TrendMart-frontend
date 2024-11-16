import React, { useState } from 'react';
import { auth } from '../firebase.utils';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate, Link  } from 'react-router-dom';  // v6 method

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [error, setError] = useState('');
    const [firstName, setFirstName] = useState(''); // New state for first name
    const [lastName, setLastName] = useState(''); // New state for last name

    const navigate = useNavigate();  // v6 hook

    const isValidPassword = (password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>+]/.test(password);
        return hasUpperCase && hasSpecialCharacter;
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!acceptedTerms) {
            setError('You must accept the terms and conditions to register.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match. Please try again.');
            return;
        }

        if (!isValidPassword(password)) {
            setError('Password must include at least one uppercase letter and one special character.');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update user's profile with their name
            await updateProfile(user, {
                displayName: `${firstName} ${lastName}`, // Set user's display name
            });

            console.log('User Registered: ', user);

            navigate('/login'); // Use navigate instead of history.push
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setError('This email is already registered.');
            } else if (error.code === 'auth/weak-password') {
                setError('Password is too weak. Please choose a stronger password.');
            } else {
                setError('Error during registration: ' + error.message);
            }
        }
    };

    const goToLogin = () =>{
        navigate('/login');
    }

    return (
        <div className="login-container">
            <h2>Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleRegister}>
                <label>
                    First Name:
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Last Name:
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Confirm Password:
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    <input
                        type="checkbox"
                        style={{width: 'auto'}}
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                    />
                    I accept the <Link to="/terms">terms and conditions</Link>
                </label>
                <button className='registerButton' type="submit">Register</button>
                <button className='loginButton' type="submit" onClick={goToLogin}>Login</button>
            </form>
        </div>
    );
};

export default Register;
