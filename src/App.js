import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import HomePage from './pages/HomePage';
import TermsAndConditions from './pages/TermsAndConditions';
import AdminLogin from './pages/AdminLogin';
import AdminProductManagement from './pages/AdminProductManagement';
import ProductPage from './pages/ProductPage';
import ProductList from './component/ProductList'; 
import Cart from './pages/Cart'; // Import Cart page
import './App.css';

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/homePage" element={<HomePage />} />
                <Route path="/terms" element={<TermsAndConditions />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/adminPortal" element={<AdminProductManagement />} />
                <Route path="/create-product" element={<ProductPage />} />
                <Route path="/edit-product/:productId" element={<ProductPage />} />
                
                {/* New Route for Product List/Search */}
                <Route path="/products" element={<ProductList />} />
                <Route path="/cart" element={<Cart />} /> {/* Route for Cart */}

                <Route path="/" element={<HomePage />} />
            </Routes>
        </div>
    );
};

// eslint-disable-next-line
export default () => (
    <Router>
        <App />
    </Router>
);
