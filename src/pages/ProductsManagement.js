/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, Pagination, Row, Col, Badge, Form } from 'react-bootstrap';
import { FaDollarSign, FaStar, FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useNavigate } from 'react-router-dom';

const ProductsManagement = ({resetView}) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [page, setPage] = useState(1);
    const pageSize = 10; // Set the number of products per page
    const [ratingFilter, setRatingFilter] = useState([0, 5]);
    const [quantityFilter, setQuantityFilter] = useState([0, 1000]);
    const [priceFilter, setPriceFilter] = useState([0, 100000]);
    const [nameFilter, setNameFilter] = useState(""); // State for name filter
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        filterProducts(); // Call filter every time any filter changes
    }, [ratingFilter, quantityFilter, priceFilter, nameFilter, products]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/products');
            setProducts(response.data); // Set the products array directly from the response
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    };

    const handleEdit = (product) => {
        navigate(`/edit-product/${product.productId}`, { state: { product } });
    };

    const handleDelete = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`http://localhost:8080/api/products/${productId}`);
                alert('Product deleted successfully');
                fetchProducts();
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    const filterProducts = () => {
        const filtered = products.filter((product) => {
            const isRatingMatch = product.averageRating >= ratingFilter[0] && product.averageRating <= ratingFilter[1];
            const isQuantityMatch = product.quantity >= quantityFilter[0] && product.quantity <= quantityFilter[1];
            const isPriceMatch = product.price >= priceFilter[0] && product.price <= priceFilter[1];
            const isNameMatch = product.name.toLowerCase().includes(nameFilter.toLowerCase()); // Name filter

            return isRatingMatch && isQuantityMatch && isPriceMatch && isNameMatch;
        });

        setFilteredProducts(filtered);
    };

    const getPaginatedProducts = () => {
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return filteredProducts.slice(startIndex, endIndex);
    };

    return (
        <div className='product-detail-container container' style={{ margin: '100px auto' }}>
            <Row className="justify-content-between align-items-center mb-3">
                <Col className='text-center'>
                    <h1>Product Management Dashboard</h1>
                </Col>
                <Col className="text-end">
                    <Button variant="secondary" onClick={resetView}>
                        <FaArrowLeft /> Back to Dashboard
                    </Button>
                </Col>
            </Row>

            {/* Filters */}
            <Row className="mb-4">
                <Col md={4}>
                    <Form.Label style={{ fontWeight: 'bold' }}>Rating ({ratingFilter[0]} to {ratingFilter[1]})</Form.Label>
                    <Slider
                        range
                        min={0}
                        max={5}
                        value={ratingFilter}
                        onChange={setRatingFilter}
                        step={0.5}
                        tipFormatter={(value) => `${value}`}
                    />
                </Col>
                <Col md={4}>
                    <Form.Label style={{ fontWeight: 'bold' }}>Quantity ({quantityFilter[0]} to {quantityFilter[1]})</Form.Label>
                    <Slider
                        range
                        min={0}
                        max={1000}
                        value={quantityFilter}
                        onChange={setQuantityFilter}
                        tipFormatter={(value) => `${value}`}
                    />
                </Col>
                <Col md={4}>
                    <Form.Label style={{ fontWeight: 'bold' }}>Price (${priceFilter[0]} to ${priceFilter[1]})</Form.Label>
                    <Slider
                        range
                        min={0}
                        max={100000}
                        value={priceFilter}
                        onChange={setPriceFilter}
                        step={1}
                        tipFormatter={(value) => `$${value}`}
                    />
                </Col>
            </Row>

            {/* Name Filter */}
            <Row className="mb-4">
                <Col md={12}>
                    <Form.Label style={{ fontWeight: 'bold' }}>Search by Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Search products by name"
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)} // Update nameFilter directly
                    />
                </Col>
            </Row>

            {/* Product Table */}
            <Table striped bordered hover responsive style={{ textAlign: 'center' }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Features</th>
                        <th>Rating</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {getPaginatedProducts().length > 0 ? (
                        getPaginatedProducts().map((product) => (
                            <tr key={product.productId}>
                                <td className='cursor-pointer' onClick={() => navigate(`/product-detail/${product.productId}`, { state: { product } })}>{product.name}</td>
                                <td>{product.description}</td>
                                <td><FaDollarSign /> {product.price.toFixed(2)}</td>
                                <td>{product.features}</td>
                                <td>
                                    <Badge bg="info"><FaStar /> {product.averageRating}</Badge>
                                </td>
                                <td>{product.quantity}</td>
                                <td>
                                    <Button variant="warning" onClick={() => handleEdit(product)} className="me-2">
                                        <FaEdit /> Edit
                                    </Button>
                                    <Button variant="danger" onClick={() => handleDelete(product.productId)} >
                                        <FaTrash /> Delete
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center">
                                No products available
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

            {/* Pagination */}
            <Pagination className="justify-content-center mt-3">
                {[...Array(Math.ceil(filteredProducts.length / pageSize)).keys()].map((pageNumber) => (
                    <Pagination.Item
                        key={pageNumber + 1}
                        active={pageNumber + 1 === page}
                        onClick={() => handlePageChange(pageNumber + 1)}
                    >
                        {pageNumber + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </div>
    );
};

export default ProductsManagement;
