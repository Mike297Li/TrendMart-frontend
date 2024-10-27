// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Cambia la importación
import App from './App';
import './index.css';

// Crea un root para React 18
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
