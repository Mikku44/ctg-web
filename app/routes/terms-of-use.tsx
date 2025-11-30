import type { Route } from "./+types/terms-of-use";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Terms of Use - Creative Tour Guru Thailand" },
    { name: "description", content: "Terms & Conditions and FAQ for Creative Tour Guru Thailand." },
  ];
}

export default function TermsOfUse() {
  return (
    <Terms />
  );
}


export function Terms() {
  return <div className="container mx-auto px-4 py-8 max-w-4xl prose prose-slate">
    <h1 className="text-4xl font-bold">Terms & Conditions</h1>
    <h2 className="text-xl font-semibold  mt-6">
      Creative Tour Guru Thailand – Private Tours & Cultural Experiences
    </h2>

    {/* SECTION 1 */}
    <h3 className="font-semibold mt-6">1. Booking & Confirmation</h3>
    <ul className="list-disc ml-8 mt-2">
      <li>Bookings can be made via email, WhatsApp, Line, or our website.</li>
      <li>One-day and half-day tours require full payment in advance.</li>
      <li>Multi-day tours require a 30–50% deposit depending on arrangements.</li>
      <li>Your booking is confirmed once written confirmation is issued.</li>
    </ul>

    {/* SECTION 2 */}
    <h3 className="font-semibold mt-6">2. Payment Policy</h3>

    <h4 className="font-medium mt-3">One-Day / Half-Day Tours</h4>
    <ul className="list-disc ml-8 mt-2">
      <li>Full payment is required before the tour date.</li>
      <li>Payment must be completed upon receiving the invoice.</li>
    </ul>

    <h4 className="font-medium mt-3">Multi-Day Tours</h4>
    <ul className="list-disc ml-8 mt-2">
      <li>A 30–50% deposit is required upon booking.</li>
      <li>Remaining balance may be paid before the tour or on the first day.</li>
    </ul>

    <h4 className="font-medium mt-3">Payment Methods</h4>
    <ul className="list-disc ml-8 mt-2">
      <li>Cash (THB)</li>
      <li>Bank transfer</li>
      <li>Credit card (3% surcharge applies)</li>
      <li>Secure online payment link (if available)</li>
    </ul>

    <h4 className="font-medium mt-3">Credit Card Surcharge</h4>
    <ul className="list-disc ml-8 mt-2">
      <li>A 3% surcharge applies to all card payments.</li>
      <li>International cards may incur additional bank fees.</li>
    </ul>

    {/* SECTION 3 */}
    <h3 className="font-semibold mt-6">3. Cancellation Policy</h3>

    <h4 className="font-medium mt-3">One-Day / Half-Day Tours</h4>
    <ul className="list-disc ml-8 mt-2">
      <li>More than 48 hours before tour: 50% refund</li>
      <li>Within 48 hours: non-refundable</li>
      <li>No-show: 100% charge</li>
    </ul>

    <h4 className="font-medium mt-3">Multi-Day Tours</h4>
    <ul className="list-disc ml-8 mt-2">
      <li>Refunds follow hotel/supplier policies.</li>
      <li>Prepaid services may be non-refundable.</li>
    </ul>

    {/* SECTION 4 */}
    <h3 className="font-semibold mt-6">4. Changes to Itinerary</h3>
    <p>
      We may adjust the itinerary due to weather, safety, traffic, or unforeseen circumstances.
      Alternative options of equal or better value will be provided when possible.
    </p>

    {/* SECTION 5 */}
    <h3 className="font-semibold mt-6">5. Weather Conditions</h3>
    <ul className="list-disc ml-8 mt-2">
      <li>Tours operate in most weather conditions.</li>
      <li>Some activities may be modified for safety.</li>
      <li>Refunds cannot be issued due to weather-related changes.</li>
    </ul>

    {/* SECTION 6 */}
    <h3 className="font-semibold mt-6">6. Health & Safety</h3>
    <ul className="list-disc ml-8 mt-2">
      <li>Please inform us of medical conditions, allergies, or mobility limitations.</li>
      <li>Some activities may not be suitable for guests with health issues.</li>
      <li>We may decline participation for safety reasons.</li>
    </ul>

    {/* SECTION 7 */}
    <h3 className="font-semibold mt-6">7. Children Policy</h3>
    <ul className="list-disc ml-8 mt-2">
      <li>Children under 5 years old may join for free (varies by tour).</li>
      <li>Children must be accompanied by an adult.</li>
      <li>Infant car seats may be required—please request in advance.</li>
    </ul>

    {/* SECTION 8 */}
    <h3 className="font-semibold mt-6">8. Personal Belongings</h3>
    <p>Guests are responsible for their personal items. We are not liable for lost or damaged belongings.</p>

    {/* SECTION 9 */}
    <h3 className="font-semibold mt-6">9. Liability & Insurance</h3>
    <p>We are not responsible for injuries, accidents, or losses caused by:</p>
    <ul className="list-disc ml-8 mt-2">
      <li>Third-party operators</li>
      <li>Natural events</li>
      <li>Guest negligence</li>
    </ul>
    <p>We strongly recommend purchasing travel insurance.</p>

    {/* SECTION 10 */}
    <h3 className="font-semibold mt-6">10. Transportation</h3>
    <ul className="list-disc ml-8 mt-2">
      <li>Private transport includes licensed drivers and inspected vehicles.</li>
      <li>Seat belts must be worn at all times.</li>
      <li>Delays may occur due to traffic.</li>
    </ul>

    {/* SECTION 11 */}
    <h3 className="font-semibold mt-6">11. Photography & Video</h3>
    <p>
      Photos taken during the tour may be used for non-commercial promotional purposes unless requested otherwise.
    </p>

    {/* SECTION 12 */}
    <h3 className="font-semibold mt-6">12. Code of Conduct</h3>
    <ul className="list-disc ml-8 mt-2">
      <li>Please respect Thai culture, religious sites, guides, and drivers.</li>
      <li>Guests under excessive alcohol influence may be denied service for safety reasons.</li>
    </ul>

    {/* SECTION 13 */}
    <h3 className="font-semibold mt-6">13. Contact & Support</h3>
    <p>For inquiries, contact us via WhatsApp, Line, email, or phone.</p>

    {/* FAQ */}
    <hr className="my-10" />
    <h2 className="text-2xl font-bold">FAQ – Frequently Asked Questions</h2>

    <h3 className="font-semibold mt-6">1. Do I need to pay a deposit?</h3>
    <ul className="list-disc ml-8 mt-2">
      <li>One-day and half-day tours: full payment required.</li>
      <li>Multi-day tours: 30–50% deposit.</li>
    </ul>

    <h3 className="font-semibold mt-6">2. How can I pay?</h3>
    <ul className="list-disc ml-8 mt-2">
      <li>Bank transfer</li>
      <li>Credit card (3% surcharge)</li>
      <li>Secure online payment link (if available)</li>
    </ul>

    <h3 className="font-semibold mt-6">3. Can I cancel or change my booking?</h3>
    <p><strong>One-Day / Half-Day Tours:</strong></p>
    <ul className="list-disc ml-8 mt-2">
      <li>48+ hours: 50% refund</li>
      <li>Within 48 hours: non-refundable</li>
      <li>No-show: 100% charge</li>
    </ul>
    <p><strong>Multi-Day Tours:</strong> Refunds follow hotel/supplier policies.</p>

    <h3 className="font-semibold mt-6">4. Do you accept credit cards?</h3>
    <p>Yes, Visa and MasterCard. A 3% surcharge applies.</p>

    <h3 className="font-semibold mt-6">5. What if it rains?</h3>
    <ul className="list-disc ml-8 mt-2">
      <li>Tours run in most weather conditions.</li>
      <li>Outdoor activities may be modified for safety.</li>
    </ul>

    <h3 className="font-semibold mt-6">6. Are tours private or shared?</h3>
    <p>All tours are fully private except certain third-party activities like boats, shows, or cruises.</p>

    <h3 className="font-semibold mt-6">7. Do you provide pick-up and drop-off?</h3>
    <p>Yes, included in most tours in Bangkok, Chiang Mai, and Phuket.</p>

    <h3 className="font-semibold mt-6">8. Can I customize my itinerary?</h3>
    <p>Yes, all tours are customizable.</p>

    <h3 className="font-semibold mt-6">9. Temple dress code?</h3>
    <ul className="list-disc ml-8 mt-2">
      <li>Shoulders covered</li>
      <li>Knee-length shorts/skirts</li>
      <li>Remove hats</li>
    </ul>

    <h3 className="font-semibold mt-6">10. What’s included?</h3>
    <ul className="list-disc ml-8 mt-2">
      <li>Private vehicle</li>
      <li>English-speaking guide</li>
      <li>Bottled water</li>
      <li>Hotel pick-up/drop-off</li>
    </ul>

    <h3 className="font-semibold mt-6">Tipping Guidelines</h3>
    <ul className="list-disc ml-8 mt-2">
      <li>Guide: THB 300–500 per person/day</li>
      <li>Driver: THB 200–300 per person/day</li>
    </ul>
  </div>
}