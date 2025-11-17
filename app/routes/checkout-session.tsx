import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { bookingService } from "~/services/bookingService";

export default function CheckoutSession() {
  const [status, setStatus] = useState<
    "loading" | "succeeded" | "processing" | "failed" | "requires_action" | "requires_payment_method"
  >("loading");

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
      await bookingService.updateBooking(bookingID, {
        status: "paid",
        paymentId,
        paymentMethod,
        paymentDate
      });
    };

    fetchStatus();
  }, []);

  if (status === "loading")
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Checking payment status…
      </div>
    );

  return (
    <main className="min-h-screen flex flex-col items-center justify-center space-y-4 text-center p-6">

      {status === "succeeded" && (
        <>
          <div className="text-4xl">🎉</div>
          <h1 className="text-2xl font-bold text-green-600">Payment Successful</h1>
          <p className="text-zinc-600">{message}</p>
          <a
            href="/"
            className="px-4 py-2 bg-green-600 text-white rounded-lg mt-4"
          >
            Back to Home
          </a>
        </>
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
