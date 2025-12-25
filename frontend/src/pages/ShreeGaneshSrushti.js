import React, { useEffect } from 'react';
import sgsFront from '../assets/shree-ganesh-srushti/gallery/front.jpg';
import sgsNight from '../assets/shree-ganesh-srushti/gallery/night.jpg';
import sgs1bhk from '../assets/shree-ganesh-srushti/gallery/1bhk.jpg';
import sgs1bhk2 from '../assets/shree-ganesh-srushti/gallery/1bhk (2).jpg';
import sgs2bhk from '../assets/shree-ganesh-srushti/gallery/2bhk.jpg';
import sgs2bhk2 from '../assets/shree-ganesh-srushti/gallery/2bhk (2).jpg';
import ProjectTemplate from '../components/ProjectTemplate';
import { FaCar, FaSun, FaBuilding, FaShieldAlt, FaWater, FaTint } from 'react-icons/fa';
import { MdMeetingRoom } from 'react-icons/md';
import { BiCctv, BiSolidHomeHeart } from 'react-icons/bi';

const ShreeGaneshSrushti = () => {
  const projectData = {
    projectName: "Shree Ganesh Srushti",
    tagline: "THE NEW LANGUAGE OF LIVING",
    heroSubtitle: "1, 2 & 3 BHK happy homes & shops",
    description: `Experience an elevated lifestyle of sophistication at Shree Ganesh Srushti, where every aspect is meticulously designed. 1 BHK 'Happy Homes' crafted to enhance your everyday living. These residences offer the perfect integration of luxury and functionality, delivering a modern living experience that seamlessly blends convenience, comfort, and innovation. Located at Sr no 94/1 plot 16/17 gavlane road, Pathardi Shivar, Nashik - 422010, our project provides unmatched connectivity to essential services and amenities. With schools, shopping centers, healthcare facilities, and recreational options all within close proximity, residents enjoy a seamless, well-rounded living experience.`,
    stats: [
      { title: "1, 2 & 3 BHK", subtitle: "Happy Homes & Shops" },
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
    images: ['/assets/shree-ganesh-srushti/gallery/SGS_Hero.png'], // Only hero image
    galleryImages: [sgsFront, sgsNight, '/assets/shree-ganesh-srushti/gallery/IMG-20251112-WA0038.jpg'], // Only these 3 images in gallery
    brochurePath: "/assets/shree-ganesh-srushti/gallery/Shree Ganesh Srushti Digital Broucher_compressed.pdf",
    reraNumber: "PM1220002501249",
    reraQr: "/assets/shree-ganesh-srushti/gallery/Rera_QR.png",
    layoutVariant: 'ongoing',
    configuration: "1BHK, 2BHK",
    location: "Nashik",
    progressStage: 2,
    locationChips: ["Temple 8 min", "Hospital 12 min", "Market 7 min"],
    floorPlans: [
      { label: "1BHK - Type A", src: sgs1bhk },
      { label: "1BHK - Type B", src: sgs1bhk2 },
      { label: "2BHK", src: sgs2bhk },
      { label: "3BHK", src: sgs2bhk2 }
    ],
    downloads: [
      { label: "Project Brochure", href: "/assets/shree-ganesh-srushti/gallery/Shree Ganesh Srushti Digital Broucher_compressed.pdf" }
    ],
    advantages: ["New Development", "Secure Campus", "Modern Elevation", "Efficient Plans", "Green Views", "Parking"],
    testimonials: [],
    cost: { base: "On Request", taxes: "As applicable", maintenance: "TBD" },
    timeline: [
      { label: "Launch", caption: "Project unveiled", image: sgsFront },
      { label: "Foundation", caption: "Excavation done", image: sgs1bhk },
      { label: "Structure", caption: "Structure progress", image: sgs2bhk },
      { label: "Finishing", caption: "Interior finishing", image: sgsFront }
    ],
    mapUrl: "https://maps.app.goo.gl/8c8b1TXW1DBwsT6w8",
    directionsUrl: "https://maps.app.goo.gl/8c8b1TXW1DBwsT6w8",
    embedMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3764.0123456789!2d73.8234!3d19.9876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdcb0e0e0e0e0e1%3A0x0!2sShree%20Ganesh%20Srushti!5e0!3m2!1sen!2sin!4v1234567890"
  };

  useEffect(() => {
    document.title = `${projectData.projectName} - Sai Prasad Group`;
  }, [projectData.projectName]);

  return <ProjectTemplate {...projectData} />;
};

export default ShreeGaneshSrushti;