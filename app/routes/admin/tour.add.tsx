import { useState } from "react";
import { tourService } from "~/services/tourService";
import { v4 as uuidv4 } from "uuid";
import type { TourImage } from "~/models/tour";
// import { images_file } from "public/images/image_files"; // Not directly used in component logic post-cleanup
import { Minus } from "lucide-react";
import { images_file } from "public/images/image_files";
import JsonPreview from "./components/JsonPreview";

export default function AddTourAdminPage() {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string>("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

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
    style: "",
    pickup: "",
    short: "",
  });

  const generateSlug = (title: string) => {
    const base = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    const shortId = uuidv4().split("-")[0];
    return `${base}-${shortId}`;
  };

  // Array fields
  const [note, setNote] = useState<string[]>([]);
  const [itinerary, setItinerary] = useState<string[]>([]);
  const [tourInclude, setTourInclude] = useState<string[]>([]);
  const [notInclude, setNotInclude] = useState<string[]>([]);
  const [cancellationPolicy, setCancellationPolicy] = useState<string[]>([]);
  const [images, setImages] = useState<TourImage[]>([]);

  // Modal and Image Selection States
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>(images.map(i => i.image_url));

  const handleCloseModal = () => {
    setIsOpen(false);
  }

  const handleOpenModal = () => {
    setSelectedImages(images.map(i => i.image_url));
    setIsOpen(true);
  };

  // NOTE: You'll need to define `images_file` and `toggleSelect` in this component
  // to make the modal functionality work if you copy the previous response's changes.
  // For cleanup, I'm assuming you will define them elsewhere or already have them.

  const handleApplyImages = () => {
    const newImages: TourImage[] = selectedImages.map((url, index) => ({
      id: uuidv4(),
      tour_id: "",
      image_url: url,
      order_index: index,
    }));
    setImages(newImages);
    handleCloseModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "title") {
      setForm((prev) => ({ ...prev, slug: generateSlug(value), [name]: (value) }));
    }
    else {
      setForm((prev) => ({ ...prev, [name]: (value) }));
    }


    if (name === "featured_image") setPreview(value);
  };

  const handleArrayChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    setState: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    // Stores the entire textarea content as a single string in the state array.
    const lines = e.target.value;
    setState([lines]);
  };

  // Helper to process array fields for submission
  const processArrayField = (arr: string[]) => arr.join().split("\n").filter((l) => l.trim() !== "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!form.title || !form.slug || !form.price_from) {
      setMessage({ type: "error", text: "Please fill in all required fields." });
      setLoading(false);
      return;
    }

    try {
      const tour_id = await tourService.create({
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
        rating: 0,
        tour_type: form.tour_type,
      });

      // Submit gallery images
      await Promise.all(
        images.map(async (image, orderIndex) => await tourService.addImage(tour_id, image.image_url, orderIndex))
      );


      setMessage({ type: "success", text: "✅ Tour created successfully!" });
      // Reset form
      setForm({
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
        pickup : "",
        style : "",
        short : "",
      });
      setNote([]);
      setItinerary([]);
      setTourInclude([]);
      setNotInclude([]);
      setCancellationPolicy([]);
      setImages([]);
      setPreview("");
      setSelectedImages([]);
    } catch (err: any) {
      console.error(err);
      setMessage({ type: "error", text: err.message || "Failed to create tour." });
    } finally {
      setLoading(false);
    }
  };

  // Only for displaying raw data on the side
  const KEYMAPPING = {
    "images": images,
    "note": note,
    "itinerary": itinerary,
    "notInclude": notInclude,
    "tourInclude": tourInclude,
    "cancellationPolicy": cancellationPolicy
  }

  const toggleSelect = (filename: string) => {
    // Assuming 'filename' from images_file is the actual URL or path used in the form
    // Since images_file seems to use `path`, let's assume the full URL is `/images/${item.path}`
    const imageUrl = `/images/${images_file.find(i => i.filename === filename)?.path || filename}`;

    setSelectedImages((prev) =>
      prev.includes(imageUrl)
        ? prev.filter((f) => f !== imageUrl)
        : [...prev, imageUrl]
    );
  };

  return (
    <div className=" mx-auto p-6 container-x ">
      <h1 className="text-2xl font-bold mb-6"> Add New Tour</h1>

      {message && (
        <div className={`mb-4 ${message.type === "error" ? "text-red-600" : "text-green-600"}`}>
          {message.text}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-2 overflow-hidden">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title *</label>
              <input name="title" value={form.title} onChange={handleChange} required className="w-full admin-input" />
            </div>
            {/* Slug is generated automatically, no need for an input field */}
            <div className="flex flex-col">
              <label className="block text-sm font-medium mb-1">Slug (Auto Generated)</label>
              <span className="w-full admin-input bg-gray-100 text-gray-500 py-2 px-3 rounded-md text-sm truncate">{form.slug || 'Enter title to generate slug'}</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="w-full admin-input" />
          </div>
          {/* Tour Meta */}
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
          {/* Price and Category */}
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
          {/* Type and Status */}
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
          {/* Gallery Images Field with Open Modal Button */}
          <div>
            <label className="block text-sm font-medium mb-1">Gallery Images (URLs)</label>
            <div className="flex gap-2 mb-2">
              <button
                type="button"
                onClick={handleOpenModal}
                className="bg-purple-600 text-white py-1 px-4 rounded-lg hover:bg-purple-700 transition"
              >
                Select Images from Library
              </button>
            </div>
            <textarea
              rows={4}
              className="w-full admin-input"
              placeholder="https://image1.jpg&#10;https://image2.jpg"
              onChange={(e) => {
                const list = e.target.value
                  .split("\n")
                  .filter((l) => l.trim() !== "");
                setImages(
                  list.map((url, index) => ({
                    id: uuidv4(),
                    tour_id: "",
                    image_url: url,
                    order_index: index,
                  }))
                );
                setSelectedImages(list);
              }}
              value={images.map((i) => i.image_url).join("\n")}
            />
          </div>
          {/* Arrays */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Notes (one per line)</label>
              <textarea onChange={(e) => handleArrayChange(e, setNote)} rows={4} className="w-full admin-input" value={note} />
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
          <div>
            <label className="block text-sm font-medium mb-1">style</label>
            <textarea name="style" value={form.style} onChange={handleChange} rows={5} className="w-full admin-input" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">pickup</label>
            <textarea name="pickup" value={form.pickup} onChange={handleChange} rows={5} className="w-full admin-input" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">short</label>
            <textarea name="short" value={form.short} onChange={handleChange} rows={5} className="w-full admin-input" />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Tour"}
          </button>
        </form>

        {/* json - display */}
        {/* <div className="max-w-3xl">
          <h3 className="text-xl font-semibold mb-3">Current Data Preview (JSON)</h3>
          {Object.entries(form).map(([key, value]) =>
            <div key={key} className="flex items-center gap-2">
              <div className="font-medium">{key} : </div>
              <div className="bg-zinc-200 px-2 w-fit">{value}</div>
            </div>)}
          
          {Object.entries(KEYMAPPING).map(([key, value]) => <div key={key} className="flex items-center gap-2">
            <div className="font-medium">{key} : </div>
            <div className="bg-zinc-200 px-2 overflow-auto max-w-full text-wrap">{key === "images" ? JSON.stringify(value) :
              JSON.stringify(processArrayField(value as any))}</div>
          </div>)}
        </div> */}
         <JsonPreview form={form} KEYMAPPING={KEYMAPPING} />
      </div>

      {/* modal image */}
      {/* NOTE: Modal content is incomplete as it relies on external 'images_file' and 'toggleSelect' logic. */}
      {isOpen && <section className="w-full h-screen z-99 bg-black/30 fixed flex flex-col items-center justify-center top-0 left-0">
        <div className="bg-white rounded-xl w-full h-full p-5 max-w-[80vw] max-h-[80vh] flex flex-col">
          <div className="w-full flex items-center justify-between flex-shrink-0">
            <div className="text-3xl font-bold">Gallery</div>
            <button
              onClick={handleCloseModal}
              className="rounded-sm hover:bg-zinc-200 p-2" ><Minus size={24} className="text-zinc-500"></Minus></button>
          </div>
          <div className="text-sm text-gray-500 mt-2 flex-shrink-0">{selectedImages.length} images selected.</div>

          <div className="overflow-auto h-[65vh] mt-5 flex flex-wrap gap-3 w-full flex-grow">
            {/* --- Image listing removed for cleanup/simplicity, restore if images_file is defined --- */}
            <div className="text-gray-500">
              <div className="overflow-auto h-[65vh] mt-5 flex flex-wrap gap-3 w-full flex-grow">
                {images_file.map((item) => {
                  // The image URL in the modal is constructed as `/images/${item.path}`
                  const imageUrl = `/images/${item.path}`;
                  const isSelected = selectedImages.includes(imageUrl);

                  return (
                    <div
                      key={item.filename}
                      // Pass the filename/id to toggleSelect to find the correct URL
                      onClick={() => toggleSelect(item.filename)}
                      className={`
                    relative cursor-pointer max-w-[150px] rounded-lg overflow-hidden
                    border-4 transition-all duration-150
                    ${isSelected ? "border-blue-500" : "border-transparent"}
                  `}
                    >
                      <img
                        src={imageUrl}
                        alt={item.filename}
                        className="w-full h-full object-cover"
                      />

                      {isSelected && (
                        <div className="absolute inset-0 bg-blue-500/30"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex justify-end pt-4 border-t border-gray-200 flex-shrink-0">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-100 transition mr-3"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApplyImages}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Apply Selection ({selectedImages.length})
            </button>
          </div>
        </div>
      </section>}

    </div>
  );
}