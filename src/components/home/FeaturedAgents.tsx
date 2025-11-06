import { Mail, Phone, Home } from 'lucide-react';

const FeaturedAgents = () => {
  const agents = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Senior Property Consultant',
      phone: '+1 234-567-8900',
      email: 'sarah.j@flexhome.com',
      properties: 45,
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Luxury Real Estate Agent',
      phone: '+1 234-567-8901',
      email: 'michael.c@flexhome.com',
      properties: 38,
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Property Specialist',
      phone: '+1 234-567-8902',
      email: 'emily.r@flexhome.com',
      properties: 52,
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 4,
      name: 'David Thompson',
      role: 'Commercial Real Estate Expert',
      phone: '+1 234-567-8903',
      email: 'david.t@flexhome.com',
      properties: 41,
      image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Agents
          </h2>
          <p className="text-lg text-gray-600">
            Meet our team of experienced real estate professionals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="group cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition">
                  {agent.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{agent.role}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <Phone size={14} className="mr-2 text-blue-600" />
                    <span>{agent.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Mail size={14} className="mr-2 text-blue-600" />
                    <span className="truncate">{agent.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Home size={14} className="mr-2 text-blue-600" />
                    <span>{agent.properties} Properties</span>
                  </div>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition">
                  Contact Agent
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition">
            View All Agents
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedAgents;
