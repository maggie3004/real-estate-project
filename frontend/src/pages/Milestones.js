import React from 'react';

const projects = [
  {
    name: 'Shree Ganesh Park Phase II',
    desc: 'A prestigious commercial and residential development redefining luxury living in Chunchale. Features exquisitely crafted 1 & 2 BHK homes, perfect blend of comfort, convenience, and elegance. Strategically located for seamless connectivity.'
  },
  {
    name: 'Shree Ganesh Park Phase I',
    desc: 'Setting a new benchmark in Chunchale with thoughtfully designed 1 & 2 BHK homes at affordable rates. Modern amenities, record-time completion, a true milestone in urban development.'
  },
  {
    name: 'Shree Ganesh Heights',
    desc: 'Experience elevated living at Pathardi. 1 BHK homes with unmatched convenience, affordability, comfort, and sustainability. Modern amenities, well-planned spaces, vibrant community.'
  },
  {
    name: 'Sai Shraddha Apartment',
    desc: 'King-size 2 BHK luxury homes in DGP Nagar, Kamatwade. Advanced technologies, renewable energy, smart living. Completed and sold in record time, symbol of innovation and excellence.'
  },
  {
    name: 'Vinayak Apartment',
    desc: 'Distinguished residential-cum-commercial project in Makhamalabad. Spacious 2 BHK flats, excellent ventilation, minimalistic yet elegant, superior craftsmanship.'
  },
  {
    name: 'Shree Ganesh Avenue',
    desc: 'Well-planned 1 & 2 BHK homes in Gangapur Shivar. Superior construction, ample space, excellent ventilation, affordable and comfortable living.'
  },
  {
    name: 'Modakeshwar Apartment',
    desc: 'Exclusive standalone residential project in Wasan Nagar, Pathardi. Limited yet luxurious apartments, premium quality, privacy, sophistication, and convenience.'
  }
];

const Milestones = () => (
  <section style={{ padding: '3rem 0', marginTop: '90px', background: 'var(--background-color)' }}>
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1976d2', marginBottom: 32, textAlign: 'center' }}>
        Our Landmark Projects & Milestones
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {projects.map((proj, idx) => (
          <div key={proj.name} style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(25,118,210,0.08)', padding: 28 }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1976d2', marginBottom: 10 }}>{proj.name}</h3>
            <div style={{ fontSize: '1.1rem', color: '#444', textAlign: 'justify' }}>{proj.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Milestones; 