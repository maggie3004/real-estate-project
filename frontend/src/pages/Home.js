import React from 'react';
import HeroSection from '../components/HeroSection';
import LocationSection from '../components/LocationSection';
import ContactForm from '../components/ContactForm';
import StatsSection from '../components/StatsSection';
import ProjectsSection from '../components/ProjectsSection';
import AboutSection from '../components/AboutSection';
import AwardsSection from '../components/AwardsSection';
import Milestones from '../pages/Milestones';
import { Helmet } from 'react-helmet';

// ... import other new sections as you create them

const Home = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#181818] text-[#181818] dark:text-white transition-colors duration-300 pt-20">
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
      <HeroSection />
      
      {/* 2. Statistics Section (Counting Numbers) */}
      <StatsSection />
      
      {/* 3. Our Projects Section */}
      <div id="projects" data-aos="fade-up">
        <ProjectsSection />
      </div>
      
      {/* 4. About Us Section */}
      <div id="about" data-aos="fade-up">
        <AboutSection />
      </div>
      
      {/* 5. Journey/Milestones Section */}
      <div id="milestones" data-aos="fade-up">
        <Milestones />
      </div>
      
      {/* 6. Awards and Recognition Section */}
      <AwardsSection />
      
      {/* 7. Location Section */}
      <LocationSection />
      
      {/* 8. Contact Form */}
      <ContactForm />
      
      {/* Footer is handled by MainLayout component */}
    </div>
  );
};

export default Home; 
