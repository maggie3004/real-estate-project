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

import {
  FaSolarPanel,
  FaGlassCheers,
  FaRoad,
  FaBuilding,
  FaHospital,
  FaShoppingBag
} from 'react-icons/fa';
import { MdMeetingRoom, MdSelfImprovement, MdElevator } from 'react-icons/md';
import { BiCctv } from 'react-icons/bi';
import { GiWaterDrop } from 'react-icons/gi';

const ShreeGaneshParkPhaseI = () => {
  const projectData = {
    projectName: "Shree Ganesh Park",
    tagline: "RISE TO NEW WAY OF LIVING",
    heroSubtitle: "1 & 2 BHK Luxury Homes & Shops",
    description: `Discover modern living at Shree Ganesh Park, featuring thoughtfully planned 1 & 2 BHK residences designed for contemporary families. With premium amenities, strategic location, and exceptional connectivity, these homes offer the perfect blend of comfort and convenience. Experience a vibrant community where every detail is crafted to elevate your lifestyle.`,
    stats: [
      { title: "1 BHK", subtitle: "Happy Homes" },
      { title: "G+7", subtitle: "Structure" },
      { title: "8+", subtitle: "Facilities" },
      { title: "Premium", subtitle: "Location" }
    ],
    amenities: [
      { icon: <MdMeetingRoom />, name: "Multipurpose Hall" },
      { icon: <FaSolarPanel />, name: "Roof Top Solar for Common Areas" },
      { icon: <MdSelfImprovement />, name: "Open Sky Yoga Space" },
      { icon: <FaGlassCheers />, name: "Party Area" },
      { icon: <MdElevator />, name: "Branded Lift & Battery Backup" },
      { icon: <BiCctv />, name: "CCTV" },
      { icon: <GiWaterDrop />, name: "Rainwater Harvesting" }
    ],
    images: ['/assets/shree-ganesh-park/gallery/hero.png'],
    galleryImages: [sgpAView, sgpBView, sgpNightA],
    brochurePath: sgpBrochure,
    reraNumber: "P51600051448",
    reraQr: "/assets/shree-ganesh-park/gallery/Rera_QR.png",
    reraUrl: "https://maharerait.mahaonline.gov.in/ProjectSummaryView/ProjectSummaryQRCodeView?id=Q2VydGlmaWNhdGVObz1QNTE2MDAwNTE0NDgmU2NhbnR5cGU9UmVnaXN0cmF0aW9uQ2VydGlmaWNhdGVRUlNjYW4=",
    layoutVariant: 'ongoing',
    configuration: "1BHK, 2BHK",
    location: "Nashik",
    progressStage: 1,
    locationChips: ["Railway 15 min", "Hospital 10 min", "School 6 min"],
    floorPlans: [
      { label: "Wing A & B 1 BHK", src: sgpWingA1BHK },
      { label: "Wing C 1 BHK", src: sgpWingC1BHK },
      { label: "Wing A & B 2 BHK", src: sgpWingA2BHK },
      { label: "Wing C 2 BHK", src: sgpWingC2BHK }
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
    directionsUrl: "https://maps.app.goo.gl/6X9DkrFsd58nzQFT9",


    connectivityData: {
      description: [
        "Strategically located near <strong>Datta Mandir Chowk</strong>, offering excellent connectivity.",
        "Quick access to <strong>Trimbakeshwar Road</strong> ensuring smooth travel to key city areas.",
        "Well-connected location leading to nearby residential and commercial hubs."
      ],
      points: [
        { label: "Bus Stop & CBS", time: "3 mins / 13 mins", icon: FaRoad },
        { label: "Satpur Ambad MIDC", time: "6 mins", icon: FaBuilding },
        { label: "Market", time: "5 mins", icon: FaShoppingBag },
        { label: "Trimbak & Mumbai Highway", time: "7 mins", icon: FaRoad },
        { label: "Hospitals & Schools", time: "6 mins", icon: FaHospital },
        { label: "City Centre Mall", time: "10 mins", icon: FaShoppingBag }
      ]
    }
  };

  useEffect(() => {
    document.title = `${projectData.projectName} - Sai Prasad Group`;
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [projectData.projectName]);

  return <ProjectTemplate {...projectData} />;
};

export default ShreeGaneshParkPhaseI;
