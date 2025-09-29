import React, { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import LocationSection from '../components/LocationSection';
import ContactForm from '../components/ContactForm';
import ProjectsSection from '../components/ProjectsSection';
import AboutSection from '../components/AboutSection';
import AwardsSection from '../components/AwardsSection';
import JourneySection from '../components/JourneySection';
import Testimonials from '../components/Testimonials';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useSmoothScroll } from '../hooks/useSmoothScroll';

// ... import other new sections as you create them

const Home = () => {
  // Use the smooth scroll hook
  const { scrollToSection } = useSmoothScroll();

  useEffect(() => {
    // Add smooth scroll to all anchor links with enhanced performance
    const handleSmoothScroll = (e) => {
      const target = e.target.getAttribute('href');
      if (target && target.startsWith('#')) {
        e.preventDefault();
        scrollToSection(target);
      }
    };

    // Add smooth scroll to all anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', handleSmoothScroll, { passive: false });
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, [scrollToSection]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white dark:bg-black text-[#181818] dark:text-white transition-colors duration-300"
    >
      <Helmet>
        <title>Ganesh Yeole Builders and Developers | Premium Properties in Mumbai, Pune & Nashik</title>
        <meta name="description" content="Discover premium properties in Mumbai, Pune, and Nashik. Luxury apartments, villas, and commercial spaces with world-class amenities. Find your dream home with Ganesh Yeole Builders and Developers." />
        <link rel="canonical" href={window.location.origin + '/'} />
        {/* Open Graph */}
        <meta property="og:title" content="Ganesh Yeole Builders and Developers | Premium Properties in Mumbai, Pune & Nashik" />
        <meta property="og:description" content="Discover premium properties in Mumbai, Pune, and Nashik. Luxury apartments, villas, and commercial spaces with world-class amenities." />
        <meta property="og:image" content={window.location.origin + '/og-image.jpg'} />
        <meta property="og:url" content={window.location.origin + '/'} />
        <meta property="og:type" content="website" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ganesh Yeole Builders and Developers | Premium Properties in Mumbai, Pune & Nashik" />
        <meta name="twitter:description" content="Discover premium properties in Mumbai, Pune, and Nashik. Luxury apartments, villas, and commercial spaces with world-class amenities." />
        <meta name="twitter:image" content={window.location.origin + '/twitter-image.jpg'} />
        {/* JSON-LD Organization Schema */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Ganesh Yeole Builders and Developers",
            "url": "${window.location.origin}/",
            "logo": "${window.location.origin}/logo192.png",
            "description": "Premium real estate services in Mumbai, Pune, and Nashik",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "123 Main Street",
              "addressLocality": "Mumbai",
              "addressRegion": "Maharashtra",
              "postalCode": "400001",
              "addressCountry": "IN"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-XXXXXXXXXX",
              "contactType": "customer service",
              "areaServed": ["Mumbai", "Pune", "Nashik"],
              "availableLanguage": ["English", "Hindi", "Marathi"]
            },
            "sameAs": [
              "https://www.facebook.com/ganeshyoelebuilders",
              "https://www.instagram.com/ganeshyoelebuilders",
              "https://www.linkedin.com/company/ganeshyoelebuilders"
            ]
          }
        `}</script>
      </Helmet>
      
      {/* 1. Hero Section (Carousel) */}
      <div id="hero">
        <HeroSection />
      </div>
      
      {/* 2. Stats Section (Counting Numbers) */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <StatsSection />
      </motion.div>
      
      {/* 3. Our Projects Section */}
      <motion.div 
        id="projects"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <ProjectsSection />
      </motion.div>
      
      {/* 4. About Us Section */}
      <motion.div 
        id="about"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <AboutSection />
      </motion.div>
      
      {/* 5. Journey/Milestones Section */}
      <motion.div 
        id="milestones"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <JourneySection />
      </motion.div>
      
      {/* 6. Awards and Recognition Section */}
      <motion.div
        id="awards"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <AwardsSection />
      </motion.div>
      
      {/* 7. Testimonials Section */}
      <motion.div
        id="testimonials"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <Testimonials />
      </motion.div>
      
      {/* 8. Location Section */}
      <motion.div
        id="location"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <LocationSection />
      </motion.div>
      
      {/* 9. Contact Form */}
      <motion.div
        id="contact"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <ContactForm />
      </motion.div>
      
      {/* Footer is handled by MainLayout component */}
    </motion.div>
  );
};

export default Home; 
