import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import ProductForm from './ProductForm';

const ProductPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isEditing = location.state?.product ? true : false;
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        features: '',
        average_rating: '',
        images: [],
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
                images: [],
            });
        }
    }, [isEditing, location.state]);

    const handleChange = (e) => {
        if (e.target.name === 'images') {
            setFormData({ ...formData, images: [...e.target.files] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSubmit = new FormData();
        formDataToSubmit.append('name', formData.name);
        formDataToSubmit.append('description', formData.description);
        formDataToSubmit.append('price', formData.price);
        formDataToSubmit.append('features', formData.features);
        formDataToSubmit.append('average_rating', formData.average_rating);

        for (let i = 0; i < formData.images.length; i++) {
            formDataToSubmit.append('images', formData.images[i]);
        }

        try {
            if (isEditing) {
                await axios.put(`http://localhost:8080/api/products/${location.state.product.productId}`, formDataToSubmit, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                alert('Product updated successfully');
            } else {
                await axios.post('http://localhost:8080/api/products', formDataToSubmit, {
                    headers: { 'Content-Type': 'multipart/form-data' },
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
