// src/components/ProductSearchPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductGrid from './ProductGrid';
import '../styles/ProductSearchPage.css';

const ProductSearchPage = () => {
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [selectedRating, setSelectedRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [products, setProducts] = useState([]);
    
    // Obtiene el término de búsqueda desde la URL
    const location = useLocation();
    const searchTerm = new URLSearchParams(location.search).get('query') || '';

    // Efecto para cargar productos cada vez que cambia algún filtro o el término de búsqueda
    useEffect(() => {
        fetchProducts();
    }, [searchTerm, selectedRating, minPrice, maxPrice]);

    const toggleFilterVisibility = () => {
        setIsFilterVisible(!isFilterVisible);
    };

    const handleRatingChange = (rating) => {
        setSelectedRating(rating);
    };

    const handleMouseEnter = (rating) => {
        setHoveredRating(rating);
    };

    const handleMouseLeave = () => {
        setHoveredRating(0);
    };

    const handleMinPriceChange = (event) => {
        const value = Math.min(Number(event.target.value), maxPrice - 1);
        setMinPrice(value);
    };

    const handleMaxPriceChange = (event) => {
        const value = Math.max(Number(event.target.value), minPrice + 1);
        setMaxPrice(value);
    };

    const handleMinSliderChange = (event) => {
        const min = Math.min(Number(event.target.value), maxPrice - 1);
        setMinPrice(min);
    };

    const handleMaxSliderChange = (event) => {
        const max = Math.max(Number(event.target.value), minPrice + 1);
        setMaxPrice(max);
    };

    // Función para obtener productos desde la API usando los filtros
    const fetchProducts = async () => {
        try {
            const queryParams = new URLSearchParams({
                name: searchTerm,
                rating: selectedRating || undefined,
                minPrice: minPrice || undefined,
                maxPrice: maxPrice || undefined,
            });

            const response = await fetch(`/api/products/search?${queryParams.toString()}`);
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            } else {
                console.error("Error fetching products:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    return (
        <div>
            <button className="toggle-filter-button" onClick={toggleFilterVisibility}>
                Filter
            </button>
            <div className="product-search-container">
                <div className={`filters-container ${isFilterVisible ? 'visible' : ''}`}>
                    <div className="filter-header">
                        <h2 className="filter-title">Filter</h2>
                        <button className="close-filter-button" onClick={toggleFilterVisibility}>X</button>
                    </div>

                    <div className="filter-content">
                        {/* Average Rating Filter */}
                        <div className="filter-section">
                            <details open>
                                <summary>Average Rating</summary>
                                <div className="star-rating-options">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            className={`star ${hoveredRating >= star || selectedRating >= star ? 'selected' : ''}`}
                                            onClick={() => handleRatingChange(star)}
                                            onMouseEnter={() => handleMouseEnter(star)}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                            </details>
                        </div>
                        <div className="filter-divider"></div>

                        {/* Price Range Filter */}
                        <div className="filter-section">
                            <details open>
                                <summary>Price Range</summary>
                                <div className="price-range-container">
                                    <label htmlFor="minPriceInput">minPrice</label>
                                    <input
                                        type="number"
                                        id="minPriceInput"
                                        className="price-input"
                                        value={minPrice}
                                        onChange={handleMinPriceChange}
                                        min="0"
                                        max="100000"
                                    />
                                    <label htmlFor="maxPriceInput">maxPrice</label>
                                    <input
                                        type="number"
                                        id="maxPriceInput"
                                        className="price-input"
                                        value={maxPrice}
                                        onChange={handleMaxPriceChange}
                                        min="0"
                                        max="100000"
                                    />

                                    <div className="slider-container">
                                        <label htmlFor="minSlider">minPrice</label>
                                        <input
                                            type="range"
                                            id="minSlider"
                                            className="price-slider"
                                            min="0"
                                            max="100000"
                                            value={minPrice}
                                            onChange={handleMinSliderChange}
                                            step="100"
                                        />
                                    </div>

                                    <div className="slider-container">
                                        <label htmlFor="maxSlider">maxPrice</label>
                                        <input
                                            type="range"
                                            id="maxSlider"
                                            className="price-slider"
                                            min="0"
                                            max="100000"
                                            value={maxPrice}
                                            onChange={handleMaxSliderChange}
                                            step="100"
                                        />
                                    </div>
                                </div>
                            </details>
                        </div>
                        <div className="filter-divider"></div>

                        {/* Additional Filters */}
                        <div className="filter-section">
                            <details>
                                <summary>Gender</summary>
                                <ul>
                                    <li><input type="checkbox" /> All</li>
                                    <li><input type="checkbox" /> Women</li>
                                    <li><input type="checkbox" /> Men</li>
                                    <li><input type="checkbox" /> Children</li>
                                </ul>
                            </details>
                        </div>
                        <div className="filter-divider"></div>

                        <div className="filter-section">
                            <details>
                                <summary>Shop by Category</summary>
                                <ul>
                                    <li><input type="checkbox" /> Handbags</li>
                                    <li><input type="checkbox" /> Bags</li>
                                    <li><input type="checkbox" /> Wallets and Small Accessories</li>
                                    <li><input type="checkbox" /> Accessories</li>
                                    <li><input type="checkbox" /> Travel</li>
                                </ul>
                            </details>
                        </div>
                        <div className="filter-divider"></div>

                        <div className="filter-section">
                            <details>
                                <summary>Material</summary>
                                <ul>
                                    <li><input type="checkbox" /> GG Canvas</li>
                                    <li><input type="checkbox" /> Leather</li>
                                    <li><input type="checkbox" /> Fabric</li>
                                    <li><input type="checkbox" /> Original GG Fabric</li>
                                    <li><input type="checkbox" /> GG Leather</li>
                                </ul>
                            </details>
                        </div>
                        <div className="filter-divider"></div>

                        <div className="filter-section">
                            <details>
                                <summary>Color</summary>
                                <div className="color-options">
                                    <div className="color-circle" style={{ backgroundColor: 'beige' }}></div>
                                    <div className="color-circle" style={{ backgroundColor: 'black' }}></div>
                                    <div className="color-circle" style={{ backgroundColor: 'white' }}></div>
                                    <div className="color-circle" style={{ backgroundColor: 'blue' }}></div>
                                    <div className="color-circle" style={{ backgroundColor: 'brown' }}></div>
                                    <div className="color-circle" style={{ backgroundColor: 'pink' }}></div>
                                </div>
                            </details>
                        </div>
                        <div className="filter-divider"></div>

                        <div className="filter-section">
                            <details>
                                <summary>Product Size</summary>
                                <div className="size-options">
                                    <ul>
                                        <li><input type="checkbox" /> XS</li>
                                        <li><input type="checkbox" /> S</li>
                                        <li><input type="checkbox" /> M</li>
                                        <li><input type="checkbox" /> L</li>
                                        <li><input type="checkbox" /> XL</li>
                                    </ul>
                                </div>
                            </details>
                        </div>
                    </div>
                </div>

                <div className={`product-grid-container ${isFilterVisible ? 'with-filter' : ''}`}>
                    <ProductGrid products={products} isFilterVisible={isFilterVisible} />
                </div>
            </div>
        </div>
    );
};

export default ProductSearchPage;
