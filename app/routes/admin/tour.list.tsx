import { useEffect, useState } from "react";
import {
    Form,
    Link,
    redirect,
    useLoaderData,
    type ActionFunction,
    type LoaderFunction,
} from "react-router";
import Loading from "~/components/Loading";
import type { Tour } from "~/models/tour";
import { tourService } from "~/services/tourService";


export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const intent = formData.get("_action");
    const tourId = formData.get("tourId")?.toString();

    if (intent === "delete" && tourId) {
        await tourService.remove(tourId);
        await tourService.deleteImagesByTour(tourId);
        return redirect("/admin/tour/list");
    }

    return null;
};


export default function TourListPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [tours, setTours] = useState<Tour[]>([]);

    useEffect(() => {
        tourService.getAll().then((data) => {
            setTours(data);
            setIsLoading(false);
        });
    }, []);

    return (
        <div className="container-x mx-auto py-10">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Tours</h1>

                <Link
                    to="/admin/tour/add"
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                >
                    + Add Tour
                </Link>
            </div>

            {/* --- CARD GRID --- */}
            <div className="space-y-4">
                {tours.map((tour: any) => (
                    <div
                        key={tour.id}
                        className="flex items-center justify-between  pb-4"
                    >
                        {/* Left: Image + Info */}
                        <div className="flex items-center gap-4">
                            <div className="h-14 w-20 overflow-hidden">
                                <img
                                    src={tour.featured_image || "/noimage.jpg"}
                                    alt={tour.title}
                                    className="h-14 w-20 object-cover rounded-md "
                                />
                            </div>

                            <div className="space-y-1">
                                <h2 className="font-semibold text-base">{tour.title}</h2>

                                <p className="text-sm text-gray-500">{tour.location || "-"}</p>

                                <p className="text-sm font-medium text-green-700">
                                    {tour.price_from.toLocaleString()} THB
                                </p>

                                <p className="text-xs">
                                    {tour.status === "published" ? (
                                        <span className="text-green-700">Published</span>
                                    ) : (
                                        <span className="text-gray-500">Draft</span>
                                    )}
                                </p>
                            </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex gap-2">
                            <Link
                                to={`/admin/tour/update/${tour.id}`}
                                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Edit
                            </Link>

                            <Form method="post">
                                <input type="hidden" name="tourId" value={tour.id} />
                                <button
                                    name="_action"
                                    value="delete"
                                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                    onClick={(e) => {
                                        if (!confirm("Delete this tour?")) e.preventDefault();
                                    }}
                                >
                                    Delete
                                </button>
                            </Form>
                        </div>
                    </div>
                ))}
            </div>


            {tours.length === 0 && (
                <div className="text-center text-gray-500 mt-8">
                   {isLoading ? <div className="grid place-items-center">
                       <Loading /> 
                       <div className="mt-2">Tour list is Loading...</div>
                   </div>: " No tours found."}
                </div>
            )}
        </div>
    );
}
