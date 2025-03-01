
import { useEffect, useState, useRef } from 'react';

// Utility function to check if an element is in viewport
export const useInView = (options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return { ref, isInView };
};

// Animation class generator based on viewport
export const getAnimationClass = (isInView: boolean, baseAnimation: string, delay = 0) => {
  if (!isInView) {
    return 'opacity-0';
  }
  
  let delayClass = '';
  if (delay > 0) {
    delayClass = ` delay-${delay}`;
  }
  
  return `${baseAnimation}${delayClass}`;
};
