import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaPhone, FaEnvelope, FaInstagram, FaFacebook } from 'react-icons/fa';
import './Layout.css';

const Layout = ({ children, Outlet }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

    return (
        <div className="layout">
            <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
                <div className="container navbar-content">
                    <div className="logo">
                        <Link to="/">
                            {/* Using text for SEO and sharpness, or img if preferred */}
                            <span className="logo-text">LEROY <span className="highlight">DESIGNS</span></span>
                        </Link>
                    </div>

                    <nav className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
                        <ul>
                            <li><a href="#services" onClick={toggleMenu}>Services</a></li>
                            <li><a href="#gallery" onClick={toggleMenu}>Gallery</a></li>
                            <li><a href="#contact" onClick={toggleMenu}>Contact</a></li>
                            <li><a href="tel:+27123456789" className="btn-nav">Call Us</a></li>
                        </ul>
                    </nav>

                    <div className="hamburger" onClick={toggleMenu}>
                        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                    </div>
                </div>
            </header>

            <main>
                {children ? children : <Outlet />}
            </main>

            <footer className="footer">
                <div className="container footer-content">
                    <div className="footer-col">
                        <h3>Leroy Designs</h3>
                        <p>Revitalizing your furniture with expert craftsmanship and premium materials.</p>
                    </div>
                    <div className="footer-col">
                        <h3>Connect</h3>
                        <div className="social-icons">
                            <a href="#"><FaFacebook /></a>
                            <a href="#"><FaInstagram /></a>
                        </div>
                    </div>
                    <div className="footer-col">
                        <h3>Contact</h3>
                        <p><FaPhone /> +27 12 345 6789</p>
                        <p><FaEnvelope /> info@leroydesigns.co.za</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Leroy Designs. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

// If using React Router v6 Outlet
import { Outlet } from 'react-router-dom';
const LayoutWrapper = () => <Layout Outlet={Outlet} />;
export default LayoutWrapper;
