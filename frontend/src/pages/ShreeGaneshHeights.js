import React, { useEffect } from 'react';
import ProjectTemplate from '../components/ProjectTemplate';
import { FaCar, FaSun, FaBuilding, FaShieldAlt, FaWater, FaTint } from 'react-icons/fa';
import { MdMeetingRoom } from 'react-icons/md';
import { BiCctv, BiSolidHomeHeart } from 'react-icons/bi';

const ShreeGaneshHeights = () => {
  const projectData = {
    projectName: "Shree Ganesh Heights",
    tagline: "Experience Essence of Elevated Living...",
    description: "Experience an elevated lifestyle of sophistication at Shree Ganesh Heights, where every aspect is meticulously designed. 1 BHK 'Happy Homes' crafted to enhance your everyday living. These residences offer the perfect integration of luxury and functionality, delivering a modern living experience that seamlessly blends convenience, comfort, and innovation. Strategically located in the highly desirable Pathardi Shivar, Nashik, Shree Ganesh Heights provides unmatched connectivity to essential services and amenities. With schools, shopping centers, healthcare facilities, and recreational options all within close proximity, residents enjoy a seamless, well-rounded living experience.",
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
      "/assets/shree-ganesh-heights/gallery/1.jpeg",
      "/assets/shree-ganesh-heights/gallery/2.jpeg",
      "/assets/shree-ganesh-heights/gallery/3.jpeg",
      "/assets/shree-ganesh-heights/gallery/4.jpeg"
    ],
    brochurePath: "/assets/shree-ganesh-heights/Shri Ganesh Heights.pdf",
    mapUrl: "https://maps.app.goo.gl/6X9DkrFsd58nzQFT9?g_st=com.google.maps.preview.copy",
    directionsUrl: "https://www.google.com/maps/dir//Shree+ganesh+heights+B/@19.9583632,73.7635915,103m"
  };

  useEffect(() => {
    // Update document title
    document.title = `${projectData.projectName} - Sai Prasad Group`;
  }, []);

  return <ProjectTemplate {...projectData} />;
};

export default ShreeGaneshHeights;