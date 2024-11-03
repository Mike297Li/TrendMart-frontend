// src/pages/ProductList.js
import React, { useState } from 'react';

const ProductList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    // Handle the search form submission
    const handleSearch = async (e) => {
        e.preventDefault(); // Prevent the form from submitting in the traditional way
        try {
            // Fetch products based on the search term
            const response = await fetch(`/api/products/search?name=${encodeURIComponent(searchTerm)}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProducts(data); // Update the products state with the fetched data
            setError(''); // Clear previous errors
        } catch (error) {
            setError('Error fetching products: ' + error.message); // Set error message
            setProducts([]); // Clear products on error
        }
    };

    return (
        <div>
            <h1>Product Search</h1>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
                    placeholder="Search for products"
                />
                <button type="submit">Search</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if any */}
            <ul>
                {products.length > 0 ? ( // Check if there are products to display
                    products.map((product) => (
                        <li key={product.productId}>
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <p>Price: ${product.price}</p>
                            <p>Rating: {product.averageRating}</p>
                        </li>
                    ))
                ) : (
                    <p>No products found</p> // Message if no products are available
                )}
            </ul>
        </div>
    );
};

export default ProductList;
