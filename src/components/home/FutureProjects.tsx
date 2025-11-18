// FeaturedProjects.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaSwimmer, FaDumbbell, FaTree, FaShieldAlt } from "react-icons/fa";

// Type definition for project
type Project = {
  image: string;
  projectName: string;
  societyName: string;
  location: string;
  amenities: string[];
};

const FeaturedProjects: React.FC = () => {
  const navigate = useNavigate();

  const projects: Project[] = [
    {
      image: "/images/property8.jpeg",
      projectName: "The Horizon Residences",
      societyName: "Skyline Society",
      location: "Bangkok",
      amenities: ["Swimming Pool", "Gym", "Garden"],
    },
    {
      image: "/images/property15.jpeg",
      projectName: "Riverfront Towers",
      societyName: "Waterside Society",
      location: "Chiang Mai",
      amenities: ["Gym", "Security", "Garden",],
    },
    {
      image: "/images/property24.jpeg",
      projectName: "Luxury Villas",
      societyName: "Golden Palm Society",
      location: "Phuket",
      amenities: ["Swimming Pool", "Security", "Garden", "Gym"],
    },
  ];

  const amenityIcons: Record<string, JSX.Element> = {
    "Swimming Pool": <FaSwimmer className="text-blue-500" />,
    Gym: <FaDumbbell className="text-red-500" />,
    Garden: <FaTree className="text-green-600" />,
    Security: <FaShieldAlt className="text-yellow-600" />,
  };

  const locationToRoute: Record<string, string> = {
    Bangkok: "/propertydeatilspage",
    "Chiang Mai": "/propertydeatilspage",
    Phuket: "/propertydeatilspage",
  };

  return (
    <div className="container px-4 sm:px-6 py-8 mx-auto bg-gray-100">
      {/* Heading */}
      <div className="text-left mb-12">
        <h2 className="font-bold text-3xl md:text-4xl">Featured Projects</h2>
        <p className="text-gray-600 mt-2">
          We make the best choices with the hottest and most prestigious projects, please visit the details below to find out more.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {projects.map((project, idx) => (
          <div
            key={idx}
            onClick={() => navigate(locationToRoute[project.location] || "/")}
            className="cursor-pointer bg-white rounded-xl shadow-lg overflow-hidden flex flex-col max-h-[460px] h-[460px] hover:scale-105 transition-transform duration-300"
          >
            {/* Image */}
            <div className="h-[60%] w-full">
              <img
                src={project.image}
                alt={project.projectName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-start p-8 h-[40%]">
              <span className="text-gray-700 truncate">{project.projectName}</span>
              <h3 className="font-bold text-lg mt-1 truncate">{project.societyName}</h3>

              {/* Location */}
              <div className="flex items-center text-gray-600 mt-1">
                <FaMapMarkerAlt className="mr-2 text-blue-500" />
                <span className="truncate">{project.location}</span>
              </div>

              {/* Amenities */}
              <div className="flex flex-wrap items-center gap-3 mt-3">
                {project.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-700"
                  >
                    {amenityIcons[amenity]}
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProjects;
