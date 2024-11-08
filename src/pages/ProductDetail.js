import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../component/footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import '../styles/ProductDetail.css';

const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

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
        // Ensure product and productId are present
        if (!product || !product.productId) {
            console.error('Product does not have a valid ID');
            return; // Exit if no valid product ID
        }

        const itemToAdd = {
            id: product.productId, // Use productId instead of id
            name: product.name,
            price: product.price,
            pictureBase64: product.pictureBase64,
            quantity: parseInt(quantity), // Ensure quantity is an integer
        };

        // Retrieve existing cart items from local storage
        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if the item is already in the cart
        const existingItemIndex = existingCart.findIndex(item => item.id === itemToAdd.id);

        if (existingItemIndex > -1) {
            // If the item is already in the cart, update the quantity
            existingCart[existingItemIndex].quantity += itemToAdd.quantity;
        } else {
            // If the item is not in the cart, add it
            existingCart.push(itemToAdd);
        }

        // Save updated cart back to local storage
        localStorage.setItem('cart', JSON.stringify(existingCart));
        console.log(`Added ${quantity} of ${product.name} to cart.`);
    };


    const handleCartClick = () => {
        navigate('/cart');
    };

    if (!product) {
        return <p>No product details available.</p>;
    }

    return (
        <div>
            <div className="product-detail-container">
                <h1>{product.name}</h1>
                <img src={`data:image/jpeg;base64,${product.pictureBase64}`} alt={product.name} className="img-fluid" />
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Rating: {product.averageRating}</p>

                <div className="quantity-container">
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        type="number"
                        id="quantity"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>

                <button onClick={handleAddToCart} className="btn btn-primary">Add to Cart</button>
            </div>

            <div className="icon-container">
                <div className="cart-icon" onClick={handleCartClick}>
                    <FontAwesomeIcon icon={faShoppingCart} size="2x" />
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ProductDetail;
