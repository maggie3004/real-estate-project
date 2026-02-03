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

    images: ['/assets/shree-ganesh-srushti/gallery/heroweb.webp'],
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

    virtualTours: [
      {
        label: "2 BHK Diamond",
        url: "https://therealtylens.com/tours/diamond_2bhk/",
        thumbnail: "https://therealtylens.com/tours/diamond_2bhk/media/panorama_E3BA5A38_C186_E10F_41B7_9C80CF997938_0/f/1/0_0.webp"
      }
    ],


    downloads: [
      {
        label: "Project Brochure",
        href: "/assets/shree-ganesh-srushti/gallery/Shree Ganesh Srushti Digital Broucher_compressed.pdf"
      }
    ],

    mapUrl: "https://maps.app.goo.gl/Unszx1rJLL22QM1h7",
    directionsUrl: "https://maps.app.goo.gl/Unszx1rJLL22QM1h7",
    mapEmbed: '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1008.8516266726913!2d73.71860950599066!3d19.97560052363185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1767520999127!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',

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
    },
    legalEntity: "Shree Ganesh Srushti - Project by JYK Nirmiti Infra LLP"
  };

  useEffect(() => {
    document.title = `${projectData.projectName} - Sai Prasad Group`;
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [projectData.projectName]);

  return (
    <>
      <style>{`
        /* Custom background overrides for Shree Ganesh Srushti only */
        #section-virtualtour {
          background-color: rgb(255 251 235) !important; /* amber-50 */
        }
        .dark #section-virtualtour {
          background-color: rgba(69, 26, 3, 0.2) !important; /* amber-950/20 */
        }
        
        /* Amenities - White */
        #section-virtualtour + section {
          background-color: white !important;
        }
        .dark #section-virtualtour + section {
          background-color: rgba(0, 0, 0, 0.5) !important;
        }
        
        /* Gallery - White */
        #section-gallery {
          background-color: white !important;
        }
        .dark #section-gallery {
          background-color: rgba(0, 0, 0, 0.5) !important;
        }
        
        /* Connectivity - Amber */
        #section-connectivity {
          background-color: rgb(255 251 235) !important; /* amber-50 */
        }
        .dark #section-connectivity {
          background-color: rgba(69, 26, 3, 0.2) !important; /* amber-950/20 */
        }
        
        /* Location - Amber */
        #section-location {
          background-color: rgb(255 251 235) !important; /* amber-50 */
        }
        .dark #section-location {
          background-color: rgba(69, 26, 3, 0.2) !important; /* amber-950/20 */
        }
      `}</style>
      <ProjectTemplate {...projectData} />
    </>
  );
};

export default ShreeGaneshSrushti;
