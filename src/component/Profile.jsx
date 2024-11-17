import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Row, Col, Container, Form, Alert } from 'react-bootstrap';
import { FaEnvelope, FaUserCircle, FaRegClock } from 'react-icons/fa';
import { updateProfile } from 'firebase/auth';
// import { auth } from '../firebase.utils'; // Import Firebase auth functions
import { saveUserProfile } from '../firebase.utils'; // Import Firestore update function
import '../styles/Profile.css'

const UserProfile = ({ user }) => {
    const navigate = useNavigate();

    useEffect(()=>{
        if(JSON.parse(localStorage.getItem('user'))?.role === 'ADMIN'){
            navigate('/')
        }
    })

    const [newDisplayName, setNewDisplayName] = useState(user?.displayName || '');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Check if the user is logged in, if not, redirect to the home page
    // useEffect(() => {
    //     if (!user) {
    //         navigate('/'); // Redirect to the home page if no user is logged in
    //     }
    // }, [user, navigate]);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();

        if (!newDisplayName) {
            setError('Display name cannot be empty.');
            return;
        }

        try {
            // Update display name in Firebase Authentication
            await updateProfile(user, { displayName: newDisplayName });

            // Save the updated profile to Firestore
            await saveUserProfile(user);

            setSuccess('Profile updated successfully!');
            setError('');
        } catch (error) {
            setError('Error updating profile: ' + error.message);
            setSuccess('');
        }
    };

    return (
        <Container className='profile-container'>
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="shadow-lg border-0 rounded-lg">
                        <Card.Body>
                            <Card.Title className="text-center fs-3 text-black mb-3">User Profile</Card.Title>
                            <Card.Text className="text-center mb-3">
                                <FaUserCircle size={60} className="text-black mb-2" />
                                <br />
                                <h3>{user?.displayName}</h3>
                            </Card.Text>
                            
                            {/* Success or Error Alert */}
                            {success && <Alert variant="success">{success}</Alert>}
                            {error && <Alert variant="danger">{error}</Alert>}

                            {/* User Information */}
                            <div className="text-muted mb-3">
                                <p><FaEnvelope className="me-2" /> Email: {user?.email}</p>
                                <p><FaRegClock className="me-2" /> Last Login: {user?.metadata.lastSignInTime}</p>
                                {/* <p><FaUserCircle className="me-2" /> User ID: {user?.uid}</p> */}
                            </div>

                            {/* Profile Update Form */}
                            <Form onSubmit={handleProfileUpdate}>
                                <Form.Group className="mb-3" controlId="newDisplayName">
                                    <Form.Label>New Display Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter new display name"
                                        value={newDisplayName}
                                        onChange={(e) => setNewDisplayName(e.target.value)}
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100 mb-3">Update Profile</Button>
                            </Form>

                            {/* Button to navigate home */}
                            <Button variant="secondary" onClick={() => navigate('/')} className="w-100">Go to Home</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default UserProfile;
