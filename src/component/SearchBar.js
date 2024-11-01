import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = () => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [products, setProducts] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const response = await axios.get('/api/products/search', {
        params: {
          name,
          rating,
          minPrice,
          maxPrice,
        },
      });

      setProducts(response.data); // Set the products state with the response
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Minimum rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <input
          type="number"
          placeholder="Minimum price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Maximum price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div>
        <h3>Search Results:</h3>
        <ul>
          {products.map((product) => (
            <li key={product.productId}>
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Average Rating: {product.averageRating}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;
