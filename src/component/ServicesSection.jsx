// src/components/ServicesSection.js
import React from 'react';
import '../styles/ServicesSection.css';

const services = [
    { id: 1, title: 'Business Cards', description: 'Premium quality cards', icon: 'icon-path' },
    { id: 2, title: 'Custom T-Shirts', description: 'Unique designs for you', icon: 'icon-path' },
    { id: 3, title: 'Poster Printing', description: 'Vibrant posters in any size', icon: 'icon-path' },
];

const ServicesSection = () => (
    <div className="services-section">
        <h2>Our Services</h2>
        <div className="services-list">
            {services.map(service => (
                <div key={service.id} className="service-item">
                    <img src={service.icon} alt={service.title} />
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                </div>
            ))}
        </div>
    </div>
);

export default ServicesSection;
