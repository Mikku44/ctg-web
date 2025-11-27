import type { Route } from "./+types/home";
import DesCard from "~/components/destinationCard";
import AutoFadeImage from "~/components/AutoSlideImage";
import { Link, useLoaderData, useLocation, useNavigate } from "react-router";
import { popularDestinations, tourList } from "~/const/app";
import FadeImageSlideshow from "~/components/FadeImage";
import { motion } from "framer-motion";
import { Calendar, Camera, Check, Compass, EqualApproximately, Heart, MapPin, Users, Utensils } from "lucide-react";
import { TourCard, type TourCardProps } from "~/components/featureCard";
import { useEffect, useState } from "react";
import { tourService } from "~/services/tourService";
import type { Tour } from "~/models/tour";
import Loading from "~/components/Loading";
import BlogCard from "~/components/BlogCard";
import { blogService } from "~/services/blogService";
import type { IBlogModel } from "~/models/blog";

export function meta({ }: Route.MetaArgs) {
  return [{ title: "Creative Tour Guru (Thailand) | Explore Unique Adventures & Local Experiences" },
  { name: "description", content: "Discover unique tours, authentic local experiences, and hidden gems across Thailand with Creative Tour Guru — your travel companion for inspiration and unforgettable journeys.", },
  { name: "keywords", content: "Thailand tours, local travel, adventure, experiences, travel guide, Creative Tour Guru" },
  { name: "author", content: "Creative Tour Guru" },
  { property: "og:title", content: "Creative Tour Guru (Thailand)" },
  { property: "og:description", content: "Explore unique tours and authentic local experiences in Thailand." },
  { property: "og:type", content: "website" },
  { property: "og:locale", content: "en_US" },
  { property: "og:type", content: "website" },
  { property: "og:url", content: "https://creativetourguruthailand.com" },
  { property: "og:image", content: "https://creativetourguruthailand.com/og-images/og-image.jpg" },
  { property: "og:image:width", content: "1200" },
  { property: "og:image:height", content: "630" },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: "Creative Tour Guru (Thailand)" },
  { name: "twitter:description", content: "Discover Thailand through creative and local adventures." },];
}


const tours = [
  { name: "Cultural Immersion", icon: Compass },
  { name: "Adventure Tours", icon: MapPin },
  { name: "Group Travel", icon: Users },
  { name: "Custom Itineraries", icon: Calendar },
  { name: "Local Experiences", icon: Heart },
  { name: "Photography Tours", icon: Camera },
  { name: "Culinary Journey", icon: Utensils },
  { name: "Luxury Escapes", icon: Check }
];

export async function loader() {
  try {
    const items: TourCardProps[] = await tourService.getAllForCard(6);
    const all = await blogService.getAll(3);
    // console.log("Loaded tours for home:", items);
    return { toursList: items, blogs: all.blogs };
  } catch (error) {
    console.error("Failed to load tours:", error);
    return []; // fallback to empty array
  }
}

