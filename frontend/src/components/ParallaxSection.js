import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * ParallaxSection - Reusable parallax wrapper component
 * Creates smooth parallax effects with configurable speed
 * 
 * @param {ReactNode} children - Content to apply parallax effect to
 * @param {number} speed - Parallax speed multiplier (0.1 = subtle, 0.5 = strong)
 * @param {string} direction - 'up' or 'down' for parallax direction
 */
const ParallaxSection = ({
    children,
    speed = 0.2,
    direction = 'up',
    className = ''
}) => {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start']
    });

    // Calculate parallax movement based on direction
    const multiplier = direction === 'up' ? -1 : 1;
    const range = speed * 100 * multiplier;

    const y = useTransform(scrollYProgress, [0, 1], [0, range]);

    // Add spring for smoother motion
    const smoothY = useSpring(y, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div ref={ref} className={className}>
            <motion.div style={{ y: smoothY }}>
                {children}
            </motion.div>
        </div>
    );
};

export default ParallaxSection;
