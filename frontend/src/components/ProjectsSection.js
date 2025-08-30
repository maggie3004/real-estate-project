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
    <h2 style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: 700, marginBottom: '2rem', color: '#111111', position: 'relative' }}>
      Our Projects
      <span style={{ display: 'block', width: 40, height: 3, background: '#FFD700', margin: '0.5rem auto 0', borderRadius: 2 }}></span>
    </h2>
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '2rem',
      flexWrap: 'wrap',
    }}>
      {projects.map((project, idx) => (
        <div key={idx} className="project-card" style={{
          background: '#fff',
          boxShadow: '0 2px 12px 0 rgba(0,0,0,0.08)',
          border: '2px solid #FFD700',
          borderRadius: '1rem',
          overflow: 'hidden',
          width: 320,
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.25s cubic-bezier(.4,2,.3,1), box-shadow 0.25s cubic-bezier(.4,2,.3,1)',
        }}>
          <img src={project.image} alt={project.name} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
          <div style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#111111', marginBottom: '0.5rem' }}>{project.name}</h3>
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>{project.location}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ color: '#111111', fontWeight: 600 }}>{project.price}</span>
              <span style={{ 
                background: project.status === 'Ready to Move' ? '#FFD700' : project.status === 'Under Construction' ? '#B22222' : '#666',
                color: '#fff',
                padding: '0.25rem 0.75rem',
                borderRadius: '1rem',
                fontSize: '0.8rem',
                fontWeight: 600
              }}>{project.status}</span>
            </div>
            <button style={{
              background: '#B22222',
              color: '#fff',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '2rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              width: '100%'
            }} onMouseEnter={(e) => e.target.style.background = '#A01F1F'} onMouseLeave={(e) => e.target.style.background = '#B22222'}>
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