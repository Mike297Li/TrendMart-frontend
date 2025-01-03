import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Container, Form, Button, Alert, Spinner, Card } from 'react-bootstrap';
import { FaRegCreditCard, FaEnvelope, FaUser, FaMapMarkerAlt } from 'react-icons/fa';
import { useCart } from '../context/CartContext'; // Import useCart


// Load the Stripe object with your publishable key
// const stripePromise = loadStripe('pk_test_51QI91pJXJU4eSyCwCdLRJILNHwtarSkNx6APhaKrlZLc7ykVSLyvzRbxkEnvl63wUKoE0BhixTk7WxWRVJYToY9u00mBBGFwQT');

const iconStyle = { color: '#efe2b7'};


const Payment = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { clearCart } = useCart(); // Destructure clearCart from context
    const [name, setName] = useState('');
    const [email, setEmail] = useState(''); // New email state
    const [postalCode, setPostalCode] = useState('');
    const [message, setMessage] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate(); // For navigation
    const apiUrl = process.env.REACT_APP_API_URL;
    // Retrieve orderId and totalAmount from location state
    const { state } = useLocation();
    const { orderId, totalAmount } = state || {}; // Destructure orderId and totalAmount

    if (!orderId || !totalAmount) {
        setMessage('Missing order details.');
        return;
    }

    const handlePaymentSubmission = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        if (!stripe || !elements) {
            setMessage('Stripe.js has not loaded yet.');
            setIsProcessing(false);
            return;
        }

        // Create PaymentMethod with billing details
        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: {
                name: name,
                email: email, // Include email in billing details
                address: {
                    postal_code: postalCode,
                },
            },
        });

        if (error) {
            console.error('Error:', error);
            setMessage(error.message);
            setIsProcessing(false);
            return;
        }

        console.log('PaymentMethod created:', paymentMethod);

        fetch(`${apiUrl}/api/payments/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                orderId: orderId, // Use the passed orderId
                amount: totalAmount, // Use the passed totalAmount
                paymentMethodId: paymentMethod.id,
                email: email, // Include email in the request body
            }),
        })
            .then(response => response.json())
            .then(async (data) => {
                if (data.status === 'requires_action') {
                    // Handle 3D Secure authentication if needed
                    await handleFurtherAction(data.clientSecret);
                } else if (data.status === 'requires_confirmation') {
                    // Confirm the PaymentIntent
                    const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret);

                    if (error) {
                        setMessage(`Payment confirmation failed: ${error.message}`);
                    } else if (paymentIntent.status === 'succeeded') {
                        setMessage('Payment confirmed and successful!');
                        clearCart();
                        navigate('/success'); // Redirect to a success page
                    } else {
                        setMessage(`Payment status: ${paymentIntent.status}`);
                    }
                } else if (data.status === 'success') {
                    setMessage(data.message);
                    clearCart();
                    navigate('/success'); // Redirect to a success page
                } else {
                    setMessage(data.message);
                }
                setIsProcessing(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setMessage('Payment failed. Please try again.');
                setIsProcessing(false);
            });
    };

    const handleFurtherAction = async (clientSecret) => {
        const { error, paymentIntent } = await stripe.handleCardAction(clientSecret);

        if (error) {
            console.error('Authentication failed:', error.message);
            setMessage(`Payment authentication failed: ${error.message}`);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            console.log('Payment successful!');
            setMessage('Payment successful!');
            clearCart(); // Clear the cart on success
            navigate('/success'); // Redirect to a success page after payment
        } else {
            setMessage('Payment still requires further action or has failed.');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center my-5">
            <Card className="p-4 shadow-lg" style={{ maxWidth: '500px', width: '100%', borderRadius: '10px' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Secure Payment</h2>
                    {message && <Alert variant="info" className="text-center">{message}</Alert>}

                    <Form onSubmit={handlePaymentSubmission} className="mb-3">
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label><FaUser className="me-2" style={iconStyle} />Name on Card</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label><FaEnvelope className="me-2" style={iconStyle}  />Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="postalCode">
                            <Form.Label><FaMapMarkerAlt className="me-2" style={iconStyle} />Postal Code</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter postal code"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="cardElement">
                            <Form.Label><FaRegCreditCard className="me-2" style={iconStyle}  />Card Details</Form.Label>
                            <div className="p-3 border rounded bg-light">
                                <CardElement id="card-element" />
                            </div>
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            className="w-100 mt-3"
                            disabled={isProcessing || !stripe}
                            style={{ borderRadius: '20px' }}
                        >
                            {isProcessing ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Submit Payment'}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Payment;
