import React, { useEffect } from 'react';
import sgsFront from '../assets/shree-ganesh-srushti/gallery/front.jpg';
import sgs1bhk from '../assets/shree-ganesh-srushti/gallery/1bhk.jpg';
import sgs2bhk from '../assets/shree-ganesh-srushti/gallery/2bhk.jpg';
import ProjectTemplate from '../components/ProjectTemplate';
import { FaCar, FaSun, FaBuilding, FaShieldAlt, FaWater, FaTint } from 'react-icons/fa';
import { MdMeetingRoom } from 'react-icons/md';
import { BiCctv, BiSolidHomeHeart } from 'react-icons/bi';

const ShreeGaneshSrushti = () => {
  const projectData = {
    projectName: "Shree Ganesh Srushti",
    tagline: "Experience Essence of Elevated Living...",
    description: `Experience an elevated lifestyle of sophistication at Shree Ganesh Srushti, where every aspect is meticulously designed. 1 BHK 'Happy Homes' crafted to enhance your everyday living. These residences offer the perfect integration of luxury and functionality, delivering a modern living experience that seamlessly blends convenience, comfort, and innovation. Located at Sr no 94/1 plot 16/17 gavlane road, Pathardi Shivar, Nashik - 422010, our project provides unmatched connectivity to essential services and amenities. With schools, shopping centers, healthcare facilities, and recreational options all within close proximity, residents enjoy a seamless, well-rounded living experience.`,
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
    images: [sgsFront, sgs1bhk, sgs2bhk],
    brochurePath: "/Shree-Ganesh-Brochure.pdf",
    reraNumber: "PXXXXXXX",
    reraQr: "/owner-placeholder.png",
    layoutVariant: 'ongoing',
    configuration: "1BHK, 2BHK",
    location: "Nashik",
    progressStage: 2,
    locationChips: ["Temple 8 min", "Hospital 12 min", "Market 7 min"],
    floorPlans: [
      { label: "1BHK", src: sgs1bhk },
      { label: "2BHK", src: sgs2bhk }
    ],
    downloads: [
      { label: "Project Brochure", href: "/Shree-Ganesh-Brochure.pdf" }
    ],
    advantages: ["New Development", "Secure Campus", "Modern Elevation", "Efficient Plans", "Green Views", "Parking"],
    testimonials: [
      { quote: "Stylish and modern living.", author: "Prospective Buyer" }
    ],
    cost: { base: "On Request", taxes: "As applicable", maintenance: "TBD" },
    timeline: [
      { label: "Launch", caption: "Project unveiled", image: sgsFront },
      { label: "Foundation", caption: "Excavation done", image: sgs1bhk },
      { label: "Structure", caption: "Structure progress", image: sgs2bhk },
      { label: "Finishing", caption: "Interior finishing", image: sgsFront }
    ],
    mapUrl: "https://maps.app.goo.gl/6X9DkrFsd58nzQFT9",
    directionsUrl: "https://maps.app.goo.gl/6X9DkrFsd58nzQFT9"
  };

  useEffect(() => {
    document.title = `${projectData.projectName} - Sai Prasad Group`;
  }, [projectData.projectName]);

  return <ProjectTemplate {...projectData} />;
};

export default ShreeGaneshSrushti;