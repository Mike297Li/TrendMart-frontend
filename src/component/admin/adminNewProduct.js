import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        features: '',
        average_rating: '',
        images: [],
    });
    const [isEditing, setIsEditing] = useState(false);
    const [currentProductId, setCurrentProductId] = useState(null);

    // Fetch all products
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get('/api/products'); // Replace with your backend API endpoint
            setProducts(response.data);
        };
        fetchProducts();
    }, []);

    // Handle form inputs
    const handleChange = (e) => {
        if (e.target.name === 'images') {
            setFormData({ ...formData, images: [...e.target.files] }); // For image upload
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value }); // For text input
        }
    };

    // Handle product creation or update
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSubmit = new FormData();
        formDataToSubmit.append('name', formData.name);
        formDataToSubmit.append('description', formData.description);
        formDataToSubmit.append('price', formData.price);
        formDataToSubmit.append('features', formData.features);
        formDataToSubmit.append('average_rating', formData.average_rating);

        // Add images to form data
        for (let i = 0; i < formData.images.length; i++) {
            formDataToSubmit.append('images', formData.images[i]);
        }

        try {
            if (isEditing) {
                // Update existing product
                await axios.put(`/api/products/${currentProductId}`, formDataToSubmit, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                alert('Product updated successfully');
            } else {
                // Create new product
                await axios.post('/api/products', formDataToSubmit, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                alert('Product created successfully');
            }

            // Reset form and refresh product list
            setFormData({
                name: '',
                description: '',
                price: '',
                features: '',
                average_rating: '',
                images: [],
            });
            setIsEditing(false);
            setCurrentProductId(null);
            fetchProducts(); // Refresh product list
        } catch (error) {
            console.error('Error submitting product:', error);
        }
    };

    // Handle editing a product
    const handleEdit = (product) => {
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            features: product.features,
            average_rating: product.average_rating,
            images: [], // Images not pre-filled, should be re-uploaded if needed
        });
        setCurrentProductId(product.product_id);
        setIsEditing(true);
    };

    // Handle deleting a product
    const handleDelete = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`/api/products/${productId}`);
                alert('Product deleted successfully');
                fetchProducts(); // Refresh product list
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    // Fetch products after update/delete
    const fetchProducts = async () => {
        const response = await axios.get('/api/products');
        setProducts(response.data);
    };

    return (
        <div>
            <h1>{isEditing ? 'Edit Product' : 'Create Product'}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <textarea
                        name="description"
                        placeholder="Product Description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="features"
                        placeholder="Product Features"
                        value={formData.features}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="number"
                        name="average_rating"
                        placeholder="Average Rating"
                        value={formData.average_rating}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="file"
                        name="images"
                        multiple
                        onChange={handleChange} // Handling multiple image selection
                    />
                </div>
                <button type="submit">{isEditing ? 'Update Product' : 'Create Product'}</button>
            </form>

            <h2>Product List</h2>
            {products.length > 0 ? (
                products.map((product) => (
                    <div key={product.product_id}>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        <p>Features: {product.features}</p>
                        <p>Rating: {product.average_rating}</p>
                        <button onClick={() => handleEdit(product)}>Edit</button>
                        <button onClick={() => handleDelete(product.product_id)}>Delete</button>
                    </div>
                ))
            ) : (
                <p>No products available</p>
            )}
        </div>
    );
};

export default AdminProductManagement;
