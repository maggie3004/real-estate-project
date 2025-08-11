import React, { useState, useEffect, useRef } from 'react';

const stats = [
  { label: 'Years Experience', value: 35, suffix: '+' },
  { label: 'Projects Completed', value: 25, suffix: '+' },
  { label: 'Happy Families', value: 500, suffix: '+' },
  { label: 'Years of Excellence', value: 16, suffix: '+' },
  { label: 'Customer Satisfaction', value: 100, suffix: '%' },
  { label: 'Families Served', value: 800, suffix: '+' },
  { label: 'Sq. Ft. Developed', value: 1, suffix: 'M+' },
  { label: 'Awards Won', value: 5, suffix: '+' },
];

const StatsSection = () => {
  const [animatedValues, setAnimatedValues] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateNumbers();
          }
        });
      },
      { threshold: 0.3 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated]);

  const animateNumbers = () => {
    const duration = 2000; // 2 seconds
    const steps = 60; // 60 steps for smooth animation
    const stepDuration = duration / steps;

    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      
      const progress = currentStep / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4); // Smooth easing function

      const newValues = stats.map((stat, index) => {
        const targetValue = stat.value;
        const currentValue = targetValue * easeOutQuart;
        
        // Handle decimal values for Sq. Ft. Developed
        if (stat.label === 'Sq. Ft. Developed') {
          return parseFloat(currentValue.toFixed(1));
        }
        return Math.floor(currentValue);
      });

      setAnimatedValues(newValues);

      if (currentStep >= steps) {
        clearInterval(interval);
        // Ensure final values are exact
        setAnimatedValues(stats.map(stat => stat.value));
      }
    }, stepDuration);
  };

  const formatValue = (value, stat) => {
    if (stat.label === 'Sq. Ft. Developed') {
      return `${value.toFixed(1)}${stat.suffix}`;
    }
    return `${value}${stat.suffix}`;
  };

  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Growth Story in Numbers
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Building dreams and creating homes with excellence and trust
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="text-3xl md:text-4xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                {formatValue(animatedValues[idx], stat)}
              </div>
              <div className="text-sm md:text-base text-gray-600 dark:text-gray-300 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection; 