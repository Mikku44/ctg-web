
import FeaturedTours from "~/components/DraggableFeature";
import CustomViewer from "~/components/CustomViewer";
import { tourService } from "~/services/tourService";
import type { Tour, Package, TourImage } from "~/models/tour";
import { Link, useLoaderData, useLocation, type LoaderFunctionArgs, type MetaFunction } from "react-router";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { RiChatPrivateFill } from "react-icons/ri";
import TourBookingForm from "~/components/TourBookingForm";
import ImageViewer from "~/components/ImageViewer";
import { TbCodeAsterisk } from "react-icons/tb";
import { Remark } from 'react-remark';


export async function loader({ params }: LoaderFunctionArgs) {
  const { tour_slug } = params;

  if (!tour_slug) {
    throw new Response("Tour slug is required", { status: 400 });
  }

  try {
    const selectedTour = await tourService.getBySlug(tour_slug);

    if (!selectedTour) {
      throw new Response("Tour not found", { status: 404 });
    }

    // console.log("DATA : ", selectedTour)


    return Response.json({
      tour: selectedTour as Tour,
      images: (selectedTour.images || []) as TourImage[],
      packages: (selectedTour.packages || []) as Package[],
    });
  } catch (error) {
    console.error("Loader error:", error);
    throw new Response("Failed to load tour", { status: 500 });
  }
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return [{ title: "Tour not found" }];
  const { tour } = data as any;
  return [
    { title: `${tour.title} | Creative Tour Guru` },
    { name: "description", content: tour.description || "Tour details and packages." },
  ];
};


type LoaderData = {
  tour: Tour;
  images: TourImage[];
  packages: Package[];
};

