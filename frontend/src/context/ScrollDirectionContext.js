import React, { createContext, useState, useEffect, useRef } from 'react';

export const ScrollDirectionContext = createContext('down');

export const ScrollDirectionProvider = ({ children }) => {
  const [scrollDirection, setScrollDirection] = useState('down');
  const lastScrollY = useRef(window.scrollY);

  useEffect(() => {
    let ticking = false;
    function updateScrollDirection() {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY.current) {
        setScrollDirection('up');
      }
      lastScrollY.current = currentScrollY;
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <ScrollDirectionContext.Provider value={scrollDirection}>
      {children}
    </ScrollDirectionContext.Provider>
  );
};

