import React, { useEffect } from "react";

const GoogleReview: React.FC = () => {
  useEffect(() => {
    const scriptId = "elfsight-widget";

    // Inject the Elfsight platform script if not already present
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.src = "https://static.elfsight.com/platform/platform.js";
      script.async = true;
      script.id = scriptId;
      document.body.appendChild(script);
    }

    // Prevent links inside the widget from redirecting
    const blockRedirects = setInterval(() => {
      const widget = document.querySelector(".elfsight-app-e07370ec-2694-4986-8e7a-09e26fc36149");
      if (widget) {
        const links = widget.querySelectorAll("a");
        links.forEach((a) => {
          a.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
          });
        });
        clearInterval(blockRedirects);
      }
    }, 1000);
  }, []);

  return (
    <div className="bg-cover bg-blend-soft-light  py-8 px-4 sm:px-2 md:px-10 lg:px-20 overflow-x-hidden overflow-y-hidden">
      <div className="container mx-auto text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Google Reviews</h2>
      </div>

      {/* Elfsight Widget */}
      <div className="flex justify-center px-5">
        <div
          className="elfsight-app-e07370ec-2694-4986-8e7a-09e26fc36149 max-w-full"
          data-elfsight-app-lazy
        ></div>
      </div>
    </div>
  );
};

export default GoogleReview;
