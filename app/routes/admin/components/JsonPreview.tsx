import React, { useState } from 'react'
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { RiChatPrivateFill } from 'react-icons/ri';
import { Remark } from 'react-remark';

export default function JsonPreview({ form, KEYMAPPING }: { form: any, KEYMAPPING: any }) {
  const [previewType, setPreviewType] = useState<"page" | "json">("page");

  const tour = { ...form, ...KEYMAPPING };
  return (
    <div className=" relative">
      <div className="absolute top-2 right-2 space-x-2">
        <button
          className={`px-3 py-1 rounded ${previewType === "json" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"}`}
          onClick={() => setPreviewType("json")}
        >
          JSON
        </button>
        <button
          className={`px-3 py-1 rounded ${previewType === "page" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"}`}
          onClick={() => setPreviewType("page")}
        >
          Page
        </button>
      </div>

      {/*  */}
      {previewType === "json" ? <div className="max-w-3xl">
        <h3 className="text-xl font-semibold mb-3">Current Data Preview (JSON)</h3>
        {Object.entries(form).map(([key, value]) => (
          <div key={key} className="flex items-center gap-2">
            <div className="font-medium">{key} : </div>
            <div className="bg-zinc-200 px-2 w-fit">{String(value)}</div>
          </div>
        ))}
        {Object.entries(KEYMAPPING).map(([key, value]) => (
          <div key={key} className="flex items-center gap-2 mt-2">
            <div className="font-medium">{key} : </div>
            <div className="bg-zinc-200 px-2 overflow-auto max-w-full text-wrap">{key === "images" ? JSON.stringify(value) : JSON.stringify(value)}</div>
          </div>
        ))}
      </div>
        : <TourPreview tour={tour} />
      }
    </div>
  )
}

const mock = {
  title: "Untitled Tour",
  featured_image: "https://previews.123rf.com/images/pzaxe/pzaxe1510/pzaxe151000234/46719503-art-greece-vintage-ethnic-seamless-gray-vector-pattern-abstract-repeating-texture-background.jpg",
  location: "Unknown Location",
  duration: "N/A",
  tour_type: "General",
  description: "No description available.",
  itinerary: ["Itinerary details not provided."],
  tour_include: ["Include information not available."],
  not_include: ["Exclusion information not available."],
  cancellation_policy: ["No cancellation policy available."],
  note: ["No additional notes."],
  images: [
    { image_url: "https://previews.123rf.com/images/pzaxe/pzaxe1510/pzaxe151000234/46719503-art-greece-vintage-ethnic-seamless-gray-vector-pattern-abstract-repeating-texture-background.jpg" },
    { image_url: "https://previews.123rf.com/images/pzaxe/pzaxe1510/pzaxe151000234/46719503-art-greece-vintage-ethnic-seamless-gray-vector-pattern-abstract-repeating-texture-background.jpg" },
    { image_url: "https://previews.123rf.com/images/pzaxe/pzaxe1510/pzaxe151000234/46719503-art-greece-vintage-ethnic-seamless-gray-vector-pattern-abstract-repeating-texture-background.jpg" },
  ],
};

// universal safe getter: handles strings, arrays, null, undefined, empty values
const get = (value, fallback) => {
  if (Array.isArray(value)) return value?.length ? value : fallback;
  if (!value || value === "") return fallback;
  return value;
};


function TourPreview({ tour }) {
  return (
    <div className="max-w-3xl">
      <h3 className="text-xl font-semibold mb-3">Current Data Preview (Page)</h3>

      <section className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        
        {/* Title */}
        <h1 className="text-4xl font-semibold mb-6">
          {get(tour.title, mock.title)}
        </h1>

        <div className="grid md:grid-cols-2 gap-2 ">
          {/* Left Image */}
          <div>
            <img
              src={get(tour.featured_image, mock.featured_image)}
              alt="featured"
            />
          </div>

          {/* Right Section */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Location */}
              <p className="text-gray-600">
                <FaMapMarkerAlt size={18} className="inline mr-2" />
                {get(tour.location, mock.location)}
              </p>

              {/* Duration */}
              <p className="mt-2 text-gray-600">
                <FaClock className="inline mr-2" />
                Duration:{" "}
                <span className="font-medium">
                  {get(tour.duration, mock.duration)}
                </span>
              </p>

              {/* Tour Type */}
              <div className="mt-2 text-gray-600 capitalize">
                <RiChatPrivateFill size={18} className="inline mr-2" />
                Type:{" "}
                <span className="font-medium">
                  {get(tour.tour_type, mock.tour_type)}
                </span>
              </div>
            </div>

            {/* Book Now Button */}
            <button className="mt-10 button text-center px-1 py-2 w-full">
              Book now
            </button>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Description */}
        <div className="grid md:grid-cols-2 gap-2">
          <div>
            <h2 className="text-2xl font-semibold mb-3">Description</h2>
            <p className="leading-relaxed indent-4 text-gray-700">
              <Remark>{get(tour.description, mock.description)}</Remark>
            </p>
          </div>

          {/* Image */}
          <div>
            <img
              src={
                get(tour.images, mock.images)[0]?.image_url
              }
              alt="description"
            />
          </div>
        </div>

        {/* Itinerary */}
        <div className="grid md:grid-cols-2 gap-2">
          <div>
            <img
              src={get(tour.images, mock.images)[1]?.image_url}
              alt="itinerary"
            />
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">Itinerary</h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {get(tour.itinerary, mock.itinerary).map((step, i) => (
                <li
                  key={i}
                  className={step.startsWith("[b]") ? "font-bold" : ""}
                >
                  {step.replace("[b]", "")}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Included / Not Included */}
        <div>
          {/* Included */}
          <h2 className="text-2xl font-semibold mb-3">Included</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {get(tour.tour_include, mock.tour_include).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          {/* Not Included */}
          <h2 className="text-2xl font-semibold mt-6 mb-3">Not Included</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {get(tour.not_include, mock.not_include).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Cancellation Policy */}
        <div>
          <h2 className="text-2xl font-semibold mb-3">Cancellation Policy</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {get(tour.cancellation_policy, mock.cancellation_policy).map(
              (rule, i) => (
                <li key={i}>{rule}</li>
              )
            )}
          </ul>
        </div>

        {/* Image */}
        <div>
          <img
            src={get(tour.images, mock.images)[2]?.image_url}
            alt="image3"
          />
        </div>

        {/* Notes */}
        <div>
          <h2 className="text-2xl font-semibold mb-3">Important Note</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {get(tour.note, mock.note).map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
