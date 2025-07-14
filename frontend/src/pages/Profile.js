import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  if (!user) return null;

  return (
    <>
      <Helmet>
        <title>User Profile | Shree Ganesh Real Estate</title>
        <meta name="description" content="View and manage your user profile, role, and access admin features if available." />
        <link rel="canonical" href={window.location.origin + '/profile'} />
        {/* Open Graph */}
        <meta property="og:title" content="User Profile | Shree Ganesh Real Estate" />
        <meta property="og:description" content="View and manage your user profile, role, and access admin features if available." />
        <meta property="og:image" content={window.location.origin + '/og-image.jpg'} />
        <meta property="og:url" content={window.location.origin + '/profile'} />
        <meta property="og:type" content="profile" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="User Profile | Shree Ganesh Real Estate" />
        <meta name="twitter:description" content="View and manage your user profile, role, and access admin features if available." />
        <meta name="twitter:image" content={window.location.origin + '/twitter-image.jpg'} />
        {/* JSON-LD WebPage Schema */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "User Profile",
            "description": "View and manage your user profile, role, and access admin features if available.",
            "url": "${window.location.origin}/profile"
          }
        `}</script>
      </Helmet>
      <div className="max-w-md mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>
        <div className="mb-4">
          <div><span className="font-semibold">Email:</span> {user.email}</div>
          <div><span className="font-semibold">Role:</span> {user.role}</div>
        </div>
        {user.role === 'admin' && (
          <div className="mb-4 p-4 bg-blue-50 rounded">
            <p className="font-semibold text-blue-700 mb-2">You are an admin.</p>
            <Link to="/admin" className="text-blue-600 underline">Go to Admin Dashboard</Link>
          </div>
        )}
      </div>
    </>
  );
} 