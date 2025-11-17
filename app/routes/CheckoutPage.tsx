// CheckoutPage.tsx
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { VscBracketError, VscError } from "react-icons/vsc";
import { Link, useSearchParams } from "react-router";
import { FileWarning, Mail, MapPin, Phone } from "lucide-react";
import { FaLine, FaWhatsapp } from "react-icons/fa";
import { type Tour } from "~/models/tour";
import { type BookingModel } from "~/models/booking";
import { bookingService } from "~/services/bookingService";
import { tourService } from "~/services/tourService";
import type { Route } from "./+types/CheckoutPage";
import { toast } from "sonner";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Checkout - Creative Tour Guru" },
    { name: "description", content: "checkout  page" },
  ];
}


export default function CheckoutPage() {

  const [clientSecret, setClientSecret] = useState("");
  const [booking, setBooking] = useState<BookingModel | null>();
  const [tourDetail, setTourDetail] = useState<Tour | null>();
  const [isError, setIsError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("id")



  useEffect(() => {
    if (query)
      bookingService.getBooking(query).then((result) => {
        if (result) {
          tourService.getById(result.tour).then(tour => {
            setTourDetail(tour)
          });
          setBooking(result);

          fetch("/api/payment-intent", {
            method: "POST",
            body: JSON.stringify({ amount: result.totalPrice,description : result.id }),
            headers: { "Content-Type": "application/json" },
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.message) {
                toast.error(data.message);
                setIsError(true)
                return;
              }
              setClientSecret(data.clientSecret)
            });
        }
      })
  }, []);

  if (isError)
    return (
       <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-fit w-full text-center p-8 space-y-6">
        
        {/* Icon */}
        <div className="flex justify-center">
          <VscError size={56} className="text-red-500" />
        </div>

        {/* Message */}
        <h1 className="text-2xl font-semibold text-zinc-800">
          Oops! Something went wrong
        </h1>
        <p className="text-zinc-500 text-sm">
          An unexpected error occurred. Please try again or contact support if the problem persists.
        </p>

        {/* Contact Section */}
        <div className="pt-4 border-t border-zinc-200">
          <h2 className="text-sm font-medium text-zinc-700 mb-2">Need help?</h2>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a
              href="https://wa.me/0993210694"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-3 py-2 border border-zinc-200 rounded-md hover:bg-green-50 transition"
              title="WhatsApp"
            >
              <FaWhatsapp size={18} className="text-green-500" />
              WhatsApp
            </a>
            <a
              href="tel:0993210694"
              className="flex items-center justify-center gap-2 px-3 py-2 border border-zinc-200 rounded-md hover:bg-slate-50 transition"
              title="Call"
            >
              <Phone size={18} className="text-zinc-700" />
              Call
            </a>
            <a
              href="mailto:creativetourguru@hotmail.com"
              className="flex items-center justify-center gap-2 px-3 py-2 border border-zinc-200 rounded-md hover:bg-slate-50 transition"
              title="Email"
            >
              <Mail size={18} className="text-zinc-700" />
              Email
            </a>
            <a
              href="https://line.me/ti/p/~0993210694"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-3 py-2 border border-zinc-200 rounded-md hover:bg-green-50 transition"
              title="LINE"
            >
              <FaLine size={18} className="text-green-600" />
              LINE
            </a>
          </div>
        </div>

        {/* Back Home Button */}
        <div className="pt-4">
          <Link
            to="/"
            className="inline-block px-6 py-3 button text-white font-medium rounded-lg hover:bg-red-600 transition"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
    );

  if (!clientSecret)
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-slate-300 border-r-transparent mb-4"></div>
          <p className="text-sm text-slate-600">Preparing payment</p>
        </div>
      </div>
    );

  if (!booking || !query) {
    return (
      <div className="min-h-[70vh] w-full flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-lg p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-slate-100 mx-auto mb-4 flex items-center justify-center">
            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          <h2 className="text-xl font-semibold text-slate-900 mb-2">
            Booking Not Found
          </h2>

          <p className="text-sm text-slate-600 mb-6">
            We could not locate your booking. Please verify your booking reference or contact our support team for assistance.
          </p>

          <a
            href="/"
            className="inline-block px-6 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-md hover:bg-slate-800 transition-colors"
          >
            Return to Homepage
          </a>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full bg-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-900">Complete Your Booking</h1>
          <p className="text-sm text-slate-600 mt-1">Review your booking details and proceed with payment</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">

          {/* LEFT PANEL — BOOKING DETAILS */}
          <section className="lg:col-span-3 bg-white border border-slate-200 rounded-lg overflow-hidden">

            {/* Tour Image */}
            {tourDetail?.featured_image && (
              <div className="aspect-video w-full bg-slate-100 overflow-hidden">
                <img
                  src={tourDetail.featured_image}
                  alt={tourDetail.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-6 space-y-6">

              {/* Tour Information */}
              <div>
                <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-3">
                  Tour Information
                </h2>
                <div className="space-y-2.5">
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600">Tour</span>
                    <span className="text-sm font-medium text-slate-900">{tourDetail?.title}</span>
                  </div>

                  {booking.packageName && (
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-600">Package</span>
                      <span className="text-sm font-medium text-slate-900">{booking.packageName}</span>
                    </div>
                  )}

                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600">Date</span>
                    <span className="text-sm font-medium text-slate-900">{booking.date}</span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600">Number of Guests</span>
                    <span className="text-sm font-medium text-slate-900">{booking.people}</span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600">Price per Person</span>
                    <span className="text-sm font-medium text-slate-900">
                      {booking.price?.toLocaleString()} {booking.currency}
                    </span>
                  </div>
                </div>
              </div>

              {/* Guest Information */}
              <div>
                <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-3">
                  Guest Information
                </h2>
                <div className="space-y-2.5">
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600">Name</span>
                    <span className="text-sm font-medium text-slate-900">
                      {booking.firstName} {booking.lastName}
                    </span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600">Email</span>
                    <span className="text-sm font-medium text-slate-900">{booking.email}</span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600">Phone</span>
                    <span className="text-sm font-medium text-slate-900">{booking.contact}</span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600">Hotel Pickup</span>
                    <span className="text-sm font-medium text-slate-900">{booking.hotel}</span>
                  </div>

                  {booking.special && (
                    <div className="py-2">
                      <span className="text-sm text-slate-600 block mb-1">Special Request</span>
                      <span className="text-sm text-slate-900">{booking.special}</span>
                    </div>
                  )}
                </div>
              </div>


              {/* Support Section */}
              <div className="pt-4 border-t border-slate-200">
                <h3 className="text-sm font-medium text-slate-900 mb-3">
                  Need Assistance?
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600">
                  <a href="tel:0993210694" className="flex items-center gap-2 hover:text-slate-900 transition-colors">
                    <Phone size={14} className="text-slate-400" />
                    <span>099 321 0694</span>
                  </a>
                  <a href="mailto:creativetourguru@hotmail.com" className="flex items-center gap-2 hover:text-slate-900 transition-colors">
                    <Mail size={14} className="text-slate-400" />
                    <span>creativetourguru@hotmail.com</span>
                  </a>
                </div>

                <div className="flex gap-3 mt-4 pt-3 border-t border-slate-100">
                  <a
                    href="https://wa.me/0993210694"
                    className="flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900 transition-colors"
                    title="WhatsApp"
                  >
                    <FaWhatsapp size={16} />
                  </a>
                  <a
                    href="https://line.me/ti/p/~0993210694"
                    className="flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900 transition-colors"
                    title="LINE"
                  >
                    <FaLine size={16} />
                  </a>
                  <a
                    href="tel:0993210694"
                    className="flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900 transition-colors"
                    title="Call"
                  >
                    <Phone size={16} />
                  </a>
                  <a
                    href="mailto:creativetourguru@hotmail.com"
                    className="flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900 transition-colors"
                    title="Email"
                  >
                    <Mail size={16} />
                  </a>
                </div>
              </div>

            </div>
          </section>

          {/* RIGHT PANEL — PAYMENT */}
          <section className="lg:col-span-2">
            <div className="bg-white border border-slate-200 rounded-lg p-6  top-6">
              <Elements stripe={stripePromise} options={{
                clientSecret,
                appearance: { theme: "flat" },

              }}

              >
                <CheckoutForm booking={{ ...booking, tourName: tourDetail?.title || "" }} />
              </Elements>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}


function CheckoutForm({ booking }: { booking: BookingModel }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout-session`,
      },
    });



    if (error) {
      setMessage(error.message || "Payment failed");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-1">Payment Details</h2>
        <p className="text-xs text-slate-600">Complete your secure payment below</p>
      </div>


      {/* Total */}
      <div className="text-xl font-bold">{booking.tourName}</div>
      <div className="pt-4 border-t-2 border-slate-200">
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold text-slate-900">Total Amount</span>
          <span className="text-xl font-bold text-slate-900">
            {booking.totalPrice.toLocaleString()} THB
          </span>
        </div>
      </div>

      <div className="pt-2">
        <PaymentElement />
      </div>

      {message && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
          {message}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-[var(--primary-color)] text-white py-3 px-4 rounded-md text-sm font-medium hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-r-transparent"></span>
            Processing
          </span>
        ) : (
          "Complete Payment"
        )}
      </button>

      <p className="text-xs text-slate-500 leading-relaxed pt-2">
        By completing this payment, you agree to our{" "}
        <a href="/terms-of-use" className="text-slate-700 underline hover:text-slate-900">
          Terms of Use
        </a>{" "}
        and Refund Policy. Your payment information is encrypted and secure.
      </p>

    </form>
  );
}