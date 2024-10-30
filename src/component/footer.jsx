 /* eslint-disable */
// src/component/Footer.jsx
import React from 'react';
import '../styles/footer.css';
import { FaInstagram, FaFacebook, FaTiktok, FaYoutube, FaLinkedin, FaPinterest } from 'react-icons/fa'; // Asegúrate de tener react-icons instalado

const Footer = () => {
    return (
        <footer className="footer">
            <div className="social-icons">
                <a href="#" className="social-icon"><FaInstagram /></a>
                <a href="#" className="social-icon"><FaFacebook /></a>
                <a href="#" className="social-icon"><FaTiktok /></a>
                <a href="#" className="social-icon"><FaYoutube /></a>
                <a href="#" className="social-icon"><FaLinkedin /></a>
                <a href="#" className="social-icon"><FaPinterest /></a>
            </div>
            <div className="footer-content">
                <div className="footer-section subscribe-section">
                    <h3>Stay Updated</h3>
                    <div className="subscribe-input">
                        <input type="email" placeholder="Email" />
                        <button>Subscribe</button>
                    </div>
                    <p>
                        I authorize the processing of my personal data in accordance with the privacy policy available by clicking <a href="#">here</a>
                    </p>
                </div>
                <div className="footer-section">
                    <h3>About Us</h3>
                    <ul>
                        <li><a href="#">Our Story</a></li>
                        <li><a href="#">Sustainability</a></li>
                        <li><a href="#">Our Stores</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Corporate</h3>
                    <ul>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Suppliers</a></li>
                        <li><a href="#">Investors</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Help</h3>
                    <ul>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Warranty</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                ALL RIGHTS RESERVED OMNICODE LEGAL NOTICES 404-1315 STEELS AVENUE MISSISSAUGA ONTARIO CANADA 6477209227 | 99526654-625
            </div>
        </footer>
    );
};

export default Footer;
