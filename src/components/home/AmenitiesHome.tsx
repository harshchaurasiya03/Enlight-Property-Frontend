import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    owner: { name: "Jane Smith", profile: "/images/investor1.avif" },
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
    owner: { name: "Alex Lee", profile: "/images/investor.avif" },
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
    owner: { name: "Michael Scott", profile: "/images/investor1.avif" },
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
    owner: { name: "Sarah Connor", profile: "/images/investor.avif" },
    category: "Commercial",
  },
];

export default function AmenitiesHome() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("View All");

  const tabs = [
    "View All",
    "Apartment",
    "Villa",
    "Condo",
    "House",
    "Land",
    "Commercial",
  ];

  // Filter properties by tab + limit 6
  const filtered = sampleProperties
    .filter((p) => (activeTab === "View All" ? true : p.category === activeTab))
    .slice(0, 6);

  return (
    <div className="container px-4 sm:px-6 py-8 mx-auto w-full">
      {/* Heading */}
      <h2 className="flex alignItem-center justify-center text-3xl font-semibold mt-10 mb-6">Recommended Properties</h2>

      {/* Tabs */}
      <div className="flex alignItem-center justify-center gap-3 flex-wrap mb-6">
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

      {/* Cards (6 only) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        {filtered.map((p) => (
          <div
            key={p.id}
            onClick={() => navigate(`/propertydeatilspage`)}
            className="bg-white rounded-2xl shadow border hover:shadow-xl transition cursor-pointer"
          >
            <div className="w-full h-60">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover rounded-t-2xl" />
            </div>

            <div className="p-3">
              <h4 className="font-semibold text-sm">{p.title}</h4>
              <p className="text-xs text-gray-500">{p.location}</p>

              <div className="mt-2 text-xs flex gap-2 flex-wrap">
                {p.amenities.slice(0, 3).map((a, i) => (
                  <span key={i} className="bg-gray-100 px-2 py-1 rounded text-gray-700">
                    {a}
                  </span>
                ))}
                <span className="bg-gray-100 px-2 py-1 rounded">{p.area}</span>
              </div>

              <hr className="my-2" />

              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <img
                    src={p.owner.profile}
                    alt={p.owner.name}
                    className="w-6 h-8 rounded-full"
                  />
                  <span>{p.owner.name}</span>
                </div>

                <span className="font-semibold text-blue-600">{p.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

       {/* BUTTON TO OPEN AMENITIES PROPERTY PAGE */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => navigate("/projects")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          View All Properties
        </button>
      </div>
    </div>
  );
}
