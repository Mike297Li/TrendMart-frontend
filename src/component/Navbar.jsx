// src/component/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/navbar.css';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase.utils';
import LoginModal from './LoginModal';
import FindProducts from '../pages/FindProducts';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Navbar = ({ isAuthenticated, user }) => {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isFindProductsOpen, setFindProductsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const isHomePage = location.pathname === '/';

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
        setFindProductsOpen(false);
        setLoginModalOpen(true);
    };

    const closeLoginModal = () => {
        setLoginModalOpen(false);
    };

    const openFindProducts = () => {
        setLoginModalOpen(false);
        setFindProductsOpen(true);
    };

    const closeFindProducts = () => {
        setFindProductsOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        handleScroll();
        
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`navbar ${!isHomePage ? 'white-text' : ''}`}>
            <h2
                className={`navbar-logo ${isHomePage ? 'large-logo' : 'small-logo'}`}
                aria-label="TrendMart Logo"
            >
                TRENDMART
            </h2>
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
            <ul className="navbar-links2">
                <li className="navbar-item navbar-find-products">
                    <span className="navbar-link" onClick={openFindProducts}>
                        <i className="fas fa-search" style={{ marginLeft: '8px' }}></i>
                    </span>
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
                    !isLoginModalOpen && (
                    <li className="navbar-item">
                        <span onClick={openLoginModal} className="navbar-link">
                            <i className="fas fa-user" style={{ marginRight: '8px' }}></i> Login
                        </span>
                    </li>
                    )
                )}
            </ul>

            <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
            <FindProducts isOpen={isFindProductsOpen} onClose={closeFindProducts} />
        </nav>
    );
};

export default Navbar;
