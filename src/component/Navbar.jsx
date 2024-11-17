import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase.utils';
import LoginModal from './LoginModal';
import { FaShoppingCart } from 'react-icons/fa';
import { Badge } from 'react-bootstrap';  // Import Badge from react-bootstrap
import { useCart } from '../context/CartContext'; // Import the CartContext hook

const Navbar = ({ isAuthenticated, user }) => {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { getTotalItems } = useCart(); // Get the total items in the cart from context
    const cartItemCount = getTotalItems(); // Calculate the total items in the cart using the context
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                localStorage.clear();
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
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const buildQueryParams = (page) => {
        const params = new URLSearchParams();
        params.append('name', '');
        params.append('rating', '');
        params.append('minPrice', '');
        params.append('maxPrice', '');
        params.append('page', page); // Use the page passed as argument
        params.append('size', 10);
        return params.toString();
    };

    const handleCartClick = () => {
        navigate('/cart');
    };

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/products/search?${buildQueryParams(1)}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const results = data.products;
            const totalCount = data.totalCount;

            navigate('/search-results', { state: { results, totalCount, query: "", page: 1,  } });
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    const goToHome = () => {
        navigate('/');
    };

    return (
        <nav className="navbar">
            <h2 onClick={goToHome} className={`navbar-logo cursor-pointer ${isScrolled ? 'scrolled' : ''}`} aria-label="TrendMart Logo">TRENDMART</h2>
            <ul className="navbar-links">
                <li className="navbar-item">
                    <Link to="/about" className="navbar-link">ABOUT US</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/contact" className="navbar-link">CONTACT US</Link>
                </li>
            </ul>
            <ul className="navbar-links">
                {isAuthenticated || JSON.parse(localStorage.getItem('user'))?.role === 'ADMIN' ? (
                    <>
                        <li className="navbar-item dropdown">
                            <span className="navbar-link username">Hi! {user?.displayName || 'ACCOUNT'}</span>
                            <ul className="dropdown-menu dropdown-menu-custom">
                                {JSON.parse(localStorage.getItem('user'))?.role !== 'ADMIN' && (
                                    <>
                                        <li>
                                            <Link to="/user-profile" className="dropdown-link">Profile</Link>
                                        </li>
                                        <li>
                                            <Link to="/user/orders" className="dropdown-link">My Orders</Link>
                                        </li>
                                    </>
                                )}
                                {JSON.parse(localStorage.getItem('user'))?.role === 'ADMIN' && (
                                    <>
                                        <li>
                                            <Link to="/adminPortal" className="dropdown-link">Dashboard</Link>
                                        </li>
                                    </>
                                )}
                                <li>
                                    <span onClick={handleLogout} className="dropdown-link cursor-pointer">Logout</span>
                                </li>
                            </ul>
                        </li>
                        <li className="navbar-item navbar-find-products">
                            <span className="navbar-link" onClick={handleSearchSubmit}>
                                <i className="fas fa-search" style={{ marginLeft: '8px' }}></i>
                            </span>
                        </li>
                        {JSON.parse(localStorage.getItem('user'))?.role !== 'ADMIN' && (
                            <li className="navbar-item navbar-find-products cursor-pointer">
                                <div style={{ position: 'relative' }} onClick={handleCartClick}>
                                    <FaShoppingCart className="fa-2x cart-icon" aria-hidden="true" />
                                    {cartItemCount > 0 && (
                                        <Badge 
                                            pill 
                                            bg="danger" 
                                            style={{
                                                position: 'absolute',
                                                top: '-5px',
                                                right: '-10px',
                                                fontSize: '12px',
                                            }}
                                        >
                                            {cartItemCount}
                                        </Badge>
                                    )}
                                </div>
                            </li>
                        )}
                    </>
                ) : (
                    !isLoginModalOpen && (
                        <li className="navbar-item cursor-pointer">
                            <span onClick={openLoginModal} className="navbar-link">
                                <i className="fas fa-user" style={{ marginRight: '8px' }}></i> Login
                            </span>
                        </li>
                    )
                )}
            </ul>

            {isLoginModalOpen && <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />}
        </nav>
    );
};

export default Navbar;
