import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Tour, TourImage } from "~/models/tour";
import { Minus, Image as ImageIcon } from "lucide-react";
import { tourService } from "~/services/tourService";
import { images_file } from "public/images/image_files";
import type { Route } from "./+types/tour.update";
import JsonPreview from "./components/JsonPreview";
import { toast } from "sonner";
import ImageInputs from "~/components/GalleryImage";
import { TourImageService } from "~/services/imageService";

export default function UpdateTourAdminPage({ params }: Route.ClientActionArgs) {

    // NOTE: tourId is being derived from params, but using a default value for local testing
    const tourId = params.tourId || "E3gXfncUqEjFcAfkowml"

    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<string>("");
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    // NEW: Track which mode the modal is in ('featured' or 'gallery')
    const [modalMode, setModalMode] = useState<"featured" | "gallery">("gallery");

    // form state
    const [form, setForm] = useState({
        tid: "",
        title: "",
        slug: "",
        description: "",
        duration: "",
        location: "",
        price_from: "",

        prices: {
            upto_4_people: "",
            upto_9_people: "",
        },
        //price note
        price_note: "",

        category_id: "",
        featured_image: "",
        program_detail: "",
        status: "draft",
        tour_type: "",
        recommended: false,
        deposit: 0,
        // 👇 ADDED MISSING FIELDS
        style: "",
        pickup: "",
        short: "",
        meal: "",
        departure: "",



    });

    // array fields
    const [note, setNote] = useState<string[]>([]);
    const [itinerary, setItinerary] = useState<string[]>([]);
    const [tourInclude, setTourInclude] = useState<string[]>([]);
    const [notInclude, setNotInclude] = useState<string[]>([]);
    const [removeImageLocal, setRemoveImageLocal] = useState<string[]>([]);
    const [cancellationPolicy, setCancellationPolicy] = useState<string[]>([]);
    const [searchImage, setSearchImage] = useState("");

    // gallery images (local state)
    const [images, setImages] = useState<TourImage[]>([]);
    // modal selection
    const [selectedImages, setSelectedImages] = useState<string[]>([]);

    useEffect(() => {
        toast(message?.text)
    }, [message]);

    // load tour + images on mount
    useEffect(() => {
        if (!tourId) return;
        (async () => {
            try {
                setLoading(true);
                const tour: Tour | any = await tourService.getById(tourId);
                const gallery: TourImage[] = await tourService.getImages(tourId);

                console.log("GALLERY : ", gallery)

                // Prefill form
                setForm({
                    tid: tour.tid || "",
                    title: tour.title || "",
                    slug: tour.slug || "",
                    description: tour.description || "",
                    duration: tour.duration || "",
                    location: tour.location || "",
                    price_from: (tour.price_from ?? "").toString(),

                    prices: {
                        upto_4_people: tour?.prices?.upto_4_people || 0,
                        upto_9_people: tour?.prices?.upto_9_people || 0,
                    },

                    price_note: tour?.price_note || "",

                    category_id: tour.category_id || "",
                    featured_image: tour.featured_image || "",
                    program_detail: tour.program_detail || "",
                    status: tour.status || "draft",
                    tour_type: tour.tour_type || "",
                    recommended: tour.recommended ?? false,
                    deposit: tour.deposit ?? 0,
                    // 👇 ADDED MISSING FIELDS TO LOADING LOGIC
                    style: tour.style || "",
                    pickup: tour.pickup || "",
                    short: tour.short || "",
                    meal: tour.meal || "",

                    departure: tour.departure || "",
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
                toast.success("Tour loaded successfully");
            } catch (err: any) {
                console.error("Failed to load tour", err);
                toast.error("Failed to load tour");
                setMessage({ type: "error", text: err?.message || "Failed to load tour" });
            } finally {
                setLoading(false);
            }
        })();
    }, [tourId]);

    // generate slug
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
            setForm((prev) => ({ ...prev, slug: generateSlug(value), [name]: (value) }));
        }
        else if (name === "recommended") {
            // Handle checkbox change if recommended were a checkbox, but it's a button/toggle, so it's handled separately.
            // Keeping this structure for general form changes.
            setForm((prev: any) => ({ ...prev, [name]: (value) }));
        }
        else if (name.includes("upto_")) {

            setForm(prev => ({
                ...prev,
                prices: {
                    ...prev.prices,
                    [name]: value
                }
            }));
        }
        else {
            setForm((prev) => ({ ...prev, [name]: (value) }));
        }

        if (name === "featured_image") setPreview(value);
    };

    // handle array textarea changes
    const handleArrayChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>,
        setState: React.Dispatch<React.SetStateAction<string[]>>
    ) => {
        const lines = e.target.value.split("\n").map((l) => l.trim()).filter(Boolean);
        setState(lines);
    };

    // process array to send to backend
    const processArrayField = (arr: string[]) => arr.filter((l) => l.trim() !== "");

    // Modal Logic ------------------------------------------------------

    const handleCloseModal = () => setIsOpen(false);

    // Open for Featured Image (Single Select)
    const handleOpenFeaturedModal = () => {
        setModalMode("featured");
        // Pre-select current featured image if exists
        setSelectedImages(form.featured_image ? [form.featured_image] : []);
        setIsOpen(true);
    };

    // Open for Gallery (Multi Select)
    const handleOpenGalleryModal = () => {
        setModalMode("gallery");
        setSelectedImages(images.map((i) => i.image_url));
        setIsOpen(true);
    };

    const toggleSelect = (filenameOrUrl: string) => {
        // Resolve URL from filename or use as is
        const file = images_file.find((f) => f.filename === filenameOrUrl);
        const imageUrl = file ? `/images/${file.path}` : filenameOrUrl;

        if (modalMode === "featured") {
            // Single Select: Replace selection or toggle off
            setSelectedImages(prev => prev.includes(imageUrl) ? [] : [imageUrl]);
        } else {
            // Multi Select: Append or remove
            setSelectedImages((prev) =>
                prev.includes(imageUrl) ? prev.filter((f) => f !== imageUrl) : [...prev, imageUrl]
            );
        }
    };

    // Apply Selection
    const handleApplyImages = () => {
        if (modalMode === "featured") {
            // Set Featured Image
            if (selectedImages.length > 0) {
                const url = selectedImages[0];
                setForm(prev => ({ ...prev, featured_image: url }));
                setPreview(url);
            }
        } else {
            // Set Gallery Images
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
        }
        handleCloseModal();
    };

    // ------------------------------------------------------------------

    // remove image (from local state)
    const handleRemoveImageLocal = (imageId: string) => {
        setRemoveImageLocal(prev => [...prev, imageId]);
        setImages((prev) => prev.filter((i) => i.id !== imageId));
        setSelectedImages((prev) => prev.filter((u) => u !== images.find((img) => img.id === imageId)?.image_url));
    };
   
    // reorder helper
    const moveImage = (index: number, dir: "up" | "down") => {
        setImages((prev) => {
            const clone = [...prev];
            const target = dir === "up" ? index - 1 : index + 1;
            if (target < 0 || target >= clone.length) return clone;
            const tmp = clone[target];
            clone[target] = clone[index];
            clone[index] = tmp;
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
                tid: form.tid,
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
                prices: {
                    upto_4_people: Number(form.prices.upto_4_people),
                    upto_9_people: Number(form.prices.upto_9_people),
                },
                price_note: form.price_note,
                status: form.status as "draft" | "published",
                tour_type: form.tour_type,
                recommended: form.recommended,
                deposit: Number(form.deposit),
                // 👇 ADDED MISSING FIELDS TO PAYLOAD
                style: form.style,
                pickup: form.pickup,
                short: form.short,
                meal: form.meal,
                departure: form.departure,
            };

            // Update tour main record
            await tourService.update(tourId, payload);

            // Sync images logic... (unchanged)
            const serverImages = await tourService.getImages(tourId);
            const serverByUrl = new Map(serverImages.map((si) => [si.image_url, si]));
            const localByUrl = new Map(images.map((li) => [li.image_url, li]));

            // Delete images
           const deleteImageResult =  await Promise.all(
                removeImageLocal
                    .map(async (si) => {
                        try {
                            // Assuming tourService.deleteImagesByTour deletes by image ID, not tour ID
                            await TourImageService.delete(si);
                        } catch (err) {
                            console.warn("Failed to delete image", si, err);
                        }
                    })
            );

            console.log("REMOVE IMAGE : ",deleteImageResult)

            // Update or Add images
            await Promise.all(
                images.map(async (img, idx) => {
                    const server = serverByUrl.get(img.image_url);
                    if (server) {
                        if ((server.order_index ?? -1) !== idx) {
                            try {
                                await tourService.updateImage(server.id, img.image_url, idx);
                            } catch (err) {
                                console.warn("Failed to update image order", server.id, err);
                            }
                        }
                    } else {
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
        recommended: form.recommended,
        // 👇 ADDED MISSING FIELDS TO KEYMAPPING
        style: form.style,
        pickup: form.pickup,
        short: form.short,
    };

    return (
        <div className="mx-auto p-6 container-x relative">
            {/* <div className="fixed bottom-0 w-[400px] h-[300px]
            rounded-xl m-4 right-0 p-2 z-10 bg-white border border-zinc-300">
                {removeImageLocal?.map((item, index) =>
                    <div className="p-2 flex w-full justify-between " key={index}>
                        <div className="">{item}</div>
                        <button
                        
                        className="btn p-2 text-white p-2 bg-red-400 rounded-xl">-</button>
                    </div>
                )}
            </div> */}
            <h1 className="text-2xl font-bold mb-6"> Update Tour: {form.title || tourId}</h1>

            {message && (
                <div className={`mb-4 ${message.type === "error" ? "text-red-600" : "text-green-600"}`}>{message.text}</div>
            )}

            <div className="grid md:grid-cols-2 gap-2 overflow-hidden">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Basic Info */}
                    <div>
                        <label className="block text-sm font-medium mb-1">TOUR ID *</label>
                        <input name="tid" value={form.tid} onChange={handleChange} required className="w-full admin-input" />
                    </div>
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
                            <label className="block text-sm font-medium mb-1">Deposit (THB) (Optional) </label>
                            <input name="deposit" type="number" value={form.deposit} onChange={handleChange} className="w-full admin-input" />
                        </div>

                        {/* prices */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Up to 4 People (THB) *</label>
                            <input name="upto_4_people" type="number" value={form.prices.upto_4_people} onChange={handleChange} className="w-full admin-input" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Up to 9 People (THB) *</label>
                            <input name="upto_9_people" type="number" value={form.prices.upto_9_people} onChange={handleChange} className="w-full admin-input" />
                        </div>

                        {/* price note */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Price Note (Optional)
                            </label>
                            <textarea
                                name="price_note"
                                value={form.price_note}
                                onChange={handleChange}
                                className="w-full admin-input"
                                rows={4}
                            />
                        </div>



                        <div>
                            <label className="block text-sm font-medium mb-1">Category ID</label>
                            <input name="category_id" value={form.category_id} onChange={handleChange} placeholder="temples / adventure / culture" className="w-full admin-input" />
                        </div>
                    </div>

                    {/* meal */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm mb-1">Meal</label>
                            <input name="meal" value={form.meal} onChange={handleChange} className="w-full admin-input" />
                        </div>

                        <div>
                            <label className="block text-sm mb-1">Departure</label>
                            <input name="departure" value={form.departure} onChange={handleChange} className="w-full admin-input" />
                        </div>
                    </div>

                    {/* Type, Status & Recommended Toggle */}
                    <div className="grid grid-cols-3 gap-4 items-end">
                        <div className="col-span-1">
                            <label className="block text-sm font-medium mb-1">Tour Type</label>
                            <input name="tour_type" value={form.tour_type} onChange={handleChange} placeholder="Full Day / Private" className="w-full admin-input" />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium mb-1">Status</label>
                            <select name="status" value={form.status} onChange={handleChange} className="w-full admin-input">
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>
                        <div className="col-span-1 flex flex-col justify-end pb-2">
                            <label
                                className="block text-sm font-medium mb-2 text-gray-700 cursor-pointer"
                                onClick={() => setForm(prev => ({ ...prev, recommended: !prev.recommended }))}
                            >
                                Recommended?
                            </label>
                            <button
                                type="button"
                                onClick={() => setForm(prev => ({ ...prev, recommended: !prev.recommended }))}
                                className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${form.recommended ? "bg-green-500" : "bg-gray-300"
                                    }`}
                            >
                                <span
                                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 ${form.recommended ? "translate-x-8" : "translate-x-1"
                                        }`}
                                />
                            </button>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Featured Image URL</label>

                        {/* BUTTON FOR FEATURED IMAGE SELECTION */}
                        <div className="flex gap-2 mb-2">
                            <button
                                type="button"
                                onClick={handleOpenFeaturedModal}
                                className="bg-zinc-600 text-white py-1 px-4 rounded-lg hover:bg-zinc-700 transition flex items-center gap-2"
                            >
                                <ImageIcon size={16} /> Select Featured Image
                            </button>
                        </div>

                        <input name="featured_image" value={form.featured_image} onChange={handleChange} placeholder="https://..." className="w-full admin-input" />
                        {preview && <img src={preview} alt="Preview" className="mt-3 w-full h-48 object-cover rounded-lg" />}
                    </div>

                    {/* Gallery */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Gallery Images (URLs)</label>
                        <div className="flex gap-2 mb-2">
                            <button
                                type="button"
                                onClick={handleOpenGalleryModal}
                                className="bg-purple-600 text-white py-1 px-4 rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
                            >
                                <ImageIcon size={16} /> Select Gallery Images
                            </button>
                        </div>

                        <ImageInputs
                            images={images}
                            setImages={setImages}
                            tourId={tourId}
                        />

                        {/* Small gallery preview with remove / reorder */}
                        <div className="mt-3 flex flex-wrap gap-3">
                            {images?.map((img, idx) => (
                                <div key={img.id} className="relative max-w-[180px] rounded-lg overflow-hidden border p-1">
                                    <img src={img?.image_url} alt={img.id} className="w-40 h-24 object-cover rounded" />
                                    <div className="">{img.id}</div>
                                    <div className="mt-1 flex justify-between items-center gap-2">
                                        <div className="flex gap-1">
                                            <button type="button" onClick={() => moveImage(idx, "up")} className="px-2 py-1 text-xs border rounded">↑</button>
                                            <button type="button" onClick={() => moveImage(idx, "down")} className="px-2 py-1 text-xs border rounded">↓</button>
                                        </div>
                                        <button type="button" onClick={() => handleRemoveImageLocal(img.id)} className="px-2 py-1 text-xs text-red-600 hover:bg-red-600 hover:text-white border rounded">Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Arrays (Notes, Itinerary, etc. - unchanged) */}
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

                    {/* 👇 ADDED MISSING FIELDS TO JSX */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Style</label>
                        <textarea name="style" value={form.style} onChange={handleChange} rows={5} className="w-full admin-input" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Pickup</label>
                        <textarea name="pickup" value={form.pickup} onChange={handleChange} rows={5} className="w-full admin-input" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Short</label>
                        <textarea name="short" value={form.short} onChange={handleChange} rows={5} className="w-full admin-input" />
                    </div>
                    {/* 👆 END ADDED MISSING FIELDS TO JSX */}

                    <button type="submit" disabled={loading} className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-60">
                        {loading ? "Updating..." : "Update Tour"}
                    </button>
                </form>

                {/* JSON preview */}
                <JsonPreview form={form} KEYMAPPING={KEYMAPPING} />
            </div>

            {/* Modal (unchanged) */}
            {isOpen && (
                <section className="w-full h-screen z-99 bg-black/30 fixed flex flex-col items-center justify-center top-0 left-0">
                    <div className="bg-white rounded-xl w-full h-full p-5 max-w-[80vw] max-h-[80vh] flex flex-col">
                        <div className="w-full flex items-center justify-between flex-shrink-0">
                            {/* DYNAMIC TITLE */}
                            <div className="text-3xl font-bold">
                                {modalMode === "featured" ? "Select Featured Image" : "Select Gallery Images"}
                            </div>
                            <button onClick={handleCloseModal} className="rounded-sm hover:bg-zinc-200 p-2">
                                <Minus size={24} className="text-zinc-500" />
                            </button>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-500 mt-2 flex-shrink-0">
                                {selectedImages.length} image{selectedImages.length !== 1 && "s"} selected
                                {modalMode === "featured" && " (Max 1)"}
                            </div>
                            <div className="">
                                <input type="text" onChange={(e) => setSearchImage(e.target.value)} className="input rounded-sm" placeholder="Search" />
                            </div>
                        </div>

                        <div className="overflow-auto h-[65vh] mt-5 flex flex-wrap gap-3 w-full flex-grow">
                            {images_file.filter(item => item.filename.includes(searchImage)).map((item) => {
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
                            <button
                                type="button"
                                onClick={handleApplyImages}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                {modalMode === "featured" ? "Set Featured Image" : `Apply Selection (${selectedImages.length})`}
                            </button>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}