import { useState } from "react";
import Navbarx from "../../components/Navbarx";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import MapSection from "./MapSection";
import SearchBar from "./SearchBar";
import PropertyList from "./PropertyList";

// Sample property data
const sampleProperties = [
  {
    id: 1,
    title: "Luxury Apartment",
    location: "Bangkok, Thailand",
    price: "$918,000",
    beds: 2,
    baths: 2,
    area: "78 m²",
    image: "/images/Bangna.jpeg",
    amenities: ["Pool", "Gym", "Garden"],
    owner: { name: "John Doe", profile: "/images/investor.avif" },
    category: "Apartment",
  },
  {
    id: 2,
    title: "Villa with Sea View",
    location: "Pattaya, Thailand",
    price: "$1,200,000",
    beds: 4,
    baths: 3,
    area: "350 m²",
    image: "/images/chiangmai.jpeg",
    amenities: ["Pool", "Parking", "Garden"],
    owner: { name: "Jane Smith", profile: "/images/investor.avif" },
    category: "Villa",
  },
  {
    id: 3,
    title: "Modern Condo",
    location: "Singapore",
    price: "$700,000",
    beds: 3,
    baths: 2,
    area: "120 m²",
    image: "/images/banner.jpeg",
    amenities: ["Gym", "Security", "Parking"],
    owner: { name: "Alex Lee", profile: "/images/investor1.avif" },
    category: "Condo",
  },
  {
    id: 4,
    title: "Cozy House",
    location: "Jakarta, Indonesia",
    price: "$550,000",
    beds: 3,
    baths: 2,
    area: "150 m²",
    image: "/images/property1.jpeg",
    amenities: ["Garden", "Parking", "Security"],
    owner: { name: "Emma Watson", profile: "/images/investor1.avif" },
    category: "House",
  },
  {
    id: 5,
    title: "Land Plot",
    location: "Phuket, Thailand",
    price: "$300,000",
    beds: 0,
    baths: 0,
    area: "500 m²",
    image: "/images/property2.jpeg",
    amenities: [],
    owner: { name: "Michael Scott", profile: "/images/investor.avif" },
    category: "Land",
  },
  {
    id: 6,
    title: "Commercial Property",
    location: "Bangkok, Thailand",
    price: "$1,500,000",
    beds: 0,
    baths: 2,
    area: "400 m²",
    image: "/images/property3.jpeg",
    amenities: ["Parking", "Security"],
    owner: { name: "Sarah Connor", profile: "/images/investor1.avif" },
    category: "Commercial",
  },
  {
    id: 7,
    title: "Penthouse Apartment",
    location: "Dubai, UAE",
    price: "$2,000,000",
    beds: 5,
    baths: 4,
    area: "500 m²",
    image: "/images/property4.jpeg",
    amenities: ["Pool", "Gym", "Security"],
    owner: { name: "Tony Stark", profile: "/images/investor.avif" },
    category: "Apartment",
  },
  {
    id: 8,
    title: "Luxury Villa",
    location: "Maldives",
    price: "$3,000,000",
    beds: 6,
    baths: 5,
    area: "650 m²",
    image: "/images/property5.jpeg",
    amenities: ["Pool", "Beach Access", "Garden"],
    owner: { name: "Bruce Wayne", profile: "/images/investor1.avif" },
    category: "Villa",
  },
  {
    id: 9,
    title: "Luxury",
    location: "Bangkok, Thailand",
    price: "$918,00",
    beds: 2,
    baths: 2,
    area: "78 m²",
    image: "/images/Bangna.jpeg",
    amenities: ["Pool", "Gym", "Garden"],
    owner: { name: "John Doe", profile: "/images/investor.avif" },
    category: "Apartment",
  },
  {
    id: 10,
    title: "Villa ",
    location: "Pattaya, Thailand",
    price: "$1,20,000",
    beds: 4,
    baths: 3,
    area: "350 m²",
    image: "/images/chiangmai.jpeg",
    amenities: ["Pool", "Parking", "Garden"],
    owner: { name: "Jane Smith", profile: "/images/investor1.avif" },
    category: "Villa",
  },
  {
    id: 11,
    title: "Modern Condo",
    location: "Singapore",
    price: "$700,00",
    beds: 3,
    baths: 2,
    area: "120 m²",
    image: "/images/property1.jpeg",
    amenities: ["Gym", "Security", "Parking"],
    owner: { name: "Alex Lee", profile: "/images/investor.avif" },
    category: "Condo",
  },
  {
    id: 12,
    title: "Cozy House",
    location: "Jakarta, Indonesia",
    price: "$550,000",
    beds: 3,
    baths: 2,
    area: "150 m²",
    image: "/images/property1.jpeg",
    amenities: ["Garden", "Parking", "Security"],
    owner: { name: "Emma Watson", profile: "/images/investor1.avif" },
    category: "House",
  },
  {
    id: 13,
    title: "Land Plot",
    location: "Phuket, Thailand",
    price: "$300,000",
    beds: 0,
    baths: 0,
    area: "500 m²",
    image: "/images/property2.jpeg",
    amenities: [],
    owner: { name: "Michael Scott", profile: "/images/investor1.avif" },
    category: "Land",
  },
  {
    id: 14,
    title: "Commercial Property",
    location: "Bangkok, Thailand",
    price: "$1,500,000",
    beds: 0,
    baths: 2,
    area: "400 m²",
    image: "/images/property3.jpeg",
    amenities: ["Parking", "Security"],
    owner: { name: "Sarah Connor", profile: "/images/investor.avif" },
    category: "Commercial",
  },
];

