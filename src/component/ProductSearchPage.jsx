/* eslint-disable */
// src/components/ProductSearchPage.jsx
import React, { useState, useEffect } from 'react';
import ProductGrid from './ProductGrid';
import '../styles/ProductSearchPage.css';

const ProductSearchPage = () => {
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [selectedRating, setSelectedRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [productName, setProductName] = useState('');
    const [allProducts, setAllProducts] = useState([]); // Todos los productos desde el backend
    const [filteredProducts, setFilteredProducts] = useState([]); // Productos filtrados que se mostrarán
    const apiUrl = process.env.REACT_APP_API_URL;
    // Cargar todos los productos una vez al montar el componente
    useEffect(() => {
        fetchAllProducts();
    }, []);

    // Función para traer todos los productos del backend
    const fetchAllProducts = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/products`);
            if (response.ok) {
                const data = await response.json();
                setAllProducts(data);
                setFilteredProducts(data); // Inicialmente, muestra todos los productos
            } else {
                console.error("Error fetching products:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    // Aplicar los filtros cuando cambian los valores
    useEffect(() => {
        applyFilters();
    }, [productName, selectedRating, minPrice, maxPrice]);

    const applyFilters = () => {
        let filtered = allProducts;

        // Filtrar por nombre
        if (productName) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(productName.toLowerCase())
            );
        }

        // Filtrar por calificación
        if (selectedRating) {
            filtered = filtered.filter(product =>
                product.averageRating >= selectedRating
            );
        }

        // Filtrar por rango de precios
        if (minPrice) {
            filtered = filtered.filter(product =>
                product.price >= parseFloat(minPrice)
            );
        }
        if (maxPrice) {
            filtered = filtered.filter(product =>
                product.price <= parseFloat(maxPrice)
            );
        }

        setFilteredProducts(filtered);
    };

    const handleMinPriceChange = (event) => {
        setMinPrice(event.target.value);
    };

    const handleMaxPriceChange = (event) => {
        setMaxPrice(event.target.value);
    };

    const handleProductNameChange = (event) => {
        setProductName(event.target.value);
    };

    const handleRatingChange = (rating) => {
        setSelectedRating(rating);
    };

    const toggleFilterVisibility = () => {
        setIsFilterVisible(!isFilterVisible);
    };

    return (
        <div>
            <button className="toggle-filter-button" onClick={toggleFilterVisibility}>
                Filter
            </button>
            <div className="product-search-container">
                <div className={`filters-container ${isFilterVisible ? 'visible' : ''}`}>
                    <div className="filter-header">
                        <h2 className="filter-title">Filters</h2>
                        <button className="close-filter-button" onClick={toggleFilterVisibility}>X</button>
                    </div>
                    <div className="filter-content">
                        {/* Filtro por nombre */}
                        <div className="filter-section">
                            <details open>
                                <summary>By Product Name</summary>
                                <input
                                    type="text"
                                    placeholder="Enter product name"
                                    className="product-name-input"
                                    value={productName}
                                    onChange={handleProductNameChange}
                                />
                            </details>
                        </div>
                        <div className="filter-divider"></div>

                        {/* Filtro por calificación */}
                        <div className="filter-section">
                            <details open>
                                <summary>Average Rating</summary>
                                <div className="star-rating-options">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            className={`star ${hoveredRating >= star || selectedRating >= star ? 'selected' : ''}`}
                                            onClick={() => handleRatingChange(star)}
                                            onMouseEnter={() => setHoveredRating(star)}
                                            onMouseLeave={() => setHoveredRating(0)}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                            </details>
                        </div>
                        <div className="filter-divider"></div>

                        {/* Filtro por rango de precios */}
                        <div className="filter-section">
                            <details open>
                                <summary>Price Range</summary>
                                <div className="price-range-container">
                                    <label htmlFor="minPriceInput">Min Price</label>
                                    <input
                                        type="number"
                                        id="minPriceInput"
                                        className="price-input"
                                        value={minPrice}
                                        onChange={handleMinPriceChange}
                                        min="0"
                                        max="100000"
                                    />
                                    <label htmlFor="maxPriceInput">Max Price</label>
                                    <input
                                        type="number"
                                        id="maxPriceInput"
                                        className="price-input"
                                        value={maxPrice}
                                        onChange={handleMaxPriceChange}
                                        min="0"
                                        max="100000"
                                    />
                                </div>
                            </details>
                        </div>
                    </div>
                </div>

                {/* Mostrar productos filtrados */}
                <div className={`product-grid-container ${isFilterVisible ? 'with-filter' : ''}`}>
                    <ProductGrid products={filteredProducts} isFilterVisible={isFilterVisible} />
                </div>
            </div>
        </div>
    );
};

export default ProductSearchPage;
