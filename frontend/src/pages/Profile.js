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
        <title>User Profile | Ganesh Yeole Builders and Developers</title>
        <meta name="description" content="Manage your profile and preferences on Ganesh Yeole Builders and Developers." />
        <link rel="canonical" href={window.location.origin + '/profile'} />
        {/* Open Graph */}
        <meta property="og:title" content="User Profile | Ganesh Yeole Builders and Developers" />
        <meta property="og:description" content="Manage your profile and preferences on Ganesh Yeole Builders and Developers." />
        <meta property="og:url" content={window.location.origin + '/profile'} />
        <meta property="og:type" content="website" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="User Profile | Ganesh Yeole Builders and Developers" />
        <meta name="twitter:description" content="Manage your profile and preferences on Ganesh Yeole Builders and Developers." />
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
      <div className="max-w-md mx-auto p-6 pt-24">
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