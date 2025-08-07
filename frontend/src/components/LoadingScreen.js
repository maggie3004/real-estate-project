import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const marathiTexts = [
    "गणेश येवले बिल्डर्स आणि डेव्हलपर्स",
    "आपल्या स्वप्नांचे घर बांधत आहोत",
    "गुणवत्ता आणि विश्वासाची परंपरा",
    "आपल्या भविष्यासाठी सर्वोत्तम"
  ];

  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % marathiTexts.length);
    }, 2000);

    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
      onLoadingComplete();
    }, 6000);

    return () => {
      clearInterval(textInterval);
      clearTimeout(loadingTimeout);
    };
  }, [onLoadingComplete, marathiTexts.length]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 bg-gradient-to-br from-gold-50 via-orange-50 to-red-50 flex items-center justify-center"
        >
          <div className="text-center">
            {/* Vastu Logo */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 1.5, 
                ease: "easeOut",
                type: "spring",
                stiffness: 100
              }}
              className="mb-8"
            >
              <div className="relative">
                                 {/* Vastu Mandala */}
                 <div className="w-32 h-32 mx-auto relative">
                   {/* Outer Circle */}
                   <motion.div
                     animate={{ rotate: 360 }}
                     transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                     className="absolute inset-0 border-4 border-yellow-400 rounded-full"
                   />
                   
                   {/* Inner Circle */}
                   <motion.div
                     animate={{ rotate: -360 }}
                     transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                     className="absolute inset-4 border-3 border-orange-500 rounded-full"
                   />
                   
                   {/* Center Vastu Symbol */}
                   <div className="absolute inset-8 flex items-center justify-center">
                     <div className="text-4xl font-bold text-yellow-600">वास्तु</div>
                   </div>
                   
                   {/* Directional Elements */}
                   <div className="absolute inset-0">
                     {/* North */}
                     <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-500 rounded-full" />
                     {/* South */}
                     <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full" />
                     {/* East */}
                     <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-green-500 rounded-full" />
                     {/* West */}
                     <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-yellow-500 rounded-full" />
                   </div>
                   
                   {/* Vastu Grid Lines */}
                   <div className="absolute inset-0">
                     {/* Vertical Line */}
                     <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 transform -translate-x-1/2" />
                     {/* Horizontal Line */}
                     <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-300 transform -translate-y-1/2" />
                   </div>
                 </div>
                
                {/* Floating Elements */}
                <motion.div
                  animate={{ 
                    y: [-10, 10, -10],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-4 -right-4 text-2xl"
                >
                  🏠
                </motion.div>
                
                <motion.div
                  animate={{ 
                    y: [10, -10, 10],
                    rotate: [0, -5, 5, 0]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                  className="absolute -bottom-4 -left-4 text-2xl"
                >
                  🌟
                </motion.div>
              </div>
            </motion.div>

            {/* Animated Marathi Text */}
            <motion.div
              key={currentTextIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 marathi-text">
                {marathiTexts[currentTextIndex]}
              </h2>
              <p className="text-lg text-gray-600">
                Building Dreams, Creating Homes
              </p>
            </motion.div>

                         {/* Loading Bar */}
             <div className="w-64 mx-auto mb-6">
               <motion.div
                 initial={{ width: 0 }}
                 animate={{ width: "100%" }}
                 transition={{ duration: 5, ease: "easeInOut" }}
                 className="h-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full"
               />
             </div>

                         {/* Loading Dots */}
             <div className="flex justify-center space-x-2">
               {[0, 1, 2].map((index) => (
                 <motion.div
                   key={index}
                   animate={{ 
                     scale: [1, 1.2, 1],
                     opacity: [0.5, 1, 0.5]
                   }}
                   transition={{ 
                     duration: 1.5, 
                     repeat: Infinity,
                     delay: index * 0.2
                   }}
                   className="w-3 h-3 bg-yellow-500 rounded-full"
                 />
               ))}
             </div>

                         {/* Decorative Elements */}
             <div className="absolute inset-0 pointer-events-none">
               {/* Floating particles */}
               {[...Array(6)].map((_, i) => (
                 <motion.div
                   key={i}
                   animate={{
                     x: [0, 100, 0],
                     y: [0, -50, 0],
                     opacity: [0, 1, 0]
                   }}
                   transition={{
                     duration: 4,
                     repeat: Infinity,
                     delay: i * 0.5,
                     ease: "easeInOut"
                   }}
                   className="absolute w-2 h-2 bg-yellow-500 rounded-full"
                   style={{
                     left: `${20 + i * 15}%`,
                     top: `${30 + i * 10}%`
                   }}
                 />
               ))}
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
