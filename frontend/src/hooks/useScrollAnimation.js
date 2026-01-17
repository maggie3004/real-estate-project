import { useMemo } from 'react';

/**
 * useScrollAnimation - Custom hook for consistent scroll animations
 * Provides predefined animation variants with viewport detection
 * 
 * @param {string} type - Animation type: 'fadeInUp', 'slideInLeft', 'slideInRight', 'scaleIn', 'fadeIn'
 * @param {number} delay - Animation delay in seconds
 * @param {number} duration - Animation duration in seconds
 * @returns {object} Framer Motion props for animations
 */
const useScrollAnimation = (type = 'fadeInUp', delay = 0, duration = 0.6) => {
    const variants = useMemo(() => {
        const baseTransition = {
            duration,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for luxury feel
        };

        const animationTypes = {
            fadeInUp: {
                hidden: { opacity: 0, y: 40 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: baseTransition
                }
            },
            fadeIn: {
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: baseTransition
                }
            },
            slideInLeft: {
                hidden: { opacity: 0, x: -60 },
                visible: {
                    opacity: 1,
                    x: 0,
                    transition: baseTransition
                }
            },
            slideInRight: {
                hidden: { opacity: 0, x: 60 },
                visible: {
                    opacity: 1,
                    x: 0,
                    transition: baseTransition
                }
            },
            scaleIn: {
                hidden: { opacity: 0, scale: 0.8 },
                visible: {
                    opacity: 1,
                    scale: 1,
                    transition: baseTransition
                }
            },
            stagger: {
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.1,
                        delayChildren: delay
                    }
                }
            }
        };

        return animationTypes[type] || animationTypes.fadeInUp;
    }, [type, delay, duration]);

    return {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, amount: 0.3 },
        variants
    };
};

/**
 * useStaggerAnimation - Hook for staggered list animations
 * @param {number} staggerDelay - Delay between each child animation
 */
export const useStaggerAnimation = (staggerDelay = 0.1) => {
    return {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, amount: 0.2 },
        variants: {
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: {
                    staggerChildren: staggerDelay,
                    delayChildren: 0.2
                }
            }
        }
    };
};

/**
 * Card animation variant for use with stagger
 */
export const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94]
        }
    }
};

export default useScrollAnimation;
