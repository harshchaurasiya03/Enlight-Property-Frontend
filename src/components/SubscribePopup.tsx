import React, { useState } from "react";
import { X } from "lucide-react";

interface SubscribePopupProps {
  logo?: string;
  bannerImage?: string;
  handleClose: () => void;
}

const SubscribePopup: React.FC<SubscribePopupProps> = ({
  logo = "/logo/enlightlogo.png",
  bannerImage = "/images/property14.jpeg",
  handleClose,
}) => {
  const [status, setStatus] = useState<"IDLE" | "SUCCESS" | "ERROR">("IDLE");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("SUCCESS");
    setTimeout(() => {
      handleClose();
      setStatus("IDLE");
    }, 1000);
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative bg-white w-[360px] rounded-md shadow-lg border overflow-hidden"
        // prevent overlay clicks from reaching underlying page
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative h-48 flex items-center justify-center"
          style={{
            backgroundImage: `url(${bannerImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* debug button — logs to console */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              console.log("X button clicked — calling handleClose?", !!handleClose);
              try {
                handleClose();
                console.log("handleClose called successfully");
              } catch (err) {
                console.error("handleClose threw:", err);
              }
            }}
            className="absolute top-2 right-2 text-white bg-black/40 rounded-full p-1 hover:bg-black/70 z-[10000]"
          >
            <X size={18} />
          </button>

          <img
            src={logo}
            alt="Logo"
            className="w-20 h-20 rounded-full object-contain border-2 border-white"
          />
        </div>

        <div className="px-6 py-4 flex flex-col gap-3">
          {status === "SUCCESS" ? (
            <p className="text-green-600 font-semibold text-center">
              🎉 Thank you for subscribing! You’ll receive exclusive deals soon.
            </p>
          ) : (
            <>
              <h2 className="text-lg font-semibold text-gray-800 text-center">
                Subscribe to our Newsletter
              </h2>
              <p className="text-gray-500 text-sm text-center mb-2">
                Get exclusive offers and updates
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  className="border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  pattern="\d{6,15}"
                  title="Enter a valid phone number"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />

                <button
                  type="submit"
                  className="bg-[#0056D2] text-white font-semibold py-2 rounded-md hover:bg-[#0045B0] transition mt-2"
                >
                  Subscribe
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscribePopup;
