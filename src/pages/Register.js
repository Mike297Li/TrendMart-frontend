import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Asegúrate de incluir `Link` aquí
import { createUserWithEmailPassword } from '../firebase.utils'; // Ajusta según tus funciones de Firebase

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailPassword(email, password);
            navigate('/homePage'); // Ajusta la ruta según tu configuración
        } catch (error) {
            setError('Registration failed. Please try again.');
            console.error('Error during registration:', error); // Para mayor detalle del error
        }
    };

    return (
        <div>
            <h2>Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleRegister}>
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
                <button type="submit">Register</button>
            </form>
            <p>
                Already have an account? <Link to="/login">Log in</Link>
            </p>
        </div>
    );
};

export default Register;
