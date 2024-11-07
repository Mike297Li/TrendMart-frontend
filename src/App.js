import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './component/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import HomePage from './pages/HomePage';
import TermsAndConditions from './pages/TermsAndConditions';
import AdminLogin from './pages/AdminLogin';
import './App.css';
import AdminProductManagement from './pages/AdminProductManagement';
import ProductPage from './pages/ProductPage';
import SearchResults from "./pages/SearchResults";
import ProductDetail from "./pages/ProductDetail";
import { auth } from './firebase.utils';
import { onAuthStateChanged } from 'firebase/auth';
import Cart from "./component/Cart";
import Payment from "./pages/Payment";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Success from "./pages/Success";

// Load the Stripe object with your publishable key
const stripePromise = loadStripe('pk_test_51QI91pJXJU4eSyCwCdLRJILNHwtarSkNx6APhaKrlZLc7ykVSLyvzRbxkEnvl63wUKoE0BhixTk7WxWRVJYToY9u00mBBGFwQT');

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const location = useLocation();

    // Show Navbar only on certain routes
    const showNavbar = !['/login', '/register', '/reset-password', '/admin', '/adminPortal', '/create-product', '/edit-product/:productId'].includes(location.pathname);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
                setUser(user);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <div>
            {showNavbar && <Navbar isAuthenticated={isAuthenticated} user={user} />}
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
                <Route path="/search-results" element={<SearchResults />} />
                <Route path="/product-detail/:productId" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/success" element={<Success />}/>
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/payment"
                    element={
                        <Elements stripe={stripePromise}>
                            <Payment />
                        </Elements>
                    }
                />
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
