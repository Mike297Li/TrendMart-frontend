import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useCart } from '../context/CartContext'; // Import CartContext hook
import '../styles/ProductDetail.css';

const ProductDetail = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart(); // Get the addToCart function from context
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/products/${productId}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails();
    }, [productId]);

    const handleAddToCart = () => {
        if (!product || !product.productId) {
            console.error('Product does not have a valid ID');
            return;
        }

        // Prepare the item to add to the cart
        const itemToAdd = {
            id: product.productId,
            name: product.name,
            price: product.price,
            pictureBase64: product.pictureBase64,
            quantity: parseInt(quantity),
        };

        // Use the addToCart function from context to add the item
        addToCart(itemToAdd);

        console.log(`Added ${quantity} of ${product.name} to cart.`);
    };

    if (!product) {
        return <p className="text-center">No product details available.</p>;
    }

    return (
        <Container className="product-detail-container py-5">
            <Button variant="outline-secondary" onClick={() => navigate(-1)} className="mb-4">
                &larr; Back
            </Button>
            <Row>
                <Col md={6} className="text-center">
                    <Card.Img 
                        variant="top" 
                        src={product.pictureBase64} 
                        alt={product.name} 
                        className="img-fluid rounded product-detail-image"
                    />
                </Col>
                <Col md={6}>
                    <Card className="p-4 shadow-sm">
                        <Card.Body>
                            <Card.Title className="mb-3">{product.name}</Card.Title>
                            <Card.Text>{product.description}</Card.Text>
                            <Card.Text><strong>Price:</strong> ${product.price}</Card.Text>
                            <Card.Text><strong>Rating:</strong> {product.averageRating}</Card.Text>

                            <Form.Group controlId="quantity" className="quantity-container mb-3">
                                <Form.Label>Quantity:</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    className="quantity-input"
                                />
                            </Form.Group>

                            <Button 
                                onClick={handleAddToCart} 
                                variant="primary" 
                                className="w-100 mt-3"
                            >
                                Add to Cart
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetail;