export default function Home() {

  const loaderData = useLoaderData()

  const toursList: TourCardProps[] = loaderData.toursList || [];
  const blogs: IBlogModel[] = loaderData.blogs || [];

  const [isLoading, setIsLoading] = useState(false);


  const recommendedTours = toursList.filter(tour => tour.recommended === true);

  const router = useNavigate();



  return (
    <main className="">
      

      {/* hero */}
      <section className="w-full md:h-[680px] h-[680px] overflow-hidden">
       
        <AutoFadeImage images={[
          "/images/thailand6 (9).jpg",
          "/images/thailand6 (4).jpg",
          "/images/thailand8 (8).jpg",
          "/images/tapu (37).jpg",
          "/images/home_slide (3).jpg",
          "/images/thailand7 (7).jpg",
          "/images/trips_market (1).jpg",
          "/images/train (3).jpg",
          "/images/thailand5 (7).jpg",
          "/images/temple (46).jpg",
          "/images/temple (5).jpg",
          "/images/album911 (72).jpg",
          "/images/bangkok (26).jpg",
          "/images/chaingmai (4).jpg",
          "/images/chaingmai_3 (14).jpg",
          "/images/chaingmai_3 (45).jpg",
          "/images/home_slide (2).jpg",
          "/images/kohphiphi (11).jpg",
          "/images/kohphiphi (26).jpg",
          "/images/lempomthep (26).jpg",
          "/images/wat_prayai (6).jpg",
          "/images/home_slide (1).jpg",

        ]}

          titles={[
            "Thailand",
            "Thailand",
            "Thailand",
            "Thailand",
            "Thailand",
            "Thailand",
            "Thailand",
            "Thailand",
            "Thailand",
            "Thailand",
            "Thailand",
          ]}
        />
      </section>


      <section className="flex items-center justify-center flex-col">
        <div className="text-center mt-5">
          <div className="">Received an award from </div>
          <img src="/images/9-awards.png"
            className="md:max-w-[450px] max-w-[250px]"
            alt="thailand-tourism-award-creative-tour-guru" />
        </div>

        <div className="flex flex-wrap justify-center gap-4 items-center">

          <img src="/logo/payments.svg"
            className="md:w-[380px] w-[200px] mt-5"
            alt="thailand-tourism-award-creative-tour-guru" />

          <div className="grid gap-2">
            <img src="/licenese/drp.png" className="w-[100px]" alt="dr.prawit" />
            <h3 className="text-sm text-zinc-600">By Dr. Prawit (Audi) Charoennuam</h3>
          </div>

        </div>
      </section>

      {/* <section className="container-x mx-auto md:px-0 px-4 py-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Explore Thailand Like Never Before
          </h2>
          <p className="text-gray-500 mt-3">
            Choose from our signature travel themes — from local living to luxury escapes.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
        >
          <div className="grid lg:grid-cols-2 grid-cols-1">

            <div className="relative h-[400px] lg:h-auto overflow-hidden bg-gray-100">
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&auto=format&fit=crop&q=80"
                  alt="Thailand Experience"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
              </div>

         

            </div>

        
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Signature Travel Themes
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Discover Thailand through carefully crafted experiences designed for every type of traveler.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                {tours.map((tour, i) => {
                  const Icon = tour.icon;
                  return (
                    <motion.div
                      key={tour.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: i * 0.08,
                        ease: "easeOut",
                      }}
                      viewport={{ once: true }}
                      className="group flex items-start gap-3 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-pointer border border-transparent hover:border-gray-200"
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition-colors duration-300">
                        <Icon className="text-[var(--primary-color)] w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-gray-800 font-semibold text-base group-hover:text-[var(--primary-color)] transition-colors duration-300">
                          {tour.name}
                        </h4>
                        <p className="text-sm text-gray-500 mt-0.5">
                          Tailored experiences
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                className="mt-8 pt-8 border-t border-gray-200"
              >
                <button className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[var(--primary-color)] to-red-600 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
                  View All Experiences
                </button>
              </motion.div> *
            </div>
          </div>
        </motion.div>

      </section> */}

      <section className="container-x mb-20">
        {/* featured */}
        <div className="">
          <h2 className="text-4xl font-medium mb-6 md:mt-10 mt-5">Featured Tours</h2>
          <div className="grid md:grid-cols-3 grid-cols-1 px-2 gap-2 overflow-x-auto pb-4">
            {/* Tour cards would go here */}
            {toursList.map((tour) => (
              <TourCard
                key={tour.id}
                {...tour}

              />
            ))}
          </div>

          <div className="w-fit mx-auto">
            <button
              onClick={() => {
                setIsLoading(true);
                router("/tours")
              }}
              className="py-3 button-outline flex items-center justify-center hover:w-[50vw] w-[200px] px-5 my-5 z-10 "
            >
              {isLoading ? <Loading /> : "See more Tours"}
            </button>
          </div>
        </div>

        {/* Recommend */}

        {/* CTA Explore */}
        <div
          className="flex md:items-center h-[450px]
    bg-image2 bg-center bg-cover px-5
    relative justify-center text-white overflow-hidden flex-col"
        >
          {/* Black overlay */}
          <div className="absolute inset-0 bg-black/50 z-0"></div>

          {/* Content */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl font-bold z-10"
          >
            Explore Thailand With an Expert Guide
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="mt-3 opacity-95 text-sm z-10"
          >
            — Stories, Culture & Hidden Gems Await
          </motion.div>

          <motion.button
            onClick={() => router("/guide-service")}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            className="py-3 button px-5 mt-5 z-10"
          >
            Hire a Local Guide
          </motion.button>
        </div>
        {/* featured */}
        <div className="">
          <h2 className="text-4xl font-medium mb-6 md:mt-10 mt-5">Recommended Tours</h2>

          {/* 2. Check if the list has items */}
          {recommendedTours.length > 0 ? (
            <div className="grid md:grid-cols-3 grid-cols-1 px-2 gap-2 overflow-x-auto pb-4">
              {recommendedTours.map((tour) => (
                <TourCard
                  key={tour.id}
                  {...tour}
                />
              ))}
            </div>
          ) : (
            /* 3. Display this message if the list is empty */
            <div className="w-full py-10 text-center bg-gray-50 rounded-lg border border-dashed border-gray-200">
              <p className="text-gray-500 text-lg">No recommended tours available at the moment.</p>
            </div>
          )}
        </div>



        {/* Popular Destinations */}
        <div className="">
          <h2 className="text-4xl font-medium mb-6 md:mt-10 mt-5">Popular Destinations</h2>
          <div className="grid md:grid-cols-4 grid-cols-2 gap-6 overflow-x-auto pb-4">
            {/* Tour cards would go here */}
            {popularDestinations?.map((tour, index) =>
              <DesCard image={tour.image || "https://images.unsplash.com/photo-1592117984084-15bc78969be2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1268"}
                key={index}
                title={tour.title} description={tour.description} />)}
          </div>
        </div>




      </section>

      {/* blogs */}
      <section className="mt-5 container-x mb-10">
        <div className="border-t border-gray-200 pt-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Another Tips & Tricks
              </h2>

            </div>

            <Link
              to="/blogs"
              className="border border-blue-500 px-4 py-2 text-blue-500 
                      hover:bg-blue-500 hover:text-white transition-all"
            >
              See more
            </Link>
          </div>

          <div className="grid md:grid-cols-3 items-start gap-3">
            {blogs.map((item, index) => (
              <BlogCard blog={item} key={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Explore */}
      <div
        className="flex md:items-center h-[450px]
  bg-image1 bg-center bg-cover px-5
  relative justify-center text-white overflow-hidden flex-col"
      >
        {/* 🔲 Black overlay */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        {/* Content */}
        <h2 className="text-4xl font-bold z-10">Beyond Sightseeing</h2>
        <div className="mt-3 opacity-95 text-sm z-10">— Experience Thailand Creatively</div>
        <button
          onClick={() => {
            setIsLoading(true);
            router("/tours")
          }}
          className="py-3 button px-5 mt-5 z-10  flex items-center justify-center "
        >

          {isLoading ? <Loading /> : "Explore All Tours"}
        </button>


      </div>




      {/* <section className="h-[550px] overflow-hidden">
       
      </section> */}

    </main>
  );
}
