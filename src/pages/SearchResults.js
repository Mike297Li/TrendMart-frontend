import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Form, Button, InputGroup, Row, Col, Container, Pagination } from 'react-bootstrap';
import '../styles/SearchResults.css';

const SearchResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const initialResults = location.state?.results || [];
    const initialQuery = location.state?.query || '';
    const [searchValue, setSearchValue] = useState(initialQuery);
    const [rating, setRating] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [results, setResults] = useState(initialResults);
    const [currentPage, setCurrentPage] = useState(location.state?.page || 1);
    const [totalResults, setTotalResults] = useState(location.state?.totalCount || 0);
    const resultsPerPage = 10;

    useEffect(() => {
        setTotalResults(location.state?.totalCount || 0);
    }, [location.state?.totalCount]);

    useEffect(() => {
        if (sessionStorage.getItem('user') == null) {
            navigate('/');
        }
    }, [navigate]);

    const buildQueryParams = (page) => {
        const params = new URLSearchParams();
        params.append('name', searchValue || '');
        params.append('rating', rating || '');
        params.append('minPrice', minPrice || '');
        params.append('maxPrice', maxPrice || '');
        params.append('page', page); // Use the page passed as argument
        params.append('size', resultsPerPage);
        return params.toString();
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setCurrentPage(1);
        try {
            const response = await fetch(`http://localhost:8080/api/products/search?${buildQueryParams(1)}`);
            const data = await response.json();
            setResults(data.products);
            setTotalResults(data.totalCount);
            navigate('/search-results', { state: { results: data.products, totalCount: data.totalCount, query: searchValue, page: 1 } });
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const handlePageChange = async (page) => {
        setCurrentPage(page); // Update page state immediately
        try {
            const response = await fetch(`http://localhost:8080/api/products/search?${buildQueryParams(page)}`);
            const data = await response.json();
            setResults(data.products);
            setTotalResults(data.totalCount);
            navigate('/search-results', { state: { results: data.products, totalCount: data.totalCount, query: searchValue, page } });
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const handleProductClick = (product) => {
        navigate(`/product/${product.productId}`, { state: { product } });
    };

    const totalPages = Math.ceil(totalResults / resultsPerPage);

    return (
        <Container className="search-results-container">
            <h1 className="text-center mb-4">Search Products</h1>

            <Form onSubmit={handleSearch} className="mb-4">
                <Row className="gy-2">
                    <Col md={6}>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                placeholder="Product name..."
                            />
                        </InputGroup>
                    </Col>
                    <Col md={2}>
                        <InputGroup>
                            <Form.Control
                                type="number"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                placeholder="Rating"
                                min="0"
                                max="5"
                                step="0.1"
                            />
                        </InputGroup>
                    </Col>
                    <Col md={2}>
                        <InputGroup>
                            <Form.Control
                                type="number"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                placeholder="Min Price"
                            />
                        </InputGroup>
                    </Col>
                    <Col md={2}>
                        <InputGroup>
                            <Form.Control
                                type="number"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                placeholder="Max Price"
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col className="text-center">
                        <Button variant="primary" type="submit">Search</Button>
                    </Col>
                </Row>
            </Form>

            {results.length > 0 ? (
                <ul className="list-unstyled">
                    {results.map((product) => (
                        <li
                            key={product.productId}
                            className="search-result-item mb-3 p-3 border rounded"
                            onClick={() => navigate(`/product-detail/${product.productId}`, { state: { product } })}
                            style={{ cursor: 'pointer' }} // Optional: to indicate it's clickable
                        >
                            <Row>
                                <Col xs={4} md={3}>
                                    <img
                                        src={`${product.pictureBase64}`}
                                        alt={product.name}
                                        className="img-fluid rounded"
                                    />
                                </Col>
                                <Col xs={8} md={9}>
                                    <h4>{product.name}</h4>
                                    <p>{product.description}</p>
                                    <p>Rating: {product.averageRating} | Price: ${product.price}</p>
                                </Col>
                            </Row>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center">No products found.</p>
            )}

            <div className="d-flex justify-content-center mt-4">
                <Pagination>
                    {[...Array(totalPages)].map((_, index) => (
                        <Pagination.Item
                            key={index + 1}
                            active={currentPage === index + 1}
                            onClick={() => handlePageChange(index + 1)} // Use the updated page value here
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </div>
        </Container>
    );
};

export default SearchResults;
