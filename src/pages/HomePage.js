// src/HomePage.js
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase.utils'; // Firebase config file
import { useHistory } from 'react-router-dom';

const HomePage = () => {
    const [user, setUser] = useState(null);
    const history = useHistory();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                history.push('/login'); // Redirige a la página de login después de cerrar sesión
            })
            .catch((error) => {
                console.error('Error while logging out:', error);
            });
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to the Home Page</h1>
            <p><strong>Name:</strong> {user.displayName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <button
            onClick={handleLogout}
            style={{
                marginTop: '20px',
                marginRight: '50px', 
                padding: '10px 20px',
                fontSize: '16px',
                borderRadius: '5px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
            }}
        >            Logout
            </button>
        </div>
    );
};

export default HomePage;
