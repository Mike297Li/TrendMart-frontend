import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { BsCheckCircle } from 'react-icons/bs';

const Success = () => {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/'); // Navigate to the home page or another relevant page
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Card className="text-center shadow-lg p-4" style={{ maxWidth: '500px', borderRadius: '10px' }}>
                <Card.Body>
                    <BsCheckCircle style={{ color: '#efe2b7', fontSize: '4rem' }} className="mb-3" />
                    <Card.Title className="mb-3" style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
                        Payment Successful!
                    </Card.Title>
                    <Card.Text style={{ color: '#6c757d', fontSize: '1.1rem' }}>
                        Thank you for your payment. Your transaction has been completed successfully.
                    </Card.Text>
                    <Button 
                        variant="outline-primary" 
                        className="mt-4"
                        onClick={handleBackToHome}
                        style={{ color: '#efe2b7', borderColor: '#efe2b7' }}
                    >
                        Back to Home
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Success;
