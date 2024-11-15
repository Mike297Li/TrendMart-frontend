/* eslint-disable */
// src/pages/HomePage.js
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase.utils';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
import WelcomeSection from '../component/WelcomeSection';
import CategoryBar from '../pages/CategoryBar';
import ImageSection from './ImageSection';
import collection1 from '../assets/collection1.jpg';
import collection2 from '../assets/collection2.jpg';
import Footer from '../component/footer';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/HomePage.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Importa Font Awesome

const HomePage = () => {
    const [user, setUser] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [products, setProducts] = useState([]); // Estado para almacenar los productos de la API
    const [isScrolling, setIsScrolling] = useState(false);
    const categoryBarRef = useRef(null);
    const navbarRef = useRef(null);
    
    const sections = ['welcome', 'category-bar'];
    const scrollTimeout = 700;

    // Placeholder images for the carousel (replace with API data later)
    useEffect(() => {
        fetch('http://localhost:8080/api/products/homepage')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch top-rated products');
                }
                return response.json();
            })
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            localStorage.setItem('user', JSON.stringify(currentUser))
            setUser(currentUser);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const isAuthenticated = Boolean(user);

    const handleScroll = useCallback((event) => {
        if (isScrolling) return;

        if (event.deltaY > 0 && currentIndex < sections.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
            setIsScrolling(true);
        } else if (event.deltaY < 0 && currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1);
            setIsScrolling(true);
        }

        setTimeout(() => {
            setIsScrolling(false);
        }, scrollTimeout);
    }, [currentIndex, isScrolling]);

    useEffect(() => {
        window.addEventListener('wheel', handleScroll);
        return () => {
            window.removeEventListener('wheel', handleScroll);
        };
    }, [handleScroll]);

    useEffect(() => {
        if (currentIndex === 1 && categoryBarRef.current) {
            const categoryBarPosition = categoryBarRef.current.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: categoryBarPosition,
                behavior: 'smooth',
            });
        }
    }, [currentIndex]);

    // Carousel functionality
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    };
    
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
    };

    return (
        <div>
            <Navbar />
            <WelcomeSection id="welcome" />
            <CategoryBar ref={categoryBarRef} />
            <div className="content">
                {/* Carrusel */}
                {products.length > 0 ? (
                    <div className="carousel">
                        <button className="carousel-btn prev" onClick={handlePrev}>
                            <i className="fas fa-chevron-left"></i>
                        </button>
                        <div className="carousel-images">
                            <img src={products[currentIndex].pictureBase64} alt={products[currentIndex].name} />
                            <img src={products[(currentIndex + 1) % products.length].pictureBase64} alt={products[(currentIndex + 1) % products.length].name} />
                                
                        </div>
                        <button className="carousel-btn next" onClick={handleNext}>
                            <i className="fas fa-chevron-right"></i>
                        </button>
                    </div>
                ) : (
                    <p>Loading Products ....</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;
