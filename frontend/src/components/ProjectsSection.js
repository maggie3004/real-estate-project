import React from 'react';

const projects = [
  {
    name: 'Goda Spandan',
    location: 'Near Someshwar Temple, Nashik',
    status: 'Ongoing',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
    description: 'A premium residential project with modern amenities and lush surroundings.'
  },
  {
    name: 'Prangan Ekaant',
    location: 'Serene Meadows, Nashik',
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80',
    description: 'Completed luxury apartments with eco-friendly construction and innovative design.'
  },
  {
    name: 'ANP Ultimus',
    location: 'Wakad, Pune',
    status: 'Ongoing',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80',
    description: 'Spacious 2, 2.5, 3 & 3.5 BHK apartments with world-class amenities.'
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