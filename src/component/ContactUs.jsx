import React from 'react';
import '../styles/ContactUs.css'; // Ensure this path is correct
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate at the top of the file

const ContactUs = () => {
    const navigate = useNavigate();

    return (
        <div className="contact-us-container">
            <div className="contact-columns">
                <div className="contact-section">
                    <h2>CUSTOMER SERVICE LINE</h2>
                    <FontAwesomeIcon icon={faPhone} className="icon" />
                    <p className="contact-number">+1 (647) 720-9227</p>
                    <p>Monday to Friday - 07:00 am – 08:00 pm</p>
                    <p>Saturdays - 08:00 am – 06:00 pm</p>
                </div>
                <div className="contact-section">
                    <h2>EMAIL</h2>
                    <FontAwesomeIcon icon={faEnvelope} className="icon" />
                    <p className="contact-email">servicioalcliente@cuerosvelez.com</p>
                    <p>Customer Service Vélez</p>
                </div>
            </div>
            <div className="contact-section">
                <h2>FORM FOR PQR</h2>
                <p>For any petitions, complaints, and claims, you can access the following form:</p>
                <button className="contact-button" onClick={() => navigate('/claim-form')}>Click Here</button>
            </div>
        </div>
    );
};

export default ContactUs;
