import React, { useRef, useState } from 'react';
import gsap from 'gsap';

const TiltCard = ({ children, className = '' }) => {
    const cardRef = useRef(null);
    const [bounds, setBounds] = useState(null);

    const handleMouseEnter = (e) => {
        setBounds(cardRef.current.getBoundingClientRect());
        gsap.to(cardRef.current, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
    };

    const handleMouseMove = (e) => {
        if (!bounds) return;
        const x = e.clientX - bounds.left;
        const y = e.clientY - bounds.top;

        const xPct = x / bounds.width;
        const yPct = y / bounds.height;

        const xRot = (yPct - 0.5) * 20; // -10 to 10 deg
        const yRot = (xPct - 0.5) * -20; // -10 to 10 deg

        gsap.to(cardRef.current, {
            rotationX: xRot,
            rotationY: yRot,
            duration: 0.1,
            ease: 'none'
        });

        // Optional: Parallax inner content if we wanted to get fancy with children
    };

    const handleMouseLeave = () => {
        gsap.to(cardRef.current, {
            scale: 1,
            rotationX: 0,
            rotationY: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)'
        });
        setBounds(null);
    };

    return (
        <div
            ref={cardRef}
            className={className}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
        >
            <div style={{ transform: 'translateZ(20px)', width: '100%', height: '100%' }}>
                {children}
            </div>
        </div>
    );
};

export default TiltCard;
