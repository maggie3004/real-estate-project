import React from 'react';

const AboutPage = () => (
  <section className="min-h-screen pt-24 pb-12 bg-white dark:bg-[#181818] text-[#181818] dark:text-white transition-colors duration-300">
    <div className="max-w-5xl mx-auto flex gap-10 flex-wrap items-start">
      <div className="flex-2 min-w-[320px]">
        {/* Spiritual Lines */}
        <div style={{ color: '#b8860b', fontWeight: 700, fontSize: '1.1rem', marginBottom: 12, textAlign: 'center', letterSpacing: 1 }}>
          || ॐ हनुमते नमः || &nbsp; || ॐ भूमी नंदनाय नमः || &nbsp; || श्री गायत्री माता प्रसन्न ||
        </div>
        {/* Marathi & English Intro */}
        <div style={{ fontSize: '1.1rem', color: '#b8860b', marginBottom: 18, fontStyle: 'italic', fontWeight: 600, textAlign: 'left' }}>
          घर म्हणजे फक्त ४ भिंती नाही तर समृद्धी, समाधान आणि आनंदाचे मंदिर असते. पंचतत्वांचे अभ्यास करून, भोगद्याम, सुखदर्शनम व रम्या ह्या वास्तुशास्त्रांच्या मूलभूत तत्वांवर आधारित आम्ही गृह सौख्य साकारत आहोत. प्रत्येक सभासदाला लाभेल असे परिपूर्ण घर साकारत आहोत.
        </div>
        {/* Highlights */}
        <div style={{ display: 'flex', gap: 24, marginBottom: 24, justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#b8860b' }}>450+</div>
            <div style={{ fontSize: '1rem', color: '#444' }}>Happy Families</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#b8860b' }}>25+</div>
            <div style={{ fontSize: '1rem', color: '#444' }}>Delivered Projects</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#b8860b' }}>16+</div>
            <div style={{ fontSize: '1rem', color: '#444' }}>Years Legacy of Trust</div>
          </div>
        </div>
        {/* Company Story */}
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#E53935', marginBottom: 18, textAlign: 'left', textShadow: '1px 2px 8px rgba(0,0,0,0.08)' }}>About Us</h2>
        <p style={{ fontSize: '1.2rem', color: '#444', marginBottom: 18, textAlign: 'justify' }}>
          <b>Building Dreams, Creating Landmarks</b><br/>
          Sai Prasad Builders & Developers was established in 2008-09 in Nashik by Mr. Ganesh Yeole, a visionary leader known for his strong moral values and dynamic approach. With a humble beginning, he built the company from the ground up, fostering trust, transparency, and long-lasting relationships with clients, partners, and stakeholders. His vision has always been to reshape Nashik’s real estate landscape, offering affordable yet high-quality homes that cater to the evolving needs of modern homebuyers.
        </p>
        <p style={{ fontSize: '1.1rem', color: '#444', marginBottom: 18, textAlign: 'justify' }}>
          Over the past 16 years, Sai Prasad Builders & Developers has successfully completed <b>25+ projects</b> across multiple prime locations in Nashik. From luxury developments to budget-friendly homes, we have consistently set new benchmarks in design, quality, and sustainability. Our projects are a reflection of our commitment to delivering well-planned, Vastu-compliant homes with top-notch construction quality and modern amenities, ensuring an elevated living experience.
        </p>
        <p style={{ fontSize: '1.1rem', color: '#444', marginBottom: 18, textAlign: 'justify' }}>
          With the second generation now actively contributing to the business, Sai Prasad Builders & Developers is entering a new phase of growth and transformation. Under the guidance of Mr. Prasad G. Yeole, a qualified Civil Engineer with a deep understanding of modern construction practices, the company is embracing advanced technologies, innovative design concepts, and sustainable building solutions to redefine the real estate landscape. Mr. Prasad Yeole is also pursuing a Vastu Expert Certification, bringing a unique blend of engineering expertise and traditional wisdom to our projects. This ensures that every home we build is not only structurally sound but also aligned with Vastu principles for a harmonious and prosperous living environment.
        </p>
        <p style={{ fontSize: '1.1rem', color: '#444', marginBottom: 18, textAlign: 'justify' }}>
          With a progressive vision and a strong foundation laid by the first generation, Sai Prasad Builders & Developers is now moving towards higher growth, greater efficiency, and enhanced quality standards. By integrating cutting-edge construction techniques, smart home solutions, and eco-friendly initiatives, we continue to shape a better future for homeowners while upholding our legacy of trust, excellence, and customer satisfaction.
        </p>
        {/* Mission & Vision */}
        <div style={{ fontSize: '1.1rem', color: '#444', marginBottom: 18, textAlign: 'justify' }}>
          <b>Our Mission:</b> To build more than just houses—we create homes that offer comfort, convenience, and a superior lifestyle. By maintaining a balance between affordability and premium quality, we ensure that every homeowner receives a complete, well-equipped living space that meets their aspirations.
        </div>
        <div style={{ fontSize: '1.1rem', color: '#444', marginBottom: 18, textAlign: 'justify' }}>
          <b>Our Vision:</b> To create homes that go beyond four walls, delivering true satisfaction to every homeowner. We strive to build high-quality, well-designed, and affordable spaces that offer comfort, security, and a fulfilling lifestyle. By prioritizing innovation, sustainability, and customer needs, we continue to move forward with integrity, excellence, and an unwavering commitment to customer satisfaction.
        </div>
        {/* Sustainability */}
        <div style={{ fontSize: '1.1rem', color: '#444', marginBottom: 18, textAlign: 'justify' }}>
          <b>Sustainability:</b> We believe in building a better future, not just through quality homes but also through sustainable initiatives. We have integrated renewable energy solutions in our projects, ensuring efficient power usage in common areas. Additionally, we encourage homebuyers to contribute to a greener environment by participating in tree plantation drives, fostering a more eco-friendly and sustainable community.
        </div>
      </div>
      {/* Owner/Founder Column */}
      <aside className="flex-1 min-w-[260px] bg-[#fffbe6] dark:bg-[#232323] rounded-2xl shadow-lg p-6 text-center border-2 border-[#ffe082] dark:border-[#ffd700] flex flex-col items-center justify-center min-h-[480px]">
        <img src={process.env.PUBLIC_URL + '/owner-placeholder.png'} alt="Owner" className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-[#E53935]" />
        <h3 className="text-lg font-bold text-[#E53935] mb-2">Mr. Prasad Yeole</h3>
        <div className="text-[#444] dark:text-[#ffd700] font-medium mb-4">Second Generation | Civil Engineer</div>
        <h4 className="text-base text-[#E53935] mb-2">Message from the Next Generation</h4>
        <div className="text-sm italic text-[#444] dark:text-[#ffd700] text-justify">
          "We are committed to building homes that blend innovation, quality, and tradition—creating spaces where families thrive and memories are made. Thank you for trusting us with your dreams."
        </div>
      </aside>
    </div>
  </section>
);

export default AboutPage; 
