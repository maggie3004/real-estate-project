const properties = [
  {
    id: 1,
    title: "2BHK in Mumbai",
    price: "₹75 Lakhs",
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
    title: "3BHK in Bangalore",
    price: "₹1.2 Cr",
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
  },
  {
    id: 5,
    title: "Sai Shraddha Apartment",
    price: "Contact for Price",
    location: "Sai Shraddha Apartment, [Add Address]",
    image: "/sai-shraddha-apartment/IMG-20250722-WA0066.jpg",
    images: [
      "/sai-shraddha-apartment/IMG-20250722-WA0066.jpg",
      "/sai-shraddha-apartment/IMG-20250722-WA0067.jpg",
      "/sai-shraddha-apartment/IMG-20250722-WA0068.jpg",
      "/sai-shraddha-apartment/IMG-20250722-WA0069.jpg",
      "/sai-shraddha-apartment/IMG-20250722-WA0070.jpg",
      "/sai-shraddha-apartment/IMG-20250722-WA0071.jpg",
      "/sai-shraddha-apartment/IMG-20250722-WA0072.jpg"
    ],
    isometricViews: [
      {
        label: "2BHK - Spacious layout with balcony",
        src: "/sai-shraddha-apartment/IMG-20250722-WA0066.jpg"
      },
      {
        label: "1BHK - Compact and efficient design",
        src: "/sai-shraddha-apartment/IMG-20250722-WA0067.jpg"
      }
    ],
    bedrooms: 2,
    bathrooms: 2,
    area: "[Add Area]",
    lat: null,
    lng: null,
    amenities: ["Parking", "Garden", "Security"],
    type: "Apartment",
    yearBuilt: null,
    furnishing: "[Add Furnishing]",
    floor: null,
    totalFloors: null,
    facing: "[Add Facing]",
    landmarks: [
      { type: "School", icon: "🏫", label: "School", distance: "5 mins" },
      { type: "Hospital", icon: "🏥", label: "Hospital", distance: "8 mins" },
      { type: "Mall", icon: "🛒", label: "Mall", distance: "10 mins" },
      { type: "Metro", icon: "🚇", label: "Metro Station", distance: "3 mins" }
    ]
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