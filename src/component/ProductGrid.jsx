// src/components/ProductGrid.jsx
import React from 'react';
import '../styles/ProductGrid.css';

const ProductGrid = ({ products, isFilterVisible }) => {
    return (
        <div className={`product-grid ${isFilterVisible ? 'filter-visible' : ''}`}>
            {products.length > 0 ? (
                products.map((product, index) => (
                    <div className="product-card" key={product.id || index}>
                        <img src={product.imgSrc || "https://via.placeholder.com/150"} alt={product.name || "Product"} />
                        <h3>{product.name || "No name available"}</h3>
                        <p>{product.price ? `$${product.price}` : "No price available"}</p>
                    </div>
                ))
            ) : (
                <p>No products found.</p>
            )}
        </div>
    );
};

export default ProductGrid;
