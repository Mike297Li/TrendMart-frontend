// src/component/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase.utils';
import LoginModal from './LoginModal';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Navbar = ({ isAuthenticated, user }) => {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                sessionStorage.clear();
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

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/products/search?name=${encodeURIComponent(searchQuery)}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const results = data.products;
            const totalCount = data.totalCount;

            navigate('/search-results', { state: { results, totalCount, query: searchQuery } });
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };



    return (
        <nav className="navbar">
            <h2 className={`navbar-logo ${isScrolled ? 'scrolled' : ''}`} aria-label="TrendMart Logo">TRENDMART</h2>
            <ul className="navbar-links">


                <li className="navbar-item">
                    <Link to="/about" className="navbar-link">ABOUT US</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/contact" className="navbar-link">CONTACT US</Link>
                </li>
            </ul>
            <ul className="navbar-links2">
                <li className="navbar-item navbar-find-products">
                    <span className="navbar-link" onClick={handleSearchSubmit}>
                        <i className="fas fa-search" style={{ marginLeft: '8px' }}></i>
                    </span>
                </li>
            </ul>
            <ul className="navbar-links">
                {isAuthenticated ? (
                    <li className="navbar-item dropdown">
                        <span className="navbar-link">{user?.displayName || 'ACCOUNT'}</span>
                        <ul className="dropdown-menu dropdown-menu-custom">
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

            {/* Conditionally render the search bar only when authenticated */}
            {isAuthenticated && (
                <form onSubmit={handleSearchSubmit} style={styles.searchForm}>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        placeholder="Search products..."
                        style={styles.searchInput}
                    />
                    <button type="submit" style={styles.searchButton}>
                        <i className="fas fa-search"></i>
                    </button>
                </form>
            )}

            {isLoginModalOpen && <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />}
        </nav>
    );
};

// Inline styles for search form
const styles = {
    searchForm: {
        display: 'flex',
        alignItems: 'center',
        marginRight: '25px',
    },
    searchInput: {
        padding: '8px 12px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
        marginRight: '5px',
    },
    searchButton: {
        padding: '8px 12px',
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
};

export default Navbar;
