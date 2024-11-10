import React, { useState } from 'react';
import '../styles/Payment.css'; // Create a Payment.css file similar to Login.css
import { useNavigate, useLocation } from 'react-router-dom'; // For navigation
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Load the Stripe object with your publishable key
const stripePromise = loadStripe('pk_test_51QI91pJXJU4eSyCwCdLRJILNHwtarSkNx6APhaKrlZLc7ykVSLyvzRbxkEnvl63wUKoE0BhixTk7WxWRVJYToY9u00mBBGFwQT');

const Payment = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [name, setName] = useState('');
    const [email, setEmail] = useState(''); // New email state
    const [postalCode, setPostalCode] = useState('');
    const [message, setMessage] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate(); // For navigation

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

        fetch('http://localhost:8080/api/payments/create', {
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
                        navigate('/success'); // Redirect to a success page
                    } else {
                        setMessage(`Payment status: ${paymentIntent.status}`);
                    }
                } else if (data.status === 'success') {
                    setMessage(data.message);
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
            navigate('/success'); // Redirect to a success page after payment
        } else {
            setMessage('Payment still requires further action or has failed.');
        }
    };

    return (
        <div className="payment-container">
            <h2>Payment</h2>

            {/* Show error/success message */}
            {message && <p className="message">{message}</p>}

            <form onSubmit={handlePaymentSubmission}>
                <label>
                    Name on Card:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Postal Code:
                    <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                    />
                </label>

                <div className="card-element-wrapper">
                    <CardElement id="card-element" />
                </div>

                <button type="submit" disabled={isProcessing || !stripe}>
                    {isProcessing ? 'Processing...' : 'Submit Payment'}
                </button>
            </form>
        </div>
    );
};

export default Payment;
