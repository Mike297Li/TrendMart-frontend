import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/SearchResults.css';
import { useState, useEffect } from 'react';

const SearchResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const initialResults = location.state?.results || [];
    const initialQuery = location.state?.query || '';
    const [searchValue, setSearchValue] = useState(initialQuery);
    const [results, setResults] = useState(initialResults);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const resultsPerPage = 10; // Set the number of results per page

    useEffect(() => {
        if (initialResults.length > 0) {
            setResults(initialResults);
            setTotalResults(location.state?.totalResults || 0); // Use the total results from state
        }
    }, [initialResults]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/products/search?name=${encodeURIComponent(searchValue)}&page=1&limit=${resultsPerPage}`);
            const data = await response.json();
            navigate('/search-results', { state: { results: data.results, totalResults: data.totalResults, query: searchValue } });
            setCurrentPage(1); // Reset to the first page
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const handlePageChange = async (page) => {
        setCurrentPage(page);
        try {
            const response = await fetch(`http://localhost:8080/api/products/search?name=${encodeURIComponent(searchValue)}&page=${page}&limit=${resultsPerPage}`);
            const data = await response.json();
            setResults(data.results);
            navigate('/search-results', { state: { results: data.results, totalResults: data.totalResults, query: searchValue } });
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
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

            {results.length > 0 ? (
                <ul className="search-results-list">
                    {results.map((product) => (
                        <li key={product.id} className="search-result-item">
                            <img
                                src={`data:image/jpeg;base64,${product.pictureBase64}`}
                                alt={product.name}
                                className="product-image"
                            />
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-rating">Rating: {product.averageRating}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No products found.</p>
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
