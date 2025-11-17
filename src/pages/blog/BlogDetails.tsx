import { useParams, useNavigate } from "react-router-dom";
import { samplePosts } from "./Blog";

import Navbarx from "../../components/Navbarx";
import Footer from "../../components/Footer";

export default function BlogDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const post = samplePosts.find((p) => p.id === Number(id));
  if (!post)
    return (
      <p className="text-center mt-20 text-lg text-red-600 font-semibold">
        Post not found!
      </p>
    );

  // 3 random related posts
  const otherPosts = samplePosts.filter((p) => p.id !== Number(id));
  const randomPosts = otherPosts.sort(() => 0.5 - Math.random()).slice(0, 3);

  return (
    <>
      <Navbarx />

      <main className="container mx-auto px-2 sm:px-6 py-16 sm:py-20">
        {/* Hero Image */}
        {/* <div className="w-full h-[60vh] lg:h-[70vh] overflow-hidden rounded-xl shadow-lg">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover object-center"
          />
        </div> */}

        {/* Post Title */}
        <article className="mt-10 lg:mt-16 max-w-8xl mx-auto">
          {/* Post Title */}
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900">
            {post.title}
          </h1>

          {/* Subtitle / Short description */}
          <p className="mt-4 text-xl text-slate-600 leading-relaxed">
            A complete guide to understanding this property, market trends,
            pricing insights, nearby locations, and investment opportunities.
          </p>

          {/* Intro Section */}
          <p className="mt-6 text-lg text-slate-700 leading-relaxed">
            {post.details} Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Fusce vel sapien elit. In malesuada semper mi, nec lacinia
            sapien convallis ac. Pellentesque habitant morbi tristique senectus
            et netus et malesuada fames ac turpis egestas.
          </p>

          {/* Full Image */}
          <div className="mt-8 w-full h-64 lg:h-96 overflow-hidden rounded-lg shadow-md">
            <img
              src={post.image}
              alt="Section visual"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Heading 2 */}
          <h2 className="mt-10 text-3xl font-bold text-slate-900">
            Why This Property Stands Out
          </h2>

          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.
            Cras ultricies ligula sed magna dictum porta. Vestibulum ante ipsum
            primis in faucibus.
          </p>

          {/* Bullet Points */}
          <ul className="list-disc pl-6 mt-4 text-lg text-slate-700 space-y-2">
            <li>Prime location with high future value</li>
            <li>Modern design with eco-friendly materials</li>
            <li>Close to transport hubs and shopping centers</li>
            <li>Excellent rental yield with strong ROI</li>
          </ul>

          {/* Quote */}
          <blockquote className="mt-8 border-l-4 border-blue-500 pl-4 italic text-slate-800 text-lg">
            "Real estate investing is not just about ownership—it’s about
            creating opportunities for long-term financial growth."
          </blockquote>

          {/* Heading 3 */}
          <h3 className="mt-10 text-2xl font-semibold text-slate-900">
            Market Trends & Price Insights
          </h3>

          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            Proin eget tortor risus. Vivamus suscipit tortor eget felis
            porttitor volutpat. Nulla porttitor accumsan tincidunt. Sed
            porttitor lectus nibh.
          </p>

          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            Prices in this region have consistently seen a year-on-year growth
            of
            <span className="font-semibold text-slate-900"> 8–12%</span>, making
            it an attractive destination for both long-term investors and
            families looking for premium living.
          </p>

          {/* Comparison Box */}
          <div className="mt-8 bg-gray-100 rounded-xl p-6 shadow-inner">
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">
              📊 Property Comparison
            </h3>

            <ul className="space-y-2 text-lg text-slate-700">
              <li>
                <strong>Current Property:</strong> Lower maintenance, high
                locality value
              </li>
              <li>
                <strong>Nearby Region A:</strong> Cheaper but less developed
              </li>
              <li>
                <strong>Nearby Region B:</strong> High-end but expensive
              </li>
            </ul>
          </div>

          {/* Pros & Cons */}
          <h2 className="mt-12 text-3xl font-bold text-slate-900">
            Pros & Cons
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <div className="bg-green-50 p-5 rounded-xl border border-green-200">
              <h3 className="text-xl font-semibold text-green-700">👍 Pros</h3>
              <ul className="mt-3 space-y-2 text-slate-700">
                <li>Great investment potential</li>
                <li>Low maintenance cost</li>
                <li>High resale value</li>
                <li>Secure neighborhood</li>
              </ul>
            </div>

            <div className="bg-red-50 p-5 rounded-xl border border-red-200">
              <h3 className="text-xl font-semibold text-red-700">👎 Cons</h3>
              <ul className="mt-3 space-y-2 text-slate-700">
                <li>Peak hour traffic</li>
                <li>Slightly expensive compared to older areas</li>
              </ul>
            </div>
          </div>

          {/* Heading */}
          <h2 className="mt-12 text-3xl font-bold text-slate-900">
            Final Thoughts
          </h2>

          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            Pellentesque in ipsum id orci porta dapibus. Curabitur aliquet quam
            id dui posuere blandit. Vestibulum ac diam sit amet quam vehicula
            elementum sed sit amet dui. This location offers a balanced mix of
            luxury, affordability, and long-term growth potential.
          </p>

          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            If you're planning to buy your first home, invest for rental income,
            or simply explore premium real-estate opportunities — this property
            deserves a closer look.
          </p>
        </article>

        {/* Related Posts */}
        <section className="mt-16 max-w-8xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-6">
            You may also like
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {randomPosts.map((p) => (
              <div
                key={p.id}
                className="cursor-pointer group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                onClick={() => navigate(`/blog/${p.id}`)}
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 bg-white">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {p.title}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-2 mt-1">
                    {p.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
