import { Calendar, ArrowRight } from 'lucide-react';

const NewsSection = () => {
  const articles = [
    {
      id: 1,
      title: '10 Tips for First-Time Home Buyers',
      excerpt: 'Learn essential tips and strategies to make your first home purchase a success...',
      date: 'October 15, 2025',
      category: 'Buying Guide',
      image: 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 2,
      title: 'Real Estate Market Trends 2025',
      excerpt: 'Discover the latest trends shaping the real estate market this year...',
      date: 'October 12, 2025',
      category: 'Market Analysis',
      image: 'https://images.pexels.com/photos/534220/pexels-photo-534220.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 3,
      title: 'How to Stage Your Home for Quick Sale',
      excerpt: 'Professional staging tips to help sell your property faster and for better value...',
      date: 'October 8, 2025',
      category: 'Selling Tips',
      image: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 4,
      title: 'Investment Properties: What to Know',
      excerpt: 'A comprehensive guide to investing in real estate properties for beginners...',
      date: 'October 5, 2025',
      category: 'Investment',
      image: 'https://images.pexels.com/photos/3760607/pexels-photo-3760607.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Latest Real Estate News
          </h2>
          <p className="text-lg text-gray-600">
            Stay updated with the latest news and insights from the real estate world
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="group cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <Calendar size={14} className="mr-2" />
                  <span>{article.date}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {article.excerpt}
                </p>
                <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm group-hover:gap-2 transition-all">
                  <span>Read More</span>
                  <ArrowRight size={16} className="ml-1 group-hover:ml-2 transition-all" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition">
            View All News
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
