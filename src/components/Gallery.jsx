import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Gallery.css';

gsap.registerPlugin(ScrollTrigger);

// Using placeholder paths that map to what we downloaded/copied
const galleryImages = [
    { src: '/assets/slipcovers.jpg', alt: 'Modern Slipcovers' },
    { src: '/assets/restoration.jpg', alt: 'Antique Restoration' },
    { src: '/assets/couch.jpg', alt: 'Luxury Sofa Upholstery' },
    { src: '/assets/leather.jpg', alt: 'Leather Furniture' }
];

const Gallery = () => {
    const galleryRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const images = galleryRef.current.querySelectorAll('.gallery-item');

        // Initial fade in
        gsap.fromTo(images,
            { opacity: 0, scale: 0.9 },
            {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: galleryRef.current,
                    start: 'top 75%',
                }
            }
        );

        // Parallax for images
        images.forEach(item => {
            const img = item.querySelector('img');
            gsap.to(img, {
                yPercent: 15, // Move image down slightly as we scroll
                ease: 'none',
                scrollTrigger: {
                    trigger: item,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        });

    }, []);

    const openModal = (img) => {
        setSelectedImage(img);
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };

    const closeModal = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'auto'; // Restore scrolling
    };

    return (
        <section className="section-padding gallery-section" ref={galleryRef}>
            <div className="container">
                <div className="section-header">
                    <h2>Recent Projects</h2>
                    <div className="underline"></div>
                </div>

                <div className="gallery-grid">
                    {galleryImages.map((img, index) => (
                        <div className="gallery-item" key={index} onClick={() => openModal(img)}>
                            <img src={img.src} alt={img.alt} loading="lazy" />
                            <div className="gallery-overlay">
                                <span>{img.alt}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <a href="#" className="btn">View Full Gallery</a>
                </div>
            </div>

            {selectedImage && (
                <div className="lightbox-overlay" onClick={closeModal}>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <button className="lightbox-close" onClick={closeModal}>&times;</button>
                        <img src={selectedImage.src} alt={selectedImage.alt} />
                        <div className="lightbox-caption">{selectedImage.alt}</div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Gallery;
