import { useEffect, useCallback, useRef } from 'react';
import { smoothScrollTo, smoothScrollToTop, initSmoothScrolling } from '../utils/smoothScroll';

/**
 * Custom hook for enhanced smooth scrolling functionality
 */
export const useSmoothScroll = () => {
  const scrollTimeoutRef = useRef(null);

  // Initialize smooth scrolling on mount
  useEffect(() => {
    initSmoothScrolling();
    
    // Add scroll optimization classes
    document.body.classList.add('scroll-optimized');
    
    // Optimize scroll performance
    const optimizeScrollPerformance = () => {
      // Optimize all images for smooth scrolling
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        img.style.willChange = 'auto';
        img.style.backfaceVisibility = 'hidden';
        img.style.transform = 'translateZ(0)';
      });
      
      // Optimize all sections for smooth scrolling
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        section.style.backfaceVisibility = 'hidden';
        section.style.transform = 'translateZ(0)';
      });
      
      // Optimize all motion elements
      const motionElements = document.querySelectorAll('[data-framer-motion]');
      motionElements.forEach(element => {
        element.style.backfaceVisibility = 'hidden';
        element.style.transform = 'translateZ(0)';
      });
    };

    optimizeScrollPerformance();

    return () => {
      document.body.classList.remove('scroll-optimized');
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Smooth scroll to element
  const scrollTo = useCallback((target, options = {}) => {
    smoothScrollTo(target, {
      duration: 800,
      offset: 80,
      ...options
    });
  }, []);

  // Smooth scroll to top
  const scrollToTop = useCallback((options = {}) => {
    smoothScrollToTop({
      duration: 800,
      ...options
    });
  }, []);

  // Smooth scroll to section
  const scrollToSection = useCallback((sectionId, options = {}) => {
    const element = document.querySelector(sectionId);
    if (element) {
      smoothScrollTo(element, {
        duration: 800,
        offset: 80,
        ...options
      });
    }
  }, []);

  // Debounced smooth scroll
  const debouncedScrollTo = useCallback((target, options = {}) => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      smoothScrollTo(target, {
        duration: 800,
        offset: 80,
        ...options
      });
    }, 50);
  }, []);

  // Smooth scroll with progress callback
  const scrollToWithProgress = useCallback((target, onProgress, options = {}) => {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    
    if (!element) return;
    
    const startPosition = window.pageYOffset;
    const targetPosition = element.offsetTop - (options.offset || 80);
    const distance = targetPosition - startPosition;
    const startTime = performance.now();
    const duration = options.duration || 800;

    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Apply easing function
      const easeProgress = progress < 0.5 
        ? 4 * progress * progress * progress 
        : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1;
      
      const currentPosition = startPosition + (distance * easeProgress);
      
      window.scrollTo(0, currentPosition);
      
      // Call progress callback
      if (onProgress) {
        onProgress(progress, easeProgress);
      }
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }, []);

  // Smooth scroll to element with intersection observer
  const scrollToWithIntersection = useCallback((target, options = {}) => {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    
    if (!element) return;
    
    // Use intersection observer for better performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Element is in view, stop scrolling
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    smoothScrollTo(target, {
      duration: 800,
      offset: 80,
      ...options
    });
  }, []);

  // Smooth scroll for mobile devices
  const scrollToMobile = useCallback((target, options = {}) => {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    
    if (!element) return;
    
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Use native smooth scroll for mobile
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    } else {
      // Use custom smooth scroll for desktop
      smoothScrollTo(target, {
        duration: 800,
        offset: 80,
        ...options
      });
    }
  }, []);

  return {
    scrollTo,
    scrollToTop,
    scrollToSection,
    debouncedScrollTo,
    scrollToWithProgress,
    scrollToWithIntersection,
    scrollToMobile
  };
};

export default useSmoothScroll;




