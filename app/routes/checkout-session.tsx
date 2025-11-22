import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import Loading from "~/components/Loading";
import type { BookingModel } from "~/models/booking";
import { bookingService } from "~/services/bookingService";

export default function CheckoutSession() {
  const [status, setStatus] = useState<
    "loading" | "succeeded" | "processing" | "failed" | "requires_action" | "requires_payment_method"
  >("loading");

  const [bookingData, setBookingData] = useState<BookingModel | null>();

  const [message, setMessage] = useState("");

  let navigate = useNavigate();

  const [query, setSearchParams] = useSearchParams();

  // const query = new URLSearchParams(window.location.search);
  const clientSecret = query.get("payment_intent_client_secret");

  useEffect(() => {
    // Read params returned by Stripe redirect


    if (!clientSecret) {
      setStatus("failed");
      setMessage("Payment details not found.");
      return;
    }

    // Retrieve PaymentIntent from Stripe
    const fetchStatus = async () => {
      const res = await fetch(`/api/payment-status?clientSecret=${clientSecret}`);
      const data = await res.json();

      setStatus(data.status);
      setMessage(data.message);

      if (data.status == "succeeded") {
        await handleSuccessPayment(data.bookingID, data.paymentId, data.paymentMethod, data.paymentDate);
      }

    };


    const handleSuccessPayment = async (
      bookingID: string,
      paymentId: string,
      paymentMethod: string,
      paymentDate: string
    ) => {
      const booking = await bookingService.getBooking(bookingID);
      setBookingData(booking);

      if (booking?.status === "paid") {
        return;
      }
      await bookingService.updateBooking(bookingID, {
        status: "paid",
        paymentId,
        paymentMethod,
        paymentDate
      });
    };

    fetchStatus();
  }, []);


  const ticketRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadImage = async () => {
    if (!ticketRef.current) return;

    setIsDownloading(true);
    try {
      window.print();
      // const canvas = await html2canvas(ticketRef.current, {
      //   scale: 2, // Increase scale for better quality
      //   useCORS: true, // If you have external images (e.g., logos), ensure CORS is handled
      //   logging: false,
      // });

      // const image = canvas.toDataURL('image/png', 1.0);
      // const link = document.createElement('a');
      // link.href = image;
      // link.download = `booking-ticket-${bookingData?.id || 'confirmation'}.png`;
      // document.body.appendChild(link); // Required for Firefox
      // link.click();
      // document.body.removeChild(link); // Clean up
    } catch (error) {
      console.error("Error generating image:", error);
      // Optionally show an error message to the user
    } finally {
      setIsDownloading(false);
    }
  };

  if (status === "loading")
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-lg">
        <Loading />
        Checking payment status…
      </div>
    );

  return (
    <main className="min-h-screen flex flex-col items-center justify-center space-y-4  p-6">

      {status === "succeeded" && bookingData && (
        <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto py-12">
          <div className="text-5xl mb-4 text-green-600">✔</div> {/* Simpler, formal checkmark */}
          <h1 className="text-3xl font-semibold text-gray-800 mb-2 text-center">
            Booking Confirmed
          </h1>
          <p className="text-center text-zinc-600 max-w-md">
            {message || "Your booking has been successfully confirmed. Find your detailed ticket below."}
          </p>

          <p className="text-center text-zinc-500 text-sm mt-2 mb-2 max-w-md">
            Please save or print your ticket for easy access during your trip.**
          </p>




          {/* --- Ticket Card Container (for image generation) --- */}
          <div
            ref={ticketRef}
            className="bg-white border border-gray-200 rounded-lg w-full p-8 shadow-sm"
            style={{ maxWidth: '600px', fontFamily: 'Inter, sans-serif' }} // Added font-family for formality
          >
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {bookingData.tourName}
              </h2>
              <span className="text-sm font-medium text-green-700">
                Confirmed
              </span>
            </div>

            {/* Booking Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8 mb-8">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Passenger Name</p>
                <p className="font-medium text-gray-900">{bookingData.firstName} {bookingData.lastName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Trip Date</p>
                <p className="font-medium text-gray-900">{bookingData.date}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Travelers</p>
                <p className="font-medium text-gray-900">{bookingData.people} {bookingData.people > 1 ? 'People' : 'Person'}</p>
              </div>
              {bookingData.packageName && (
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Package</p>
                  <p className="font-medium text-gray-900">{bookingData.packageName}</p>
                </div>
              )}
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Pick-up Hotel</p>
                <p className="font-medium text-gray-900">{bookingData.hotel}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Contact Email</p>
                <p className="font-medium text-gray-900 truncate">{bookingData.email}</p>
              </div>
            </div>

            {/* Price & Booking ID */}
            <div className="pt-6 border-t border-gray-200 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-base text-gray-700 font-medium">Total Paid</span>
                <span className="text-lg font-bold text-gray-900">
                  {bookingData.currency || "THB"} {bookingData.totalPrice.toLocaleString()}
                </span>
              </div>
              {bookingData.paymentMethod && (
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Payment Method</span>
                  <span className="capitalize">{bookingData.paymentMethod}</span>
                </div>
              )}
              {bookingData.id && (
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Booking Reference</span>
                  <span className="font-mono text-xs bg-gray-50 px-2 py-1 rounded">{bookingData.id}</span>
                </div>
              )}
            </div>
          </div>


          {/* --- End Ticket Card Container --- */}

          {/* Action Buttons */}
          <div className="flex no-print gap-4 mt-8">
            <button
              onClick={handleDownloadImage}
              disabled={isDownloading}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isDownloading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Downloading...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  Download Ticket
                </>
              )}
            </button>
            <a
              href="/"
              className="px-6 py-2.5 border border-gray-300 hover:border-gray-400 text-gray-700 font-medium rounded-lg transition duration-200 shadow-sm flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l-7 7m7-7v10a1 1 0 00-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
              Back to Home
            </a>
          </div>
        </div>
      )}

      {status === "processing" && (
        <>
          <div className="text-4xl">⏳</div>
          <h1 className="text-2xl font-bold text-blue-600">Payment Processing</h1>
          <p className="text-zinc-600">We are confirming your payment...</p>
        </>
      )}



      {status === "failed" && (
        <>
          <div className="text-4xl">❌</div>
          <h1 className="text-2xl font-bold text-red-600">Payment Failed</h1>
          <p className="text-zinc-600">{message}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg mt-4"
          >
            Try Again
          </button>
        </>
      )}


      {status === "requires_action" || status === "requires_payment_method" && (
        <>
          <div className="text-4xl">⚡</div>
          <h1 className="text-2xl font-bold text-zinc-600">Payment Waiting</h1>
          <p className="text-zinc-600">{message}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-zinc-600 text-white rounded-lg mt-4"
          >
            Try Again
          </button>
        </>
      )}
    </main>
  );
}
