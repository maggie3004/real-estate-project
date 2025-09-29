import React from 'react';

const AboutSection = () => (
  <section style={{ padding: '3rem 0', background: 'var(--background-color)' }}>
    <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', padding: '0 1rem' }}>
      <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 700, color: 'var(--primary-color)', marginBottom: 16 }}>
        About Us
      </h2>
      <div style={{ fontSize: 'clamp(0.9rem, 3vw, 1.1rem)', color: '#b8860b', marginBottom: 18, fontStyle: 'italic', fontWeight: 600, lineHeight: 1.6 }}>
        घर म्हणजे फक्त ४ भिंती नाही तर समृद्धी, समाधान आणि आनंदाचे मंदिर असते.<br/>
        पंचतत्वांचे अभ्यास करून, भोगद्याम, सुखदर्शनम व रम्या ह्या वास्तुशास्त्रांच्या मूलभूत तत्वांवर आधारित आम्ही गृह सौख्य साकारत आहोत.<br/>
        प्रत्येक सभासदाला लाभेल असे परिपूर्ण घर साकारत आहोत.
      </div>
      
      <div style={{ fontSize: 'clamp(0.9rem, 3vw, 1.1rem)', color: '#444', marginBottom: 18, textAlign: 'justify', lineHeight: 1.6, padding: '0 0.5rem' }}>
        <b>Our Vision:</b> To become the most trusted and preferred real estate developer in Nashik, creating landmark projects that set new standards in quality, design, and customer satisfaction. We envision building communities where families thrive, dreams flourish, and every home becomes a legacy for generations to come.
      </div>
      
      <div style={{ fontSize: 'clamp(0.9rem, 3vw, 1.1rem)', color: '#444', marginBottom: 18, textAlign: 'justify', lineHeight: 1.6, padding: '0 0.5rem' }}>
        <b>Our Mission:</b> To deliver exceptional homes that exceed expectations through innovative design, superior construction quality, and unwavering commitment to customer satisfaction. We strive to make luxury living accessible while maintaining the highest standards of Vastu compliance and modern amenities.
      </div>
      
      <p style={{ fontSize: 'clamp(1rem, 3.5vw, 1.2rem)', color: '#444', marginBottom: 18, textAlign: 'justify', lineHeight: 1.6, padding: '0 0.5rem' }}>
        <b>Building Dreams, Creating Landmarks</b><br/>
        Established in 2008-09 by visionary leader Mr. Ganesh Yeole, Sai Prasad Builders & Developers has transformed Nashik's real estate landscape with <b>25+ successful projects</b> and <b>500+ happy families</b>. Our journey from humble beginnings to becoming a trusted name in real estate reflects our commitment to excellence, transparency, and customer-centric approach.
      </p>
      
      <p style={{ fontSize: 'clamp(0.9rem, 3vw, 1.1rem)', color: '#444', marginBottom: 18, textAlign: 'justify', lineHeight: 1.6, padding: '0 0.5rem' }}>
        Today, under the leadership of Mr. Prasad G. Yeole, a qualified Civil Engineer and Vastu Expert in training, we combine cutting-edge construction technology with traditional Vastu wisdom. This unique blend ensures every home we build is not just structurally superior but also harmoniously designed for prosperity and well-being. Our projects feature world-class amenities, smart home solutions, and premium finishes that elevate the living experience.
      </p>
      
      <p style={{ fontSize: 'clamp(0.9rem, 3vw, 1.1rem)', color: '#444', marginBottom: 18, textAlign: 'justify', lineHeight: 1.6, padding: '0 0.5rem' }}>
        What sets us apart is our unwavering focus on <b>quality, timely delivery, and customer satisfaction</b>. We have achieved <b>100% customer satisfaction</b> across all our projects, with many families choosing us for their second and third homes. Our commitment to Vastu compliance, combined with modern design aesthetics, creates homes that are both spiritually harmonious and contemporary in appeal.
      </p>
      
      <div style={{ fontStyle: 'italic', color: 'var(--primary-color)', fontSize: 'clamp(0.9rem, 3vw, 1.1rem)', marginBottom: 24, lineHeight: 1.6 }}>
        "For us, home is not just about four walls, but a world where love resides and memories are created."
      </div>
    </div>
  </section>
);

export default AboutSection; 