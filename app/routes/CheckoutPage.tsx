// CheckoutPage.tsx
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51STLt8Dfts3M8cwi4K4DnvT0ImRjQuCsfF4eTz9wxqqQDtv9wrSgEstRpP1m3FtD8qsx02XO8hnYJozsdgN43dsv00TuaFJCYl");

const amount = 15000

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // เรียก API เพื่อสร้าง PaymentIntent
    fetch("/api/payment-intent", {
      method: "POST",
      body: JSON.stringify({ amount }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  if (!clientSecret)
    return <div className="p-4">Preparing payment…</div>;

  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret }}
    >
      <CheckoutForm />
    </Elements>
  );
}


function CheckoutForm() {
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
        return_url: `${window.location.origin}/payment-success`,
      },
    });

    if (error) {
      setMessage(error.message || "Payment failed");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-4 bg-white shadow rounded-xl">
      <PaymentElement />

      {message && (
        <div className="p-2 bg-red-100 text-red-600 rounded">{message}</div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4 hover:bg-blue-700"
      >
        {loading ? "Processing…" : "Pay Now"}
      </button>
    </form>
  );
}