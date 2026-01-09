import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import TiltCard from './TiltCard';
import TextReveal from './TextReveal';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
    {
        id: "upholstery",
        image: "/assets/offer-upholstery.jpg",
        title: "Furniture Upholstery Cape Town",
        description: "Our professional Furniture Upholstery Cape Town services cover all aspects of modern and traditional types of upholstery. We have established an excellent reputation in Cape Town over the years and pride ourselves on producing only the highest quality work."
    },
    {
        id: "cushions",
        image: "/assets/offer-cushions.jpg",
        title: "Patio & Indoor Cushions",
        description: "Leroy Designs is proud to say that we have not received any call backs to repair furniture manufactured by us since we started manufacturing 10 years ago. We do repairs on all types of patio and indoor cushions."
    },
    {
        id: "slipcovers",
        image: "/assets/offer-slipcovers.jpg",
        title: "Slipcovers",
        description: "Loose or slip covers have been around for many years. They give the added advantage of being able to be removed for cleaning and repairs. They also let you have 2 sofas in one so you can have a summer and winter sofa."
    }
];

const Services = () => {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const cards = cardsRef.current;

        gsap.fromTo(cards,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                }
            }
        );
    }, []);

    return (
        <section className="services-section section-padding" ref={sectionRef}>
            <div className="container">
                <div className="section-header">
                    <h2><TextReveal>What We Offer</TextReveal></h2>
                    <div className="underline"></div>
                </div>

                <div className="services-grid">
                    {servicesData.map((service, index) => (
                        <div key={index} ref={el => cardsRef.current[index] = el}>
                            <TiltCard className="service-card">
                                <div className="service-img-container">
                                    <img src={service.image} alt={service.title} />
                                </div>
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                                <Link to={`/services/${service.id}`} className="read-more-btn">Read More &raquo;</Link>
                            </TiltCard>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
