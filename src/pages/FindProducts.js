// src/pages/FindProducts.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/findProducts.css';

const FindProducts = ({ isOpen, onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Función para manejar los clics en los enlaces de búsqueda
    const handleSearchClick = (term) => {
        navigate(`/search?query=${term}`);
        onClose(); // Cierra el modal después de hacer clic en un enlace
    };

    const handleSubmitSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/search?query=${searchTerm}`);
        } else {
            navigate(`/search?query=not_found`); // Si no hay búsqueda, indica que no hubo resultados
        }
        onClose();
    };

    if (!isOpen) return null; // No muestra el modal si isOpen es false

    return (
        <div className="find-products-modal">
            <div className="find-products-content">
                <header className="find-products-header">
                    <input 
                        type="text" 
                        className="search-input" 
                        placeholder="What are you looking for?" 
                        value={searchTerm} 
                        onChange={handleSearchChange} 
                    />
                    <button onClick={handleSubmitSearch} className="cancel-link">Search</button>
                    <span className="cancel-link" onClick={onClose}>CANCEL</span>
                </header>
                <div className="find-products-sections">
                    <div className="find-products-section">
                        <h3>TRENDING SEARCHES</h3>
                        <ul>
                            <li><i className="fas fa-search"></i> <button onClick={() => handleSearchClick('Handbags')}>Handbags</button></li>
                            <li><i className="fas fa-search"></i> <button onClick={() => handleSearchClick('Shoes')}>Shoes</button></li>
                            <li><i className="fas fa-search"></i> <button onClick={() => handleSearchClick('Belts')}>Belts</button></li>
                            <li><i className="fas fa-search"></i> <button onClick={() => handleSearchClick('Bags')}>Bags</button></li>
                        </ul>
                    </div>
                    <div className="find-products-section">
                        <h3>NEW IN</h3>
                        <ul>
                            <li><button onClick={() => handleSearchClick('Women')}>Women</button></li>
                            <li><button onClick={() => handleSearchClick('Men')}>Men</button></li>
                        </ul>
                    </div>
                    <div className="find-products-section">
                        <h3>FIND THE PERFECT GIFT</h3>
                        <ul>
                            <li><button onClick={() => handleSearchClick('TrendMart Gift')}>TrendMart Gift</button></li>
                            <li><button onClick={() => handleSearchClick('Personalization')}>Personalization</button></li>
                            <li><button onClick={() => handleSearchClick('Store Locator')}>Store Locator</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FindProducts;
