import { Form, redirect, useActionData, type ActionFunctionArgs } from "react-router";
import { useState } from "react";
import { blogService } from "~/services/blogService";
import { v4 as uuidv4 } from "uuid";
import { Minus, Image as ImageIcon } from "lucide-react";
import { images_file } from "public/images/image_files";
import MarkdownEditor from "~/components/MarkdownEditor";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const title = formData.get("title")?.toString() || "";
  const slug = formData.get("slug")?.toString() || "";
  const excerpt = formData.get("excerpt")?.toString() || "";
  const tags = formData.get("tags")?.toString() || "";
  const author = formData.get("author")?.toString() || "";
  const contents = formData.get("contents")?.toString() || "";

  // Receive JSON from hidden input
  const imagesJSON = formData.get("imagesJSON")?.toString() || "[]";
  const images = JSON.parse(imagesJSON);

  if (!title || !slug || !contents)
    return { error: "Title, slug, and contents are required." };

  const newBlog = {
    title,
    slug,
    excerpt,
    tags,
    author,
    contents,
    images,
    publish_at: new Date().toISOString().split("T")[0],
  };

  await blogService.create(newBlog);
  return redirect("/blogs");
};

export default function BlogAddPage() {
  const actionData = useActionData<typeof action>();

  // Form state
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    tags: "",
    author: "",
    contents: "",
  });

  // Image state
  const [images, setImages] = useState<string[]>([]);
  const [searchImage, setSearchImage] = useState("");

  // Modal state
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    const base = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    const shortId = uuidv4().split("-")[0];
    return `${base}-${shortId}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "title") {
      setForm((prev) => ({
        ...prev,
        slug: generateSlug(value),
        [name]: value
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleOpenModal = () => {
    setSelectedImages(images);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleApplyImages = () => {
    setImages(selectedImages);
    handleCloseModal();
  };

  const toggleSelect = (filename: string) => {
    const imageObject = images_file.find(i => i.filename === filename);
    const imageUrl = `/images/${imageObject?.path || filename}`;

    setSelectedImages((prev) =>
      prev.includes(imageUrl)
        ? prev.filter((url) => url !== imageUrl)
        : [...prev, imageUrl]
    );
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Create New Blog</h1>

      {actionData?.error && (
        <p className="mb-4 text-red-600">{actionData.error}</p>
      )}

      <Form method="post" className="space-y-6">
        {/* Title */}
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            className="w-full input rounded-sm px-3 py-2 border"
            required
          />
        </div>

        {/* Slug (Auto-generated) */}
        <div>
          <label className="block font-medium mb-1">Slug (Auto Generated)</label>
          <input
            name="slug"
            type="text"
            value={form.slug}
            readOnly
            className="w-full input rounded-sm px-3 py-2 bg-gray-100 text-gray-500 border"
            placeholder="Enter title to generate slug"
            required
          />
        </div>

        {/* Author */}
        <div>
          <label className="block font-medium mb-1">Author</label>
          <input
            name="author"
            type="text"
            value={form.author}
            onChange={handleChange}
            className="w-full input rounded-sm px-3 py-2 border"
            placeholder="By John Doe"
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block font-medium mb-1">Excerpt</label>
          <textarea
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            className="w-full input rounded-sm px-3 py-2 h-24 border"
            placeholder="Short summary..."
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block font-medium mb-1">Tags (comma separated)</label>
          <input
            name="tags"
            type="text"
            value={form.tags}
            onChange={handleChange}
            className="w-full input rounded-sm px-3 py-2 border"
            placeholder="marketing, travel, blog"
          />
        </div>

        {/* Image Picker with Modal */}
        <div>
          <label className="block font-medium mb-1">Blog Images</label>
          <div className="flex gap-2 mb-2">
            <button
              type="button"
              onClick={handleOpenModal}
              className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
            >
              <ImageIcon size={16} /> Select Images ({images.length})
            </button>
          </div>

          {/* Preview selected images */}
          {images.length > 0 && (
            <div className="mt-3 grid grid-cols-4 gap-2">
              {images.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`Selected ${idx + 1}`}
                  className="w-full h-24 object-cover rounded-lg border"
                />
              ))}
            </div>
          )}
        </div>

        {/* Hidden input for images JSON */}
        <input type="hidden" name="imagesJSON" value={JSON.stringify(images)} />

        {/* Contents */}
        <div>
          <label className="block font-medium mb-1">Article Contents</label>
          <MarkdownEditor
            name="contents"
            value={form.contents}
            onChange={(newValue) => setForm(prev => ({ ...prev, contents: newValue }))}
            placeholder="Write your blog post here..."
            minHeight="500px"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded shadow hover:bg-blue-700"
        >
          Create Blog
        </button>
      </Form>

      {/* IMAGE SELECTION MODAL */}
      {isOpen && (
        <section className="w-full h-screen z-[99] bg-black/30 fixed flex flex-col items-center justify-center top-0 left-0">
          <div className="bg-white rounded-xl w-full h-full p-5 max-w-[80vw] max-h-[80vh] flex flex-col">
            <div className="w-full flex items-center justify-between flex-shrink-0">
              <div className="text-3xl font-bold">Select Blog Images</div>
              <button
                onClick={handleCloseModal}
                className="rounded-sm hover:bg-zinc-200 p-2"
              >
                <Minus size={24} className="text-zinc-500" />
              </button>
            </div>

              <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500 mt-1">
                {selectedImages.length} selected
              </div>

              <div className="">
                <input type="text" onChange={(e) => setSearchImage(e.target.value)} className="input rounded-sm" placeholder="Search" />
              </div>
            </div>

            <div className="overflow-auto h-[65vh] mt-5 flex flex-wrap gap-3">
              {images_file.filter(item => item.filename.includes(searchImage)).map((item) => {
                const imageUrl = `/images/${item.path}`;
                const isSelected = selectedImages.includes(imageUrl);

                return (
                  <div
                    key={item.filename}
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
        </section>
      )}
    </div>
  );
}