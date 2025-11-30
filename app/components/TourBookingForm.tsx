import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { FaWhatsapp, FaLine } from "react-icons/fa";
import { Link, redirect, useNavigate } from "react-router";
import { toast } from "sonner";
import { formatCurrency } from "~/lib/utils/currencyFormator";
import { bookingService } from "~/services/bookingService"; // <-- add import

export default function TourBookingForm({
  tour,
  price,
  cover,
  tourName,
  pickup_area,
  deposit
}: {
  tourName?: string;
  tour?: string;
  price?: number;
  deposit?: number;
  cover?: string;
  pickup_area?: string;
}) {

  const router = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    date: "",
    people: "",
    hotel: "",
    special: "",
  });

  const totalPrice =
    price && formData.people ? price * parseInt(formData.people) : 0;

  const totalDepositPrice =
    deposit && formData.people ? deposit * parseInt(formData.people) : 0;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        tourName: tourName || "",
        tour: tour || null,
        price: price || 0,
        totalPrice: totalPrice,
        totalDepositPrice: totalDepositPrice,
        status: "unpaid" as const,
      };



      const result = await bookingService.createBooking(payload as any);

      // 🛒 Save full confirmed booking as "cart"   
      // Save booking into array in localStorage
      const existing = JSON.parse(localStorage.getItem("lastBooking") || "[]");

      // Push newest item to the front
      const updated = [result, ...existing];

      // Optional: limit saved bookings (example: last 5)
      const limited = updated.slice(0, 5);

      localStorage.setItem("lastBooking", JSON.stringify(limited));

      toast.success("Your booking request has been sent!");

      // Redirect to checkout
      router(`/checkout?id=${result.id}`);

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        contact: "",
        date: "",
        people: "",
        hotel: "",
        special: "",
      });

    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  if (typeof window !== "undefined")
    return (
      <div className="min-h-screen container-x md:py-12 py-4">
        <div className="mx-auto bg-white overflow-hidden grid md:grid-cols-2">
          {/* Left */}
          <div className="w-full flex flex-col justify-center space-y-6">
            <div className="w-full h-full rounded-sm overflow-hidden">
              {cover && (
                <img
                  className="w-full h-full object-cover"
                  src={cover}
                  alt={tour}
                />
              )}
            </div>

            <div className="">
              <div className="text-sm">Full Price</div>
              <span className="text-xl font-bold">{formatCurrency(price || 0)}</span>
              <span> / person</span>
            </div>
            {deposit && <div className="">
              <div className="text-sm">Deposit Price</div>
              <span className="text-xl font-bold">{formatCurrency(deposit || 0)}</span>
              <span> / person</span>
            </div>}

            <h3 className="font-semibold text-xl">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <Link to="tel:+66615097533" className="flex items-center gap-2">
                <Phone size={16} /> +66615097533
              </Link>
              <Link
                to="mailto:creativetourguru@hotmail.com"
                className="flex items-center gap-2"
              >
                <Mail size={16} /> creativetourguru@hotmail.com
              </Link>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="size-5" /> Casa-Presto  Wongwaen Pinklao , Moo 3 Sala Klang Subdistrict , Bang Kruai District, Nonthaburi 11130, Thailand
              </li>
            </ul>

            <div className="flex gap-4 mt-4">
              <a
                href="https://wa.me/+66615097533"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
                title="WhatsApp"
              >
                <FaWhatsapp size={18} />
              </a>
              <a
                href="tel:+66615097533"
                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
                title="Call us"
              >
                <Phone size={18} />
              </a>
              <a
                href="mailto:creativetourguru@hotmail.com"
                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
                title="Send email"
              >
                <Mail size={18} />
              </a>
              <a
                href="https://line.me/ti/p/Z-jqyT7THX"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
                title="Chat on LINE"
              >
                <FaLine size={18} />
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <form onSubmit={handleSubmit} className="p-4 space-y-6">
            <h3 className="text-gray-800 font-medium text-4xl mb-4">
              Book Your Tour
            </h3>

            {/* First + Last */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  First Name <span className="text-red-600">*</span>
                </label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Last Name <span className="text-red-600">*</span>
                </label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col mt-4">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            {/* Contact */}
            <div className="flex flex-col mt-4">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Contact Number <span className="text-red-600">*</span>
              </label>
              <input
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            {/* Date + People */}
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Tour Date <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Number of Guests <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  name="people"
                  value={formData.people}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
            </div>

            {/* Hotel */}
            <div className="flex flex-col mt-4">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Hotel for Pick-Up
              </label>
              <div className="text-sm text-gray-500">{pickup_area}</div>
              <input
                name="hotel"
                value={formData.hotel}
                onChange={handleChange}
                className="input"
              />
            </div>

            {/* Special */}
            <div className="flex flex-col mt-4">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Special Requirements
              </label>
              <textarea
                name="special"
                rows={4}
                value={formData.special}
                onChange={handleChange}
                className="input resize-none"
              />
            </div>

            {(formData.people) && !totalDepositPrice && (
              <div className="p-4 bg-gray-100 flex justify-between text-gray-800">
                <div>
                  Price per person: <strong>฿{price?.toLocaleString() || 0}</strong>
                </div>
                <div>
                  Total: <strong>฿{totalPrice.toLocaleString()}</strong>
                </div>
              </div>
            )}
            {(formData.people) && totalDepositPrice && (
              <div className="p-4 bg-gray-100 flex justify-between text-gray-800">
                <div>
                  Price per person: <strong>฿{price?.toLocaleString() || 0}</strong>
                </div>
                <div className="flex flex-col items-end justify-end" >
                  <div>
                    Deposit : <strong>฿{totalDepositPrice.toLocaleString()}</strong>
                  </div>
                  <div className="text-[12px]">
                   Total : <strong>฿{totalPrice.toLocaleString()}</strong>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 button text-white font-medium disabled:opacity-50"
            >
              {loading ? "Processing..." : "Continue"}
            </button>
          </form>
        </div>
      </div>
    );
}
