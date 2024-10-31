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
        average_rating: '',
        imageBase64: '' // Change this to a single base64 string
    });

    useEffect(() => {
        if (isEditing) {
            const { product } = location.state;
            setFormData({
                name: product.name,
                description: product.description,
                price: product.price,
                features: product.features,
                average_rating: product.average_rating,
                imageBase64: product.imageBase64 || '', // Ensure to get base64 string if available
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
                        imageBase64: reader.result,
                    }));
                };
                reader.readAsDataURL(file);
            }
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData(); // Rename this variable
        formDataToSend.append('name', formData.name);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('price', parseFloat(formData.price).toFixed(2));
        formDataToSend.append('features', formData.features);
        formDataToSend.append('average_rating', parseFloat(formData.average_rating).toFixed(2));

        // Append the image if it exists
        if (formData.imageBase64) {
            const response = await fetch(formData.imageBase64);
            const blob = await response.blob();
            const file = new File([blob], 'image.png', { type: 'image/png' });
            formDataToSend.append('images', file);
        }

        // Log FormData
        for (let pair of formDataToSend.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        try {
            if (isEditing) {
                await axios.put(`http://localhost:8080/api/products/${location.state.product.productId}`, formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                alert('Product updated successfully');
            } else {
                await axios.post('http://localhost:8080/api/products', formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                alert('Product created successfully');
            }
            navigate('/'); // Redirect to product listing page
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
