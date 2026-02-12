import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { useLoaderData, useSearchParams, useParams } from "react-router";
import { TourCard, type TourCardProps } from "~/components/featureCard";
import { tourService } from "~/services/tourService";
import { Pagination, Stack } from "@mui/material";
import type { Tour } from "~/models/tour";
import { TYPE_MAPPING } from "~/const/app";

// 🧩 Meta (SEO)
export const meta: MetaFunction<typeof loader> = ({ data }) => {
  // Use data from loader for more accurate SEO
  const title = data?.categoryName || "Tours";
  return [
    { title: `${title} - Creative Tour Guru` },
    { name: "description", content: `Explore the best ${title} available now.` },
  ];
};

// ⚙️ Server-side Loader
export async function loader({ params, request }: LoaderFunctionArgs) {
  try {
    const { type_slug, place } = params;
    const url = new URL(request.url);
    
    // Get page from URL query params (e.g. ?page=2), default to 1
    const page = Number(url.searchParams.get("page")) || 1;
    const itemsPerPage = 8;

    // 1. Fetch data
    // NOTE: In a production app, you should pass filtering/pagination 
    // to the API here to avoid fetching "all" records.
    const allTours: any[] = await tourService.getAllForCard();

    // console.log("TOURS : ",allTours);

    const isAllRequest = place === "all";
    const basePath = `/tours/${type_slug}`;
    let targetCategories: string[] = [];

       console.log("ALL TOUR" , isAllRequest)

    // 2. Determine Categories
    if (isAllRequest) {
      targetCategories = Object.entries(TYPE_MAPPING)
        .filter(([path]) => path.startsWith(basePath) && path !== basePath)
        .map(([_, category]) => category);
      targetCategories = [...new Set(targetCategories)];

     
    } else {
      const currentPath = `${basePath}/${place}`;
      const targetCategory = TYPE_MAPPING[currentPath];
      if (targetCategory) targetCategories = [targetCategory];
    }

    // 3. Filtering (Optimized with Set)
    const categorySet = new Set(targetCategories);
    const filteredTours = allTours.filter((tour: any) => {
      if (categorySet.size === 0) return false;
      const tourTypeData = tour.tourType || "";
      // Check if any word in tourType matches our set
      return targetCategories.some(cat => tourTypeData.includes(cat));
    });

    // 4. Server-Side Pagination
    const totalCount = filteredTours.length;
    const totalPages = Math.ceil(totalCount / itemsPerPage);
    const paginatedTours = filteredTours.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage
    );

    // 5. Display Name Logic
    let displayName = isAllRequest 
      ? `All ${type_slug?.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}`
      : (targetCategories[0] || "Tours");

    return {
      tours: paginatedTours,
      totalCount,
      totalPages,
      categoryName: displayName,
      currentPage: page
    };
  } catch (error) {
    console.error("Failed to load tours:", error);
    throw new Response("Failed to load tours", { status: 500 });
  }
}

// 🖼️ UI Component
export default function TourCategory() {
  const { tours, totalCount, totalPages, categoryName, currentPage } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { type_slug, place } = useParams();

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    // This updates the URL: ?page=2
    setSearchParams((prev) => {
      prev.set("page", value.toString());
      return prev;
    });
    // Scroll to top for better UX
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen">
      <section className="container-x mb-20">
        <div className="pt-8">
          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between items-baseline mb-8 border-b border-zinc-100 pb-6">
            <div>
              <h1 className="text-4xl font-bold text-zinc-900 tracking-tight">
                {categoryName}
              </h1>
              <p className="text-zinc-500 mt-2">
                Showing {tours.length} of {totalCount} experiences
              </p>
            </div>
          </header>

          {/* Tour Grid */}
          {tours.length > 0 ? (
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
              {tours.map((tour: any) => (
                <TourCard key={tour.id} {...tour} />
              ))}
            </div>
          ) : (
            <EmptyState slug={type_slug} place={place} />
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Stack spacing={2} direction="row" justifyContent="center" className="mt-16">
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="large"
                shape="rounded"
              />
            </Stack>
          )}
        </div>
      </section>
    </main>
  );
}

// Sub-component for clean code
function EmptyState({ slug, place }: { slug?: string; place?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center bg-zinc-50 rounded-2xl border-2 border-dashed border-zinc-200">
      <div className="bg-white p-4 rounded-full shadow-sm mb-4">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
          alt="No results"
          className="w-16 h-16 grayscale opacity-40"
        />
      </div>
      <h3 className="text-xl font-bold text-zinc-800">No tours found</h3>
      <p className="text-zinc-500 mt-2 max-w-sm">
        We couldn't find any "{slug}" in "{place}" for this specific selection.
      </p>
    </div>
  );
}