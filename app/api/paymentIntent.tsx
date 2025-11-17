import type { ActionFunctionArgs } from "react-router";
import { stripe } from "~/lib/stripe/server";


export async function action({ request }: ActionFunctionArgs) {
  const { amount ,description} = await request.json(); // amount หน่วยคือ "สตางค์" เช่น 100 = 1.00 บาท

  if (amount <= 0) {
    return Response.json({
      message: "Something went wrong , please contact us.",
      error: true
    });
  }
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount : amount * 100,
      currency: "thb",
      description: description || "Custom booking payment",
    });

    return Response.json({
      clientSecret: paymentIntent.client_secret,
    });

  } catch (error) {

    return Response.json({
      message: "Something went wrong , please contact us.",
      error: error
    });

  }

}
