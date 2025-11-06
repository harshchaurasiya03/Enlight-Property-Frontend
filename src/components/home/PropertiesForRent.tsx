import { Bed, Bath, Maximize, Heart, MapPin } from 'lucide-react';

const PropertiesForRent = () => {
  const properties = [
    {
      id: 1,
      title: 'Downtown Luxury Apartment',
      price: 3500,
      period: 'month',
      location: 'Chong Nonsi, Yan Nawa, Bangkok',
      type: 'Apartment',
      bedrooms: 2,
      bathrooms: 2,
      area: 1400,
      image: 'images/Chong.webp'
    },
    {
      id: 2,
      title: '2-BR Apt. House',
      price: 4200,
      period: 'month',
      location: 'Thong Lo, Khlong Tan Nuea, Watthana, Bangkok',
      type: 'House',
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      image: 'https://images.pexels.com/photos/1974596/pexels-photo-1974596.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 3,
      title: 'Modern Studio Downtown',
      price: 1850,
      period: 'month',
      location: 'Sukhumvit, Bangkok',
      type: 'Studio',
      bedrooms: 1,
      bathrooms: 1,
      area: 650,
      image: 'https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 4,
      title: 'Spacious Family Home',
      price: 2800,
      period: 'month',
      location: 'Bhukhalo, Thon Buri, Bangkok',
      type: 'House',
      bedrooms: 4,
      bathrooms: 3,
      area: 2500,
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 5,
      title: 'Executive Condo',
      price: 5500,
      period: 'month',
      location: 'Pattaya, Thailand',
      type: 'Condo',
      bedrooms: 3,
      bathrooms: 3,
      area: 2200,
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 6,
      title: 'Garden Apartment',
      price: 2200,
      period: 'month',
      location: 'Phrom Phong, Bangkok',
      type: 'Apartment',
      bedrooms: 2,
      bathrooms: 1,
      area: 1100,
      image: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 7,
      title: 'Loft in Arts District',
      price: 3200,
      period: 'month',
      location: 'Thung Maha Mek, Sathon, Bangkok',
      type: 'Loft',
      bedrooms: 2,
      bathrooms: 2,
      area: 1600,
      image: 'https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 8,
      title: 'Waterfront Townhouse',
      price: 4800,
      period: 'month',
      location: 'Thepharak, Bang Na, Bangkok',
      type: 'Townhouse',
      bedrooms: 3,
      bathrooms: 3,
      area: 2000,
      image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Properties For Rent
          </h2>
          <p className="text-lg text-gray-600">
            Find your perfect rental property from our extensive collection
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property) => (
            <div
              key={property.id}
              className="group cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {property.type}
                  </span>
                </div>
                <button className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full transition">
                  <Heart size={18} className="text-gray-700" />
                </button>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition line-clamp-1">
                  {property.title}
                </h3>
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin size={14} className="mr-1" />
                  <span className="text-sm">{property.location}</span>
                </div>
                <div className="flex items-center justify-between text-gray-600 text-sm mb-4 pb-4 border-b">
                  <div className="flex items-center">
                    <Bed size={16} className="mr-1" />
                    <span>{property.bedrooms}</span>
                  </div>
                  <div className="flex items-center">
                    <Bath size={16} className="mr-1" />
                    <span>{property.bathrooms}</span>
                  </div>
                  <div className="flex items-center">
                    <Maximize size={16} className="mr-1" />
                    <span>{property.area} sqft</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-blue-600">
                      ${property.price}
                    </span>
                    <span className="text-gray-600 text-sm">/{property.period}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition">
            View All Rentals
          </button>
        </div>
      </div>
    </section>
  );
};

export default PropertiesForRent;
