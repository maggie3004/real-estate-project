import React from 'react';

const projects = [
  {
    name: 'Shree Ganesh Srushti',
    location: 'Nashik',
    status: 'Ongoing',
    image: '/hero-building.jpg',
    description: 'Modern homes with thoughtful amenities and excellent connectivity.'
  },
  {
    name: 'Shree Ganesh Park',
    location: 'Nashik',
    status: 'Ongoing',
    image: '/hero-building.jpg',
    description: 'A flagship development with spacious apartments and lifestyle features.'
  },
  {
    name: 'Shree Ganesh Heights',
    location: 'Nashik',
    status: 'Ongoing',
    image: '/hero-building.jpg',
    description: 'Premium 2 & 3 BHK apartments with contemporary design.'
  },
];

const ProjectsSection = () => (
  <section style={{ padding: '3rem 0', background: '#fff' }}>
    <h2 style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: 700, marginBottom: '2rem', color: 'var(--primary-color)' }}>
      Our Projects
    </h2>
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '2rem',
      flexWrap: 'wrap',
    }}>
      {projects.map((project, idx) => (
        <div key={idx} className="project-card" style={{
          background: 'var(--card-bg)',
          boxShadow: 'var(--card-shadow)',
          borderRadius: '1rem',
          overflow: 'hidden',
          width: 320,
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.25s cubic-bezier(.4,2,.3,1), box-shadow 0.25s cubic-bezier(.4,2,.3,1)',
        }}>
          <img src={project.image} alt={project.name} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
          <div style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--primary-color)' }}>{project.name}</h3>
            <div style={{ color: '#888', fontSize: '1rem', margin: '0.5rem 0' }}>{project.location}</div>
            <div style={{ color: project.status === 'Ongoing' ? 'var(--accent-color)' : '#4CAF50', fontWeight: 600, marginBottom: 8 }}>{project.status}</div>
            <p style={{ fontSize: '1rem', color: '#555', marginBottom: 12 }}>{project.description}</p>
            <button type="button" style={{
              background: 'var(--primary-color)',
              color: '#fff',
              padding: '0.6rem 1.5rem',
              borderRadius: '1.5rem',
              fontWeight: 600,
              textDecoration: 'none',
              fontSize: '1rem',
              transition: 'background 0.2s',
            }} aria-label={`View details for ${project.name}`}>
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
    <style>{`
      .project-card:hover {
        transform: scale(1.045);
        box-shadow: 0 8px 32px rgba(26,35,126,0.18);
      }
    `}</style>
  </section>
);

export default ProjectsSection; 