import React from 'react';
import { FaTrophy, FaMedal, FaAward } from 'react-icons/fa';

const awards = [
  { icon: <FaTrophy size={32} color="var(--accent-color)" />, name: 'Ultratech Best Building', year: '2023-24' },
  { icon: <FaMedal size={32} color="var(--accent-color)" />, name: 'BAI Best Building', year: '2018' },
  { icon: <FaAward size={32} color="var(--accent-color)" />, name: 'Lokmat Best Brand', year: '2022' },
  { icon: <FaTrophy size={32} color="var(--accent-color)" />, name: 'Dainik Bhaskar Best Building', year: '2021' },
  { icon: <FaAward size={32} color="var(--accent-color)" />, name: 'IPPL Winner', year: '2022' },
];

const AwardsSection = () => (
  <section style={{ padding: '3rem 0', background: 'var(--background-color)' }}>
    <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 700, color: 'var(--primary-color)', marginBottom: '2rem' }}>
      Awards & Recognition
    </h2>
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '2rem',
      flexWrap: 'wrap',
      maxWidth: 900,
      margin: '0 auto',
    }}>
      {awards.map((award, idx) => (
        <div key={idx} style={{
          background: 'var(--card-bg)',
          boxShadow: 'var(--card-shadow)',
          borderRadius: '1rem',
          padding: '2rem 1.5rem',
          minWidth: 200,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          {award.icon}
          <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--primary-color)', marginTop: 12 }}>{award.name}</div>
          <div style={{ color: '#888', fontSize: '1rem', marginTop: 4 }}>{award.year}</div>
        </div>
      ))}
    </div>
  </section>
);

export default AwardsSection; 