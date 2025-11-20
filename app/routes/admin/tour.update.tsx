import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { v4 as uuidv4 } from "uuid";
import type { Tour, TourImage } from "~/models/tour";
import { Minus } from "lucide-react";
import { tourService } from "~/services/tourService";
import { images_file } from "public/images/image_files";
import type { Route } from "./+types/tour.update";
import JsonPreview from "./components/JsonPreview";


export default function UpdateTourAdminPage({ params }: Route.ClientActionArgs) {
   
    const tourId = params.tourId || "E3gXfncUqEjFcAfkowml"

    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<string>("");
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    // form state (strings)
    const [form, setForm] = useState({
        title: "",
        slug: "",
        description: "",
        duration: "",
        location: "",
        price_from: "",
        category_id: "",
        featured_image: "",
        program_detail: "",
        status: "draft",
        tour_type: "",
    });

    // array fields as arrays (store as arrays - easier)
    const [note, setNote] = useState<string[]>([]);
    const [itinerary, setItinerary] = useState<string[]>([]);
    const [tourInclude, setTourInclude] = useState<string[]>([]);
    const [notInclude, setNotInclude] = useState<string[]>([]);
    const [cancellationPolicy, setCancellationPolicy] = useState<string[]>([]);

    // gallery images (local state, includes id if exists or generated for new)
    const [images, setImages] = useState<TourImage[]>([]);
    // modal selection
    const [selectedImages, setSelectedImages] = useState<string[]>([]);

    // load tour + images on mount
    useEffect(() => {
        if (!tourId) return;
        (async () => {
            try {
                setLoading(true);
                const tour: Tour = await tourService.getById(tourId);
                const gallery: TourImage[] = await tourService.getImages(tourId);

                console.log("GALLERY : ", gallery)

                // Prefill form
                setForm({
                    title: tour.title || "",
                    slug: tour.slug || "",
                    description: tour.description || "",
                    duration: tour.duration || "",
                    location: tour.location || "",
                    price_from: (tour.price_from ?? "").toString(),
                    category_id: tour.category_id || "",
                    featured_image: tour.featured_image || "",
                    program_detail: tour.program_detail || "",
                    status: tour.status || "draft",
                    tour_type: tour.tour_type || "",
                });

                setPreview(tour.featured_image || "");

                // Arrays
                setNote(tour.note || []);
                setItinerary(tour.itinerary || []);
                setTourInclude(tour.tour_include || []);
                setNotInclude(tour.not_include || []);
                setCancellationPolicy(tour.cancellation_policy || []);

                // Images (preserve order_index)
                const sorted = (gallery || []).slice().sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0));
                setImages(sorted);
                setSelectedImages(sorted.map((i) => i.image_url));
            } catch (err: any) {
                console.error("Failed to load tour", err);
                setMessage({ type: "error", text: err?.message || "Failed to load tour" });
            } finally {
                setLoading(false);
            }
        })();
    }, [tourId]);

    // generate slug (same logic as create)
    const generateSlug = (title: string) => {
        const base = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");
        const shortId = uuidv4().split("-")[0];
        return `${base}-${shortId}`;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === "title") {
            setForm((prev) => ({ ...prev, slug: generateSlug(value), [name]: value }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
        if (name === "featured_image") setPreview(value);
    };

    // handle array textarea changes (store as arrays)
    const handleArrayChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>,
        setState: React.Dispatch<React.SetStateAction<string[]>>
    ) => {
        const lines = e.target.value.split("\n").map((l) => l.trim()).filter(Boolean);
        setState(lines);
    };

    // process array to send to backend (already arrays)
    const processArrayField = (arr: string[]) => arr.filter((l) => l.trim() !== "");

    // Modal open/close
    const handleOpenModal = () => {
        setSelectedImages(images.map((i) => i.image_url));
        setIsOpen(true);
    };
    const handleCloseModal = () => setIsOpen(false);

    const toggleSelect = (filenameOrUrl: string) => {
        // If passed filename from images_file, build url; otherwise accept url
        const file = images_file.find((f) => f.filename === filenameOrUrl);
        const imageUrl = file ? `/images/${file.path}` : filenameOrUrl;

        setSelectedImages((prev) =>
            prev.includes(imageUrl) ? prev.filter((f) => f !== imageUrl) : [...prev, imageUrl]
        );
    };

    // apply images from modal to images state (convert to TourImage list)
    const handleApplyImages = () => {
        const newImages: TourImage[] = selectedImages.map((url, index) => {
            // Try to reuse existing id if exists
            const exists = images.find((i) => i.image_url === url);
            return {
                id: exists?.id || uuidv4(),
                tour_id: tourId || "",
                image_url: url,
                order_index: index,
            };
        });
        setImages(newImages);
        handleCloseModal();
    };

    // Add a new URL manually (below the textarea behavior also sets images)
    const handleAddImageUrl = (url: string) => {
        setImages((prev) => [...prev, { id: uuidv4(), tour_id: tourId || "", image_url: url, order_index: prev.length }]);
        setSelectedImages((prev) => [...prev, url]);
    };

    // remove image (from local state). If the image existed on server, will delete on save.
    const handleRemoveImageLocal = (imageId: string) => {
        setImages((prev) => prev.filter((i) => i.id !== imageId));
        setSelectedImages((prev) => prev.filter((u) => u !== images.find((img) => img.id === imageId)?.image_url));
    };

    // reorder helper: move up/down
    const moveImage = (index: number, dir: "up" | "down") => {
        setImages((prev) => {
            const clone = [...prev];
            const target = dir === "up" ? index - 1 : index + 1;
            if (target < 0 || target >= clone.length) return clone;
            const tmp = clone[target];
            clone[target] = clone[index];
            clone[index] = tmp;
            // reassign order_index
            return clone.map((it, idx) => ({ ...it, order_index: idx }));
        });
    };

    // Save/update handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!tourId) {
            setMessage({ type: "error", text: "Missing tour id." });
            return;
        }

        if (!form.title || !form.slug || !form.price_from) {
            setMessage({ type: "error", text: "Please fill required fields." });
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            // build payload
            const payload: Partial<Tour> = {
                title: form.title,
                slug: form.slug,
                description: form.description,
                duration: form.duration,
                location: form.location,
                price_from: Number(form.price_from),
                note: processArrayField(note),
                itinerary: processArrayField(itinerary),
                program_detail: form.program_detail,
                tour_include: processArrayField(tourInclude),
                not_include: processArrayField(notInclude),
                cancellation_policy: processArrayField(cancellationPolicy),
                category_id: form.category_id,
                featured_image: form.featured_image,
                status: form.status as "draft" | "published",
                tour_type: form.tour_type,
            };

            // Update tour main record
            await tourService.update(tourId, payload);

            // Sync images:
            // 1) Get current server images to determine delete/update/add
            const serverImages = await tourService.getImages(tourId);
            const serverByUrl = new Map(serverImages.map((si) => [si.image_url, si]));
            const localByUrl = new Map(images.map((li) => [li.image_url, li]));

            // Delete images that are on server but not local
            await Promise.all(
                serverImages
                    .filter((si) => !localByUrl.has(si.image_url))
                    .map(async (si) => {
                        try {
                            await tourService.deleteImagesByTour(si.id);
                        } catch (err) {
                            console.warn("Failed to delete image", si, err);
                        }
                    })
            );

            // Update existing server images order or url if changed
            await Promise.all(
                images.map(async (img, idx) => {
                    const server = serverByUrl.get(img.image_url);
                    if (server) {
                        // ensure order_index is updated if changed
                        if ((server.order_index ?? -1) !== idx) {
                            try {
                                await tourService.updateImage(server.id, img.image_url, idx);
                            } catch (err) {
                                console.warn("Failed to update image order", server.id, err);
                            }
                        }
                    } else {
                        // new image -> add
                        try {
                            await tourService.addImage(tourId, img.image_url, idx);
                        } catch (err) {
                            console.warn("Failed to add image", img.image_url, err);
                        }
                    }
                })
            );

            setMessage({ type: "success", text: "✅ Tour updated successfully!" });
        } catch (err: any) {
            console.error("Update failed", err);
            setMessage({ type: "error", text: err?.message || "Failed to update tour." });
        } finally {
            setLoading(false);
        }
    };

    // KEYMAPPING for preview
    const KEYMAPPING: Record<string, any> = {
        images,
        note,
        itinerary,
        notInclude,
        tourInclude,
        cancellationPolicy,
    };

    return (
        <div className="mx-auto p-6 container-x">
            <h1 className="text-2xl font-bold mb-6"> Update Tour</h1>

            {message && (
                <div className={`mb-4 ${message.type === "error" ? "text-red-600" : "text-green-600"}`}>{message.text}</div>
            )}

            <div className="grid md:grid-cols-2 gap-2 overflow-hidden">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Basic Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Title *</label>
                            <input name="title" value={form.title} onChange={handleChange} required className="w-full admin-input" />
                        </div>
                        <div className="flex flex-col">
                            <label className="block text-sm font-medium mb-1">Slug (Auto Generated)</label>
                            <span className="w-full admin-input bg-gray-100 text-gray-500 py-2 px-3 rounded-md text-sm truncate">{form.slug || "Enter title to generate slug"}</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="w-full admin-input" />
                    </div>

                    {/* Meta */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Duration</label>
                            <input name="duration" value={form.duration} onChange={handleChange} placeholder="Full Day / Half Day" className="w-full admin-input" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Location</label>
                            <input name="location" value={form.location} onChange={handleChange} placeholder="Bangkok" className="w-full admin-input" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Starting Price (THB) *</label>
                            <input name="price_from" type="number" value={form.price_from} onChange={handleChange} className="w-full admin-input" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Category ID</label>
                            <input name="category_id" value={form.category_id} onChange={handleChange} placeholder="temples / adventure / culture" className="w-full admin-input" />
                        </div>
                    </div>

                    {/* Type & Status */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Tour Type</label>
                            <input name="tour_type" value={form.tour_type} onChange={handleChange} placeholder="Full Day / Private" className="w-full admin-input" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Status</label>
                            <select name="status" value={form.status} onChange={handleChange} className="w-full admin-input">
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Featured Image URL</label>
                        <input name="featured_image" value={form.featured_image} onChange={handleChange} placeholder="https://..." className="w-full admin-input" />
                        {preview && <img src={preview} alt="Preview" className="mt-3 w-full h-48 object-cover rounded-lg" />}
                    </div>

                    {/* Gallery */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Gallery Images (URLs)</label>
                        <div className="flex gap-2 mb-2">
                            <button type="button" onClick={handleOpenModal} className="bg-purple-600 text-white py-1 px-4 rounded-lg hover:bg-purple-700 transition">Select Images from Library</button>
                        </div>

                        <textarea
                            rows={4}
                            className="w-full admin-input"
                            placeholder="https://image1.jpg&#10;https://image2.jpg"
                            onChange={(e) => {
                                const list = e.target.value.split("\n").map((l) => l.trim()).filter(Boolean);
                                setImages(list.map((url, index) => ({ id: uuidv4(), tour_id: tourId || "", image_url: url, order_index: index })));
                                setSelectedImages(list);
                            }}
                            value={images.map((i) => i.image_url).join("\n")}
                        />

                        {/* Small gallery preview with remove / reorder */}
                        <div className="mt-3 flex flex-wrap gap-3">
                            {images.map((img, idx) => (
                                <div key={img.id} className="relative max-w-[180px] rounded-lg overflow-hidden border p-1">
                                    <img src={img.image_url} alt={img.id} className="w-40 h-24 object-cover rounded" />
                                    <div className="mt-1 flex justify-between items-center gap-2">
                                        <div className="flex gap-1">
                                            <button type="button" onClick={() => moveImage(idx, "up")} className="px-2 py-1 text-xs border rounded">↑</button>
                                            <button type="button" onClick={() => moveImage(idx, "down")} className="px-2 py-1 text-xs border rounded">↓</button>
                                        </div>
                                        <button type="button" onClick={() => handleRemoveImageLocal(img.id)} className="px-2 py-1 text-xs text-red-600 border rounded">Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Arrays */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Notes (one per line)</label>
                            <textarea onChange={(e) => handleArrayChange(e, setNote)} rows={4} className="w-full admin-input" value={note.join("\n")} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Itinerary (one per line)</label>
                            <textarea onChange={(e) => handleArrayChange(e, setItinerary)} rows={4} className="w-full admin-input" value={itinerary.join("\n")} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Tour Includes (one per line)</label>
                            <textarea onChange={(e) => handleArrayChange(e, setTourInclude)} rows={4} className="w-full admin-input" value={tourInclude.join("\n")} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Not Included (one per line)</label>
                            <textarea onChange={(e) => handleArrayChange(e, setNotInclude)} rows={4} className="w-full admin-input" value={notInclude.join("\n")} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Cancellation Policy (one per line)</label>
                        <textarea onChange={(e) => handleArrayChange(e, setCancellationPolicy)} rows={3} className="w-full admin-input" value={cancellationPolicy.join("\n")} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Program Detail</label>
                        <textarea name="program_detail" value={form.program_detail} onChange={handleChange} rows={5} className="w-full admin-input" />
                    </div>

                    <button type="submit" disabled={loading} className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-60">
                        {loading ? "Updating..." : "Update Tour"}
                    </button>
                </form>

                {/* JSON preview */}
                <JsonPreview form={form} KEYMAPPING={KEYMAPPING} />
            </div>

            {/* Modal */}
            {isOpen && (
                <section className="w-full h-screen z-99 bg-black/30 fixed flex flex-col items-center justify-center top-0 left-0">
                    <div className="bg-white rounded-xl w-full h-full p-5 max-w-[80vw] max-h-[80vh] flex flex-col">
                        <div className="w-full flex items-center justify-between flex-shrink-0">
                            <div className="text-3xl font-bold">Gallery</div>
                            <button onClick={handleCloseModal} className="rounded-sm hover:bg-zinc-200 p-2">
                                <Minus size={24} className="text-zinc-500" />
                            </button>
                        </div>

                        <div className="text-sm text-gray-500 mt-2 flex-shrink-0">{selectedImages.length} images selected.</div>

                        <div className="overflow-auto h-[65vh] mt-5 flex flex-wrap gap-3 w-full flex-grow">
                            {images_file.map((item) => {
                                const imageUrl = `/images/${item.path}`;
                                const isSelected = selectedImages.includes(imageUrl);
                                return (
                                    <div
                                        key={item.filename}
                                        onClick={() => toggleSelect(item.filename)}
                                        className={`relative cursor-pointer max-w-[150px] rounded-lg overflow-hidden border-4 transition-all duration-150 ${isSelected ? "border-blue-500" : "border-transparent"}`}
                                    >
                                        <img src={imageUrl} alt={item.filename} className="w-full h-full object-cover" />
                                        {isSelected && <div className="absolute inset-0 bg-blue-500/30"></div>}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex justify-end pt-4 border-t border-gray-200 flex-shrink-0">
                            <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-100 transition mr-3">Cancel</button>
                            <button type="button" onClick={handleApplyImages} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Apply Selection ({selectedImages.length})</button>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
