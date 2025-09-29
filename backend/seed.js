const mongoose = require('mongoose');
const Property = require('./models/Property');
require('dotenv').config();

const sampleProperties = [
  {
    title: "Sai Shraddha Apartment",
    description: "A beautifully designed residential complex offering comfortable living with all modern amenities and excellent connectivity.",
    price: 0, // Contact for Price
    location: "College Road, Nashik",
    image: "/assets/sai-shraddha-apartment/gallery/front.jpg",
    images: [
      "/assets/sai-shraddha-apartment/gallery/front.jpg",
      "/assets/sai-shraddha-apartment/gallery/top-view.jpg",
      "/assets/sai-shraddha-apartment/gallery/parking.jpg"
    ],
    bedrooms: 2,
    bathrooms: 2,
    area: "1.8 Acres",
    lat: 20.0110,
    lng: 73.7903,
    amenities: ["Parking", "Garden", "Security", "Power Backup", "Water Supply", "Maintenance"],
    type: "Apartment",
    yearBuilt: 2024,
    furnishing: "Semi-furnished",
    floor: null,
    totalFloors: null,
    facing: "East"
  },
  {
    title: "Shree Ganesh Heights",
    description: "Premium residential development with modern amenities and excellent location advantages.",
    price: 0, // Contact for Price
    location: "Nashik",
    image: "/assets/shree-ganesh-heights/gallery/front.jpeg",
    images: [
      "/assets/shree-ganesh-heights/gallery/front.jpeg",
      "/assets/shree-ganesh-heights/gallery/day-front.jpg",
      "/assets/shree-ganesh-heights/gallery/night-front.jpg"
    ],
    bedrooms: 3,
    bathrooms: 3,
    area: "2.5 Acres",
    lat: 20.0110,
    lng: 73.7903,
    amenities: ["Security", "Parking", "Power Backup", "Water Supply", "Maintenance", "Garden"],
    type: "Apartment",
    yearBuilt: 2024,
    furnishing: "Semi-furnished",
    floor: null,
    totalFloors: null,
    facing: "North"
  },
  {
    title: "Shree Ganesh Park",
    description: "A premium residential development with multiple wings offering various apartment configurations.",
    price: 0, // Contact for Price
    location: "Nashik",
    image: "/assets/shree-ganesh-park/gallery/a-view.jpg",
    images: [
      "/assets/shree-ganesh-park/gallery/a-view.jpg",
      "/assets/shree-ganesh-park/gallery/b-view.jpg",
      "/assets/shree-ganesh-park/gallery/night-view-a.jpg"
    ],
    bedrooms: 2,
    bathrooms: 2,
    area: "3.0 Acres",
    lat: 20.0110,
    lng: 73.7903,
    amenities: ["Garden", "Security", "Parking", "Power Backup", "Water Supply", "Maintenance", "Club House"],
    type: "Apartment",
    yearBuilt: 2024,
    furnishing: "Semi-furnished",
    floor: null,
    totalFloors: null,
    facing: "East"
  },
  {
    title: "Shreeganesh Srushti",
    description: "Latest residential development with contemporary design and all modern facilities.",
    price: 0, // Contact for Price
    location: "Nashik",
    image: "/assets/shree-ganesh-srushti/gallery/front.jpg",
    images: [
      "/assets/shree-ganesh-srushti/gallery/front.jpg",
      "/assets/shree-ganesh-srushti/gallery/night.jpg",
      "/assets/shree-ganesh-srushti/gallery/1bhk.jpg"
    ],
    bedrooms: 3,
    bathrooms: 3,
    area: "2.0 Acres",
    lat: 20.0110,
    lng: 73.7903,
    amenities: ["Security", "Parking", "Power Backup", "Water Supply", "Maintenance", "Garden", "Gym"],
    type: "Apartment",
    yearBuilt: 2025,
    furnishing: "Semi-furnished",
    floor: null,
    totalFloors: null,
    facing: "South"
  },
  {
    title: "Vinayak Apartment",
    description: "Experience an elevated lifestyle of sophistication with 1 BHK Happy Homes crafted to enhance your everyday living.",
    price: 0, // Contact for Price
    location: "Pathardi Shivar, Nashik",
    image: "/assets/vinayak-apartment/gallery/1.jpg",
    images: [
      "/assets/vinayak-apartment/gallery/1.jpg",
      "/assets/vinayak-apartment/gallery/2.jpg",
      "/assets/vinayak-apartment/gallery/3.jpg"
    ],
    bedrooms: 1,
    bathrooms: 1,
    area: "0.5 Acres",
    lat: 20.0110,
    lng: 73.7903,
    amenities: ["CCTV", "Solar Power", "Safety Gate", "Multipurpose Hall", "Auto Door Lift", "Battery Backup", "Smart Automation", "Water Supply", "Parking Space"],
    type: "Apartment",
    yearBuilt: 2023,
    furnishing: "Semi-furnished",
    floor: null,
    totalFloors: null,
    facing: "East"
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await Property.deleteMany({});
    await Property.insertMany(sampleProperties);
    console.log('Database seeded!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed(); 