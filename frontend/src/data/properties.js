const properties = [
  {
    id: 1,
    title: "Sai Shraddha Apartment",
    price: "Contact for Price",
    location: "College Road, Nashik",
    image: "/assets/sai-shraddha-apartment/gallery/front.jpg",
    images: [
      "/assets/sai-shraddha-apartment/gallery/front.jpg",
      "/assets/sai-shraddha-apartment/gallery/top-view.jpg",
      "/assets/sai-shraddha-apartment/gallery/parking.jpg",
      "/assets/sai-shraddha-apartment/gallery/floor-plan.jpg",
      "/assets/sai-shraddha-apartment/gallery/PHOTO-2023-05-31-18-16-40.jpg"
    ],
    isometricViews: [
      {
        label: "2BHK - Spacious layout with balcony",
        src: "/assets/sai-shraddha-apartment/gallery/front.jpg"
      },
      {
        label: "1BHK - Compact and efficient design",
        src: "/assets/sai-shraddha-apartment/gallery/top-view.jpg"
      }
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
    facing: "East",
    landmarks: [
      { type: "School", icon: "🏫", label: "School", distance: "5 mins" },
      { type: "Hospital", icon: "🏥", label: "Hospital", distance: "8 mins" },
      { type: "Mall", icon: "🛒", label: "Mall", distance: "10 mins" },
      { type: "Metro", icon: "🚇", label: "Metro Station", distance: "3 mins" }
    ]
  },
  {
    id: 2,
    title: "Shree Ganesh Heights",
    price: "Contact for Price",
    location: "Nashik",
    image: "/assets/shree-ganesh-heights/gallery/front.jpeg",
    images: [
      "/assets/shree-ganesh-heights/gallery/front.jpeg",
      "/assets/shree-ganesh-heights/gallery/day-front.jpg",
      "/assets/shree-ganesh-heights/gallery/night-front.jpg",
      "/assets/shree-ganesh-heights/gallery/top-view.jpg",
      "/assets/shree-ganesh-heights/gallery/floor-plan.jpeg"
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
    id: 3,
    title: "Shree Ganesh Park",
    price: "Contact for Price",
    location: "Nashik",
    image: "/assets/shree-ganesh-park/gallery/a-view.jpg",
    images: [
      "/assets/shree-ganesh-park/gallery/a-view.jpg",
      "/assets/shree-ganesh-park/gallery/b-view.jpg",
      "/assets/shree-ganesh-park/gallery/night-view-a.jpg",
      "/assets/shree-ganesh-park/gallery/ter-view.jpg",
      "/assets/shree-ganesh-park/gallery/Wing A 1BHK.jpg",
      "/assets/shree-ganesh-park/gallery/Wing A 2BHK.jpg",
      "/assets/shree-ganesh-park/gallery/Wing C 1BHK.jpg",
      "/assets/shree-ganesh-park/gallery/Wing C 2BHK.jpg"
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
    id: 4,
    title: "Shreeganesh Srushti",
    price: "Contact for Price",
    location: "Nashik",
    image: "/assets/shree-ganesh-srushti/gallery/front.jpg",
    images: [
      "/assets/shree-ganesh-srushti/gallery/front.jpg",
      "/assets/shree-ganesh-srushti/gallery/night.jpg",
      "/assets/shree-ganesh-srushti/gallery/1bhk.jpg",
      "/assets/shree-ganesh-srushti/gallery/1bhk (2).jpg",
      "/assets/shree-ganesh-srushti/gallery/2bhk.jpg",
      "/assets/shree-ganesh-srushti/gallery/2bhk (2).jpg"
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
    id: 5,
    title: "Vinayak Apartment",
    price: "Contact for Price",
    location: "Pathardi Shivar, Nashik",
    image: "/assets/vinayak-apartment/gallery/1.jpg",
    images: [
      "/assets/vinayak-apartment/gallery/1.jpg",
      "/assets/vinayak-apartment/gallery/2.jpg",
      "/assets/vinayak-apartment/gallery/3.jpg",
      "/assets/vinayak-apartment/gallery/4.jpg",
      "/assets/vinayak-apartment/gallery/5.jpg"
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

export default properties;

export const sampleProperties = [
  {
    id: 1,
    title: "Luxury Apartment in Mumbai",
    price: 25000000,
    location: "Bandra, Mumbai",
    coordinates: [19.0606, 72.8365],
    type: "apartment",
    status: "sale",
    bedrooms: 3,
    bathrooms: 3,
    area: 1800,
    parking: 2,
    rating: 4.8,
    reviews: 124,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Stunning luxury apartment in the heart of Mumbai with sea view."
  },
  {
    id: 2,
    title: "Modern Villa in Pune",
    price: 18000000,
    location: "Koregaon Park, Pune",
    coordinates: [18.5362, 73.8937],
    type: "villa",
    status: "sale",
    bedrooms: 4,
    bathrooms: 4,
    area: 3200,
    parking: 3,
    rating: 4.9,
    reviews: 89,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Spacious villa with private garden in Pune's prime location."
  },
  {
    id: 3,
    title: "Premium Flat in Nashik",
    price: 9500000,
    location: "Gangapur Road, Nashik",
    coordinates: [20.0110, 73.7903],
    type: "apartment",
    status: "sale",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    parking: 1,
    rating: 4.7,
    reviews: 156,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Beautiful flat with all amenities near Someshwar Temple."
  },
  {
    id: 4,
    title: "Urban Home in Delhi",
    price: 22000000,
    location: "South Extension, Delhi",
    coordinates: [28.5733, 77.2197],
    type: "house",
    status: "sale",
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    parking: 2,
    rating: 4.6,
    reviews: 67,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Modern home in South Delhi with easy metro access."
  }
]; 