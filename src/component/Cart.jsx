import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../component/footer';
import '../styles/Cart.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);
    }, []);

    const handleQuantityChange = (id, newQuantity) => {
        setCartItems(prevItems => {
            const updatedItems = prevItems.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            );
            localStorage.setItem('cart', JSON.stringify(updatedItems));
            return updatedItems;
        });
    };

    const handleRemoveItem = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    // Cart.js
    const handleCheckout = () => {
        const updatedCartItems = cartItems.map(item => ({
            ...item,
            // Ensure productId is correctly passed; If it's missing, log or handle it
            productId: item.productId || 'defaultProductId',  // Ensure it's not undefined or null
            price: item.price || 0  // Handle missing price (optional)
        }));

        // Passing cart data to Checkout page
        navigate('/checkout', {
            state: { cartItems: updatedCartItems }
        });
        console.log('Cart Items:', cartItems); // Check the cart items before navigation
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    return (
        <div className="cart-container">
            <h1>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <ul>
                        {cartItems.map(item => (
                            <li key={item.id} className="cart-item">
                                <img src={`data:image/jpeg;base64,${item.pictureBase64}`} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h2>{item.name}</h2>
                                    <p>Price: ${item.price}</p>
                                    <label>
                                        Quantity:
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            min="1"
                                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                        />
                                    </label>
                                    <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <h2>Total: ${calculateTotal()}</h2>
                    <button onClick={handleCheckout} className="checkout-button">Proceed to Checkout</button>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default Cart;
