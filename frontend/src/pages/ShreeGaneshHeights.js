import React, { useEffect } from 'react';
import sghDayFront from '../assets/shree-ganesh-heights/gallery/day-front.jpg';
import sghNightFront from '../assets/shree-ganesh-heights/gallery/night-front.jpg';
import sghTopView from '../assets/shree-ganesh-heights/gallery/top-view.jpg';
import sghBrochure from '../assets/shree-ganesh-heights/Shri Ganesh Heights.pdf';
import ProjectTemplate from '../components/ProjectTemplate';
import { FaSolarPanel, FaCar, FaBatteryFull } from 'react-icons/fa';
import { MdMeetingRoom, MdElevator } from 'react-icons/md';
import { BiCctv } from 'react-icons/bi';
import { GiWaterDrop } from 'react-icons/gi';
import { FaTint } from 'react-icons/fa';
import {
  FaGraduationCap, FaStore, FaHotel, FaRoad,
  FaShoppingBag, FaIndustry
} from 'react-icons/fa';

const ShreeGaneshHeights = () => {
  const projectData = {
    projectName: "Shree Ganesh Heights",
    tagline: "EXPERIENCE ESSENCE OF ELEVATED LIVING",
    heroSubtitle: "Exclusive 1 BHK Happy Homes",
    description: "Experience an elevated lifestyle of sophistication and comfort at Shree Ganesh Heights, where every aspect of our meticulously designed 1 BHK 'Happy Homes' is crafted to enhance your everyday living. These residences offer the perfect integration of luxury and functionality, delivering a modern living experience that seamlessly blends convenience, comfort, and affordability.",
    stats: [
      { title: "1 BHK", subtitle: "Happy Homes" },
      { title: "G+7", subtitle: "Structure" },
      { title: "8+", subtitle: "Facilities" },
      { title: "Premium", subtitle: "Location" }
    ],
    amenities: [
      { icon: <BiCctv />, name: "CCTV" },
      { icon: <FaSolarPanel />, name: "Solar for Common Electricity" },
      { icon: <MdMeetingRoom />, name: "Multipurpose Hall" },
      { icon: <MdElevator />, name: "Auto Door Lift" },
      { icon: <FaCar />, name: "Common Parking Space" },
      { icon: <FaTint />, name: "NMC & Borewell Water Supply" },
      { icon: <FaBatteryFull />, name: "Battery Backup" },
      { icon: <GiWaterDrop />, name: "Rainwater Harvesting" }
    ],
    images: ['/assets/shree-ganesh-heights/gallery/herowp.webp'], // Only hero image
    galleryImages: [
      '/assets/shree-ganesh-heights/gallery/gallery-1.jpeg',
      '/assets/shree-ganesh-heights/gallery/gallery-2.jpeg',
      '/assets/shree-ganesh-heights/gallery/gallery-video.mp4'
    ], // Gallery images with video
    brochurePath: sghBrochure,
    reraNumber: "P51600077829",
    reraQr: "/assets/shree-ganesh-heights/gallery/Rera_QR.png",
    reraUrl: "https://maharerait.mahaonline.gov.in/ProjectSummaryView/ProjectSummaryQRCodeView?id=Q2VydGlmaWNhdGVObz1QNTE2MDAwNzc4MjkmU2NhbnR5cGU9UmVnaXN0cmF0aW9uQ2VydGlmaWNhdGVRUlNjYW4=",
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
      { label: "Project Brochure", href: sghBrochure }
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
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15002.770544410341!2d73.76226705725301!3d19.937353135038755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdd94b956e6b583%3A0x79a966a73cb5dbbd!2sPathardi-Gaulane%20Rd%2C%20Pathardi%20Gaon%2C%20Pathardi%20Phata%2C%20Nashik%2C%20Maharashtra%20422010!5e0!3m2!1sen!2sin!4v1767294657970!5m2!1sen!2sin",
    directionsUrl: "https://www.google.com/maps/place/Pathardi-Gaulane+Rd,+Pathardi+Gaon,+Pathardi+Phata,+Nashik,+Maharashtra+422010/@19.9359159,73.7657432,17z/data=!3m1!4b1!4m6!3m5!1s0x3bdd94b956e6b583:0x79a966a73cb5dbbd!8m2!3d19.9359159!4d73.7657432!16s%2Fg%2F11c2v5y9_w",
    connectivityData: {
      description: [
        "Strategically situated on <strong>Gaulane Road</strong> with amazing connectivity to the <strong>Mumbai-Agra National Highway</strong>.",
        "Walking distance from <strong>Pathardi's booming commercial hub</strong>, featuring all national and international brand outlets."
      ],
      points: [
        { label: "International Schools & Colleges", time: "5 mins", icon: FaGraduationCap },
        { label: "Commercial Market", time: "5 mins", icon: FaShoppingBag },
        { label: "Mumbai-Agra National Highway", time: "3 mins", icon: FaRoad },
        { label: "D-Mart", time: "5 mins", icon: FaStore },
        { label: "Business Hotels", time: "4 mins", icon: FaHotel },
        { label: "Ambad MIDC", time: "10 mins", icon: FaIndustry },
      ],
    },
    legalEntity: "Shree Ganesh Heights - Project by Sai Prasad Builders & Developers"
  };

  useEffect(() => {
    // Update document title
    document.title = `${projectData.projectName} - Sai Prasad Group`;
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [projectData.projectName]);

  return <ProjectTemplate {...projectData} />;
};

export default ShreeGaneshHeights;