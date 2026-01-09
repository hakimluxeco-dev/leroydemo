import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FaChevronLeft, FaChevronRight, FaArrowRight } from 'react-icons/fa';
import './FeaturedSlider.css';

const slides = [
    {
        id: 0,
        image: '/assets/couch.jpg',
        subtitle: 'PREMIUM UPHOLSTERY SERVICES',
        title: 'Revitalize Your Furniture',
        description: 'Combining traditional craftsmanship with modern design to breathe new life into your cherished pieces.',
        cta: 'Get a Quote'
    },
    {
        id: 1,
        image: '/assets/slipcovers.jpg',
        subtitle: 'LEROY DESIGNS',
        title: 'We Also Do Cushions & Slipcovers',
        description: 'Our team is made up of very experienced cutting staff alongside dedicated machinists who love their craft.',
        cta: 'Get a Quote'
    },
    {
        id: 2,
        image: '/assets/leather.jpg',
        subtitle: 'PREMIUM QUALITY',
        title: 'Expert Leather Restoration',
        description: 'Revive your worn leather furniture with our specialized cleaning, coloring, and conditioning treatments.',
        cta: 'Restore Now'
    },
    {
        id: 3,
        image: '/assets/restoration.jpg',
        subtitle: 'ANTIQUE CARE',
        title: 'Timeless Furniture Restoration',
        description: 'Preserving the history and beauty of your antique pieces with meticulous attention to detail.',
        cta: 'Learn More'
    }
];

const FeaturedSlider = () => {
    const [current, setCurrent] = useState(0);
    const slideRef = useRef(null);
    const contentRef = useRef(null);

    const nextSlide = () => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    useEffect(() => {
        const tl = gsap.timeline();

        // Parallax Effect for Background
        gsap.to(slideRef.current, {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
                trigger: ".featured-slider",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        // Animate background image fade
        tl.fromTo(slideRef.current,
            { opacity: 0.5, scale: 1.1 },
            { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' }
        );

        // Animate content slide-up
        tl.fromTo(contentRef.current.children,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' },
            "-=0.5"
        );

    }, [current]);

    return (
        <section className="featured-slider">
            <div className="slider-bg-container">
                <div
                    ref={slideRef}
                    className="slider-bg"
                    style={{ backgroundImage: `url(${slides[current].image})` }}
                ></div>
                <div className="slider-overlay"></div>
            </div>

            <div className="container slider-content-wrapper">
                <button className="slider-btn prev-btn" onClick={prevSlide}>
                    <FaChevronLeft />
                </button>

                <div className="slider-content" ref={contentRef}>
                    <span className="slider-subtitle">{slides[current].subtitle}</span>
                    <h2>{slides[current].title}</h2>
                    <p>{slides[current].description}</p>
                    <a href="#contact" className="btn slider-cta">
                        {slides[current].cta} <FaArrowRight style={{ marginLeft: '10px', fontSize: '0.9em' }} />
                    </a>
                </div>

                <button className="slider-btn next-btn" onClick={nextSlide}>
                    <FaChevronRight />
                </button>
            </div>

            <div className="slider-dots">
                {slides.map((_, idx) => (
                    <span
                        key={idx}
                        className={`dot ${idx === current ? 'active' : ''}`}
                        onClick={() => setCurrent(idx)}
                    ></span>
                ))}
            </div>
        </section>
    );
};

export default FeaturedSlider;
