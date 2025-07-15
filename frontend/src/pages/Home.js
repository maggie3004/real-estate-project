import React from 'react';
import HeroSection from '../components/HeroSection';
import PricingFloorPlanSection from '../components/PricingFloorPlanSection';
import AmenitiesSection from '../components/AmenitiesSection';
import GallerySection from '../components/GallerySection';
import LocationSection from '../components/LocationSection';
import ContactForm from '../components/ContactForm';
import StatsSection from '../components/StatsSection';
import ProjectsSection from '../components/ProjectsSection';
import AboutSection from '../components/AboutSection';
import AwardsSection from '../components/AwardsSection';
import { Helmet } from 'react-helmet';
// ... import other new sections as you create them

const Home = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#181818] text-[#181818] dark:text-white transition-colors duration-300">
      <Helmet>
        <title>Shree Ganesh Real Estate | Premium Properties in Mumbai, Pune & Nashik</title>
        <meta name="description" content="Discover premium properties in Mumbai, Pune, and Nashik. Luxury apartments, villas, and commercial spaces with world-class amenities. Find your dream home with Shree Ganesh Real Estate." />
        <link rel="canonical" href={window.location.origin + '/'} />
        {/* Open Graph */}
        <meta property="og:title" content="Shree Ganesh Real Estate | Premium Properties in Mumbai, Pune & Nashik" />
        <meta property="og:description" content="Discover premium properties in Mumbai, Pune, and Nashik. Luxury apartments, villas, and commercial spaces with world-class amenities." />
        <meta property="og:image" content={window.location.origin + '/og-image.jpg'} />
        <meta property="og:url" content={window.location.origin + '/'} />
        <meta property="og:type" content="website" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Shree Ganesh Real Estate | Premium Properties in Mumbai, Pune & Nashik" />
        <meta name="twitter:description" content="Discover premium properties in Mumbai, Pune, and Nashik. Luxury apartments, villas, and commercial spaces with world-class amenities." />
        <meta name="twitter:image" content={window.location.origin + '/twitter-image.jpg'} />
        {/* JSON-LD Organization Schema */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Shree Ganesh Real Estate",
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
              "https://www.facebook.com/shreeganeshrealestate",
              "https://www.instagram.com/shreeganeshrealestate",
              "https://www.linkedin.com/company/shreeganeshrealestate"
            ]
          }
        `}</script>
      </Helmet>
      <HeroSection />
      <PricingFloorPlanSection />
      <AmenitiesSection />
      <GallerySection />
      <LocationSection />
      <ContactForm />
      <StatsSection />
      <div id="about" data-aos="fade-up"><AboutSection /></div>
      <div id="projects" data-aos="fade-up"><ProjectsSection /></div>
      <AwardsSection />
      {/* Add AboutSection, AmenitiesSection, AwardsSection, ContactForm, etc. here as you create them */}
    </div>
  );
};

export default Home; 