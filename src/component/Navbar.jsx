import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
    const location = useLocation();

    const isHomePage = location.pathname === '/';
    const isSearchProductPage = location.pathname === '/searchproduct';

    // Estado para manejar el popup de búsqueda
    const [isFindProductsOpen, setIsFindProductsOpen] = useState(false);

    const handleSearchClick = () => {
        navigate('/search'); // Cambia '/search' a la ruta correcta de ProductSearch
    };

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                navigate('/');
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
            if (isHomePage) {
                setIsScrolled(window.scrollY > 50);
            }
        };

        if (isHomePage) {
            window.addEventListener('scroll', handleScroll);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isHomePage]);

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
        <nav className={`navbar ${isSearchProductPage ? 'black-text' : ''} ${!isHomePage ? 'white-text' : ''}`}>
            <h2
                className={`navbar-logo ${isHomePage && !isScrolled ? 'large-logo' : 'small-logo'}`}
                aria-label="TrendMart Logo"
            >
                <Link to="/" className="logo-link">
                    TRENDMART
                </Link>
            </h2>
            <ul className="navbar-links">
                {isHomePage && (
                    <li className="navbar-item dropdown">
                        <span className="navbar-link">CATEGORIES</span>
                        <ul className="dropdown-menu">
                            <li><Link to="/products/man" className="dropdown-link">MAN</Link></li>
                            <li><Link to="/products/women" className="dropdown-link">WOMEN</Link></li>
                            <li><Link to="/products/kids" className="dropdown-link">KIDS</Link></li>
                            <li><Link to="/products/accessories" className="dropdown-link">ACCESSORIES</Link></li>
                        </ul>
                    </li>
                )}
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
                    <span className="navbar-link" onClick={handleSearchClick}>
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
