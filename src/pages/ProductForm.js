import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const ProductForm = ({
                         formData,
                         isEditing,
                         handleChange,
                         handleSubmit,
                     }) => {
    const [imagePreviews, setImagePreviews] = useState([]);

    useEffect(() => {
        if (isEditing && formData.pictureBase64) {
            // Initialize image previews based on pictureBase64 if editing
            const existingImages = Array.isArray(formData.pictureBase64)
                ? formData.pictureBase64
                : [formData.pictureBase64];
            const previewImages = existingImages.map((base64) => `data:image/jpeg;base64,${base64}`);
            setImagePreviews(previewImages);
        }
    }, [isEditing, formData.pictureBase64]); // Update only if these values change

    // Update image preview when a new file is selected
    const handleImageChange = (e) => {
        handleChange(e); // Call the original handleChange
        const files = Array.from(e.target.files);
        const newImagePreviews = [];

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                newImagePreviews.push(reader.result);
                setImagePreviews((prevPreviews) => [...prevPreviews, reader.result]);
            };
            reader.readAsDataURL(file);
        });
    };

    return (
        <div>
            <h1>{isEditing ? 'Edit Product' : 'Create Product'}</h1>
            <Form onSubmit={handleSubmit} className='mb-5'>
                <Form.Group controlId="formProductName">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter product name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formProductDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        placeholder="Enter product description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formProductPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        placeholder="Enter price"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formProductFeatures">
                    <Form.Label>Features</Form.Label>
                    <Form.Control
                        type="text"
                        name="features"
                        placeholder="Enter product features"
                        value={formData.features}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formProductRating">
                    <Form.Label>Average Rating</Form.Label>
                    <Form.Control
                        type="number"
                        name="average_rating"
                        placeholder="Enter rating"
                        value={formData.average_rating}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formProductImages">
                    <Form.Label>Product Images</Form.Label>
                    <Form.Control
                        type="file"
                        name="images"
                        multiple
                        onChange={handleImageChange} // Updated to handle image preview
                    />
                </Form.Group>
                {imagePreviews.length > 0 && (
                    <div className="mt-3">
                        <Form.Label>Image Previews</Form.Label>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            {imagePreviews.map((preview, index) => (
                                <img
                                    key={index}
                                    src={preview}
                                    alt={`Product Preview ${index + 1}`}
                                    style={{ width: '100px', height: '100px', objectFit: 'contain' }}
                                />
                            ))}
                        </div>
                    </div>
                )}
                <Button variant="primary" type="submit" className="mt-3 mr-3">
                    {isEditing ? 'Update Product' : 'Create Product'}
                </Button>
                <Button variant="danger" as={Link} to="/adminPortal" className="mt-3">
                    Cancel
                </Button>
            </Form>
        </div>
    );
};

export default ProductForm;
