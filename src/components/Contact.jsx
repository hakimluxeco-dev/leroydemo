import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
    return (
        <section className="contact-section">
            <div className="container contact-container">
                <div className="contact-info">
                    <h2>Get In Touch</h2>
                    <p>Ready to transform your furniture? Contact us today for a free consultation.</p>

                    <div className="info-item">
                        <FaPhone className="contact-icon" />
                        <div>
                            <h4>Call Us</h4>
                            <p>+27 12 345 6789</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <FaEnvelope className="contact-icon" />
                        <div>
                            <h4>Email Us</h4>
                            <p>info@leroydesigns.co.za</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <FaMapMarkerAlt className="contact-icon" />
                        <div>
                            <h4>Visit Us</h4>
                            <p>Randburg, Johannesburg</p>
                            <p>Paarden Eiland, Cape Town</p>
                        </div>
                    </div>
                </div>

                <div className="contact-form-wrapper">
                    <form className="contact-form">
                        <div className="form-group">
                            <input type="text" placeholder="Your Name" required />
                        </div>
                        <div className="form-group">
                            <input type="email" placeholder="Your Email" required />
                        </div>
                        <div className="form-group">
                            <select>
                                <option value="">Service Interested In</option>
                                <option value="upholstery">Upholstery</option>
                                <option value="restoration">Restoration</option>
                                <option value="custom">Custom Furniture</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <textarea placeholder="Tell us about your project..." rows="5"></textarea>
                        </div>
                        <button type="submit" className="btn btn-block">Send Message</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
