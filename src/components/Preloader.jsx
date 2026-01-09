import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const textRef = useRef(null);
    const lineRef = useRef(null);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                setFinished(true);
                if (onComplete) onComplete();
            }
        });

        // Initial state
        const letters = textRef.current.querySelectorAll('.logo-char');

        // 1. Thread draws across
        tl.to(lineRef.current, {
            width: '100%',
            duration: 1.5,
            ease: "power2.inOut"
        });

        // 2. Text reveals (staggered up) as if pulled by the thread
        tl.fromTo(letters,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.05,
                ease: "back.out(1.7)"
            },
            "-=1.0" // Start while line is still drawing
        );

        // 3. Golden Shimmer across text
        tl.to(textRef.current, {
            className: "+=shimmer", // Helper class trigger/animation
            duration: 0.5
        });

        // 4. Fade Out Content (Added Effect)
        tl.to(contentRef.current, {
            opacity: 0,
            scale: 0.95,
            duration: 0.5,
            ease: "power2.in",
            delay: 0.5
        });

        // 5. Reveal Site (Slide up curtain)
        tl.to(containerRef.current, {
            yPercent: -100,
            duration: 1,
            ease: "power4.inOut"
        });

    }, [onComplete]);

    if (finished) return null;

    return (
        <div className="preloader" ref={containerRef}>
            <div className="preloader-content" ref={contentRef}>
                <div className="logo-container" ref={textRef}>
                    {"LEROY DESIGNS".split('').map((char, i) => (
                        <span key={i} className="logo-char">{char === ' ' ? '\u00A0' : char}</span>
                    ))}
                </div>
                <div className="golden-thread" ref={lineRef}></div>
            </div>
        </div>
    );
};

export default Preloader;
