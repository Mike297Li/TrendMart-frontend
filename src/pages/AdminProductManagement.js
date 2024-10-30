import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavBar';

const AdminProductManagement = () => {
    const [products, setProducts] = useState([]);
    // const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(sessionStorage.getItem('user') == null){
            // navigate('/admin');
        }
        // setUser(JSON.parse(sessionStorage.getItem('user')))
        fetchProducts();
    // eslint-disable-next-line
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleEdit = (product) => {
        // Navigate to the edit page with the product data
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

    return (
        <>
            <AdminNavbar />
            <Container className="mt-5 d-flex flex-column">
                <h2 className="mb-4">Product List</h2>
                <Table striped bordered hover responsive className="text-center custom-table" style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Features</th>
                            <th>Rating</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <tr key={product.productId}>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>${product.price}</td>
                                    <td>{product.features}</td>
                                    <td>{product.averageRating}</td>
                                    <td className='product-listing-buttons'>
                                        <Button variant="warning" onClick={() => handleEdit(product)} className="me-2">
                                            Edit
                                        </Button>
                                        <Button variant="danger" onClick={() => handleDelete(product.productId)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    No products available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Container>
        </>
    );
};

export default AdminProductManagement;
