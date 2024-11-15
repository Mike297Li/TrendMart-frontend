import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import '../styles/Cart.css';

const Cart = () => {
    const { cart, updateCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        // If the cart is empty, initialize it from localStorage
        if (cart.length === 0) {
            const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
            updateCart(storedCart);
        }
    }, [cart, updateCart]);

    const handleQuantityChange = (id, newQuantity) => {
        const updatedCart = cart.map(item => 
            item.id === id ? { ...item, quantity: newQuantity } : item
        );
        updateCart(updatedCart);  // Update both context and localStorage
    };

    const handleRemoveItem = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        updateCart(updatedCart);  // Update both context and localStorage
    };

    const handleCheckout = () => {
        const updatedCartItems = cart.map(item => ({
            ...item,
            productId: item.productId || 'defaultProductId',
            price: item.price || 0
        }));
        navigate('/checkout', { state: { cartItems: updatedCartItems } });
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    return (
        <div className="cart-container py-5">
            <h1 className="text-center mb-4">Your Cart</h1>
            {cart.length === 0 ? (
                <p className="text-center">Your cart is empty.</p>
            ) : (
                <>
                    <Row className="g-4">
                        {cart.map(item => (
                            <Col md={6} lg={4} key={item.id}>
                                <Card className="cart-item shadow-sm"
                                >
                                    <Card.Img 
                                        variant="top" 
                                        src={item.pictureBase64} 
                                        alt={item.name} 
                                        className="cart-item-image"
                                        onClick={() => navigate(`/product-detail/${item.id}`, { state: { item } })}
                                    />
                                    <Card.Body>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Text>
                                            Price: ${item.price}
                                        </Card.Text>
                                        <Form.Group controlId={`quantity-${item.id}`} className="mb-3">
                                            <Form.Label>Quantity:</Form.Label>
                                            <Form.Control
                                                type="number"
                                                value={item.quantity}
                                                min="1"
                                                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                            />
                                        </Form.Group>
                                        <Button 
                                            variant="danger" 
                                            onClick={() => handleRemoveItem(item.id)} 
                                            className="w-100"
                                        >
                                            Remove
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <div className="total-container my-4 text-center">
                        <h2>Total: ${calculateTotal()}</h2>
                        <Button 
                            onClick={handleCheckout} 
                            variant="success" 
                            className="checkout-button mt-3"
                            size="lg"
                        >
                            Proceed to Checkout
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
