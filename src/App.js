import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './component/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import HomePage from './pages/HomePage';
import TermsAndConditions from './pages/TermsAndConditions';
import AdminLogin from './pages/AdminLogin';
import './App.css'
import AdminProductManagement from './pages/AdminProductManagement';
import ProductPage from './pages/ProductPage';
import SearchResults from "./pages/SearchResults";


const App = () => {
    // const location = useLocation();

    // Show Navbar only on certain routes
    // const showNavbar = !['/login', '/register', '/reset-password', '/admin', '/adminportal', '/create-product', '/edit-product'].includes(location.pathname);

    return (
        <div>
            {/* {showNavbar && <Navbar />}  */}
            {/* Show Navbar conditionally */}
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/homePage" element={<HomePage />} />
                <Route path="/terms" element={<TermsAndConditions />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/adminPortal" element={<AdminProductManagement />} />
                <Route path="/create-product" element={<ProductPage />} />
                <Route path="/edit-product/:productId" element={<ProductPage />} /> {/* New edit route */}
                <Route path="/search-results" element={<SearchResults />} />
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
