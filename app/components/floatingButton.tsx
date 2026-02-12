import { useEffect, useState } from "react";
import { FaArrowUp, FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { SiLine } from "react-icons/si"; 
import CartButtonWithDrawer from "./CartButtonWithDrawer";

export default function FloatingButtons() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openWhatsApp = () => {
    const phone = "+66615097533";
    const message = encodeURIComponent("Hello! I would like to ask for more information.");
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  const openLine = () => {
    window.open("https://line.me/ti/p/Z-jqyT7THX", "_blank");
  };

  const makeCall = () => {
    window.location.href = "tel:+66615097533";
  };

  return (
    <div className="fixed bottom-5 right-5 flex flex-col items-end gap-3 z-[99]">
      {/* Cart Button */}
      <CartButtonWithDrawer />

      {/* Phone Call Button */}
      <button
        onClick={makeCall}
        className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg rounded-full p-4 transition-all duration-300 flex items-center justify-center"
        title="Call us"
      >
        <FaPhoneAlt className="text-xl" />
      </button>

      {/* Line Button */}
      <button
        onClick={openLine}
        className="bg-[#06C755] hover:bg-[#05b34c] text-white shadow-lg rounded-full p-4 transition-all duration-300 flex items-center justify-center"
        title="Add us on LINE"
      >
        <SiLine className="text-2xl" />
      </button>

      {/* WhatsApp Button */}
      <button
        onClick={openWhatsApp}
        className="bg-green-500 hover:bg-green-600 text-white shadow-lg rounded-full p-4 transition-all duration-300 flex items-center justify-center"
        title="Chat on WhatsApp"
      >
        <FaWhatsapp className="text-2xl" />
      </button>

      {/* Scroll to Top Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="bg-zinc-800 hover:bg-zinc-900 text-white shadow-lg rounded-full p-4 transition-all duration-300 flex items-center justify-center animate-fade-in"
          title="Scroll to top"
        >
          <FaArrowUp className="text-lg" />
        </button>
      )}
    </div>
  );
}