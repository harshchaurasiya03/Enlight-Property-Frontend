import React, { useEffect, useRef } from "react";

const videoSources = [
  "/videos/PropertyCarousel/v1.mp4",
  "/videos/PropertyCarousel/v3.mp4",
  "/videos/PropertyCarousel/v4.mp4",
  "/videos/PropertyCarousel/v5.mp4",
  "/videos/PropertyCarousel/v6.mp4",
  "/videos/PropertyCarousel/v4.mp4",
  "/videos/PropertyCarousel/v5.mp4",
];

const PropertyCarousel: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.playbackRate = 4.0;
        video.play().catch((error) => {
          console.error("Video play failed:", error);
        });
      }
    });
  }, []);

  return (
    <div className="container px-4 sm:px-6 py-8 mx-auto">
      {/* Heading Section */}
      <div className="text-left mb-10">
        <h2 className="text-3xl sm:text-3xl font-bold text-gray-900">
          Popular Videos
        </h2>
        <p className="text-gray-600 mt-2">
          Explore popular videos across different property markets in Thailand
        </p>
      </div>

      {/* Video Carousel Section */}
      <div className="relative">
        {/* Scrollable on mobile, grid on larger screens */}
        <div
          ref={sliderRef}
          className="
            flex flex-nowrap gap-4 overflow-x-auto scroll-smooth scrollbar-hide 
            sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 sm:overflow-visible
            pb-4
          "
        >
          {videoSources.map((src, index) => (
            <div
              key={index}
              className="min-w-[70%] sm:min-w-0 sm:w-auto rounded overflow-hidden shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
            >
              {/* Video */}
              <div className="relative w-full pb-[177%] overflow-hidden rounded-md">
                <video
                  ref={(el) => {
                    if (el) videoRefs.current[index] = el;
                  }}
                  src={src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyCarousel;
