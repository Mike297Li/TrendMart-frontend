// src/component/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase.utils';
import LoginModal from './LoginModal';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Mock Products Data (replace with actual product data)
const productsData = [
    { id: 1, name: "Men's T-Shirt", average_rating: 4.5 },
    { id: 2, name: "Women's Handbag", average_rating: 4.0 },
    { id: 3, name: "Kids' Shoes", average_rating: 3.5 },
    // Add more products as needed
];

const Navbar = ({ isAuthenticated, user }) => {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
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
        console.log("Search input changed"); // Check if this triggers
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        console.log("Search button clicked"); // Debugging log

        try {
            const response = await fetch(`http://localhost:8080/api/products/search?name=${encodeURIComponent(searchQuery)}`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const results = await response.json();
            console.log("Search Results:", results);

            // Check if results are present
            if (results.products && results.products.length > 0) {
                navigate('/search-results', { state: { results: results.products, totalCount: results.totalCount, query: searchQuery } });
            } else {
                navigate('/search-results', { state: { results: [], totalCount: 0, query: searchQuery } });
            }
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };



    return (
        <nav className="navbar">
            <h2 className={`navbar-logo ${isScrolled ? 'scrolled' : ''}`} aria-label="TrendMart Logo">TRENDMART</h2>
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

            {/* Search Bar */}
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

            {isLoginModalOpen && <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />}
        </nav>
    );
};

// Inline styles for search form
const styles = {
    searchForm: {
        display: 'flex',
        alignItems: 'center',
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
