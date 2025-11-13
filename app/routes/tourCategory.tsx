import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { useLoaderData } from "react-router";
import { TourCard, type TourCardProps } from "~/components/featureCard";
import { tourService } from "~/services/tourService";
import { Pagination, Stack } from "@mui/material";
import { useState } from "react";

// 🧩 Meta (SEO)
export const meta: MetaFunction<typeof loader> = ({ params }) => {
  const { type_slug, place } = params;
  return [
    { title: `${type_slug} ${place} - Creative Tour Guru` },
    { name: "description", content: `Explore ${type_slug} ${place} tours and destinations.` },
  ];
};

// 🧠 Loader (runs on server)
export async function loader({ params }: LoaderFunctionArgs) {
  try {
    const tours = await tourService.getAllForCard();
    return Response.json({ tours });
  } catch (error) {
    console.error("Failed to load tours:", error);
    throw new Response("Failed to load tours", { status: 500 });
  }
}

// 🖼️ Component
export default function TourCategory({ params }: { params: { type_slug?: string; place?: string } }) {
  const { tours } = useLoaderData<typeof loader>();
  const [filterOptions, setFilterOptions] = useState("");
  const [page, setPage] = useState(1);

  // pagination setup
  const itemsPerPage = 8;
  const filteredTours = filterOptions
    ? tours.filter((t: TourCardProps) =>
        t.category?.toLocaleLowerCase()?.includes(filterOptions)
      )
    : tours;
  const totalPages = Math.ceil(filteredTours.length / itemsPerPage);

  const paginatedTours = filteredTours.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { type_slug, place } = params;

  return (
    <main className="min-h-screen">
      <section className="container-x mb-20">
        {/* Header */}
        <div className="">
          <section className="flex justify-between items-center mb-2">
            <div>
              <h1 className="text-4xl font-semibold mt-5">
                Explore {type_slug} {place} Tours Destination
              </h1>
              <p className="text-zinc-500">
                {filteredTours.length} Tours found.
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
            <div className="flex flex-col items-center justify-center py-20 text-center text-zinc-500">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                alt="No results"
                className="w-24 h-24 mb-4 opacity-80"
              />
              <p className="text-lg font-medium text-zinc-700">
                No tours found
              </p>
              <p className="text-sm text-zinc-500 mt-1">
                Try selecting another category or reset your filters.
              </p>
            </div>
          )}

          {/* Pagination */}
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
              siblingCount={1}
              boundaryCount={1}
            />
          </Stack>
        </div>
      </section>
    </main>
  );
}
