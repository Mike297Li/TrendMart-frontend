/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OrderDetails = ({ orderId, onBack }) => {
    const [orderItems, setOrderItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const fetchOrderItems = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/order/${orderId}`);
            setOrderItems(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching order items:', error);
            setError('Failed to load order items.');
            setLoading(false);
        }
    };

    
    useEffect(() => {
        fetchOrderItems();
    }, [orderId]);

    return (
        <Container style={{ margin: '100px auto' }}>
            <Row className="justify-content-between align-items-center mb-3">
                <Col><h3>Order Details for Order #{orderId}</h3></Col>
                <Col className="text-end">
                    <button onClick={onBack} className="btn btn-secondary">Back to Orders</button>
                </Col>
            </Row>

            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : error ? (
                <Alert variant="danger">{error}</Alert>
            ) : orderItems.length > 0 ? (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderItems.map((item) => (
                            <tr key={item.orderItemId} className='cursor-pointer' onClick={() => navigate(`/product-detail/${item.productId}`, { state: { item } })}>
                                <td className='capitalize'>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>${item.price.toFixed(2)}</td>
                                <td>${(item.quantity * item.price).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <Alert variant="info">No items found for this order.</Alert>
            )}
        </Container>
    );
};

export default OrderDetails;