export default function TourDetailPage() {
  const { tour, images, packages } = useLoaderData<LoaderData>();
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);




  const scrollToBottom = () => {
    const el = document.getElementById("booking");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };





  return (
    <main className="min-h-screen  text-neutral-900">
      {/* Breadcrumb */}
      <nav
        className="px-4 w-full container-x mt-5 mx-auto text-sm text-gray-600"
        aria-label="Breadcrumb"
      >
        <ol className="list-reset flex md:flex-row flex-col">
          <li>
            <Link to="/" className="text-gray-500 hover:text-gray-800">
              Home
            </Link>
          </li>
          {pathnames.map((name, index) => {
            const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
            const isLast = index === pathnames.length - 1;
            const displayName = name
              .replace(/-/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase());

            return (
              <li key={routeTo} className="flex items-center">
                <span className="mx-2">/</span>
                {isLast ? (
                  <span className="text-gray-800 font-medium">
                    {displayName}
                  </span>
                ) : (
                  <Link
                    to={routeTo}
                    className="text-gray-500 hover:text-gray-800"
                  >
                    {displayName}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Hero */}
      {/* <div className="container-x w-full max-w-4xl mt-5 mx-auto overflow-hidden">
        <CustomViewer
          className="max-w-4xl mx-auto px-4"
          images={[tour.featured_image]}
        />
      </div> */}

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        <h1 className="text-4xl font-semibold mb-6">{tour.title}</h1>
        <div className="grid md:grid-cols-2 gap-2 ">
          <div className="">
            <img src={tour.featured_image} alt="" />
          </div>

          {/* right */}
          <div className="flex flex-col justify-between">
            <div className="">

              <p className="text-gray-600"><FaMapMarkerAlt size={18} className="inline mr-2" />{tour.location}</p>
              <p className="mt-2 text-gray-600">
                <FaClock className="inline mr-2" />Duration: <span className="font-medium">{tour.duration}</span>
              </p>
              {tour.tour_type && (
                <div className=" mt-2 text-gray-600 capitalize">
                  <RiChatPrivateFill size={18} className="inline mr-2" />Type : <span className="font-medium">{tour.tour_type}</span>
                </div>
              )}

              <div className=" mt-2 text-gray-600 capitalize">
                <TbCodeAsterisk size={18} className="inline mr-2" />ID : <span className="font-medium">{tour.tid || tour.id}</span>
              </div>


            </div>
            {/* <p className="text-lg font-semibold mt-2 text-emerald-600">
              From ฿{tour.price_from.toLocaleString()}
            </p> */}


            <button
              className="mt-10 button text-center px-1 py-2 w-full"
              onClick={scrollToBottom}>Book now</button>



            <button
              className="mt-10 button md:hidden block fixed bottom-0 z-10 left-0 text-center px-1 py-2 w-full"
              onClick={scrollToBottom}>Book now</button>

          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Description */}
        {tour.description && (
          <div className="grid md:grid-cols-2 gap-2">
            <div className="">
              <h2 className="text-2xl font-semibold mb-3">Description</h2>
              <p className="leading-relaxed indent-4 space-y-1 text-gray-700">
                {/* {tour.description} */}
                <Remark >{tour.description}</Remark>
              </p>
            </div>

            {/* image */}
            <div className="">
              <img src={tour?.images?.[0]?.image_url || tour.featured_image} alt="" />
            </div>

          </div>
        )}

        {/* Itinerary */}
        {tour.itinerary?.length > 0 && (
          <div className="grid md:grid-cols-2 gap-2">
            {/* image */}
            <div className="">
              <img src={tour?.images?.[1]?.image_url || tour.featured_image} alt="" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-3">Itinerary</h2>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {tour.itinerary.map((step, i) => (
                  <li key={i} className={`${step.startsWith("[b]") && "font-bold"}`}>{step.replace("[b]", "")}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Meal & departure */}
        <section>
          {tour?.meal && <div className="mb-3">
            <h2 className="text-2xl font-semibold mb-3">Meal</h2>
            <p className="text-gray-700 ">{tour?.meal}</p>
          </div>}
          {tour?.departure && <div className="mb-3">
            <h2 className="text-2xl font-semibold mb-3">Departure</h2>
            <p className="text-gray-700">{tour?.departure}</p>
          </div>}
        </section>

        {/* Included / Not Included */}
        {(tour.tour_include?.length || tour.not_include?.length) > 0 && (
          <div>
            {tour.tour_include?.length > 0 && (
              <>
                <h2 className="text-2xl font-semibold mb-3">Included</h2>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {tour.tour_include.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </>
            )}
            {tour.not_include?.length > 0 && (
              <>
                <h2 className="text-2xl font-semibold mt-6 mb-3">
                  Not Included
                </h2>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {tour.not_include.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}



        {/* Cancellation Policy */}
        {tour.cancellation_policy?.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-3">
              Cancellation Policy
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {tour.cancellation_policy.map((rule, i) => (
                <li key={i}>{rule}</li>
              ))}
            </ul>
          </div>
        )}

        {/* image */}
        <div className="">
          <img src={tour?.images?.[2]?.image_url || tour.featured_image} alt="" />
        </div>

        {/* Notes */}
        {tour.note?.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-3">Important note</h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {tour.note.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          </div>
        )}

        {/* short */}
        {tour.short && (
          <div>
            <h2 className="text-2xl font-semibold mb-3">Short & Hightlight</h2>
            <div className="list-disc text-wrap prose space-y-1 text-gray-700">
              {tour.short.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>

          </div>
        )}
      </section>

      <section className="max-w-4xl px-4 mx-auto grid gap-5">
        <ImageViewer
          className="columns-3"
          images={tour?.images?.sort((a, b) => {

            const indexA = a.order_index ?? Infinity;
            const indexB = b.order_index ?? Infinity;
            return indexA - indexB;
          }).map(item => item.image_url) || []} />

      </section>

      <section id="booking">
        {<TourBookingForm
          // cover={tour.featured_image}
          from_price={tour.price_from}
          deposit={tour?.deposit}
          tourName={tour.title}
          tour={tour.id}
          pickup_area={tour.pickup}
          prices={tour.prices}

        />}
      </section>




      {/* Featured / Recommended Tours */}
      <FeaturedTours />
    </main>
  );
}
