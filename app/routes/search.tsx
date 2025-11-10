import { useSearchParams } from "react-router";
import { useState, useMemo } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import TourCard from "~/components/featureCard";
import { tourList } from "~/const/app";
import type { Route } from "./+types/search";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Search Tours - Creative Tour Guru" },
    {
      name: "description",
      content:
        "Find your next Thailand adventure. Search through curated tours and destinations to match your travel interests.",
    },
  ];
}

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";
  const [page, setPage] = useState(1);

  // ✅ Filter tours by query (title + description + category)
  const filteredTours = useMemo(() => {
    if (!query) return [];
    return tourList.filter((tour) =>
      [tour.title, tour.description, tour.category]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [query]);

  // ✅ Pagination setup
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredTours.length / itemsPerPage);
  const paginatedTours = filteredTours.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="container-x mb-20">
      {/* Header */}
      <div className="text-center md:max-w-[50vw] mx-auto">
        <h1 className="text-4xl font-semibold mt-5">Search Results</h1>
        {query ? (
          <p className="text-zinc-500 text-lg mt-2 mb-6">
            Showing results for <span className="font-medium">“{query}”</span>
          </p>
        ) : (
          <p className="text-zinc-500 text-lg mt-2 mb-6">
            Type a keyword above to find tours and destinations.
          </p>
        )}
      </div>

      {/* Results */}
      {query && paginatedTours.length > 0 ? (
        <>
          <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 px-2 gap-6">
            {paginatedTours.map((tour) => (
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
        </>
      ) : (
        query && (
          <div className="flex flex-col items-center justify-center py-20 text-center text-zinc-500">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
              alt="No results"
              className="w-24 h-24 mb-4 opacity-80"
            />
            <p className="text-lg font-medium text-zinc-700">No tours found</p>
            <p className="text-sm text-zinc-500 mt-1">
              Try searching with another keyword.
            </p>
          </div>
        )
      )}
    </section>
  );
}
