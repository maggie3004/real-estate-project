import React, { useEffect } from 'react';
import ProjectTemplate from '../components/ProjectTemplate';
import { FaCar, FaSun, FaBuilding, FaShieldAlt, FaWater, FaTint } from 'react-icons/fa';
import { MdMeetingRoom } from 'react-icons/md';
import { BiCctv, BiSolidHomeHeart } from 'react-icons/bi';

const ModakeshwarApartment = () => {
  const projectData = {
    projectName: "Modakeshwar Apartment",
    tagline: "Experience Essence of Elevated Living...",
    description: `Experience an elevated lifestyle of sophistication at Modakeshwar Apartment, where every aspect is meticulously designed. 1 BHK 'Happy Homes' crafted to enhance your everyday living. These residences offer the perfect integration of luxury and functionality, delivering a modern living experience that seamlessly blends convenience, comfort, and innovation. Located at Sr no 94/1 plot 16/17 gavlane road, Pathardi Shivar, Nashik - 422010, our project provides unmatched connectivity to essential services and amenities. With schools, shopping centers, healthcare facilities, and recreational options all within close proximity, residents enjoy a seamless, well-rounded living experience.`,
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
    images: [
      "/assets/modakeshwar-apartment/gallery/1.jpg",
      "/assets/modakeshwar-apartment/gallery/2.jpg",
      "/assets/modakeshwar-apartment/gallery/3.jpg",
      "/assets/modakeshwar-apartment/gallery/4.jpg",
      "/assets/modakeshwar-apartment/gallery/5.jpg"
    ],
    brochurePath: "/assets/modakeshwar-apartment/brochures/Modakeshwar-Apartment.pdf",
    mapUrl: "https://maps.app.goo.gl/6X9DkrFsd58nzQFT9",
    directionsUrl: "https://maps.app.goo.gl/6X9DkrFsd58nzQFT9"
  };

  useEffect(() => {
    document.title = `${projectData.projectName} - Sai Prasad Group`;
  }, [projectData.projectName]);

  return <ProjectTemplate {...projectData} />;
};

export default ModakeshwarApartment;