import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase.utils';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const HomePage = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => {
            unsubscribe();
        };
    }, []);
    // Logout function
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log("User signed out successfully");
                navigate('/login'); // Redirect to login page after signing out
            })
            .catch((error) => {
                console.error("Error signing out: ", error);
            });
    };

    if (!user) {
        return <div>Loading...</div>; // Loading state while fetching user
    }

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to the Home Page</h1>
            {/* Check if user has displayName and email before rendering */}
            <p><strong>Name:</strong> {user.displayName ? user.displayName : 'N/A'}</p>
            <p><strong>Email:</strong> {user.email}</p>

            {/* Logout button with adjusted styling */}
            <button onClick={handleLogout} style={{ padding: '10px 20px', marginTop: '20px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}>
                Logout
            </button>
        </div>
    );
};

export default HomePage;
