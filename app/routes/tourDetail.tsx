import { useEffect, useState } from "react";
import AutoFadeImage from "~/components/AutoSlideImage";
import FeaturedTours from "~/components/DraggableFeature";
import { tourService } from "~/services/tourService";
import type { Tour, Package, TourImage } from "~/models/tour";
import type { Route } from "../+types/root";
import CustomViewer from "~/components/CustomViewer";
import { Link, useLocation } from "react-router";

export default function TourDetailPage({ params }: Route.MetaArgs) {
  const slug = params.tour_slug;
  const [tour, setTour] = useState<Tour | null>(null);
  const [images, setImages] = useState<TourImage[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation()
  const pathnames = location.pathname.split("/").filter((x) => x);

  useEffect(() => {
    if (!slug) return;

    const fetchTour = async () => {
      setLoading(true);
      try {
        const selectedTour = await tourService.getBySlug(slug);
        // console.log("TOUR : ",selectedTour)
        setTour(selectedTour);
        if (selectedTour) {
          setImages(selectedTour.images || []);
          setPackages(selectedTour.packages || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [slug]);

  if (loading) return <p className="p-6 min-h-screen text-center flex flex-col gap-5 items-center justify-center">
    <div className="loader">
     
      </div>
    <div className="">Loading...</div>
    </p>;
  if (!tour) return <p className="p-6 min-h-screen text-center text-red-600">Tour not found.</p>;

  return (
    <main className="min-h-screen text-neutral-900">
      {/* Hero Section */}
      {/* {images.length > 0 && <AutoFadeImage images={images.map((img) => img.image_url) || [tour.featured_image]} />} */}
      <nav className="px-4 w-full max-w-4xl mt-5 mx-auto text-sm text-gray-600" aria-label="Breadcrumb">
        <ol className="list-reset flex">
          <li>
            <Link to="/" className="text-gray-500 hover:text-gray-800">
              Home
            </Link>
          </li>
          {pathnames.map((name, index) => {
            const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
            const isLast = index === pathnames.length - 1;
            const displayName = name.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

            return (
              <li key={routeTo} className="flex items-center">
                <span className="mx-2">/</span>
                {isLast ? (
                  <span className="text-gray-800 font-medium">{displayName}</span>
                ) : (
                  <Link to={routeTo} className="text-gray-500 hover:text-gray-800">
                    {displayName}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <div className=" container-x w-full max-w-4xl mt-5 mx-auto overflow-hidden">


        <CustomViewer className="max-w-4xl mx-auto px-4 " images={[tour.featured_image]} />
      </div>
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

        {/* Description */}
        {tour.description && (
          <div>
            <h2 className="text-2xl font-semibold mb-3">Description</h2>
            <p className="leading-relaxed text-gray-700">{tour.description}</p>
          </div>
        )}

        {/* Itinerary */}
        {tour.itinerary?.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-3">Itinerary</h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {tour.itinerary.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          </div>
        )}

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
                <h2 className="text-2xl font-semibold mt-6 mb-3">Not Included</h2>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {tour.not_include.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}

        {/* Packages */}
        {packages.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-3">Available Packages</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="rounded-xl border border-gray-200 p-4 hover:border-emerald-400 transition"
                >
                  <h3 className="text-xl font-medium">{pkg.name}</h3>
                  {pkg.description && <p className="text-gray-600 text-sm mt-1">{pkg.description}</p>}
                  <p className="mt-3 font-semibold text-emerald-600">
                    ฿{pkg.price.toLocaleString()}
                  </p>
                  {pkg.max_people && <p className="text-gray-500 text-sm mt-1">Max: {pkg.max_people} people</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cancellation Policy */}
        {tour.cancellation_policy?.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-3">Cancellation Policy</h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {tour.cancellation_policy.map((rule, i) => (
                <li key={i}>{rule}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Notes */}
        {tour.note?.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-3">Notes</h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {tour.note.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Featured / Recommended Tours */}
      <FeaturedTours />
    </main>
  );
}
