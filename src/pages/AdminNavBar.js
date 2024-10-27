import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Add logout functionality here
        sessionStorage.clear();
        navigate('/admin');
    };
    
    const createNew = () => {
        navigate('/create-product');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <h2 className="me-auto text-white">
                Admin Dashboard
            </h2>
            <Nav className="ms-auto">
                <Button variant="primary" onClick={createNew} className="me-2">
                    Create New Product
                </Button>
                <Button variant="primary" onClick={handleLogout}>
                    Logout
                </Button>
            </Nav>
        </Navbar>
    );
};

export default AdminNavbar;
