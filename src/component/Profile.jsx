import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import { FaEnvelope, FaUserCircle, FaRegClock } from 'react-icons/fa';

const UserProfile = ({ user }) => {
    const navigate = useNavigate();

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="shadow-lg">
                        <Card.Body className="text-center">
                            <Card.Title className="fs-3">{user.displayName}</Card.Title>
                            <Card.Text className="text-muted">
                                <FaEnvelope /> Email: {user.email}
                            </Card.Text>
                            <Card.Text className="text-muted">
                                <FaRegClock /> Last Login: {user.metadata.lastSignInTime}
                            </Card.Text>
                            <Card.Text className="text-muted">
                                <FaUserCircle /> User ID: {user.uid}
                            </Card.Text>
                            <Button variant="danger" onClick={() => navigate('/')}>Goto Home</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default UserProfile;
