import React, { useEffect } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase.utils';
import { FaPlus, FaSignOutAlt, FaDashcube } from 'react-icons/fa'; // Importing icons from react-icons

const AdminNavBar = ({ resetView }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                localStorage.clear();
                navigate('/admin');
            })
            .catch((error) => {
                console.error('Error while logging out:', error);
            });
    };
    
    const createNew = () => {
        navigate('/admin/create-product');
    };

    useEffect(() => {
        // Check if the user key exists in localStorage
        const user = JSON.parse(localStorage.getItem('user'));
    
        // If user exists and has a role of 'ADMIN'
        if (user && user?.role === 'ADMIN') {
            console.log('User is an ADMIN');
        } else {
            navigate('/admin')
            // Handle non-admin or no user case
        }
    }, [navigate]);

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand 
                    onClick={resetView} 
                    style={{ cursor: 'pointer', fontSize: '1.75rem', fontWeight: 'bold' }}
                    className="text-white hover-effect"
                >
                    Admin Dashboard
                </Navbar.Brand>
                <Nav className="ms-auto">
                    <Button 
                        variant="outline-light" 
                        onClick={createNew} 
                        className="me-3 d-flex align-items-center" 
                    >
                        <FaPlus className="me-2" /> Create New Product
                    </Button>
                    <Button 
                        variant="outline-light" 
                        onClick={handleLogout} 
                        className="me-3 d-flex align-items-center" 
                    >
                        <FaSignOutAlt className="me-2" /> Logout
                    </Button>
                    <Button 
                        variant="outline-light" 
                        onClick={()=> navigate('/')} 
                        className="d-flex align-items-center" 
                    >
                        <FaDashcube className="me-2" /> Goto HomePage
                    </Button>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default AdminNavBar;
