import { useState } from "react";
import type { BookingModel } from "~/models/booking";
import { bookingService } from "~/services/bookingService";
import { Search, Calendar, Users, Phone, Mail } from "lucide-react";
import { FaLine, FaWhatsapp } from "react-icons/fa";

export default function CheckBooking() {
    const [existBooking, setExistBooking] = useState<BookingModel | null>(null);
    const [bookingID, setBookingID] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function fetchBookingById() {
        setLoading(true);
        setError("");
        setExistBooking(null);

        bookingService
            .getBooking(bookingID)
            .then((data) => {
                if (!data) {
                    setError("Booking not found. Please check your ID again.");
                }
                setExistBooking(data as BookingModel);
            })
            .catch(() => {
                setError("Could not fetch booking. Please try again later.");
                setExistBooking(null);
            })
            .finally(() => setLoading(false));
    }

    return (
        <main className="min-h-[90vh] w-full mx-auto grid md:grid-cols-2 ">
            <div className="flex items-center h-full bg">
                <img src="/images/phi_phi (5).jpg"
                    className="w-full h-full object-cover "
                    alt="" />
            </div>

            <div className="mx-auto w-full max-w-xl pt-6">
                <h1 className="md:text-4xl text-2xl font-semibold mb-6">Check Your Booking</h1>
                <div className="w-full border border-zinc-200 p-6 rounded-2xl shadow-md space-y-4">
                    <label className="flex flex-col space-y-2">
                        <span className="text-sm font-medium">Booking ID</span>
                        <input
                            type="text"
                            value={bookingID}
                            maxLength={20}
                            onChange={(e) => setBookingID(e.target.value)}
                            className="input w-full px-4 py-2 border  rounded-lg focus:ring focus:outline-none"
                            placeholder="e.g. CTG-20251208-009 (16 characters max include '-')"
                        />
                    </label>
                    <button
                        onClick={fetchBookingById}
                        disabled={loading || !bookingID}
                        className="w-full flex items-center justify-center gap-2 bg-[var(--primary-color)] text-white py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50"
                    >
                        <Search size={16} />
                        {loading ? "Checking..." : "Check Booking"}
                    </button>
                    {error && (
                        <div className="text-red-500 text-sm text-center mt-2">{error}</div>
                    )}
                </div>
                {existBooking && (
                    <div className="bg-gray-50 w-full border-zinc-200 p-4 rounded-xl border space-y-3 mt-4">
                        <p className="text-base font-semibold text-gray-800">{existBooking.tourName || "—"}</p>
                        <div className="flex justify-between text-sm text-gray-600 items-center">
                            <span className="flex items-center gap-1">
                                <Users size={14} /> {existBooking.people} people
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar size={14} /> {existBooking.date}
                            </span>
                        </div>
                        <p className="text-xs text-gray-400 truncate">Booking ID: {existBooking.id}</p>
                        <a
                            href={`/checkout?id=${existBooking.id}`}
                            className="mt-3 block text-center bg-[var(--primary-color)] text-white
                   py-2 rounded-lg font-medium hover:opacity-90 transition"
                        >
                            Continue to Checkout
                        </a>
                    </div>
                )}

                {/* Support Section */}
                <div className="pt-4 ">
                    <h3 className="text-sm font-medium text-slate-900 max-w-[300px] mb-3">
                        Need Assistance?
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600">
                        <a target="_blank" href="tel:+66615097533" className="flex items-center gap-2 hover:text-slate-900 transition-colors">
                            <Phone size={14} className="text-slate-400" />
                            <span>+66615097533</span>
                        </a>
                        <a target="_blank" href="mailto:creativetourguru@hotmail.com" className="flex items-center gap-2 hover:text-slate-900 transition-colors">
                            <Mail size={14} className="text-slate-400" />
                            <span>creativetourguru@hotmail.com</span>
                        </a>
                    </div>

                    <div className="flex gap-3 mt-4 pt-3 border-t border-slate-100">
                        <a
                            target="_blank" href="https://wa.me/+66615097533"
                            className="flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900 transition-colors"
                            title="WhatsApp"
                        >
                            <FaWhatsapp size={16} />
                        </a>
                        <a
                            target="_blank" href="https://line.me/ti/p/Z-jqyT7THX"
                            className="flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900 transition-colors"
                            title="LINE"
                        >
                            <FaLine size={16} />
                        </a>
                        <a
                            target="_blank" href="tel:+66615097533"
                            className="flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900 transition-colors"
                            title="Call"
                        >
                            <Phone size={16} />
                        </a>
                        <a
                            target="_blank" href="mailto:creativetourguru@hotmail.com"
                            className="flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900 transition-colors"
                            title="Email"
                        >
                            <Mail size={16} />
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
