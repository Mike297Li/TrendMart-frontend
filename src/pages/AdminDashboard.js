import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const AdminDashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        if(sessionStorage.getItem('user') == null){
            navigate('/admin');
        }
        setUser(JSON.parse(sessionStorage.getItem('user')))
    }, [navigate]);
    // Logout function
    const handleLogout = () => {
        sessionStorage.clear()
        navigate('/admin')
    };

    if (!user) {
        return <div>Error...</div>; // Loading state while fetching user
    }

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome! Admin</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default AdminDashboard;
