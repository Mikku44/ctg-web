import { useEffect, useState } from "react";
import { FaArrowUp, FaWhatsapp } from "react-icons/fa";

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
    // format number for WhatsApp (remove spaces and leading 0)
    const phone = "0886587286"; // Thailand country code +66
    const message = encodeURIComponent("Hello! I would like to ask for more information.");
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  return (
    <div className="fixed bottom-5 right-5 flex flex-col items-end gap-3 z-50">
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
