import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import HomePage from './pages/HomePage';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/homePage" element={<HomePage />} />
                    <Route path="/" element={<h1>Welcome! Please login or register.</h1>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
