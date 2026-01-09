import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Hero.css';

const Hero = () => {
    const heroRef = useRef(null);
    const textRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        tl.fromTo(imageRef.current,
            { scale: 1.2, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out' }
        )
            .fromTo(textRef.current.children,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power2.out' },
                "-=0.5"
            );
    }, []);

    return (
        <section className="hero" ref={heroRef}>
            <div className="hero-bg" ref={imageRef}>
                {/* Using one of the extracted images */}
                <div className="overlay"></div>
                {/* Placeholder for the image - in real app, use the actual asset path */}
            </div>

            <div className="container hero-content" ref={textRef}>
                <span className="subtitle">Premium Upholstery Services</span>
                <h1>Revitalize Your <br /> Furniture</h1>
                <p>Combining traditional craftsmanship with modern design to breathe new life into your cherished pieces.</p>
                <div className="hero-btns">
                    <a href="#contact" className="btn">Get a Quote</a>
                    <a href="#gallery" className="btn btn-outline">View Our Work</a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
