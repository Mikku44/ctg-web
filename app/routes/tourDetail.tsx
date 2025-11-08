import AutoFadeImage from "~/components/AutoSlideImage";
import type { Route } from "./+types/tourDetail";
import type { Package, Tour, TourImage } from "~/models/tour";
import TourCard from "~/components/featureCard";



export default function TourDetail({ params }: Route.MetaArgs) {
  // Mock data for now — replace later with real loader data
  const tour: Tour = {
    id: "1",
    title: "Chiang Mai Adventure",
    slug: "chiang-mai-adventure",
    description:
      "Explore the lush mountains, local villages, and cultural sites of Chiang Mai in this all-inclusive 3-day tour.",
    duration: "3 Days 2 Nights",
    location: "Chiang Mai, Thailand",
    price_from: 6900,
    note: ["Bring hiking shoes", "Light clothing recommended"],
    itinerary: ["Day 1: Arrival and city tour", "Day 2: Doi Inthanon trekking", "Day 3: Local market and farewell"],
    program_detail: "This program offers a balance of adventure and cultural immersion.",
    tour_include: ["Accommodation", "Meals", "Guide", "Transport"],
    not_include: ["Personal expenses", "Travel insurance"],
    cancellation_policy: [
      "Free cancellation up to 7 days before departure",
      "50% refund within 3 days",
      "No refund for same-day cancellations",
    ],
    category_id: "adventure",
    featured_image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
    status: "published",
    created_at: new Date(),
    updated_at: new Date(),
  };

  const images: TourImage[] = [
    {
      id: "1",
      tour_id: "1",
      image_url:
        "https://images.unsplash.com/photo-1580327942498-53a877c6d0ce?auto=format&fit=crop&q=80&w=1170",
    },
    {
      id: "2",
      tour_id: "1",
      image_url:
        "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?auto=format&fit=crop&q=80&w=1332",
    },
    {
      id: "3",
      tour_id: "1",
      image_url:
        "https://images.unsplash.com/photo-1589932896376-5244c8898269?auto=format&fit=crop&q=80&w=1332",
    },
  ];

  const packages: Package[] = [
    {
      id: "p1",
      tour_id: "1",
      name: "Standard Package",
      price: 6900,
      description: "Shared accommodation, group activities",
    },
    {
      id: "p2",
      tour_id: "1",
      name: "Private Package",
      price: 9900,
      description: "Private guide and vehicle",
    },
  ];

  return (
    <main className="min-h-screen text-neutral-900">
      {/* Hero Section */}
      <AutoFadeImage images={images.map((img) => img.image_url)} />

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        <div>
          <h1 className="text-4xl font-semibold mb-2">{tour.title}</h1>
          <p className="text-gray-600">{tour.location}</p>
          <p className="mt-2 text-lg text-gray-700">
            Duration: <span className="font-medium">{tour.duration}</span>
          </p>
          <p className="text-lg font-semibold mt-2 text-emerald-600">
            From ฿{tour.price_from.toLocaleString()}
          </p>
        </div>

        <hr className="border-gray-200" />

        <div>
          <h2 className="text-2xl font-semibold mb-3">Description</h2>
          <p className="leading-relaxed text-gray-700">{tour.description}</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Itinerary</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {tour.itinerary.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Included</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {tour.tour_include.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-3">Not Included</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {tour.not_include.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Available Packages</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="rounded-xl border border-gray-200 p-4 hover:border-emerald-400 transition"
              >
                <h3 className="text-xl font-medium">{pkg.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{pkg.description}</p>
                <p className="mt-3 font-semibold text-emerald-600">
                  ฿{pkg.price.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Cancellation Policy</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {tour.cancellation_policy.map((rule, i) => (
              <li key={i}>{rule}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Notes</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {tour.note.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* recommended tour */}
      {/* featured */}
      <div className="container-x">
        <h2 className="text-2xl font-semibold mb-6 md:mt-10 mt-5">Featured Tours</h2>
        <div className="grid grid-flow-col overflow-x-auto px-2 gap-6 pb-4">
          {/* Tour cards would go here */}
          {[1, 2, 3, 4, 5, 6, 7].map((tour, index) =>
            <TourCard image={"https://images.unsplash.com/photo-1546228139-87f5312cac42?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687"}
              key={index}
              className="min-w-[340px]"
              title="Bangkok temple Thailand"
              description="Relax on the beautiful beaches of Phuket and explore the local markets."
              price="฿5,900"
              rating={4.7}
              duration="3 Days 2 Nights" />)}
        </div>
      </div>
    </main>
  );
}
