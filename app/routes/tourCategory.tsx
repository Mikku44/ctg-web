import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { useLoaderData } from "react-router";
import { TourCard, type TourCardProps } from "~/components/featureCard";
import { tourService } from "~/services/tourService";
import { Pagination, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import type { Tour } from "~/models/tour";
import { TYPE_MAPPING } from "~/const/app";

// 🧩 Meta (SEO)
export const meta: MetaFunction<typeof loader> = ({ params }) => {
  const { type_slug, place } = params;
  // Capitalize for nice title
  const formatTitle = (str?: string) => str?.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

  return [
    { title: `${formatTitle(type_slug)} in ${formatTitle(place)} - Creative Tour Guru` },
    { name: "description", content: `Explore best ${type_slug} tours in ${place}.` },
  ];
};


export async function loader({ params }: LoaderFunctionArgs) {
  try {
    const { type_slug, place } = params;
    const allTours: any = await tourService.getAllForCard();

    // 1. Reconstruct the URL path to use as a key
    const currentPath = `/tours/${type_slug}/${place}`;
    
    // 2. Get the specific "Category Name" your data uses (e.g., "Half Day Tours – Bangkok")
    const targetCategory = TYPE_MAPPING[currentPath];

    // console.log("Target Category:", targetCategory);
    // console.log("currentPath:", currentPath);

    // 3. Filter logic
    const filteredTours = allTours.filter((tour: any) => {
      if (!targetCategory) return false;

      // Normalize both for safety
      const tourTypeData = tour.tourType || ""; // "Private,Half-Day,Half Day Tours – Bangkok"


      // console.log("Tour Type :",tourTypeData, tourTypeData.includes(targetCategory));
      
      // Check if the specific Category Name exists within that comma-separated string
      return tourTypeData.includes(targetCategory);

    });

    return Response.json({ 
      tours: filteredTours,
      categoryName: targetCategory 
    });
  } catch (error) {
    console.error("Failed to load tours:", error);
    throw new Response("Failed to load tours", { status: 500 });
  }
}

// 🖼️ Component
export default function TourCategory({ params }: { params: { type_slug?: string; place?: string } }) {
  const { tours } = useLoaderData<typeof loader>();
  const [page, setPage] = useState(1);

  // Reset page to 1 if the URL params change (new data loaded)
  useEffect(() => {
    setPage(1);
  }, [params]);

  // Pagination setup
  const itemsPerPage = 8;
  const totalPages = Math.ceil(tours.length / itemsPerPage);

  const paginatedTours = tours.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { type_slug, place } = params;
  const currentPath = `/tours/${type_slug}/${place}`;
   const targetCategory = TYPE_MAPPING[currentPath];

  return (
    <main className="min-h-screen">
      <section className="container-x mb-20">
        {/* Header */}
        <div className="">
          <section className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-semibold mt-5 capitalize">
                {targetCategory}
                {/* {type_slug?.replace(/-/g, " ")} in {place?.replace(/-/g, " ")} */}
              </h1>
              <p className="text-zinc-500 mt-2">
                {tours.length} result{tours.length !== 1 && "s"} found based on your selection.
              </p>
            </div>
          </section>

          {/* Tour cards */}
          {paginatedTours.length > 0 ? (
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
              {paginatedTours.map((tour: TourCardProps) => (
                <TourCard key={tour.id} {...tour} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center text-zinc-500 bg-zinc-50 rounded-lg border border-zinc-100">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                alt="No results"
                className="w-24 h-24 mb-4 opacity-50 grayscale"
              />
              <h3 className="text-xl font-semibold text-zinc-700">
                No tours match these criteria
              </h3>
              <p className="text-sm text-zinc-500 mt-2 max-w-md">
                We couldn't find any tours matching "{type_slug}" in "{place}".
                Try looking for a different category or destination.
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Stack
              spacing={2}
              direction="row"
              justifyContent="center"
              alignItems="center"
              className="mt-12"
            >
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
                siblingCount={1}
                boundaryCount={1}
              />
            </Stack>
          )}
        </div>
      </section>
    </main>
  );
}