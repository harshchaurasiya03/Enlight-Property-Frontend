import React from "react";

export default function SearchBar({
  keyword,
  setKeyword,
  locationFilter,
  setLocationFilter,
  categoryFilter,
  setCategoryFilter,
  tabs,
  showAdvanced,
  setShowAdvanced,

  // Advanced props (passed from parent)
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  minArea,
  setMinArea,
  maxArea,
  setMaxArea,
  bedrooms,
  setBedrooms,
  bathrooms,
  setBathrooms,
  floors,
  setFloors,
  propertyType,
  setPropertyType,
  project,
  setProject,
  amenities,
  toggleAmenity,
}: any) {
  return (
    <section className="max-w-7xl mx-auto -mt-12 relative z-999">
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-6 border flex flex-col md:flex-row flex-wrap gap-3">
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Keyword"
          className="flex-1 min-w-[120px] border px-3 py-2 rounded"
        />

        <input
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          placeholder="Location"
          className="flex-1 min-w-[120px] border px-3 py-2 rounded"
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border px-3 py-2 rounded min-w-[120px]"
        >
          <option value="">All Categories</option>
          {tabs.slice(1).map((t: string) => (
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
        <div className="mt-4 bg-white shadow-lg rounded-lg p-4 md:p-6 flex flex-col gap-3 w-full z-50">
          {/* Price Range */}
          <div className="flex flex-col w-full">
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

          {/* Square Range */}
          <div className="flex flex-col w-full">
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

          {/* Bedrooms */}
          <select
            className="border px-3 py-2 rounded w-full"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
          >
            <option value="">Bedrooms</option>
            {[1, 2, 3, 4, 5, 6, 7].map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>

          {/* Bathrooms */}
          <select
            className="border px-3 py-2 rounded w-full"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
          >
            <option value="">Bathrooms</option>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>

          {/* Floors */}
          <select
            className="border px-3 py-2 rounded w-full"
            value={floors}
            onChange={(e) => setFloors(e.target.value)}
          >
            <option value="">Floors</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>

          {/* Property Type */}
          <select
            className="border px-3 py-2 rounded w-full"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="">Type</option>
            <option>Residential</option>
            <option>Commercial</option>
          </select>

          {/* Project */}
          <input
            className="border px-3 py-2 rounded w-full"
            placeholder="Search Project"
            value={project}
            onChange={(e) => setProject(e.target.value)}
          />

          {/* Amenities */}
          <div className="flex flex-wrap gap-2 w-full">
            {["Parking", "Security", "Garden", "Pool", "Gym"].map((am) => (
              <label
                key={am}
                className="flex gap-2 items-center w-1/2 text-sm"
              >
                <input
                  type="checkbox"
                  checked={amenities.includes(am)}
                  onChange={() => toggleAmenity(am)}
                />
                {am}
              </label>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
