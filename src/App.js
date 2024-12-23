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
import SearchResults from "./pages/SearchResults";
import ProductPage from './pages/ProductPage';
import FindProducts from './pages/FindProducts';
import ProductSearchPage from './component/ProductSearchPage';
import AboutPage from './pages/AboutPage';
import Footer from './component/footer';
import ContactUs from './component/ContactUs';
import ClaimForm from './component/ClaimForm';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import ProductDetail from "./pages/ProductDetail";
import { auth } from './firebase.utils';
import { onAuthStateChanged } from 'firebase/auth';
import Cart from "./component/Cart";
import Payment from "./pages/Payment";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Success from "./pages/Success";
import Checkout from "./pages/Checkout";
import { CartProvider } from './context/CartContext';
import UserProfile from './component/Profile';
import OrderListing from './pages/OrderListing';

// Load the Stripe object with your publishable key
const stripePromise = loadStripe('pk_test_51QI91pJXJU4eSyCwCdLRJILNHwtarSkNx6APhaKrlZLc7ykVSLyvzRbxkEnvl63wUKoE0BhixTk7WxWRVJYToY9u00mBBGFwQT');

const App = () => {
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Escuchar el estado de autenticación para mantener el usuario actualizado
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if(currentUser !==null){
                localStorage.setItem('user', JSON.stringify(currentUser))
            }
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    // Show Navbar only on certain routes
    const showNavbar = !['/login', '/register', '/reset-password', '/admin', '/adminPortal', '/admin/create-product', '/admin/edit-product/:productId'].includes(location.pathname);

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

    // Check if the path starts with '/admin' to conditionally hide the footer
    const showFooter = !location.pathname.startsWith('/admin');
    const showNavbarAdmin = !location.pathname.startsWith('/admin');

    return (
        <CartProvider>
            <div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
                {/* Pasar el estado de usuario autenticado al Navbar */}
                {showNavbar && showNavbarAdmin && <Navbar isAuthenticated={isAuthenticated} user={user} />}
                <Routes>

                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/homePage" element={<HomePage />} />
                    <Route path="/terms" element={<TermsAndConditions />} />
                    <Route path="/admin" element={<AdminLogin />} />
                    <Route path="/adminPortal" element={<AdminProductManagement />} />
                    <Route path="/admin/create-product" element={<ProductPage />} />
                    <Route path="/search-results" element={<SearchResults />} />
                    <Route path="/admin/edit-product/:productId" element={<ProductPage />} />
                    <Route path="/find_products" element={<FindProducts />} />
                    <Route path="/search" element={<ProductSearchPage />} />
                    <Route path="/about" element={<AboutPage />} /> {/* Añade esta línea */}
                    <Route path="/claim-form" element={<ClaimForm />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/user-profile" element={<UserProfile user={user} />} />
                    <Route path="/user/orders" element={<OrderListing user={user} />} />
                    <Route path="/search-results" element={<SearchResults />} />
                    <Route path="/product-detail/:productId" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/success" element={<Success />} />
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
                {showFooter && <Footer />}
            </div>
        </CartProvider>
    );
};

// eslint-disable-next-line
export default () => (
    <Router>
        <App />
    </Router>
);
