import { useState } from "react";
import Navbarx from "../../components/Navbarx";
import Footer from "../../components/Footer";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default Leaflet icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

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
    id: 10,
    title: "Villa with Sea View",
    location: "Pattaya, Thailand",
    price: "$1,200,000",
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
    price: "$700,000",
    beds: 3,
    baths: 2,
    area: "120 m²",
    image: "/images/banner.jpeg",
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

  // NEW ADVANCED STATES
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

  const toggleAmenity = (value: string) => {
    setAmenities((prev) =>
      prev.includes(value) ? prev.filter((a) => a !== value) : [...prev, value]
    );
  };

  const tabs = [
    "View All",
    "Apartment",
    "Villa",
    "Condo",
    "House",
    "Land",
    "Commercial",
  ];

  // Filter logic applying all options
  const filteredProperties = sampleProperties
    .filter((p) => (activeTab === "View All" ? true : p.category === activeTab))
    .filter((p) =>
      keyword ? p.title.toLowerCase().includes(keyword.toLowerCase()) : true
    )
    .filter((p) =>
      locationFilter
        ? p.location.toLowerCase().includes(locationFilter.toLowerCase())
        : true
    )
    .filter((p) => (categoryFilter ? p.category === categoryFilter : true))
    .filter((p) => {
      const priceNum = Number(p.price.replace(/[^0-9]/g, ""));
      return priceNum >= minPrice && priceNum <= maxPrice;
    })
    .filter((p) => {
      const areaNum = Number(p.area.replace(/[^0-9]/g, ""));
      return areaNum >= minArea && areaNum <= maxArea;
    })
    .filter((p) => (bedrooms ? p.beds === Number(bedrooms) : true))
    .filter((p) => (bathrooms ? p.baths === Number(bathrooms) : true))
    .filter((p) =>
      amenities.length > 0
        ? amenities.every((a) => p.amenities.includes(a))
        : true
    );

  return (
    <>
      <Navbarx />
      <div className="min-h-screen bg-gray-50 text-gray-800">
        {/* Hero map section with floating search bar */}
        <section className="relative w-full h-[50vh] overflow-hidden mt-30">

          {/* Map */}
          <MapContainer
            center={[13.7563, 100.5018]}
            zoom={5}
            style={{ height: "100%", width: "100%" }}
            className="z-0"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {sampleProperties.map((p) => (
              <Marker
                key={p.id}
                position={[13.7563 + Math.random(), 100.5018 + Math.random()]}
              >
                <Popup>
                  {p.title} <br /> {p.location}
                </Popup>
              </Marker>
            ))}
          </MapContainer>


            {/* Floating Search Bar */}
          {/* <section className="absolute left-1/2 bottom-0  transform -translate-x-1/2 bg-white shadow-lg rounded-lg p-6 w-6xl">
            <div className="flex flex-wrap items-center gap-3">
             
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Keyword"
                className="flex-1 min-w-[140px] border px-3 py-2 rounded"
              />

              
              <input
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                placeholder="Location"
                className="flex-1 min-w-[140px] border px-3 py-2 rounded"
              />

             
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="border px-3 py-2 rounded min-w-[150px]"
              >
                <option value="">All Categories</option>
                {tabs.slice(1).map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>

           
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="border px-3 py-2 rounded text-gray-600 hover:text-blue-600"
              >
                Advanced
              </button>

              <button
                onClick={() => console.log("trigger search")}
                className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 ml-auto"
              >
                Search
              </button>
            </div>

           
            {showAdvanced && (
              <div className="mt-4 flex flex-wrap gap-3 items-center">
                
                <div className="flex flex-col min-w-[150px]">
                  <label className="text-gray-500 text-sm">Price Range</label>
                  <input
                    type="range"
                    min={0}
                    max={3000000}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-sm">
                    ${minPrice} - ${maxPrice}
                  </p>
                </div>

             
                <div className="flex flex-col min-w-[150px]">
                  <label className="text-gray-500 text-sm">Square Range</label>
                  <input
                    type="range"
                    min={20}
                    max={700}
                    value={maxArea}
                    onChange={(e) => setMaxArea(Number(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-sm">
                    {minArea}m² - {maxArea}m²
                  </p>
                </div>

            
                <select
                  className="border px-3 py-2 rounded min-w-[120px]"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                >
                  <option value="">Bedrooms</option>
                  {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>

             
                <select
                  className="border px-3 py-2 rounded min-w-[120px]"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                >
                  <option value="">Bathrooms</option>
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>

                  <select
                  className="border px-3 py-2 rounded min-w-[120px]"
                  value={floors}
                  onChange={(e) => setFloors(e.target.value)}
                >
                  <option value="">Floors</option>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>

            
                <select
                  className="border px-3 py-2 rounded min-w-[150px]"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                >
                  <option value="">Type</option>
                  <option>Residential</option>
                  <option>Commercial</option>
                </select>

              
                <input
                  className="border px-3 py-2 rounded min-w-[150px]"
                  placeholder="Search Project"
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                />

          
                <div className="flex flex-wrap gap-3 min-w-[300px]">
                  {["Parking", "Security", "Garden", "Pool", "Gym"].map(
                    (am) => (
                      <label
                        key={am}
                        className="text-sm flex gap-1 items-center"
                      >
                        <input
                          type="checkbox"
                          checked={amenities.includes(am)}
                          onChange={() => toggleAmenity(am)}
                        />
                        {am}
                      </label>
                    )
                  )}
                </div>
              </div>
            )}
          </section>
           */}
        </section>

        {/* Recommended For You */}
        <section className="max-w-7xl mx-auto px-4 mt-8">
          <h1 className="flex alignItem-center justify-center text-3xl font-semibold mb-4">Recommended For You</h1>

          {/* Tabs */}
          <div className="flex gap-4 mb-6 flex-wrap alignItem-center justify-center">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Property Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 rounded-4xl">
            {filteredProperties.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded shadow overflow-hidden border"
              >
                <div className="w-full h-48">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-3">
                  <h4 className="font-semibold text-sm">{p.title}</h4>
                  <p className="text-xs text-gray-500">{p.location}</p>
                  <div className="mt-2 text-xs text-gray-600 flex gap-2 flex-wrap">
                    {p.amenities.map((a, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 px-2 py-1 rounded text-gray-700"
                      >
                        {a}
                      </span>
                    ))}
                    <span className="bg-gray-100 px-2 py-1 rounded text-gray-700">
                      {p.area}
                    </span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <img
                        src={p.owner.profile}
                        alt={p.owner.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span>{p.owner.name}</span>
                    </div>
                    <span className="font-semibold text-blue-600">
                      {p.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
