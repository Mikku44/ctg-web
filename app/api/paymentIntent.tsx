import type { ActionFunctionArgs } from "react-router";
import Stripe from "stripe";
import { stripe } from "~/lib/stripe/server";


export async function action({ request } : ActionFunctionArgs) {
  const { amount } = await request.json(); // amount หน่วยคือ "สตางค์" เช่น 100 = 1.00 บาท

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "thb",
    description: "Custom booking payment",
  });

  return Response.json({
    clientSecret: paymentIntent.client_secret,
  });
}
