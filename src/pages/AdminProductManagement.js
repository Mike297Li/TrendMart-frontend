// AdminProductManagement.js
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import AdminNavBar from './AdminNavBar';
import ProductsManagement from './ProductsManagement';
import OrdersManagement from './OrdersManagement';

const AdminProductManagement = () => {
    const [activeComponent, setActiveComponent] = useState('');

    const resetView = () => {
        setActiveComponent('');
    };

    const renderContent = () => {
        switch (activeComponent) {
            case 'products':
                return <ProductsManagement resetView={resetView} />;
            case 'orders':
                return <OrdersManagement resetView={resetView} />;
            default:
                return (
                    <Row className="justify-content-center">
                        <Col md={6} className="mb-4">
                            <Card 
                                className="text-center shadow-lg" 
                                style={{ height: '250px' }} // Set card height
                            >
                                <Card.Body 
                                    className="d-flex flex-column align-items-center justify-content-center"
                                >
                                    <Card.Title>Manage Products</Card.Title>
                                    <Card.Text>
                                        Add, edit, or delete products from your inventory.
                                    </Card.Text>
                                    <Button variant="primary" onClick={() => setActiveComponent('products')}>
                                        Go to Products Management
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} className="mb-4">
                            <Card 
                                className="text-center shadow-lg" 
                                style={{ height: '250px' }} // Set card height
                            >
                                <Card.Body 
                                    className="d-flex flex-column align-items-center justify-content-center"
                                >
                                    <Card.Title>Manage Orders</Card.Title>
                                    <Card.Text>
                                        View and manage customer orders efficiently.
                                    </Card.Text>
                                    <Button variant="secondary" onClick={() => setActiveComponent('orders')}>
                                        Go to Orders Management
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                );
        }
    };

    return (
        <>
            <AdminNavBar resetView={resetView} />
            <Container style={{margin: '7rem'}}>
                {renderContent()}
            </Container>
        </>
    );
};

export default AdminProductManagement;
