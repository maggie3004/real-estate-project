import React from 'react';

const testimonials = [
  { name: "Amit Sharma", text: "Sai Prasad Builders made our dream home a reality. Highly recommended!" },
  { name: "Priya Desai", text: "Professional, transparent, and eco-friendly. Great experience!" }
];

const Testimonials = () => (
  <section className="container mx-auto py-12 px-4 bg-accent-50 rounded-lg my-8">
    <h2 className="text-2xl font-bold text-primary-700 mb-6">What Our Clients Say</h2>
    <div className="grid md:grid-cols-2 gap-6">
      {testimonials.map((t, i) => (
        <div key={i} className="bg-white p-6 rounded shadow">
          <p className="mb-2 text-gray-700 italic">"{t.text}"</p>
          <span className="font-semibold text-primary-700">- {t.name}</span>
        </div>
      ))}
    </div>
  </section>
);

export default Testimonials; 