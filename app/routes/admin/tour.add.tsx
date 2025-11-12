import { useState } from "react";
import { tourService } from "~/services/tourService";
import { v4 as uuidv4 } from "uuid";

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
  });

  const generateSlug = (title: string) => {
    const base = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    const shortId = uuidv4().split("-")[0]; // e.g., '4f2a'
    return `${base}-${shortId}`;
  };

  // Array fields
  const [note, setNote] = useState<string[]>([]);
  const [itinerary, setItinerary] = useState<string[]>([]);
  const [tourInclude, setTourInclude] = useState<string[]>([]);
  const [notInclude, setNotInclude] = useState<string[]>([]);
  const [cancellationPolicy, setCancellationPolicy] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: (value) }));

    if (name === "featured_image") setPreview(value);
  };

  const handleArrayChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    setState: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const lines = e.target.value.split("\n").filter((l) => l.trim() !== "");
    setState(lines);
  };

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
      await tourService.create({
        title: form.title,
        slug: form.slug,
        description: form.description,
        duration: form.duration,
        location: form.location,
        price_from: Number(form.price_from),
        note,
        itinerary,
        program_detail: form.program_detail,
        tour_include: tourInclude,
        not_include: notInclude,
        cancellation_policy: cancellationPolicy,
        category_id: form.category_id,
        featured_image: form.featured_image,
        status: form.status as "draft" | "published",
        // created_at: new Date(),
        // updated_at: new Date(),
        rating: 0,
        tour_type: form.tour_type,
      });

      setMessage({ type: "success", text: "✅ Tour created successfully!" });
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
      });
      setNote([]);
      setItinerary([]);
      setTourInclude([]);
      setNotInclude([]);
      setCancellationPolicy([]);
      setPreview("");
    } catch (err: any) {
      console.error(err);
      setMessage({ type: "error", text: err.message || "Failed to create tour." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6"> Add New Tour</h1>

      {message && (
        <div className={`mb-4 ${message.type === "error" ? "text-red-600" : "text-green-600"}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input name="title" value={form.title} onChange={handleChange} required className="w-full rounded border p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Slug *</label>
            <input name="slug" value={form.slug} onChange={handleChange} required className="w-full rounded border p-2" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="w-full rounded border p-2" />
        </div>

        {/* Tour Meta */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Duration</label>
            <input name="duration" value={form.duration} onChange={handleChange} placeholder="Full Day / Half Day" className="w-full rounded border p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input name="location" value={form.location} onChange={handleChange} placeholder="Bangkok" className="w-full rounded border p-2" />
          </div>
        </div>

        {/* Price and Category */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Starting Price (THB) *</label>
            <input name="price_from" type="number" value={form.price_from} onChange={handleChange} className="w-full rounded border p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category ID</label>
            <input name="category_id" value={form.category_id} onChange={handleChange} placeholder="temples / adventure / culture" className="w-full rounded border p-2" />
          </div>
        </div>

        {/* Type and Status */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tour Type</label>
            <input name="tour_type" value={form.tour_type} onChange={handleChange} placeholder="Full Day / Private" className="w-full rounded border p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select name="status" value={form.status} onChange={handleChange} className="w-full rounded border p-2">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        {/* Featured Image */}
        <div>
          <label className="block text-sm font-medium mb-1">Featured Image URL</label>
          <input name="featured_image" value={form.featured_image} onChange={handleChange} placeholder="https://..." className="w-full rounded border p-2" />
          {preview && <img src={preview} alt="Preview" className="mt-3 w-full h-48 object-cover rounded-lg" />}
        </div>

        {/* Arrays */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Notes (one per line)</label>
            <textarea onChange={(e) => handleArrayChange(e, setNote)} rows={4} className="w-full rounded border p-2" value={note.join("\n")} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Itinerary (one per line)</label>
            <textarea onChange={(e) => handleArrayChange(e, setItinerary)} rows={4} className="w-full rounded border p-2" value={itinerary.join("\n")} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tour Includes</label>
            <textarea onChange={(e) => handleArrayChange(e, setTourInclude)} rows={4} className="w-full rounded border p-2" value={tourInclude.join("\n")} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Not Included</label>
            <textarea onChange={(e) => handleArrayChange(e, setNotInclude)} rows={4} className="w-full rounded border p-2" value={notInclude.join("\n")} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Cancellation Policy (one per line)</label>
          <textarea onChange={(e) => handleArrayChange(e, setCancellationPolicy)} rows={3} className="w-full rounded border p-2" value={cancellationPolicy.join("\n")} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Program Detail</label>
          <textarea name="program_detail" value={form.program_detail} onChange={handleChange} rows={5} className="w-full rounded border p-2" />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Tour"}
        </button>
      </form>
    </div>
  );
}
