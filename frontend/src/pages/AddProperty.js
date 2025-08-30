import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

const initialState = {
  title: '',
  description: '',
  price: '',
  location: '',
  image: '',
  images: '', // comma-separated
  bedrooms: '',
  bathrooms: '',
  area: '',
  lat: '',
  lng: '',
  amenities: '', // comma-separated
  type: '',
  yearBuilt: '',
  furnishing: '',
  floor: '',
  totalFloors: '',
  facing: ''
};

export default function AddProperty() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
    } else if (user.role !== 'admin') {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    if (!user || user.role !== 'admin' || !token) {
      setError('Unauthorized');
      toast.error('Unauthorized');
      setLoading(false);
      return;
    }
    // Prepare data
    const data = {
      ...form,
      price: Number(form.price),
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      lat: Number(form.lat),
      lng: Number(form.lng),
      yearBuilt: Number(form.yearBuilt),
      floor: Number(form.floor),
      totalFloors: Number(form.totalFloors),
      images: form.images.split(',').map(s => s.trim()).filter(Boolean),
      amenities: form.amenities.split(',').map(s => s.trim()).filter(Boolean)
    };
    try {
      const res = await fetch('http://localhost:5000/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Failed to add property');
      setSuccess('Property added successfully!');
      toast.success('Property added successfully!');
      setForm(initialState);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Add Property | Ganesh Yeole Builders and Developers</title>
        <meta name="description" content="Admin panel to add new premium properties to the Ganesh Yeole Builders and Developers platform." />
        <link rel="canonical" href={window.location.origin + '/add-property'} />
        {/* Open Graph */}
        <meta property="og:title" content="Add Property | Ganesh Yeole Builders and Developers" />
        <meta property="og:description" content="Admin panel to add new premium properties to the Ganesh Yeole Builders and Developers platform." />
        <meta property="og:image" content={window.location.origin + '/og-image.jpg'} />
        <meta property="og:url" content={window.location.origin + '/add-property'} />
        <meta property="og:type" content="website" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Add Property | Ganesh Yeole Builders and Developers" />
        <meta name="twitter:description" content="Admin panel to add new premium properties to the Ganesh Yeole Builders and Developers platform." />
        <meta name="twitter:image" content={window.location.origin + '/twitter-image.jpg'} />
        {/* JSON-LD WebPage Schema */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Add Property | Ganesh Yeole Builders and Developers",
            "description": "Admin panel to add new premium properties to the Ganesh Yeole Builders and Developers platform.",
            "url": "${window.location.origin}/add-property"
          }
        `}</script>
      </Helmet>
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Add New Property</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border rounded" required />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" required />
          <input name="price" value={form.price} onChange={handleChange} placeholder="Price (number)" className="w-full p-2 border rounded" required type="number" />
          <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="w-full p-2 border rounded" required />
          <input name="image" value={form.image} onChange={handleChange} placeholder="Main Image URL" className="w-full p-2 border rounded" required />
          <input name="images" value={form.images} onChange={handleChange} placeholder="Other Images (comma-separated URLs)" className="w-full p-2 border rounded" />
          <input name="bedrooms" value={form.bedrooms} onChange={handleChange} placeholder="Bedrooms" className="w-full p-2 border rounded" type="number" />
          <input name="bathrooms" value={form.bathrooms} onChange={handleChange} placeholder="Bathrooms" className="w-full p-2 border rounded" type="number" />
          <input name="area" value={form.area} onChange={handleChange} placeholder="Area (e.g. 1200 sqft)" className="w-full p-2 border rounded" />
          <input name="lat" value={form.lat} onChange={handleChange} placeholder="Latitude" className="w-full p-2 border rounded" type="number" step="any" />
          <input name="lng" value={form.lng} onChange={handleChange} placeholder="Longitude" className="w-full p-2 border rounded" type="number" step="any" />
          <input name="amenities" value={form.amenities} onChange={handleChange} placeholder="Amenities (comma-separated)" className="w-full p-2 border rounded" />
          <input name="type" value={form.type} onChange={handleChange} placeholder="Type (e.g. Apartment, Villa)" className="w-full p-2 border rounded" />
          <input name="yearBuilt" value={form.yearBuilt} onChange={handleChange} placeholder="Year Built" className="w-full p-2 border rounded" type="number" />
          <input name="furnishing" value={form.furnishing} onChange={handleChange} placeholder="Furnishing (e.g. Furnished)" className="w-full p-2 border rounded" />
          <input name="floor" value={form.floor} onChange={handleChange} placeholder="Floor" className="w-full p-2 border rounded" type="number" />
          <input name="totalFloors" value={form.totalFloors} onChange={handleChange} placeholder="Total Floors" className="w-full p-2 border rounded" type="number" />
          <input name="facing" value={form.facing} onChange={handleChange} placeholder="Facing (e.g. East)" className="w-full p-2 border rounded" />
                  <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded font-semibold hover:bg-red-700 transition" disabled={loading}>{loading ? 'Adding...' : 'Add Property'}</button>
        {success && <p className="text-gold-600">{success}</p>}
          {error && <p className="text-red-600">{error}</p>}
        </form>
      </div>
    </>
  );
} 