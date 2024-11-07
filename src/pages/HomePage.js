import React, { useEffect, useState, useCallback, useRef } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase.utils';
import WelcomeSection from '../component/WelcomeSection';
import CategoryBar from '../pages/CategoryBar';
import ImageSection from './ImageSection';
import Footer from '../component/footer';
import collection1 from '../assets/collection1.jpg';
import collection2 from '../assets/collection2.jpg';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/HomePage.css';

const HomePage = () => {
    const [user, setUser] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const categoryBarRef = useRef(null);

    const sections = ['welcome', 'category-bar'];
    const scrollTimeout = 700;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        };
    }, []);

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

    return (
        <div>
            <WelcomeSection id="welcome" />
            <CategoryBar ref={categoryBarRef} />
            <div className="content">
                <div className="image-row">
                    <ImageSection 
                        id="section1"
                        imageUrl={collection1}
                    />
                    <ImageSection 
                        id="section2"
                        imageUrl={collection2}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;
