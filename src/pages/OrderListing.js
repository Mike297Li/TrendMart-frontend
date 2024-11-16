/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Table, Button, Pagination, Row, Col, Badge, Form } from 'react-bootstrap';
import axios from 'axios';
import { FaDollarSign, FaShippingFast, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css';
import OrderDetails from './OrderDetails'; // Import the OrderDetails component
import Select from 'react-select'; // Import react-select

const OrderListing = () => {
    const [orders, setOrders] = useState([]);
    const [totalOrders, setTotalOrders] = useState(0);
    const [page, setPage] = useState(1);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [startDate, setStartDate] = useState(null);  // Add startDate state
    const [endDate, setEndDate] = useState(null);      // Add endDate state
    const [selectedOrderStatus, setSelectedOrderStatus] = useState([]); // Add order status state
    const pageSize = 10;

    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.uid;

    useEffect(() => {
        if (userId) {
            fetchOrders();
        }
    }, [page, startDate, endDate, selectedOrderStatus, userId]); // Add selectedOrderStatus to dependency array

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/searchOrders', {
                params: {
                    startDate: startDate ? startDate.toISOString().split('T')[0] : '2024-01-01',
                    endDate: endDate ? endDate.toISOString().split('T')[0] : '2024-12-31',
                    userId,
                    page,
                    size: pageSize,
                    status: selectedOrderStatus.map(option => option.value).join(','), // Add status filter to API request
                },
            });
            setOrders(response.data.orders);
            setTotalOrders(response.data.totalCount);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    };

    const renderStatusBadge = (status) => {
        switch (status) {
            case 'Completed':
                return <Badge bg="success"><FaCheckCircle /> Completed</Badge>;
            case 'Pending':
                return <Badge bg="warning"><FaShippingFast /> Pending</Badge>;
            case 'Canceled':
                return <Badge bg="danger"><FaTimesCircle /> Canceled</Badge>;
            default:
                return <Badge bg="secondary">{status}</Badge>;
        }
    };

    // Options for the react-select filter for order statuses
    const orderStatusOptions = [
        { value: 'Delivered', label: 'Delivered' },
        { value: 'deliver pending', label: 'Delivery Pending' },
        { value: 'Pending', label: 'Pending' },
        { value: 'Canceled', label: 'Canceled' },
    ];

    return (
        <div className='product-detail-container container' style={{ margin: '100px auto' }}>
            {!selectedOrderId ? (
                <>
                    <Row className="justify-content-between align-items-center mb-3">
                        <Col className='text-center'><h1>My Orders</h1></Col>
                    </Row>
                    {/* Filters Row */}
                    <Row className="mb-4">
                        <Col md={4} className="mb-3 mb-md-0">
                            <Form.Label>Start Date</Form.Label>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                dateFormat="yyyy-MM-dd"
                                className="form-control"
                                isClearable
                                placeholderText="Select Start Date"
                            />
                        </Col>
                        <Col md={4} className="mb-3 mb-md-0">
                            <Form.Label>End Date</Form.Label>
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                dateFormat="yyyy-MM-dd"
                                className="form-control"
                                minDate={startDate} // Ensure end date is after start date
                                isClearable
                                placeholderText="Select End Date"
                            />
                        </Col>
                        <Col md={4} className="mb-3 mb-md-0">
                            <Form.Label>Order Status</Form.Label>
                            <Select
                                isMulti
                                options={orderStatusOptions}
                                value={selectedOrderStatus}
                                onChange={setSelectedOrderStatus}
                                placeholder="Select Order Status"
                            />
                        </Col>
                    </Row>

                    <Table striped bordered hover responsive style={{ textAlign: 'center' }}>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Total Amount</th>
                                <th>Status</th>
                                <th>Payment Status</th>
                                <th>Order Date</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length > 0 ? (
                                orders.map((order) => (
                                    <tr key={order.orderId} onClick={() => setSelectedOrderId(order.orderId)} style={{ cursor: 'pointer' }}>
                                        <td>{order.orderId}</td>
                                        <td><FaDollarSign /> {order.totalAmount.toFixed(2)}</td>
                                        <td style={{ textTransform: 'capitalize' }}>{renderStatusBadge(order.orderStatus)}</td>
                                        <td style={{ textTransform: 'capitalize' }}>{order.paymentStatus === 'Completed' ? 
                                            <Badge bg="success"><FaCheckCircle /> Paid</Badge> : 
                                            <Badge bg="warning"><FaTimesCircle /> Unpaid</Badge>
                                        }</td>
                                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td>{order.address}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">No orders found</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>

                    <Pagination className="justify-content-center mt-3">
                        {[...Array(Math.ceil(totalOrders / pageSize)).keys()].map((pageNumber) => (
                            <Pagination.Item 
                                key={pageNumber + 1} 
                                active={pageNumber + 1 === page} 
                                onClick={() => handlePageChange(pageNumber + 1)}
                            >
                                {pageNumber + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </>
            ) : (
                <OrderDetails orderId={selectedOrderId} onBack={() => setSelectedOrderId(null)} />
            )}
        </div>
    );
};

export default OrderListing;
