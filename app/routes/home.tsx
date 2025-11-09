import { Helmet } from "react-helmet";
import type { Route } from "./+types/home";
import TourCard from "~/components/featureCard";
import DesCard from "~/components/destinationCard";
import AutoFadeImage from "~/components/AutoSlideImage";
import { useLocation, useNavigate } from "react-router";
import { tourList } from "~/const/app";

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

  const router = useNavigate()

  return (
    <main className="">
      {/* hero */}
      <section className="w-full md:h-[680px] h-full overflow-hidden">
        {/* <div className=" h-[500px] overflow-hidden w-full flex flex-col md:flex-row items-center gap-6">
          <img src="https://images.unsplash.com/photo-1580327942498-53a877c6d0ce?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
            className="w-full h-full object-cover"
            alt="hero ctg page" />
        </div> */}
        <AutoFadeImage images={[
          "https://images.unsplash.com/photo-1580327942498-53a877c6d0ce?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
          "https://plus.unsplash.com/premium_photo-1693149386423-2e4e264712e5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1332",
          "https://images.unsplash.com/photo-1589932896376-5244c8898269?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1332",
          "https://plus.unsplash.com/premium_photo-1664910039021-a1bfcc6574b9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1172",

        ]} />
      </section>

      <section className="container-x mb-20">
        {/* featured */}
        <div className="">
          <h2 className="text-2xl font-semibold mb-6 md:mt-10 mt-5">Featured Tours</h2>
          <div className="grid md:grid-cols-4 grid-cols-1 px-2 gap-6 overflow-x-auto pb-4">
            {/* Tour cards would go here */}
            {tourList.map((tour) => (
              <TourCard
                key={tour.id}
                image={tour.image}
                title={tour.title}
                description={tour.description}
                price={tour.price}
                rating={tour.rating}
                duration={tour.duration}
              />
            ))}
          </div>
        </div>
        {/* Popular Destinations */}
        <div className="">
          <h2 className="text-2xl font-semibold mb-6 md:mt-10 mt-5">Popular Destinations</h2>
          <div className="grid md:grid-cols-4 grid-cols-2 gap-6 overflow-x-auto pb-4">
            {/* Tour cards would go here */}
            {[1, 2, 3].map((tour, index) =>
              <DesCard image={"https://images.unsplash.com/photo-1592117984084-15bc78969be2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1268"}
                key={index}
                title={"Thailand"} description={""} />)}
          </div>
        </div>
        {/* Promotions */}
        <div className="">
          <h2 className="text-2xl font-semibold mb-6 md:mt-10 mt-5">Promotions</h2>
          {/* Promotion Card */}
          <div className=" gap-10 group bg-white border border-zinc-50 overflow-hidden shadow flex h-[320px]">
            <div className="w-full flex items-center justify-center overflow-hidden">
              <img src="https://images.unsplash.com/photo-1704550124683-d2bf614a0be8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1331"
                alt="beach promotion cover "
                className="w-full h-full object-cover group-hover:scale-105 duration-200"
              />
            </div>
            {/* promotion detail */}

            <div className="w-full flex  flex-col justify-center">
              <h3 className="text-xl font-bold">Summer Sale</h3>
              <p className="font-thin text-lg">Get up to 30% off on selected tours this summer.</p>
              <button onClick={() => router("/contact")} className="w-[150px] py-2 mt-5">Book now</button>
            </div>
          </div>
        </div>

        {/* CTA Explore */}
        <div className="flex items-center h-[350px] justify-center flex-col">

          <h2 className="text-4xl font-bold">Ready for your next adventure?</h2>
          <div className="mt-3 text-zinc-500 text-sm">Browse our extensive collection of tours and activities worldwide.</div>
          <button onClick={() => router("/tours")} className=" py-3  px-5 mt-5">Explore All Tours</button>
        </div>

      </section>

    </main>
  );
}
