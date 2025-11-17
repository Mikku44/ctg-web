import type { Route } from "./+types/privacy-policy";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Privacy policy - Creative Tour Guru" },
    { name: "description", content: "Privacy policy  page" },
  ];
}

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy – Creative Tour Guru</h1>

      <p className="mb-4">
        At Creative Tour Guru, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and booking services.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">1. Information We Collect</h2>
      <p className="mb-4">
        When you use our platform, we may collect the following information:
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>Name, email, phone number, and billing details</li>
        <li>Booking details such as tour name, date, and number of travelers</li>
        <li>Payment information processed through third-party payment providers (Stripe, etc.)</li>
        <li>Usage data such as IP address, browser type, and device information</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3">2. How We Use Your Information</h2>
      <p className="mb-4">
        We use your information to:
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>Process your bookings and payments</li>
        <li>Send booking confirmations, updates, or customer support messages</li>
        <li>Improve our services and website functionality</li>
        <li>Comply with legal obligations</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3">3. Sharing Your Information</h2>
      <p className="mb-4">
        We do not sell or rent your personal data. We may share your information with:
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>Tour providers to fulfill your bookings</li>
        <li>Payment processors to complete transactions</li>
        <li>Authorities if required by law or legal process</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3">4. Security</h2>
      <p className="mb-4">
        We take reasonable measures to protect your data from unauthorized access, disclosure, or alteration. However, no method of transmission over the internet is 100% secure.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">5. Cookies and Tracking</h2>
      <p className="mb-4">
        We may use cookies and similar technologies to improve your experience, analyze usage, and serve relevant content or ads. You can manage cookie preferences through your browser settings.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">6. Your Rights</h2>
      <p className="mb-4">
        You may request access to, correction of, or deletion of your personal data. You can also opt out of marketing communications. Contact us at <a href="mailto:creativetourguru@hotmail.com" className="text-blue-600 underline">creativetourguru@hotmail.com</a> to exercise these rights.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">7. Third-Party Links</h2>
      <p className="mb-4">
        Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites. Please review their privacy policies when visiting.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">8. Changes to this Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated “Last updated” date.
      </p>

      <p className="mt-6 text-sm text-gray-600">
        Last updated: November 2025
      </p>
    </div>
  );
}
