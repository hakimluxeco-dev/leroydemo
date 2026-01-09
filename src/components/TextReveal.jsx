import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TextReveal = ({ children, className = '', duration = 1, stagger = 0.05, delay = 0 }) => {
    const elRef = useRef(null);

    useEffect(() => {
        const el = elRef.current;
        if (!el) return;

        // Split text logic could be complex, for now we will just animate the whole block or words if passed as array
        // To keep it simple and robust without splitting libraries, we'll animate the container from a clip-path or y-offset.

        // Better approach for "Amazing Experience": Split text manually by words
        const text = typeof children === 'string' ? children : '';
        const words = text.split(' ');

        if (!text) return; // If children is strictly components, this simple splitter won't work perfectly, but fine for headers.

        // If it's not a string (e.g. nested elements), we fallback to standard fade-up
        if (typeof children !== 'string') {
            gsap.fromTo(el,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: duration,
                    delay: delay,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                    }
                }
            );
            return;
        }
    }, [children, delay, duration]);

    // Actual optimized implementation: split words
    const words = typeof children === 'string' ? children.split(' ') : [];
    const containerRef = useRef(null);

    useEffect(() => {
        if (words.length === 0) return;

        const spans = containerRef.current.querySelectorAll('span');

        gsap.fromTo(spans,
            { y: '100%', opacity: 0 },
            {
                y: '0%',
                opacity: 1,
                duration: duration,
                stagger: stagger,
                delay: delay,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                }
            }
        );
    }, [words, duration, stagger, delay]);

    if (typeof children !== 'string') {
        return <div ref={elRef} className={className}>{children}</div>;
    }

    return (
        <div ref={containerRef} className={className} style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap', gap: '0.25em' }}>
            {words.map((word, i) => (
                <span key={i} style={{ display: 'inline-block', transform: 'translateY(100%)' }}>
                    {word}
                </span>
            ))}
        </div>
    );
};

export default TextReveal;
