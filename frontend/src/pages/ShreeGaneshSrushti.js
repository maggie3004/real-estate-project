import React, { useEffect } from 'react';
import sgsFront from '../assets/shree-ganesh-srushti/gallery/front.jpg';
import sgsNight from '../assets/shree-ganesh-srushti/gallery/night.jpg';
import ProjectTemplate from '../components/ProjectTemplate';
import { FaSolarPanel, FaChargingStation, FaBatteryFull, FaBook, FaRobot } from 'react-icons/fa';
import { MdMeetingRoom, MdSelfImprovement } from 'react-icons/md';
import { BiCctv } from 'react-icons/bi';
import { GiWaterDrop } from 'react-icons/gi';

const ShreeGaneshSrushti = () => {
  const projectData = {
    projectName: "Shree Ganesh Srushti",
    tagline: "THE NEW LANGUAGE OF LIVING",
    heroSubtitle: "1, 2 & 3 BHK happy homes & shops",
    description: `Thoughtfully designed towers ensure ample light, ventilation, and scenic views — creating a lifestyle of comfort, convenience, and class. A prestigious address you'll be proud to call home.`,
    stats: [
      { title: "1, 2 & 3 BHK", subtitle: "Happy Homes & Shops" },
      { title: "G+7", subtitle: "Structure" },
      { title: "8+", subtitle: "Facilities" },
      { title: "Premium", subtitle: "Location" }
    ],
    amenities: [
      { icon: <FaSolarPanel />, name: "Solar for Common Electricity" },
      { icon: <FaChargingStation />, name: "EV Charging Station" },
      { icon: <BiCctv />, name: "CCTV" },
      { icon: <FaBatteryFull />, name: "Battery Backup for Lift" },
      { icon: <MdSelfImprovement />, name: "Yoga Space on Rooftop" },
      { icon: <FaBook />, name: "Library" },
      { icon: <MdMeetingRoom />, name: "Multipurpose Hall" },
      { icon: <FaRobot />, name: "Automation in Common Area" },
      { icon: <GiWaterDrop />, name: "Rainwater Harvesting" }
    ],
    images: ['/assets/shree-ganesh-srushti/gallery/hero.png'], // Only hero image
    galleryImages: [sgsFront, sgsNight, '/assets/shree-ganesh-srushti/gallery/IMG-20251112-WA0038.jpg'], // Only these 3 images in gallery
    brochurePath: "/assets/shree-ganesh-srushti/gallery/Shree Ganesh Srushti Digital Broucher_compressed.pdf",
    reraNumber: "PM1220002501249",
    reraQr: "/assets/shree-ganesh-srushti/gallery/Rera_QR.png",
    reraUrl: "https://maharerait.maharashtra.gov.in/project/view/59690",
    layoutVariant: 'ongoing',
    configuration: "1BHK, 2BHK",
    location: "Nashik",
    progressStage: 2,
    locationChips: ["Temple 8 min", "Hospital 12 min", "Market 7 min"],
    floorPlans: [
      { label: "1 BHK Gold", src: "/assets/shree-ganesh-srushti/gallery/1bhk-gold.png" },
      { label: "1 BHK Platinum", src: "/assets/shree-ganesh-srushti/gallery/1bhk-platinum.png" },
      { label: "2 BHK Diamond", src: "/assets/shree-ganesh-srushti/gallery/2bhk-diamond.png" }
    ],
    downloads: [
      { label: "Project Brochure", href: "/assets/shree-ganesh-srushti/gallery/Shree Ganesh Srushti Digital Broucher_compressed.pdf" }
    ],
    advantages: ["New Development", "Secure Campus", "Modern Elevation", "Efficient Plans", "Green Views", "Parking"],
    testimonials: [],
    cost: { base: "On Request", taxes: "As applicable", maintenance: "TBD" },
    timeline: [
      { label: "Launch", caption: "Project unveiled", image: sgsFront },
      { label: "Foundation", caption: "Excavation done", image: sgsNight },
      { label: "Structure", caption: "Structure progress", image: sgsFront },
      { label: "Finishing", caption: "Interior finishing", image: sgsNight }
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