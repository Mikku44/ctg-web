import type { Route } from "./+types/terms-of-use";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Terms of use - Creative Tour Guru" },
    { name: "description", content: "Terms of use  page" },
  ];
}
export default function TermsOfUse() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Terms of Use – Creative Tour Guru</h1>

      <p className="mb-4">
        Welcome to Creative Tour Guru! By accessing or using our website and booking services, you agree to comply with these Terms of Use. Please read them carefully before making any bookings.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">1. Booking and Payments</h2>
      <p className="mb-4">
        All bookings are made online through our platform. Payment must be completed at the time of booking unless otherwise agreed. We accept payments via credit/debit cards and other payment methods available on the platform.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">2. Confirmation</h2>
      <p className="mb-4">
        Once your payment is successful, you will receive a booking confirmation via email. Please check your booking details and contact us immediately if there are any errors.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">3. Cancellation and Refunds</h2>
      <p className="mb-4">
        Cancellations and refunds are subject to our cancellation policy. Certain tours may be non-refundable. Please refer to the specific tour's cancellation policy before booking.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">4. Responsibilities</h2>
      <p className="mb-4">
        Creative Tour Guru acts as a platform connecting travelers with tour providers. We are not liable for any injuries, losses, or damages incurred during the tour. Travelers are responsible for complying with local laws and regulations.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">5. Changes to Tours</h2>
      <p className="mb-4">
        Tour providers may change schedules, availability, or prices. We will notify you of significant changes, but we are not liable for minor adjustments.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">6. Intellectual Property</h2>
      <p className="mb-4">
        All content on Creative Tour Guru, including text, images, logos, and designs, is our property or used with permission. You may not reproduce or distribute our content without prior written consent.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">7. Privacy</h2>
      <p className="mb-4">
        By using our services, you consent to our collection and use of personal information as described in our Privacy Policy.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">8. Governing Law</h2>
      <p className="mb-4">
        These Terms of Use are governed by the laws of Thailand. Any disputes arising from your use of our services will be subject to the jurisdiction of Thai courts.
      </p>

      <p className="mt-6 text-sm text-gray-600">
        Last updated: November 2025
      </p>
    </div>
  );
}
