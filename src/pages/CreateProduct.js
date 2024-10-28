import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProductForm from './ProductForm';

const CreateProduct = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        features: '',
        average_rating: '',
        images: [],
    });

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
            await axios.post('http://localhost:8080/api/products', formDataToSubmit, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Product created successfully');
            navigate('/'); // Redirect to product listing page
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return (
        <div className="container mt-4">
            <ProductForm
                formData={formData}
                isEditing={false}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};

export default CreateProduct;
