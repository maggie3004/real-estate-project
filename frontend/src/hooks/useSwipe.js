import { useRef, useEffect, useCallback } from 'react';

export const useSwipe = ({ onSwipeLeft, onSwipeRight, minSwipeDistance = 50 }) => {
  const elementRef = useRef(null);
  const touchStart = useRef(null);
  const touchEnd = useRef(null);

  const onTouchStart = useCallback((e) => {
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientX;
  }, []);

  const onTouchMove = useCallback((e) => {
    touchEnd.current = e.targetTouches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart.current || !touchEnd.current) return;
    
    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && onSwipeLeft) {
      onSwipeLeft();
    }
    if (isRightSwipe && onSwipeRight) {
      onSwipeRight();
    }
  }, [onSwipeLeft, onSwipeRight, minSwipeDistance]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('touchstart', onTouchStart);
    element.addEventListener('touchmove', onTouchMove);
    element.addEventListener('touchend', onTouchEnd);

    return () => {
      element.removeEventListener('touchstart', onTouchStart);
      element.removeEventListener('touchmove', onTouchMove);
      element.removeEventListener('touchend', onTouchEnd);
    };
  }, [onSwipeLeft, onSwipeRight, minSwipeDistance, onTouchStart, onTouchMove, onTouchEnd]);

  return { elementRef };
};
