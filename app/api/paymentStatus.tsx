// /routes/checkout-session.ts

import type { LoaderFunctionArgs } from "react-router";
import { stripe } from "~/lib/stripe/server";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const clientSecret = url.searchParams.get("clientSecret");



  if (!clientSecret) {
    return Response.json({
      status: "failed",
      message: "Missing payment information.",
    });
  }

  try {
    const paymentIntentId = clientSecret.split("_secret")[0];

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    let message = "";
    switch (paymentIntent.status) {
      case "succeeded":
        message = "Your payment was successful.";
        break;
      case "processing":
        message = "Your payment is processing.";
        break;
      case "requires_payment_method":
        message = "Your payment was unsuccessful. Please try again.";
        break;
      default:
        message = "Unknown payment status.";
    }

    // console.log("RESULT : ",paymentIntent)

    return Response.json({
      status: paymentIntent.status,
      message,
      bookingID: paymentIntent.description,
      paymentId: paymentIntent.id,            
      paymentMethod: "Online",
      paymentDate: new Date(paymentIntent.created * 1000).toISOString()
    });
  } catch (error) {
    return Response.json({
      status: "failed",
      message: "Unable to retrieve payment information.",

    });
  }
}
