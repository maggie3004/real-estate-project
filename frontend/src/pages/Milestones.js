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
  <section className="min-h-screen pt-24 pb-12 bg-white dark:bg-[#181818] text-[#181818] dark:text-white transition-colors duration-300">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-[#1976d2] dark:text-[#90caf9] mb-8 text-center">Our Landmark Projects & Milestones</h2>
      <div className="flex flex-col gap-8">
        {projects.map((proj, idx) => (
          <div key={proj.name} className="bg-white dark:bg-[#232323] rounded-2xl shadow-lg p-7">
            <h3 className="text-xl font-bold text-[#1976d2] dark:text-[#90caf9] mb-2">{proj.name}</h3>
            <div className="text-base text-[#444] dark:text-[#ffd700] text-justify">{proj.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Milestones; 