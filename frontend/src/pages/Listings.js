import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import properties from '../data/properties';

const Listings = () => {
  // Filter states
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [sort, setSort] = useState('newest');

  // Helper to parse price string
  const parsePrice = (price) => {
    if (typeof price === 'string') {
      if (price.includes('Cr')) {
        return parseFloat(price.replace(/[^\d.]/g, '')) * 10000000;
      } else if (price.includes('Lakhs')) {
        return parseFloat(price.replace(/[^\d.]/g, '')) * 100000;
      }
      return parseFloat(price.replace(/[^\d.]/g, ''));
    }
    return price;
  };

  // Filter and sort logic
  let filtered = properties.filter((property) => {
    const price = parsePrice(property.price);
    const min = minPrice ? parsePrice(minPrice) : 0;
    const max = maxPrice ? parsePrice(maxPrice) : Infinity;
    return (
      (!search ||
        property.title?.toLowerCase().includes(search.toLowerCase()) ||
        property.location?.toLowerCase().includes(search.toLowerCase()) ||
        property.description?.toLowerCase().includes(search.toLowerCase())) &&
      (!location || property.location?.toLowerCase().includes(location.toLowerCase())) &&
      (!type || property.type?.toLowerCase() === type.toLowerCase()) &&
      (!bedrooms || String(property.bedrooms) === bedrooms) &&
      price >= min && price <= max
    );
  });

  if (sort === 'price-asc') {
    filtered = filtered.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
  } else if (sort === 'price-desc') {
    filtered = filtered.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
  } else if (sort === 'newest') {
    filtered = filtered.sort((a, b) => (b.id || 0) - (a.id || 0));
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Property Listings</h1>
      {/* Search & Filter Controls */}
      <div className="bg-gray-50 rounded-xl p-4 mb-8 flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-sm font-medium mb-1">Search</label>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Title, location, description..." className="border rounded px-3 py-2 w-48" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Min Price</label>
          <input type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} placeholder="0" className="border rounded px-3 py-2 w-28" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Max Price</label>
          <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="Any" className="border rounded px-3 py-2 w-28" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" className="border rounded px-3 py-2 w-36" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select value={type} onChange={e => setType(e.target.value)} className="border rounded px-3 py-2 w-32">
            <option value="">All</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="House">House</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Bedrooms</label>
          <select value={bedrooms} onChange={e => setBedrooms(e.target.value)} className="border rounded px-3 py-2 w-24">
            <option value="">Any</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Sort</label>
          <select value={sort} onChange={e => setSort(e.target.value)} className="border rounded px-3 py-2 w-32">
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>
      {/* Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">No properties found.</div>
        ) : (
          filtered.map((property) => (
            <div key={property.id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col">
              <img src={property.image} alt={property.title} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h2 className="text-xl font-semibold mb-2">{property.title}</h2>
              <div className="mb-2 text-gray-600">{property.location}</div>
              <div className="mb-4 font-bold text-gold">{property.price}</div>
              <Link to={`/property/${property.id}`} className="mt-auto inline-block px-6 py-2 bg-gold text-white rounded-lg font-semibold hover:bg-rose transition">View Details</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Listings; 