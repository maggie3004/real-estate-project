import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component with visual page transition
 * Automatically scrolls to top and shows a brief flash when route changes
 */
function ScrollToTop() {
    const { pathname } = useLocation();
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        // Show transition effect
        setIsTransitioning(true);

        // Scroll to top instantly
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });

        // Hide transition effect after a brief moment
        const timer = setTimeout(() => {
            setIsTransitioning(false);
        }, 150); // 150ms flash duration

        return () => clearTimeout(timer);
    }, [pathname]);

    return (
        <>
            {isTransitioning && (
                <div
                    className="fixed inset-0 bg-white dark:bg-gray-900 z-[9999] pointer-events-none"
                    style={{
                        animation: 'pageTransition 150ms ease-out'
                    }}
                />
            )}
            <style>{`
        @keyframes pageTransition {
          0% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
        </>
    );
}

export default ScrollToTop;
