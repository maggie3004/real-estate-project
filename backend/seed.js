const mongoose = require('mongoose');
const Property = require('./models/Property');
require('dotenv').config();

const sampleProperties = [
  {
    title: "2BHK in Mumbai",
    description: "Spacious 2BHK apartment in the heart of Andheri West, close to all amenities.",
    price: 7500000,
    location: "Andheri West, Mumbai",
    image: "https://via.placeholder.com/400x250",
    images: [
      "https://via.placeholder.com/400x250?text=Living+Room",
      "https://via.placeholder.com/400x250?text=Bedroom",
      "https://via.placeholder.com/400x250?text=Kitchen"
    ],
    bedrooms: 2,
    bathrooms: 2,
    area: "1200 sqft",
    lat: 19.1344,
    lng: 72.8296,
    amenities: ["Parking", "Swimming Pool", "Gym", "24x7 Security", "Power Backup"],
    type: "Apartment",
    yearBuilt: 2018,
    furnishing: "Furnished",
    floor: 5,
    totalFloors: 12,
    facing: "East"
  },
  {
    title: "3BHK in Bangalore",
    description: "Luxurious 3BHK villa with a private garden and modern amenities in Whitefield.",
    price: 12000000,
    location: "Whitefield, Bangalore",
    image: "https://via.placeholder.com/400x250",
    images: [
      "https://via.placeholder.com/400x250?text=Front+View",
      "https://via.placeholder.com/400x250?text=Master+Bedroom",
      "https://via.placeholder.com/400x250?text=Balcony"
    ],
    bedrooms: 3,
    bathrooms: 3,
    area: "1800 sqft",
    lat: 12.9698,
    lng: 77.7499,
    amenities: ["Parking", "Children's Play Area", "Club House", "Garden", "CCTV"],
    type: "Villa",
    yearBuilt: 2015,
    furnishing: "Semi-furnished",
    floor: 1,
    totalFloors: 2,
    facing: "West"
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