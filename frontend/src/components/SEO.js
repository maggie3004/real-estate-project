import React from 'react';
import { Helmet } from 'react-helmet';

/**
 * SEO Component for enhanced meta tags
 * Includes Open Graph, Twitter Cards, and structured data
 */
const SEO = ({
    title,
    description,
    image = '/assets/og-image.jpg',
    url,
    type = 'website',
    keywords,
    author = 'Ganesh Yeole Builders & Developers',
    structuredData
}) => {
    const siteUrl = 'https://www.ganeshyeolebuilders.com';
    const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
    const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            <meta name="author" content={author} />
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph Tags */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullImage} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content="Ganesh Yeole Builders & Developers" />
            <meta property="og:locale" content="en_IN" />

            {/* Twitter Card Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullImage} />
            <meta name="twitter:site" content="@GaneshYeoleBuilders" />

            {/* Additional SEO Tags */}
            <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
            <meta name="googlebot" content="index, follow" />

            {/* Structured Data (JSON-LD) */}
            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
