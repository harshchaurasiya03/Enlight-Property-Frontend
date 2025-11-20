import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../redux/hooks/redux";
import { getActiveBanner } from "../redux/actions/subscribebannerAction";

// ------------------------
// Media URL Builder
// ------------------------
const ASSET_URL = import.meta.env.VITE_ASSET_URL || "";
const getMediaUrl = (url?: string) =>
  url?.startsWith("http") ? url : `${ASSET_URL}${url || ""}`;

// ------------------------
// Subscribe Popup Component
// ------------------------
interface SubscribePopupProps {
  logo?: string;
  bannerImage?: string;
  quoteText?: string;          // 🔥 Added dynamic quote
  handleClose: () => void;
}

const SubscribePopup: React.FC<SubscribePopupProps> = ({
  logo = "/logo/enlightlogo.png",
  bannerImage,
  quoteText,
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
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40 mt-15"
      aria-modal="true"
      role="dialog"
      onClick={handleClose}
    >
      <div
        className="relative bg-white w-[360px] rounded-md shadow-lg border overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 🔥 Dynamic Banner Image */}
        <div
          className="relative h-48 flex items-center justify-center"
          style={{
            backgroundImage: `url(${bannerImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-2 right-2 text-white bg-black/40 rounded-full p-1 hover:bg-black/70 z-10000"
          >
            <X size={18} />
          </button>

          {/* 🔥 Logo stays same */}
          <img src={logo} alt="Logo" className="w-20 h-20 object-contain" />
        </div>

        {/* Form Section */}
        <div className="px-6 py-4 flex flex-col gap-3">
          {status === "SUCCESS" ? (
            <p className="text-green-600 font-semibold text-center">
              🎉 Thank you for subscribing! You’ll receive exclusive deals soon.
            </p>
          ) : (
            <>
              {/* 🔥 Dynamic Quote Text */}
              <h2 className="text-lg font-semibold text-gray-800 text-center">
                {quoteText || "Subscribe to our Newsletter"}
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

// ------------------------
// Popup Container Logic
// ------------------------
const SubscribePopupContainer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { banner } = useAppSelector((s) => s.subscribeBanner);

  // Fetch active banner
  useEffect(() => {
    dispatch(getActiveBanner());
  }, [dispatch]);

  // Show modal once per session
  useEffect(() => {
    const hasShown = sessionStorage.getItem("subscribePromptShown");

    if (!hasShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("subscribePromptShown", "true");
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      {isOpen && banner && (
        <SubscribePopup
          logo="/logo/enlightlogo.png"
          bannerImage={getMediaUrl(banner.images?.[0]?.url)}   // 🔥 Dynamic image
          quoteText={banner.quote_text}                        // 🔥 Dynamic quote
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default SubscribePopupContainer;
