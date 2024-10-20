import React, { useState } from 'react';
import { auth } from '../firebase.utils'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useHistory } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [error, setError] = useState('');

    const history = useHistory();

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
            console.log('User Registered: ', userCredential.user);

           
            history.push('/login');
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

    return (
        <div>
            <h2>Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
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
                <br />
                <label>
                    Password:
                    <input
                        type="password"
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
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                    />
                    I accept the <a href="/terms" target="_blank" rel="noopener noreferrer">terms and conditions</a>
                </label>
                <br />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
