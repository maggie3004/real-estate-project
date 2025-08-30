import React, { useState, useEffect } from 'react';

const LoadingSpinner = () => {
  const [isSpinning, setIsSpinning] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const minLoadingTime = 5000;
    const startTime = Date.now();

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min((elapsed / minLoadingTime) * 100, 100);
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        setIsSpinning(false);
        clearInterval(progressInterval);
      }
    }, 100);

    const maxTimeout = setTimeout(() => {
      setIsSpinning(false);
      setProgress(100);
      clearInterval(progressInterval);
    }, 10000);

    return () => {
      clearTimeout(maxTimeout);
      clearInterval(progressInterval);
    };
  }, []); // Removed progress from dependency array

  return (
    <div className="min-h-screen bg-white flex items-center justify-center relative">
      <div className="text-center relative z-10">
        {/* Just Om Symbol */}
        <div className="relative mb-6">
          {/* Moving Om Symbol - No Background */}
          <div className={`text-red-600 text-6xl font-bold ${isSpinning ? 'om-appear' : ''}`} style={{ opacity: progress / 100 }}>
            🕉️
          </div>
        </div>

        {/* Loading text */}
        <div className="space-y-2">
          <h2 className={`text-2xl font-bold text-black mb-2 ${isSpinning ? 'blessing-text' : ''}`}>
            Om Gan Ganpataye Namo Namah
          </h2>
          <p className="text-gray-600 text-lg font-medium">
            {isSpinning ? 'Loading with blessings...' : 'Ready!'}
          </p>

          {/* Progress indicator */}
          <div className="mt-4">
            <div className="w-48 h-2 bg-gray-200 rounded-full mx-auto">
              <div
                className="h-2 bg-gradient-to-r from-gold-400 to-gold-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {isSpinning ? `Loading... ${Math.round(progress)}%` : 'Loading complete!'}
            </p>
          </div>

          {/* Multiple Progress Bars */}
          <div className="mt-6 space-y-2">
            {/* Second Progress Bar */}
            <div className="w-40 h-1.5 bg-gray-200 rounded-full mx-auto">
              <div
                className="h-1.5 bg-gradient-to-r from-gold-300 to-gold-400 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(progress * 0.8, 100)}%` }}
              ></div>
            </div>
            
            {/* Third Progress Bar */}
            <div className="w-32 h-1 bg-gray-200 rounded-full mx-auto">
              <div
                className="h-1 bg-gradient-to-r from-gold-200 to-gold-300 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(progress * 0.6, 100)}%` }}
              ></div>
            </div>
            
            {/* Fourth Progress Bar */}
            <div className="w-24 h-0.5 bg-gray-200 rounded-full mx-auto">
              <div
                className="h-0.5 bg-gradient-to-r from-gold-100 to-gold-200 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(progress * 0.4, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Floating elements */}
          <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-gold-400 rounded-full floating-glow"></div>
          <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-gold-500 rounded-full floating-glow" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-gold-300 rounded-full floating-glow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 right-1/3 w-3 h-3 bg-gold-600 rounded-full floating-glow" style={{ animationDelay: '1.5s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
