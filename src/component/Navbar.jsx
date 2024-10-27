// src/component/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase.utils';
import LoginModal from './LoginModal'; // Importa el modal

const Navbar = ({ isAuthenticated, user }) => {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                navigate('/homePage');
            })
            .catch((error) => {
                console.error('Error while logging out:', error);
            });
    };

    const openLoginModal = () => {
        setLoginModalOpen(true);
    };

    const closeLoginModal = () => {
        setLoginModalOpen(false);
    };

    return (
        <nav className="navbar" style={{background: "#bbb"}}>
            <h2 className="navbar-logo">TRENDMART</h2>
            <ul className="navbar-links">
                <li className="navbar-item dropdown">
                    <span className="navbar-link">CATEGORIES</span>
                    <ul className="dropdown-menu">
                        <li><Link to="/products/man" className="dropdown-link">MAN</Link></li>
                        <li><Link to="/products/women" className="dropdown-link">WOMEN</Link></li>
                        <li><Link to="/products/kids" className="dropdown-link">KIDS</Link></li>
                        <li><Link to="/products/accessories" className="dropdown-link">ACCESSORIES</Link></li>
                    </ul>
                </li>

                <li className="navbar-item">
                    <Link to="/products/maple" className="navbar-link">MAPLE</Link>
                </li>

                <li className="navbar-item">
                    <Link to="/about" className="navbar-link">ABOUT US</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/contact" className="navbar-link">CONTACT US</Link>
                </li>
            </ul>
            <ul className="navbar-links">
                {isAuthenticated ? (
                    <li className="navbar-item dropdown">
                        <span className="navbar-link">{user?.displayName || 'ACCOUNT'}</span>
                        <ul className="dropdown-menu">
                            <li>
                                <Link to="/user-account/profile" className="dropdown-link">PROFILE</Link>
                            </li>
                            <li>
                                <span onClick={handleLogout} className="dropdown-link">LOGOUT</span>
                            </li>
                        </ul>
                    </li>
                ) : (
                    // Asegúrate de que LOGIN solo se muestre si el modal no está abierto y el usuario no está autenticado.
                    !isLoginModalOpen && (
                        <li className="navbar-item">
                            <span onClick={openLoginModal} className="navbar-link">LOGIN</span>
                        </li>
                    )
                )}
            </ul>


            {isLoginModalOpen && <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />}
        </nav>
    );
};

export default Navbar;
