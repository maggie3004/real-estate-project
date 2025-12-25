import React, { useEffect } from 'react';
import sgpAView from '../assets/shree-ganesh-park/gallery/a-view.jpg';
import sgpBView from '../assets/shree-ganesh-park/gallery/b-view.jpg';
import sgpNightA from '../assets/shree-ganesh-park/gallery/night-view-a.jpg';
import sgpWingA1BHK from '../assets/shree-ganesh-park/gallery/Wing A 1BHK.jpg';
import sgpWingA2BHK from '../assets/shree-ganesh-park/gallery/Wing A 2BHK.jpg';
import sgpWingC1BHK from '../assets/shree-ganesh-park/gallery/Wing C 1BHK.jpg';
import sgpWingC2BHK from '../assets/shree-ganesh-park/gallery/Wing C 2BHK.jpg';
import sgpBrochure from '../assets/shree-ganesh-park/Shree Ganesh Park E- Brochure.pdf';
import ProjectTemplate from '../components/ProjectTemplate';
import { FaCar, FaSun, FaBuilding, FaShieldAlt, FaWater, FaTint } from 'react-icons/fa';
import { MdMeetingRoom } from 'react-icons/md';
import { BiCctv, BiSolidHomeHeart } from 'react-icons/bi';

const ShreeGaneshParkPhaseI = () => {
  const projectData = {
    projectName: "Shree Ganesh Park",
    tagline: "Experience Essence of Elevated Living...",
    description: `Experience an elevated lifestyle of sophistication at Shree Ganesh Park Phase I, where every aspect is meticulously designed. 1 BHK 'Happy Homes' crafted to enhance your everyday living. These residences offer the perfect integration of luxury and functionality, delivering a modern living experience that seamlessly blends convenience, comfort, and innovation. Located at Sr no 94/1 plot 16/17 gavlane road, Pathardi Shivar, Nashik - 422010, our project provides unmatched connectivity to essential services and amenities. With schools, shopping centers, healthcare facilities, and recreational options all within close proximity, residents enjoy a seamless, well-rounded living experience.`,
    stats: [
      { title: "1 BHK", subtitle: "Happy Homes" },
      { title: "G+7", subtitle: "Structure" },
      { title: "8+", subtitle: "Facilities" },
      { title: "Premium", subtitle: "Location" }
    ],
    amenities: [
      { icon: <BiCctv />, name: "CCTV" },
      { icon: <FaSun />, name: "Solar Power" },
      { icon: <FaShieldAlt />, name: "Safety Gate" },
      { icon: <MdMeetingRoom />, name: "Multipurpose Hall" },
      { icon: <BiSolidHomeHeart />, name: "Auto Door Lift" },
      { icon: <FaBuilding />, name: "Battery Backup" },
      { icon: <FaTint />, name: "Smart Automation" },
      { icon: <FaWater />, name: "Water Supply" },
      { icon: <FaCar />, name: "Parking Space" }
    ],
    images: [sgpAView],
    galleryImages: [sgpAView, sgpBView, sgpNightA],
    brochurePath: sgpBrochure,
    reraNumber: "P51600051448",
    reraQr: "/assets/shree-ganesh-park/gallery/Rera_QR.png",
    layoutVariant: 'ongoing',
    configuration: "1BHK, 2BHK",
    location: "Nashik",
    progressStage: 1,
    locationChips: ["Railway 15 min", "Hospital 10 min", "School 6 min"],
    floorPlans: [
      { label: "1BHK - Type A", src: sgpWingA1BHK },
      { label: "1BHK - Type B", src: sgpWingC1BHK },
      { label: "2BHK - Type A", src: sgpWingA2BHK },
      { label: "2BHK - Type B", src: sgpWingC2BHK }
    ],
    downloads: [
      { label: "Project Brochure", href: sgpBrochure }
    ],
    advantages: ["Multiple Wings", "Secure Entry", "Community Hall", "Optimized Layouts", "Solar", "Parking"],
    testimonials: [],
    cost: { base: "On Request", taxes: "As applicable", maintenance: "TBD" },
    timeline: [
      { label: "Launch", caption: "Bookings open", image: sgpAView },
      { label: "Foundation", caption: "Work started", image: sgpBView },
      { label: "Structure", caption: "Floors cast", image: sgpNightA },
      { label: "Finishing", caption: "Paint & interiors", image: sgpAView }
    ],
    mapUrl: "https://maps.app.goo.gl/6X9DkrFsd58nzQFT9",
    directionsUrl: "https://maps.app.goo.gl/6X9DkrFsd58nzQFT9"
  };

  useEffect(() => {
    document.title = `${projectData.projectName} - Sai Prasad Group`;
  }, [projectData.projectName]);

  return <ProjectTemplate {...projectData} />;
};

export default ShreeGaneshParkPhaseI;