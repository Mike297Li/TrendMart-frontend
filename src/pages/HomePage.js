// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../styles/HomePage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WelcomeSection from './../component/WelcomeSection';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;
    // Fetch products from API
    useEffect(() => {
        fetch(`${apiUrl}/api/products/homepage`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch top-rated products');
                }
                return response.json();
            })
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    // Truncate description to 30 words
    const truncateDescription = (description, wordLimit = 30) => {
        const words = description.split(' ');
        return words.length > wordLimit
            ? `${words.slice(0, wordLimit).join(' ')}...`
            : description;
    };

    return (
        <div>
            <WelcomeSection id="welcome" />
            <div className="carousel-container">
                {/* Featured Products Heading */}
                <h2 className="featured-products-heading">Featured Products</h2>

                {products.length > 0 ? (
                    <Carousel
                        nextIcon={<FaChevronRight className="carousel-icon" />}
                        prevIcon={<FaChevronLeft className="carousel-icon" />}
                        indicators={false}
                    >
                        {products.map((product, index) => (
                            <Carousel.Item
                                key={product.productId}
                                interval={index === 0 ? 10000 : 2000} // First slide has a longer interval
                            >
                                <img
                                    src={product.pictureBase64}
                                    className="d-block w-100"
                                    alt={product.name}
                                />
                                <div className="carousel-caption d-none d-md-block">
                                    <h5 className='cursor-pointer capitalize' onClick={() => navigate(`/product-detail/${product.productId}`, { state: { product } })}>{truncateDescription(product.name, 2)}</h5>
                                    <p>{truncateDescription(product.description)}</p>
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                ) : (
                    <p className="loading-text">Loading Products...</p>
                )}
            </div>
        </div>
    );
};

export default HomePage;
