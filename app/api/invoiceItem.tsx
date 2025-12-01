import type { ActionFunctionArgs } from "react-router";
import { stripe } from "~/lib/stripe/server";

export async function action({ request }: ActionFunctionArgs) {
  try {
    const { amount, description, email, date, bookingId, bill_to } = await request.json();
    // amount หน่วยคือ "สตางค์" เช่น 100 = 1.00 บาท

    if (amount <= 0) {
      return Response.json({
        message: "Invalid amount. Please contact support.",
        error: true,
      });
    }



    // 1️⃣ สร้างหรือค้นหา Stripe Customer
    const customer = await stripe.customers.create({
      email: email || undefined,
      description: bill_to || "Tour booking customer [from CTG Web]",
    });


    // 3️⃣ สร้าง Invoice
    const bookingDate = new Date(date); // your booking date
    const today = new Date();

    // Subtract 2 days from booking date
    const dueDate = new Date(bookingDate);
    dueDate.setDate(dueDate.getDate() - 2);

    // Calculate difference in days
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const invoice = await stripe.invoices.create({
      customer: customer.id,
      collection_method: "send_invoice",
      days_until_due: diffDays > 0 ? diffDays : 0, // must be >=0
    });

    await stripe.invoiceItems.create({
      customer: customer.id,
      amount: amount, // amount เป็นสตางค์
      currency: "thb",
      description: description || "Custom booking payment",

    });

    await stripe.invoices.update(invoice.id, {
      metadata: {
        bookingID: bookingId,
      },
    });



    const finalInvoice = await stripe.invoices.sendInvoice(invoice.id);

    // const finalInvoice = await stripe.invoices.finalizeInvoice(invoice.id);

    // await sendInvoice(invoice.id);

    // console.log("Stripe invoice created:", invoice);


    return Response.json({
      message: "Invoice created successfully",
      invoiceId: invoice.id,
      invoiceUrl: finalInvoice.invoice_pdf, // ลูกค้าสามารถเปิดเพื่อจ่าย
    });
  } catch (error) {
    console.error("Stripe invoice error:", error);
    return Response.json({
      message: "Something went wrong, please contact support.",
      error,
    });
  }
}
