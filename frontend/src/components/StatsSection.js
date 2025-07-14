import React from 'react';

const stats = [
  { label: 'Years Experience', value: '35+' },
  { label: 'Families Served', value: '800+' },
  { label: 'Sq. Ft. Developed', value: '1.2M+' },
  { label: 'Awards Won', value: '5+' },
];

const StatsSection = () => (
  <section style={{
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    padding: '3rem 0',
    background: 'var(--background-color)',
  }}>
    {stats.map((stat, idx) => (
      <div key={idx} style={{
        background: 'var(--card-bg)',
        boxShadow: 'var(--card-shadow)',
        borderRadius: '1rem',
        padding: '2rem 2.5rem',
        minWidth: 180,
        textAlign: 'center',
        transition: 'transform 0.2s',
      }}>
        <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--primary-color)' }}>{stat.value}</div>
        <div style={{ fontSize: '1.1rem', color: '#555', marginTop: 8 }}>{stat.label}</div>
      </div>
    ))}
  </section>
);

export default StatsSection; 