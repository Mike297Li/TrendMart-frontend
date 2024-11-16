/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { FaStar, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useCart } from '../context/CartContext'; // Import CartContext hook
import '../styles/ProductDetail.css';

const ProductDetail = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0); // State to track hover
    const [reviewText, setReviewText] = useState('');
    const [reviewMessage, setReviewMessage] = useState('');
    const [reviewError, setReviewError] = useState('');
    const [reviews, setReviews] = useState([]);
    const [userReview, setUserReview] = useState(null); // To store user's review if they already submitted one
    const [isEditing, setIsEditing] = useState(false); // Track if the user is editing the review
    const user = JSON.parse(localStorage.getItem('user'));

    // Fetch product details
    const fetchProductDetails = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/products/${productId}`);
            const data = await response.json();
            setProduct(data);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    // Fetch reviews for the product
    const fetchReviews = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/review/product/${productId}`);
            const data = await response.json();
            setReviews(data);

            // Check if the current user has already submitted a review
            const existingReview = data.find(review => review.userId === user?.uid);
            setUserReview(existingReview);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    useEffect(() => {
        fetchProductDetails();
        fetchReviews();
    }, [productId, user?.uid]);

    // Handle adding product to the cart
    const handleAddToCart = () => {
        if (!product || !product.productId) {
            console.error('Product does not have a valid ID');
            return;
        }

        const itemToAdd = {
            id: product.productId,
            name: product.name,
            price: product.price,
            pictureBase64: product.pictureBase64,
            quantity: parseInt(quantity),
        };

        addToCart(itemToAdd);

        console.log(`Added ${quantity} of ${product.name} to cart.`);
    };

    // Handle submitting a new review
    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        if (!rating || !reviewText.trim()) {
            setReviewError('Please provide a rating and a review.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/review/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    productId: parseInt(productId),
                    userId: user?.uid,
                    rating: rating,
                    reviewText: reviewText, 
                    userName: user?.displayName
                }),
            });

            if (response.ok) {
                setReviewMessage('Review submitted successfully!');
                setRating(0);
                setReviewText('');
                setReviewError('');
                fetchReviews(); // Re-fetch reviews after submitting
            } else {
                const errorData = await response.json();
                setReviewError(errorData.message || 'Failed to submit review. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            setReviewError('An unexpected error occurred. Please try again.');
        }
    };

    // Handle editing a review
    const handleEditReview = () => {
        setReviewText(userReview.reviewText);
        setRating(userReview.rating);
        setIsEditing(true); // Enable editing mode
    };

    // Handle updating an existing review
    const handleUpdateReview = async (e) => {
        e.preventDefault();

        if (!rating || !reviewText.trim()) {
            setReviewError('Please provide a rating and a review.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/review/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    reviewId: userReview.reviewId,
                    rating: rating,
                    reviewText: reviewText
                }),
            });

            if (response.ok) {
                setReviewMessage('Review updated successfully!');
                setReviewError('');
                setIsEditing(false); // Exit editing mode
                fetchReviews(); // Re-fetch reviews after updating
            } else {
                const errorData = await response.json();
                setReviewError(errorData.message || 'Failed to update review. Please try again.');
            }
        } catch (error) {
            console.error('Error updating review:', error);
            setReviewError('An unexpected error occurred. Please try again.');
        }
    };

    // Handle deleting a review
    const handleDeleteReview = async (reviewId) => {
        try {
            const response = await fetch('http://localhost:8080/api/review/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    reviewId: userReview.reviewId
                }),
            });

            if (response.ok) {
                setReviewMessage('Review deleted successfully!');
                fetchReviews(); // Re-fetch reviews after deleting
            } else {
                const errorData = await response.json();
                setReviewError(errorData.message || 'Failed to delete review. Please try again.');
            }
        } catch (error) {
            console.error('Error deleting review:', error);
            setReviewError('An unexpected error occurred. Please try again.');
        }
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

            <Row className="mt-5">
                <Col md={12}>
                    <h4>Reviews:</h4>
                    {reviewMessage && <Alert variant="success">{reviewMessage}</Alert>}
                    {reviewError && <Alert variant="danger">{reviewError}</Alert>}

                    {reviews.map((review) => (
                        <Card key={review.reviewId} className="mb-4 p-3 shadow-sm review-card">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    {[...Array(5)].map((_, index) => (
                                        <FaStar
                                            key={index}
                                            color={index < review.rating ? "#ffc107" : "#e4e5e9"}
                                            size={18}
                                        />
                                    ))}
                                    <b className="d-inline ms-2">- {review.userName}</b>
                                </div>
                    
                                {userReview?.reviewId === review.reviewId && !isEditing && (
                                    <div>
                                        <Button 
                                            variant="link" 
                                            onClick={handleEditReview} 
                                            className="text-primary"
                                        >
                                            <FaEdit /> Edit
                                        </Button>
                                        <Button 
                                            variant="link" 
                                            onClick={() => handleDeleteReview(review.reviewId)} 
                                            className="text-danger ms-2"
                                        >
                                            <FaTrashAlt /> Delete
                                        </Button>
                                    </div>
                                )}
                            </div>
                    
                            {!isEditing ? (
                                <p>{review.reviewText}</p>
                            ) : (
                                // Review edit form embedded inside the card
                                <Form onSubmit={handleUpdateReview} className="mt-3 p-3 border rounded bg-light">
                                    <Form.Group controlId="rating" className="mb-3">
                                        <Form.Label>Rating (out of 5):</Form.Label>
                                        <div>
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <FaStar
                                                    key={star}
                                                    size={24}
                                                    color={star <= (hoverRating || rating) ? '#ffc107' : '#e4e5e9'}
                                                    onMouseEnter={() => setHoverRating(star)}
                                                    onMouseLeave={() => setHoverRating(0)}
                                                    onClick={() => setRating(star)}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                            ))}
                                        </div>
                                    </Form.Group>
                    
                                    <Form.Group controlId="reviewText" className="mb-3">
                                        <Form.Label>Review:</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            value={reviewText}
                                            onChange={(e) => setReviewText(e.target.value)}
                                            placeholder="Edit your review here..."
                                            required
                                        />
                                    </Form.Group>
                    
                                    <div className="d-flex justify-content-end">
                                        <Button type="submit" variant="primary" className="me-2">
                                            Update Review
                                        </Button>
                                        <Button variant="secondary" onClick={() => setIsEditing(false)}>
                                            Cancel
                                        </Button>
                                    </div>
                                </Form>
                            )}
                        </Card.Body>
                    </Card>
                    
                    ))}

                    {/* Review form for new reviews or when editing */}
                    {!userReview && !isEditing && user?.role !== 'ADMIN' && (
                        <Form onSubmit={handleReviewSubmit}>
                            <Form.Group controlId="rating" className="mb-3">
                                <Form.Label>Rating (out of 5):</Form.Label>
                                <div>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <FaStar
                                            key={star}
                                            size={24}
                                            color={star <= (hoverRating || rating) ? '#ffc107' : '#e4e5e9'}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                            onClick={() => setRating(star)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    ))}
                                </div>
                            </Form.Group>

                            <Form.Group controlId="reviewText" className="mb-3">
                                <Form.Label>Your Review:</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    placeholder="Write your review here..."
                                />
                            </Form.Group>

                            <Button type="submit" variant="primary">
                                Submit Review
                            </Button>
                        </Form>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetail;
