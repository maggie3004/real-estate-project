/**
 * Structured Data Schemas for Real Estate
 * JSON-LD schemas for better SEO and rich results
 */

export const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Ganesh Yeole Builders & Developers",
    "description": "Premium real estate developer in Nashik, Maharashtra. Building quality homes since 2007.",
    "url": "https://www.ganeshyeolebuilders.com",
    "logo": "https://www.ganeshyeolebuilders.com/assets/logo.png",
    "image": "https://www.ganeshyeolebuilders.com/assets/og-image.jpg",
    "telephone": "+91-70305-02111",
    "email": "ganeshyeolebuilders@gmail.com",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "P. No. 14, Sneh Prasad, Vighnaharta Colony, Khutwad Nagar",
        "addressLocality": "Nashik",
        "addressRegion": "Maharashtra",
        "postalCode": "422008",
        "addressCountry": "IN"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": "19.9975",
        "longitude": "73.7898"
    },
    "areaServed": {
        "@type": "City",
        "name": "Nashik"
    },
    "founder": {
        "@type": "Person",
        "name": "Mr. Ganesh V. Yeole"
    },
    "foundingDate": "2007",
    "sameAs": [
        "https://www.facebook.com/ganeshyeolebuilders",
        "https://www.instagram.com/ganeshyeolebuilders",
        "https://www.linkedin.com/company/ganeshyeolebuilders"
    ]
};

export const createPropertySchema = (property) => ({
    "@context": "https://schema.org",
    "@type": "Apartment",
    "name": property.name,
    "description": property.description,
    "image": property.images || [property.image],
    "address": {
        "@type": "PostalAddress",
        "addressLocality": property.location || "Nashik",
        "addressRegion": "Maharashtra",
        "addressCountry": "IN"
    },
    "numberOfRooms": property.configuration,
    "floorSize": {
        "@type": "QuantitativeValue",
        "value": property.area,
        "unitText": "SQ FT"
    },
    "amenityFeature": property.amenities?.map(amenity => ({
        "@type": "LocationFeatureSpecification",
        "name": amenity
    })),
    "offers": {
        "@type": "Offer",
        "availability": property.status === "Available" ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
        "priceCurrency": "INR"
    }
});

export const breadcrumbSchema = (items) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": `https://www.ganeshyeolebuilders.com${item.url}`
    }))
});

export const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Ganesh Yeole Builders & Developers",
    "image": "https://www.ganeshyeolebuilders.com/assets/logo.png",
    "@id": "https://www.ganeshyeolebuilders.com",
    "url": "https://www.ganeshyeolebuilders.com",
    "telephone": "+91-70305-02111",
    "priceRange": "₹₹",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "P. No. 14, Sneh Prasad, Vighnaharta Colony, Khutwad Nagar",
        "addressLocality": "Nashik",
        "addressRegion": "MH",
        "postalCode": "422008",
        "addressCountry": "IN"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": 19.9975,
        "longitude": 73.7898
    },
    "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ],
        "opens": "09:00",
        "closes": "18:00"
    }
};
