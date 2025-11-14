import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
// import { tourList } from "~/const/app";
import type { Route } from "./+types/tours";
import { TourCard, type TourCardProps } from "~/components/featureCard";
import { tourService } from "~/services/tourService";

const filterItems = [
    { label: "All destination", key: "" },
    { label: "Popular", key: "popular" },
    { label: "Adventure", key: "adventure" },
    { label: "Culture", key: "culture" },
    { label: "Relaxing", key: "relaxing" },
];

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Tours Destination - Creative Tour Guru" },
        { name: "description", content: "Discover curated tours and destinations across Thailand — from adventures to relaxing escapes." },
    ];
}

export default function Tours() {
    const [filterOptions, setFilterOptions] = useState("");
    const [tourList, setTours] = useState<TourCardProps[]>([]);
    const [page, setPage] = useState(1);


    useEffect(() => {
        tourService.getAllForCard().then((items) => {
            console.log("ITEMS : ", items)
            setTours(items)
        });
    }, []);

    // pagination setup
    const itemsPerPage = 8;
    const totalPages = Math.ceil(tourList.length / itemsPerPage);
    const filteredTours = filterOptions
        ? tourList.filter((tour) => tour.category?.toLocaleLowerCase()?.includes(filterOptions))
        : tourList;

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
            <div className="">
                <section className="flex justify-between items-center mb-2">
                    <div className="">
                        <h1 className="text-4xl font-semibold mt-5">Explore Tours Destination</h1>
                        <p className=" text-zinc-500">{filterItems?.length || 0} Tours found.</p>
                    </div>
                    {/* <div className="md:max-w-[50vw] mx-auto text-center">
                        <h2 className="text-lg text-zinc-500 mb-6">
                            Navigate the city using authentic methods, such as tuk-tuks for
                            exhilarating night tours, or long-tail boats to explore the quieter,
                            less-traveled canals.
                        </h2>
                    </div> */}
                    {/* Filter */}
                    <div className="flex gap-2 items-center justify-center mt-10 mb-8 flex-wrap">
                        {/* {filterItems.map((item) => (
                            <div
                                key={item.key}
                                onClick={() => {
                                    setFilterOptions(item.key);
                                    setPage(1); // reset to page 1 when changing filter
                                }}
                                className={`rounded-full px-4 py-2 cursor-pointer duration-200 w-fit ${filterOptions === item.key
                                        ? "bg-[var(--primary-color)] text-white"
                                        : "bg-orange-50 text-[var(--primary-color)]"
                                    }`}
                            >
                                {item.label}
                            </div>
                        ))} */}
                    </div>
                </section>

                {/* Tour cards */}
                {paginatedTours.length > 0 ? (
                    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                        {paginatedTours.map((tour) => (
                            <TourCard
                                key={tour.id}
                                {...tour}
                            />
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
                        // shape="rounded"
                        siblingCount={1}
                        boundaryCount={1}
                    />
                </Stack>
            </div>
        </section>
    );
}
