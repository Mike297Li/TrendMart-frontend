import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Row, Col, Form, Button, Card } from 'react-bootstrap'; // Importing Bootstrap components
import { FaMapMarkerAlt, FaTruck, FaCreditCard } from 'react-icons/fa'; // Using React Icons
import { getAuth } from "firebase/auth";
import '../styles/Checkout.css';

const Checkout = () => {
    const { state } = useLocation(); // Retrieve cartItems passed from Cart page
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const navigate = useNavigate();
    const cartItems = state?.cartItems || []; // Ensure cartItems is not undefined

    useEffect(()=>{
        if(JSON.parse(localStorage.getItem('user'))?.role === 'ADMIN'){
            navigate('/')
        }
    })

    const handlePlaceOrder = async () => {
        // Combine address into a single string
        const address = `${street}, ${city}, ${postalCode}, ${country}`;

        // Get the current user's Firebase UID
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) {
            alert('You must be logged in to place an order');
            return;
        }
        // Calculate the total amount for the order
        const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

        // Build the order data
        const orderData = {
            userId: user.uid,
            items: cartItems.map(item => ({
                productId: item.id,
                quantity: item.quantity,
                price: item.price || 0
            })),
            address,
            totalAmount,
        };

        try {
            const response = await fetch('http://localhost:8080/api/checkout/place-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData), // Send the order data
            });

            if (response.ok) {
                const responseData = await response.json();
                const orderId = responseData.orderId;
                navigate('/payment', { state: { totalAmount, orderId } });
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message || 'Something went wrong'}`);
            }
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place the order. Please try again later.');
        }
    };

    return (
        <div className="checkout-container py-5">
            <h1 className="text-center mb-4">Checkout</h1>
            <Card className="shadow-sm">
                <Card.Body>
                    <h2 className="mb-4"><FaMapMarkerAlt /> Shipping Address</h2>
                    <Form>
                        <Row className="mb-3">
                            <Col sm={12} md={6}>
                                <Form.Group controlId="street">
                                    <Form.Label>Street Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter street address"
                                        value={street}
                                        onChange={(e) => setStreet(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col sm={12} md={6}>
                                <Form.Group controlId="city">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter city"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col sm={12} md={6}>
                                <Form.Group controlId="postalCode">
                                    <Form.Label>Postal Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter postal code"
                                        value={postalCode}
                                        onChange={(e) => setPostalCode(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col sm={12} md={6}>
                                <Form.Group controlId="country">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter country"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <div className="text-center">
                            <Button variant="primary" onClick={handlePlaceOrder} size="lg" className="mt-4 w-100">
                                <FaTruck /> Proceed with Shipping
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>

            {/* Order Summary Section */}
            <div className="order-summary mt-5">
                <h3 className="text-center mb-3"><FaCreditCard /> Order Summary</h3>
                <Card className="shadow-sm">
                    <Card.Body>
                        <ul className="list-unstyled">
                            {cartItems.map((item) => (
                                <li key={item.id} className="d-flex justify-content-between">
                                    <span>{item.name} (x{item.quantity})</span>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                        <hr />
                        <div className="d-flex justify-content-between">
                            <strong>Total Amount:</strong>
                            <strong>${cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</strong>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default Checkout;
