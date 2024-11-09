import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import ProductForm from './ProductForm';

const ProductPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isEditing = !!location.state?.product; // Check if we are in editing mode
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        features: '',
        averageRating: '',
        pictureBase64: '', // Change this to a single base64 string
        quantity: ''
    });

    useEffect(() => {
        if (isEditing) {
            const { product } = location.state;
            setFormData({
                name: product.name,
                description: product.description,
                price: product.price,
                features: product.features,
                averageRating: product.averageRating,
                pictureBase64: product.pictureBase64 || '', // Ensure to get base64 string if available
                quantity: product.quantity
            });
        }
    }, [isEditing, location.state]);

    const handleChange = (e) => {
        if (e.target.name === 'images') { // Ensure you're handling the file input correctly
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setFormData((prevData) => ({
                        ...prevData,
                        pictureBase64: reader.result,
                    }));
                };
                reader.readAsDataURL(file);
            }
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    // Helper function to convert file to Base64
    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData(); // Rename this variable
        formDataToSend.append('name', formData.name);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('price', parseFloat(formData.price).toFixed(2));
        formDataToSend.append('features', formData.features);
        formDataToSend.append('averageRating', parseFloat(formData.averageRating).toFixed(2));
        formDataToSend.append('quantity', formData.quantity);

        // Append the base64 image if it exists
        if (formData.pictureBase64) {
            formDataToSend.append('pictureBase64', formData.pictureBase64); // Directly append the Base64 data
        } else if (formData.images.length > 0) {
            // For new product images, convert to base64 and append each file
            for (let imageFile of formData.images) {
                const base64Image = await convertFileToBase64(imageFile);
                formDataToSend.append('pictureBase64', base64Image.split(',')[1]);
            }
        }

        // Log FormData
        for (let pair of formDataToSend.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        try {
            if (isEditing) {
                await axios.put(`http://localhost:8080/api/products/${location.state.product.productId}`, formDataToSend, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                alert('Product updated successfully');
            } else {
                await axios.post('http://localhost:8080/api/products', formDataToSend, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                alert('Product created successfully');
            }
            navigate('/adminPortal'); // Redirect to product listing page
        } catch (error) {
            console.error('Error submitting product:', error);
        }
    };

    return (
        <div className="container mt-4">
            <ProductForm
                formData={formData}
                isEditing={isEditing}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};

export default ProductPage;
