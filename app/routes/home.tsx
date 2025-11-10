import { Helmet } from "react-helmet";
import type { Route } from "./+types/home";
import TourCard from "~/components/featureCard";
import DesCard from "~/components/destinationCard";
import AutoFadeImage from "~/components/AutoSlideImage";
import { useLocation, useNavigate } from "react-router";
import { tourList } from "~/const/app";
import FadeImageSlideshow from "~/components/FadeImage";

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
      <section className="md:min-h-[560px]  flex justify-between md:flex-row flex-col md:px-0 px-4 py-2 items-center  container-x">
        <img src="/images/background.jpg" className="w-full md:h-[800px] absolute left-0 top-0" alt="" />
        {/* left side */}
        <div className="flex flex-col justify-center relative z-1">

          <div className="rounded-full bg-[var(--primary-color)] w-fit text-white mb-3 font-medium px-4 py-2">Online Booking | Local Guide</div>
          <h1 className="md:text-5xl text-4xl font-semibold text-zinc-900">Travel with Heart,<br /> Explore with Meaning</h1>
          <h2 className="text-2xl  mt-2 font-[300]">
            Meaningful Journeys by Creative Tour Guru Thailand
          </h2>

          <h3 className="text-sm text-zinc-600">By Dr. Prawit (Audi) Charoennuam</h3>

          <div className="flex gap-4 items-center">

            <img src="/logo/payments.svg"
              className="w-[380px] mt-5"
              alt="thailand-tourism-award-creative-tour-guru" />
            <img src="/logo/2011-thailand-tourism-award.png"
              className="max-w-[60px] h-[70px] w-full mt-5"
              alt="thailand-tourism-award-creative-tour-guru" />

          </div>

        </div>

        {/* right side */}
        <div className="">
         <FadeImageSlideshow />
        </div>

      </section>

      <section className=""></section>
      {/* hero */}
      <section className="w-full md:h-[680px] h-full overflow-hidden">
        {/* <div className=" h-[500px] overflow-hidden w-full flex flex-col md:flex-row items-center gap-6">
          <img src="https://images.unsplash.com/photo-1580327942498-53a877c6d0ce?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
            className="w-full h-full object-cover"
            alt="hero ctg page" />
        </div> */}
        <AutoFadeImage images={[
          "/images/thailand6 (9).jpg",
          "/images/thailand6 (4).jpg",
          "/images/thailand8 (8).jpg",

        ]}

          titles={[
            "Thailand",
            "Thailand",
            "Thailand",
          ]}
        />
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
              <button onClick={() => router("/contact")} className="w-[150px] button py-2 mt-5">Book now</button>
            </div>
          </div>
        </div>

        {/* CTA Explore */}
        <div className="flex items-center h-[350px] justify-center flex-col">

          <h2 className="text-4xl font-bold">Ready for your next adventure?</h2>
          <div className="mt-3 text-zinc-500 text-sm">Browse our extensive collection of tours and activities worldwide.</div>
          <button onClick={() => router("/tours")} className=" py-3 button px-5 mt-5">Explore All Tours</button>
        </div>

      </section>

    </main>
  );
}
