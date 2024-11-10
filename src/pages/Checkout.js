import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../component/footer';
import '../styles/Checkout.css';
import { getAuth } from "firebase/auth"; // Import getAuth from Firebase SDK

const Checkout = () => {
    const { state } = useLocation(); // Retrieve cartItems passed from Cart page
    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    const cartItems = state?.cartItems || []; // Ensure cartItems is not undefined

    // Log cartItems when entering the Checkout page
    console.log('Received Cart Items:', cartItems);

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handlePlaceOrder = async () => {
        // Log cartItems before sending the order
        console.log('Checkout Cart Items before sending:', cartItems);
        // Get the current user's Firebase UID
        const auth = getAuth();  // Get Auth instance
        const user = auth.currentUser;  // Get current user
        if (!user) {
            // Handle case when the user is not logged in
            alert('You must be logged in to place an order');
            return;
        }
        // Calculate the total amount for the order
        const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

        // Build the order data, ensuring productId is correct
        const orderData = {
            userId: user.uid,
            items: cartItems.map(item => ({
                productId: item.id, // Ensure productId is correctly passed here (no fallback unless missing)
                quantity: item.quantity,   // Ensure quantity is correctly passed
                price: item.price !== null && item.price !== undefined ? item.price : 0 // Handle price properly
            })),
            address,
            totalAmount // Include the totalAmount in the order data
        };

        // Log the final orderData before sending
        console.log('Sending Order Data:', orderData);

        try {
            const response = await fetch('http://localhost:8080/api/checkout/place-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData), // Send the order data
            });

            if (response.ok) {
                const responseData = await response.json(); // Assuming backend returns the order ID
                const orderId = responseData.orderId; // Get the orderId from the response
                console.log('ORDER ID :', orderId +'totalAmount:'+totalAmount);
                navigate('/payment', { state: { totalAmount, orderId } }); // Passing totalAmount and orderId to the Payment page
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
        <div className="checkout-container">
            <h1>Checkout</h1>
            <div className="checkout-details">
                <h2>Edit your Shipping Address</h2>
                <textarea
                    value={address}
                    onChange={handleAddressChange}
                    placeholder="Enter your address here"
                    rows="4"
                    className="address-input"
                />
                <button onClick={handlePlaceOrder} className="place-order-button">Place Order</button>
            </div>
            <Footer />
        </div>
    );
};

export default Checkout;