export default function AmenitiesProperty() {
  const [activeTab, setActiveTab] = useState("View All");
  const [keyword, setKeyword] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const navigate = useNavigate();

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(3000000);
  const [minArea, setMinArea] = useState(20);
  const [maxArea, setMaxArea] = useState(700);
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [floors, setFloors] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [project, setProject] = useState("");
  const [amenities, setAmenities] = useState<string[]>([]);


  const tabs = [
    "View All",
    "Apartment",
    "Villa",
    "Condo",
    "House",
    "Land",
    "Commercial",
  ];

  // FULL FILTER LOGIC (unchanged)
  const filteredProperties = sampleProperties
    .filter((p: any) =>
      activeTab === "View All" ? true : p.category === activeTab
    )
    .filter((p: any) => {
      if (!keyword) return true;
      const k = keyword.toLowerCase();

      const combined = `${p.title} ${p.location} ${p.category} ${
        p.owner.name
      } ${p.price} ${p.area} ${p.amenities.join(" ")}`.toLowerCase();

      return combined.includes(k);
    })
    .filter((p: any) =>
      locationFilter
        ? p.location.toLowerCase().includes(locationFilter.toLowerCase())
        : true
    )
    .filter((p: any) => (categoryFilter ? p.category === categoryFilter : true))
    .filter((p: any) => {
      const priceNum = Number(p.price.replace(/[^0-9]/g, ""));
      return priceNum >= minPrice && priceNum <= maxPrice;
    })
    .filter((p: any) => {
      const areaNum = Number(p.area.replace(/[^0-9]/g, ""));
      return areaNum >= minArea && areaNum <= maxArea;
    })
    .filter((p: any) => (bedrooms ? p.beds === Number(bedrooms) : true))
    .filter((p: any) => (bathrooms ? p.baths === Number(bathrooms) : true))
    .filter((p: any) =>
      amenities.length > 0
        ? amenities.every((a) => p.amenities.includes(a))
        : true
    );
    const toggleAmenity = (value: string) => {
  setAmenities((prev) =>
    prev.includes(value)
      ? prev.filter((a) => a !== value)
      : [...prev, value]
  );
};


  return (
    <>
      <Navbarx />
      <MapSection sampleProperties={sampleProperties} />
  <SearchBar
  keyword={keyword}
  setKeyword={setKeyword}
  locationFilter={locationFilter}
  setLocationFilter={setLocationFilter}
  categoryFilter={categoryFilter}
  setCategoryFilter={setCategoryFilter}
  tabs={tabs}
  showAdvanced={showAdvanced}
  setShowAdvanced={setShowAdvanced}

  minPrice={minPrice}
  setMinPrice={setMinPrice}
  maxPrice={maxPrice}
  setMaxPrice={setMaxPrice}
  minArea={minArea}
  setMinArea={setMinArea}
  maxArea={maxArea}
  setMaxArea={setMaxArea}
  bedrooms={bedrooms}
  setBedrooms={setBedrooms}
  bathrooms={bathrooms}
  setBathrooms={setBathrooms}
  floors={floors}
  setFloors={setFloors}
  propertyType={propertyType}
  setPropertyType={setPropertyType}
  project={project}
  setProject={setProject}
  amenities={amenities}
  toggleAmenity={toggleAmenity}
/>


      <PropertyList
        filteredProperties={filteredProperties}
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        navigate={navigate}
      />
      <Footer />
    </>
  );
}
