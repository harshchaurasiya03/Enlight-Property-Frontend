import React from "react";
import { useNavigate } from "react-router-dom";
import Navbarx from "../../components/Navbarx";
import Footer from "../../components/Footer";

export type Post = {
  id: number;
  title: string;
  details: string;
  image: string;
};

export const samplePosts: Post[] = [
  {
    id: 1,
    title: "Modern Family Home",
    details: "A beautiful 3BHK house...",
    image: "/images/property1.jpeg",
  },
  {
    id: 2,
    title: "Luxury Apartment",
    details:
      "Spacious 2BHK apartment with a stunning city view and modern amenities.",
    image: "/images/property15.jpeg",
  },
  {
    id: 3,
    title: "Cozy Cottage",
    details:
      "A charming cottage in a quiet neighborhood, perfect for weekend getaways.",
    image: "/images/property19.jpeg",
  },
  {
    id: 4,
    title: "Downtown Studio",
    details:
      "Compact studio apartment close to all major offices and metro station.",
    image: "/images/property2.jpeg",
  },
  {
    id: 5,
    title: "Beachside Villa",
    details:
      "Enjoy serene mornings in this 4-bedroom villa right on the beach.",
    image: "/images/property22.jpeg",
  },
  {
    id: 6,
    title: "Urban Penthouse",
    details: "Modern penthouse with rooftop terrace and panoramic city views.",
    image: "/images/property8.jpeg",
  },
  {
    id: 7,
    title: "Suburban House",
    details: "Peaceful 3-bedroom home in a friendly suburban community.",
    image: "/images/property13.jpeg",
  },
  {
    id: 8,
    title: "Countryside Retreat",
    details: "Escape the city in this rustic home surrounded by nature.",
    image: "/images/property9.jpeg",
  },
  {
    id: 9,
    title: "Minimalist Loft",
    details:
      "Stylish loft apartment designed for modern living and work from home.",
    image: "/images/property9.jpeg",
  },
  {
    id: 10,
    title: "Historic Mansion",
    details:
      "A beautifully preserved mansion with classic architecture and charm.",
    image: "/images/property21.jpeg",
  },
  {
    id: 11,
    title: "Garden Villa",
    details: "Luxurious villa with lush gardens and private pool.",
    image: "/images/property25.jpeg",
  },
  {
    id: 12,
    title: "City Apartment",
    details:
      "Modern 1BHK apartment in the heart of the city, close to transport.",
    image: "/images/property15.jpeg",
  },
];

// 🔹 Single blog card
function PhotoCard({ post }: { post: Post }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blog/${post.id}`);
  };

  return (
    <article
      className="group flex flex-col cursor-pointer"
      onClick={handleClick}
    >
      <div className="w-full overflow-hidden bg-gray-100 relative max-h-[50vh] rounded-lg shadow-md">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-slate-900 leading-snug">
          {post.title}
        </h3>
        <p className="mt-1 text-sm text-slate-600 line-clamp-3">
          {post.details}
        </p>
      </div>
    </article>
  );
}

// 🔹 Grid layout with navbar only once at top
export default function PhotoCardGrid({ posts = samplePosts }: { posts?: Post[] }) {
  const displayPosts = posts.slice(0, 12);
  const rows: Post[][] = [];

  for (let i = 0; i < displayPosts.length; i += 3) {
    rows.push(displayPosts.slice(i, i + 3));
  }

  return (
    <>
      <Navbarx />
      <section className="container px-4 sm:px-6 py-24 mx-auto sm:py-20 mt-20">
        <header className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Properties Blogs</h2>
          <p className="mt-2 text-sm text-slate-600">
            Investments, News, Builder, Location and Funding.
          </p>
        </header>

        <div className="space-y-8">
          {rows.map((row, idx) => (
            <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {row.map((post) => (
                <PhotoCard key={post.id} post={post} />
              ))}
            </div>
          ))}
        </div>
      </section>
      <Footer/>
    </>
  );
}
