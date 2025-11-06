import { MapPin } from 'lucide-react';

const PropertiesByLocation = () => {
  const locations = [
    {
      id: 1,
      name: 'Phuket',
      properties: 125,
      image: 'images/property1.jpeg'
    },
    {
      id: 2,
      name: 'Laguna',
      properties: 98,
      image: 'images/property2.jpeg'
    },
    {
      id: 3,
      name: 'patong',
      properties: 87,
      image: 'images/property4.jpeg'
    },
    {
      id: 4,
      name: 'Bangkok',
      properties: 76,
      image: 'images/property5.jpeg'
    },
    {
      id: 5,
      name: 'Sathon',
      properties: 65,
      image: 'images/property6.jpeg'
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Properties by Locations
          </h2>
          <p className="text-lg text-gray-600">
            Each place is a good choice, it will help you make the right decision
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {locations.map((location) => (
            <div
              key={location.id}
              className="group relative cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-64"
            >
              <img
                src={location.image}
                alt={location.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 from-black/70 to-transparent flex flex-col justify-end p-6">
                <div className="flex items-center text-white mb-2">
                  <MapPin size={18} className="mr-2" />
                  <h3 className="text-xl font-semibold">{location.name}</h3>
                </div>
                <p className="text-white/90 text-sm">
                  {location.properties} Properties
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertiesByLocation;
