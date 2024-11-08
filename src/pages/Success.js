import React from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/'); // Navigate to the home page or another relevant page
    };

    return (
        <div className="success-container">
            <h1>Payment Successful!</h1>
            <p>Thank you for your payment. Your transaction has been completed successfully.</p>
            <button onClick={handleBackToHome}>Back to Home</button>
        </div>
    );
};

export default Success;
