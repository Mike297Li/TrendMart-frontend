// src/components/ProductGrid.jsx
import React from 'react';
import '../styles/ProductGrid.css';

const ProductGrid = ({ isFilterVisible }) => {
    // Datos de ejemplo para productos
    const products = [
        { id: 1, name: "TrendMart Bag", price: "$1000", imgSrc: "https://via.placeholder.com/150" },
        { id: 2, name: "TrendMart Shoe", price: "$500", imgSrc: "https://via.placeholder.com/150" },
        { id: 3, name: "TrendMart Belt", price: "$200", imgSrc: "https://via.placeholder.com/150" },
        { id: 4, name: "TrendMart Hat", price: "$150", imgSrc: "https://via.placeholder.com/150" },
        // Agrega más productos según sea necesario
    ];

    return (
        <div className={`product-grid ${isFilterVisible ? 'filter-visible' : ''}`}>
            {products.map(product => (
                <div className="product-card" key={product.id}>
                    <img src={product.imgSrc} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p>{product.price}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductGrid;
