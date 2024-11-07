import React from 'react';
import '../styles/ClaimForm.css';

const ClaimForm = () => {
    return (
        <div className="claim-form-page">
            {/* Background image container */}
            <div className="background-image"></div>

            {/* Form container */}
            <div className="claim-form-container">
                <h2>Claim Form</h2>
                <p>We are interested in hearing from you, please detail your case</p>
                <form className="claim-form">
                    <div className="form-row">
                        <input type="text" placeholder="First Name*" required />
                        <input type="text" placeholder="Last Name*" required />
                    </div>
                    <div className="form-row">
                        <input type="email" placeholder="Email*" required />
                        <input type="tel" placeholder="Phone*" required />
                    </div>
                    <div className="form-row">
                        <select placeholder="Document Type">
                            <option>Document Type</option>
                            {/* Add additional options */}
                        </select>
                        <input type="text" placeholder="Document Number" />
                    </div>
                    <div className="form-row">
                        <select placeholder="Type">
                            <option>Type</option>
                        </select>
                        <select placeholder="Subtype">
                            <option>Subtype</option>
                        </select>
                    </div>
                    <div className="form-row">
                        <select placeholder="Reason">
                            <option>Reason</option>
                        </select>
                        <select placeholder="SubReason">
                            <option>SubReason</option>
                        </select>
                    </div>
                    <input type="text" placeholder="Subject" />
                    <textarea placeholder="Description" />

                    <div className="form-footer">
                        <label>
                            <input type="checkbox" required /> I have read and accept the data processing policy
                        </label>
                        <button type="submit">SEND</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ClaimForm;
