import { Helmet } from "react-helmet";
import type { Route } from "./+types/home";
import TourCard from "~/components/featureCard";
import DesCard from "~/components/destinationCard";

export function meta({ }: Route.MetaArgs) {
  return [{ title: "Creative Tour Guru (Thailand) | Explore Unique Adventures & Local Experiences" },
  { name: "description", content: "Discover unique tours, authentic local experiences, and hidden gems across Thailand with Creative Tour Guru — your travel companion for inspiration and unforgettable journeys.", },
  { name: "keywords", content: "Thailand tours, local travel, adventure, experiences, travel guide, Creative Tour Guru" },
  { name: "author", content: "Creative Tour Guru" },
  { property: "og:title", content: "Creative Tour Guru (Thailand)" },
  { property: "og:description", content: "Explore unique tours and authentic local experiences in Thailand." },
  { property: "og:type", content: "website" },
  { property: "og:locale", content: "en_US" },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: "Creative Tour Guru (Thailand)" },
  { name: "twitter:description", content: "Discover Thailand through creative and local adventures." },];
}

export default function Home() {
  return (
    <main className="container-x mt-20 ">
      {/* hero */}
      <section className="">
        <div className="rounded-4xl h-[500px] overflow-hidden w-full flex flex-col md:flex-row items-center gap-6">
          <img src="https://images.unsplash.com/photo-1580327942498-53a877c6d0ce?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
            className="w-full h-full object-cover"
            alt="hero ctg page" />
        </div>
      </section>

      {/* featured */}
      <div className="">
        <h2 className="text-2xl font-semibold mb-6 mt-10">Featured Tours</h2>
        <div className="grid md:grid-cols-4 grid-cols-2 gap-6 overflow-x-auto pb-4">
          {/* Tour cards would go here */}
          {[1, 2, 3, 4, 5, 6, 7].map((tour, index) =>
            <TourCard image={"https://images.unsplash.com/photo-1546228139-87f5312cac42?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687"}
              key={index}
              title="Phuket Beach Escape"
              description="Relax on the beautiful beaches of Phuket and explore the local markets."
              price="฿5,900"
              rating={4.7}
              duration="3 Days 2 Nights" />)}
        </div>
      </div>


      {/* Popular Destinations */}
      <div className="">
        <h2 className="text-2xl font-semibold mb-6 mt-10">Popular Destinations</h2>
        <div className="grid md:grid-cols-4 grid-cols-2 gap-6 overflow-x-auto pb-4">
          {/* Tour cards would go here */}
          {[1, 2, 3].map((tour, index) =>
            <DesCard image={"https://images.unsplash.com/photo-1592117984084-15bc78969be2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1268"}
              key={index}
              title={"Thailand"} description={""} />)}
        </div>
      </div>

    </main>
  );
}
