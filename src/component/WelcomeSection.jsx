// src/component/WelcomeSection.js
import React from 'react';
import '../styles/WelcomeSection.css';

const WelcomeSection = () => (
    <div className="welcome-section">
        <div className="background-layer"></div> {/* Contenedor para el fondo con animación */}
        <div className="welcome-text">
            <h1>SALE</h1>
            <p>Buy 2 products and get 40% off.</p>
            <p>Online exclusive, selected items only.</p>
        </div>
        <button className="cta-button">View Discounts</button>
    </div>
);

export default WelcomeSection;

