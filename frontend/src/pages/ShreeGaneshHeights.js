import React, { useEffect } from 'react';
import sghDayFront from '../assets/shree-ganesh-heights/gallery/day-front.jpg';
import sghNightFront from '../assets/shree-ganesh-heights/gallery/night-front.jpg';
import sghTopView from '../assets/shree-ganesh-heights/gallery/top-view.jpg';
import sghBrochure from '../assets/shree-ganesh-heights/Shri Ganesh Heights.pdf';
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
    images: ['/assets/shree-ganesh-heights/gallery/hero.png'], // Only hero image
    galleryImages: [sghNightFront, sghTopView], // Gallery images
    brochurePath: sghBrochure,
    reraNumber: "P51600077829",
    reraQr: "/assets/shree-ganesh-heights/gallery/Rera_QR.png",
    layoutVariant: 'ongoing',
    configuration: "1BHK",
    location: "Nashik",
    progressStage: 2,
    locationChips: ["Airport 25 min", "Hospital 8 min", "School 5 min"],
    floorPlans: [
      { label: "1BHK", src: sghTopView },
      { label: "Floor Plan", src: '/assets/shree-ganesh-heights/gallery/floor.png' }
    ],
    downloads: [
      { label: "Project Brochure", href: sghBrochure },
      { label: "Typical Floor Plan", href: "../assets/shree-ganesh-heights/Typical Floor.pdf" }
    ],
    advantages: ["Prime Connectivity", "Secure Campus", "Modern Elevation", "Efficient Layouts", "Solar Ready", "Ample Parking"],
    testimonials: [],
    cost: { base: "On Request", taxes: "As applicable", maintenance: "TBD" },
    timeline: [
      { label: "Launch", caption: "Brand reveal", image: sghDayFront },
      { label: "Foundation", caption: "Groundwork done", image: sghTopView },
      { label: "Structure", caption: "Superstructure rising", image: sghNightFront },
      { label: "Finishing", caption: "Interiors underway", image: sghDayFront }
    ],
    mapUrl: "https://maps.app.goo.gl/6X9DkrFsd58nzQFT9?g_st=com.google.maps.preview.copy",
    directionsUrl: "https://www.google.com/maps/dir//Shree+ganesh+heights+B/@19.9583632,73.7635915,103m"
  };

  useEffect(() => {
    // Update document title
    document.title = `${projectData.projectName} - Sai Prasad Group`;
  }, [projectData.projectName]);

  return <ProjectTemplate {...projectData} />;
};

export default ShreeGaneshHeights;