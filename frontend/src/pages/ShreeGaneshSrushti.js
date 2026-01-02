import React, { useEffect } from 'react';
import sgsFront from '../assets/shree-ganesh-srushti/gallery/front.jpg';
import sgsNight from '../assets/shree-ganesh-srushti/gallery/night.jpg';
import ProjectTemplate from '../components/ProjectTemplate';

// Amenities Icons
import {
  FaSolarPanel,
  FaChargingStation,
  FaBatteryFull,
  FaBook,
  FaRobot,
  FaRoad,
  FaStore,
  FaHospital,
  FaShoppingBag
} from 'react-icons/fa';

import { MdMeetingRoom, MdSelfImprovement } from 'react-icons/md';
import { BiCctv } from 'react-icons/bi';
import { GiWaterDrop } from 'react-icons/gi';
import { FaBuilding } from 'react-icons/fa';

const ShreeGaneshSrushti = () => {
  const projectData = {
    projectName: "Shree Ganesh Srushti",
    tagline: "THE NEW LANGUAGE OF LIVING",
    heroSubtitle: "1, 2 & 3 BHK happy homes & shops",

    description:
      "Thoughtfully designed towers ensure ample light, ventilation, and scenic views — creating a lifestyle of comfort, convenience, and class. A prestigious address you'll be proud to call home.",

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

    images: ['/assets/shree-ganesh-srushti/gallery/hero.png'],
    galleryImages: [
      sgsFront,
      sgsNight,
      '/assets/shree-ganesh-srushti/gallery/IMG-20251112-WA0038.jpg'
    ],

    brochurePath:
      "/assets/shree-ganesh-srushti/gallery/Shree Ganesh Srushti Digital Broucher_compressed.pdf",

    reraNumber: "PM1220002501249",
    reraQr: "/assets/shree-ganesh-srushti/gallery/Rera_QR.png",
    reraUrl: "https://maharerait.maharashtra.gov.in/project/view/59690",

    layoutVariant: "ongoing",
    configuration: "1BHK, 2BHK",
    location: "Nashik",

    floorPlans: [
      { label: "1 BHK Gold", src: "/assets/shree-ganesh-srushti/gallery/1bhk-gold.png" },
      { label: "1 BHK Platinum", src: "/assets/shree-ganesh-srushti/gallery/1bhk-platinum.png" },
      { label: "2 BHK Diamond", src: "/assets/shree-ganesh-srushti/gallery/2bhk-diamond.png" }
    ],

    downloads: [
      {
        label: "Project Brochure",
        href: "/assets/shree-ganesh-srushti/gallery/Shree Ganesh Srushti Digital Broucher_compressed.pdf"
      }
    ],

    mapUrl: "https://maps.app.goo.gl/8c8b1TXW1DBwsT6w8",
    directionsUrl: "https://maps.app.goo.gl/8c8b1TXW1DBwsT6w8",

    // 🔥 CONNECTIVITY (MATCHES BROCHURE IMAGE)
    connectivityData: {
      description: [
        "Strategically located near <strong>Datta Mandir Chowk</strong>, offering excellent connectivity.",
        "Quick access to <strong>Trimbakeshwar Road</strong> ensuring smooth travel to key city areas.",
        "Well-connected location leading to nearby residential and commercial hubs."
      ],
      points: [
        {
          label: "Bus Stop & CBS",
          time: "3 mins / 13 mins",
          icon: FaRoad
        },
        {
          label: "Satpur Ambad MIDC",
          time: "6 mins",
          icon: FaBuilding
        },
        {
          label: "Market",
          time: "5 mins",
          icon: FaStore
        },
        {
          label: "Trimbak & Mumbai Highway",
          time: "7 mins",
          icon: FaRoad
        },
        {
          label: "Hospitals & Schools",
          time: "6 mins",
          icon: FaHospital
        },
        {
          label: "City Centre Mall",
          time: "10 mins",
          icon: FaShoppingBag
        }
      ]
    }
  };

  useEffect(() => {
    document.title = `${projectData.projectName} - Sai Prasad Group`;
  }, [projectData.projectName]);

  return <ProjectTemplate {...projectData} />;
};

export default ShreeGaneshSrushti;
