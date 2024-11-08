import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase.utils'; // Asegúrate de que la ruta esté correcta
import Navbar from './component/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import HomePage from './pages/HomePage';
import TermsAndConditions from './pages/TermsAndConditions';
import AdminLogin from './pages/AdminLogin';
import './App.css'
import AdminProductManagement from './pages/AdminProductManagement';
import SearchResults from "./pages/SearchResults";
import ProductPage from './pages/ProductPage';
import FindProducts from './pages/FindProducts';
import ProductSearchPage from './component/ProductSearchPage';
import AboutPage from './pages/AboutPage';
import Footer from './component/footer';
import ContactUs from './component/ContactUs';
import ClaimForm from './component/ClaimForm';




const App = () => {
    const location = useLocation();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Escuchar el estado de autenticación para mantener el usuario actualizado
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const showNavbar = location.pathname !== '/homePage';

    return (
        <div>
            {/* Pasar el estado de usuario autenticado al Navbar */}
            {showNavbar && <Navbar isAuthenticated={Boolean(user)} user={user} />}
            <Routes>
               
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/homePage" element={<HomePage />} />
                    <Route path="/terms" element={<TermsAndConditions />} />
                    <Route path="/admin" element={<AdminLogin />} />
                    <Route path="/adminPortal" element={<AdminProductManagement />} />
                    <Route path="/create-product" element={<ProductPage />} />
                    <Route path="/search-results" element={<SearchResults />} />
                    <Route path="/edit-product/:productId" element={<ProductPage />} /> 
                    <Route path="/find_products" element={<FindProducts />} /> 
                    <Route path="/search" element={<ProductSearchPage />} /> 
                    <Route path="/Homepage" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} /> {/* Añade esta línea */}
                    <Route path="/claim-form" element={<ClaimForm />} />
                    <Route path="/contact" element={<ContactUs />} />
                
            </Routes>
            <Footer />
        </div>
    );
};

// eslint-disable-next-line
export default () => (
    <Router>
        <App />
    </Router>
);
