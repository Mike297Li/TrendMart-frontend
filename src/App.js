import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import HomePage from './pages/HomePage';
import TermsAndConditions from './pages/TermsAndConditions';
import AdminLogin from './pages/AdminLogin';
import './App.css'
import AdminProductManagement from './pages/AdminProductManagement';
import ProductPage from './pages/ProductPage';


const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/homePage" element={<HomePage />} />
                    <Route path="/terms" element={<TermsAndConditions/>} />
                    <Route path="/admin" element={<AdminLogin />} />
                    <Route path="/adminPortal" element={<AdminProductManagement />} />
                    <Route path="/create-product" element={<ProductPage />} />
                    <Route path="/edit-product/:productId" element={<ProductPage />} /> {/* New edit route */}
                    <Route path="/" element={<h1>Welcome! Please login or register.</h1>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
