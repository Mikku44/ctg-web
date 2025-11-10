import { Helmet } from "react-helmet";
import type { Route } from "./+types/home";
import TourCard from "~/components/featureCard";
import DesCard from "~/components/destinationCard";
import AutoFadeImage from "~/components/AutoSlideImage";
import { useLocation, useNavigate } from "react-router";
import { popularDestinations, tourList } from "~/const/app";
import FadeImageSlideshow from "~/components/FadeImage";
import { motion } from "framer-motion";
import { EqualApproximately } from "lucide-react";

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


const tours = [
  "Unseen Thailand Tour",
  "Local Living Journey",
  "Heritage & Culture Trails",
  "Floating Market & Canal Life",
  "Temple & Spiritual Tour",
  "Nature Escape Adventure",
  "Gastronomy Experience",
  "Soft Power Journey",
  "Luxury Private Tour",
  "Photography & Hidden Gems Tour",
];

export default function Home() {

  const router = useNavigate()

  return (
    <main className="">
      <section className="md:min-h-[560px]  flex justify-between md:flex-row flex-col-reverse gap-5
       md:px-0 px-4 py-2 items-center  container-x">
        {/* <img src="/images/background.jpg" className="w-full md:h-[800px] absolute left-0 top-0" alt="" /> */}
        {/* left side */}
        <div className="flex flex-col justify-center relative z-1">

          <div className="rounded-full bg-[var(--primary-color)] w-fit text-white mb-3 font-medium px-4 py-2">Online Booking | Local Guide</div>
          <h1 className="md:text-5xl text-4xl font-semibold text-zinc-900">Travel with Heart,<br /> Explore with Meaning</h1>
          <h2 className="text-2xl  mt-2 font-[300]">
            Meaningful Journeys by Creative Tour Guru Thailand
          </h2>

          <div className="grid gap-2">
            <img src="/licenese/drp.png" className="w-[100px]" alt="dr.prawit" />
            <h3 className="text-sm text-zinc-600">By Dr. Prawit (Audi) Charoennuam</h3>
          </div>

          <div className="flex gap-4 items-center">

            <img src="/logo/payments.svg"
              className="md:w-[380px] w-[200px] mt-5"
              alt="thailand-tourism-award-creative-tour-guru" />
            <img src="/images/9-awards.png"
              className="md:max-w-[150px] max-w-[100px] mt-5"
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

      <section className="container-x mx-auto md:px-0 px-4 py-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Explore Thailand Like Never Before
          </h2>
          <p className="text-gray-500 mt-3">
            Choose from our signature travel themes — from local living to luxury escapes.
          </p>
        </div>

        <div className="md:p-6 pb-6 bg-white border border-zinc-100 shadow rounded-xl overflow-hidden relative grid md:grid-cols-2 grid-cols-1 gap-8">
          {/* Image Section */}
          <div className="relative md:static md:block md:-translate-x-7 scale-110">
            <div className="absolute md:relative top-0 left-0 w-full md:w-auto h-[250px]
             md:h-full overflow-hidden md:overflow-visible flex items-center justify-center">
              <div className="w-full h-full md:w-[130%] md:h-[130%] bg-black overflow-clip flex items-center justify-center">
                <img
                  src="/images/thailand1 (4).jpg"
                  alt="list"
                  className="object-cover  w-full h-[320px] md:scale-110"
                />
              </div>
            </div>
          </div>

          {/* List Section */}
          <div className="relative z-10 mt-[270px] md:mt-0">
            
            <div className="grid sm:grid-cols-2 gap-4 items-center justify-center">
              {tours.map((tour, i) => (
                <motion.div
                  key={tour}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.05,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2"
                >
                  <EqualApproximately className="text-[var(--primary-color)] text-2xl shrink-0" />
                  <h3 className="text-gray-800 text-base font-light">{tour}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
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
            {popularDestinations?.map((tour, index) =>
              <DesCard image={tour.image || "https://images.unsplash.com/photo-1592117984084-15bc78969be2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1268"}
                key={index}
                title={tour.title} description={tour.description} />)}
          </div>
        </div>
        

        {/* CTA Explore */}
        <div className="flex md:items-center h-[350px] justify-center flex-col">

          <h2 className="text-4xl font-bold">Ready for your next adventure?</h2>
          <div className="mt-3 text-zinc-500 text-sm">Browse our extensive collection of tours and activities worldwide.</div>
          <button onClick={() => router("/tours")} className=" py-3 button px-5 mt-5">Explore All Tours</button>
        </div>

      </section>

    </main>
  );
}
