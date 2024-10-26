// src/component/ImageSection.js
import React from 'react';
import '../styles/ImageSection.css';

const ImageSection = ({ id, imageUrl }) => {
    return (
        <div id={id} className="image-section">
            <img src={imageUrl} alt="" className="image" />
        </div>
    );
};

export default ImageSection;
