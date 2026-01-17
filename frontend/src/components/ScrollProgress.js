import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * ScrollProgress - Fixed scroll progress bar at top of viewport
 * Shows user's scroll position with smooth gradient animation
 */
const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();

    // Add spring physics for smoother animation
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            style={{
                scaleX,
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #FFB8D2 0%, #FF2E84 50%, #D32F2F 100%)',
                transformOrigin: '0%',
                zIndex: 9999,
                boxShadow: '0 0 10px rgba(255, 46, 132, 0.5)'
            }}
        />
    );
};

export default ScrollProgress;
