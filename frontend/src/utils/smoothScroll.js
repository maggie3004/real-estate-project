/**
 * Enhanced smooth scrolling utility with performance optimizations
 */

// Smooth scroll configuration
const SCROLL_CONFIG = {
  duration: 800,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  offset: 80, // Account for fixed navbar
};

/**
 * Enhanced smooth scroll to element with performance optimizations
 * @param {string|HTMLElement} target - Target element or selector
 * @param {Object} options - Scroll options
 */
export const smoothScrollTo = (target, options = {}) => {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  
  if (!element) {
    console.warn('Smooth scroll target not found:', target);
    return;
  }

  const config = { ...SCROLL_CONFIG, ...options };
  const startPosition = window.pageYOffset;
  const targetPosition = element.offsetTop - config.offset;
  const distance = targetPosition - startPosition;
  const startTime = performance.now();

  // Use requestAnimationFrame for smooth 60fps scrolling
  const animateScroll = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / config.duration, 1);
    
    // Apply easing function
    const easeProgress = easeInOutCubic(progress);
    const currentPosition = startPosition + (distance * easeProgress);
    
    window.scrollTo(0, currentPosition);
    
    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};

/**
 * Smooth scroll to top with enhanced performance
 */
export const smoothScrollToTop = (options = {}) => {
  const config = { ...SCROLL_CONFIG, ...options };
  const startPosition = window.pageYOffset;
  const startTime = performance.now();

  const animateScroll = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / config.duration, 1);
    
    const easeProgress = easeInOutCubic(progress);
    const currentPosition = startPosition * (1 - easeProgress);
    
    window.scrollTo(0, currentPosition);
    
    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};

/**
 * Enhanced smooth scroll with intersection observer for better performance
 */
export const smoothScrollToWithIntersection = (target, options = {}) => {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  
  if (!element) {
    console.warn('Smooth scroll target not found:', target);
    return;
  }

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
  smoothScrollTo(target, options);
};

/**
 * Easing function for smooth animations
 */
const easeInOutCubic = (t) => {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
};

/**
 * Initialize smooth scrolling for all anchor links
 */
export const initSmoothScrolling = () => {
  // Remove existing listeners to prevent duplicates
  document.removeEventListener('click', handleSmoothScrollClick);
  
  // Add enhanced smooth scroll listener
  document.addEventListener('click', handleSmoothScrollClick, { passive: false });
  
  // Add smooth scroll to all existing anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', handleSmoothScrollClick, { passive: false });
  });
};

/**
 * Enhanced click handler for smooth scrolling
 */
const handleSmoothScrollClick = (e) => {
  const target = e.target.closest('a[href^="#"]');
  
  if (!target) return;
  
  const href = target.getAttribute('href');
  if (!href || href === '#') return;
  
  e.preventDefault();
  
  const targetElement = document.querySelector(href);
  if (targetElement) {
    smoothScrollTo(targetElement, {
      duration: 800,
      offset: 80
    });
  }
};

/**
 * Smooth scroll with momentum for mobile devices
 */
export const smoothScrollWithMomentum = (target, options = {}) => {
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
    smoothScrollTo(target, options);
  }
};

/**
 * Debounced smooth scroll to prevent multiple rapid calls
 */
let scrollTimeout;
export const debouncedSmoothScroll = (target, options = {}) => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    smoothScrollTo(target, options);
  }, 50);
};

/**
 * Smooth scroll with progress callback
 */
export const smoothScrollWithProgress = (target, onProgress, options = {}) => {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  
  if (!element) return;
  
  const config = { ...SCROLL_CONFIG, ...options };
  const startPosition = window.pageYOffset;
  const targetPosition = element.offsetTop - config.offset;
  const distance = targetPosition - startPosition;
  const startTime = performance.now();

  const animateScroll = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / config.duration, 1);
    
    const easeProgress = easeInOutCubic(progress);
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
};

const smoothScrollUtils = {
  smoothScrollTo,
  smoothScrollToTop,
  smoothScrollToWithIntersection,
  initSmoothScrolling,
  smoothScrollWithMomentum,
  debouncedSmoothScroll,
  smoothScrollWithProgress
};

export default smoothScrollUtils;
