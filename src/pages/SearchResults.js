import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/SearchResults.css';
import { useState, useEffect } from 'react';

const SearchResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const initialQuery = location.state?.query || '';
    const [searchValue, setSearchValue] = useState(initialQuery);
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [loading, setLoading] = useState(false);
    const resultsPerPage = 1; // Set the number of results per page to 1

    useEffect(() => {
        if (initialQuery) {
            fetchResults(initialQuery, 1);
        }
    }, [initialQuery]);

    const fetchResults = async (query, page) => {
        setLoading(true);
        console.log(`Fetching results for: "${query}" on page: ${page}`);
        try {
            const response = await fetch(`http://localhost:8080/api/products/search?name=${encodeURIComponent(query)}&page=${page}&size=${resultsPerPage}`);
            const data = await response.json();
            console.log('API response:', data);
            setResults(data.products || []);
            setTotalResults(data.totalCount || 0);
            setCurrentPage(page);
        } catch (error) {
            console.error('Error fetching search results:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        fetchResults(searchValue, 1);
    };

    const handlePageChange = (page) => {
        fetchResults(searchValue, page);
    };

    const totalPages = Math.ceil(totalResults / resultsPerPage);

    return (
        <div className="search-results-container">
            <h1 className="search-results-title">Search Results</h1>

            {/* Search Input and Button */}
            <div className="search-input-container">
                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="search-input"
                        placeholder="Search products..."
                    />
                    <button type="submit" className="search-button">Search</button>
                </form>
            </div>

            {loading ? (
                <p>Loading results...</p>
            ) : results.length > 0 ? (
                <div>
                    <p className="results-count">Showing {results.length} of {totalResults} results</p>
                    <ul className="search-results-list">
                        {results.map((product) => (
                            <li key={product.productId} className="search-result-item">
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-rating">Rating: {product.averageRating}</p>
                                <p className="product-price">${product.price}</p>
                                <p className="product-description">{product.description}</p>
                                {product.pictureBase64 && (
                                    <img
                                        src={`data:image/jpeg;base64,${product.pictureBase64}`}
                                        alt={product.name}
                                        className="product-image"
                                    />
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No products found. Please try a different search.</p>
            )}

            {/* Pagination Controls */}
            <div className="pagination-container">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SearchResults;
