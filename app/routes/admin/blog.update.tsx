import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router";
import { useState, useEffect } from "react";
import { blogService } from "~/services/blogService";
import { v4 as uuidv4 } from "uuid";
import { Minus, Image as ImageIcon } from "lucide-react";
import { images_file } from "public/images/image_files";
import MarkdownEditor from "~/components/MarkdownEditor";
import type { IBlogModel } from "~/models/blog";

// ---------------------------------------
// LOADER
// ---------------------------------------
export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.blogId;
  if (!id) throw new Error("Blog ID is required");

  const blog = await blogService.getById(id);
  if (!blog) throw new Error("Blog not found");

  return { blog };
}

// ---------------------------------------
// ACTION (UPDATE)
// ---------------------------------------
export const action = async ({ request, params }: ActionFunctionArgs) => {
  const id = params.blogId;
  if (!id) return { error: "Missing blog ID" };

  const formData = await request.formData();

  const title = formData.get("title")?.toString() || "";
  const slug = formData.get("slug")?.toString() || "";
  const excerpt = formData.get("excerpt")?.toString() || "";
  const tags = formData.get("tags")?.toString() || "";
  const author = formData.get("author")?.toString() || "";
  const contents = formData.get("contents")?.toString() || "";

  const imagesJSON = formData.get("imagesJSON")?.toString() || "[]";
  const images = JSON.parse(imagesJSON);

  if (!title || !slug || !contents)
    return { error: "Title, slug, and contents are required." };

  const updatedBlog : IBlogModel = {
    title,
    slug,
    excerpt,
    tags,
    author,
    contents,
    images,
    publish_at : new Date().toISOString().split("T")[0],
  };

  await blogService.update(id, updatedBlog);

  return redirect("/blogs");
};

// ---------------------------------------
// COMPONENT
// ---------------------------------------

export default function BlogUpdatePage() {
  const actionData = useActionData<typeof action>();
  const { blog } = useLoaderData<typeof loader>();

  // Pre-filled form
  const [form, setForm] = useState({
    title: blog.title || "",
    slug: blog.slug || "",
    excerpt: blog.excerpt || "",
    tags: blog.tags || "",
    author: blog.author || "",
    contents: blog.contents || "",
  });

  // Images
  const [images, setImages] = useState<string[]>(blog.images || []);
  const [searchImage, setSearchImage] = useState("");

  // Modal
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  // Auto-generate slug
  const generateSlug = (title: string) => {
    const base = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    const shortId = uuidv4().split("-")[0];
    return `${base}-${shortId}`;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "title") {
      setForm((prev) => ({
        ...prev,
        slug: generateSlug(value),
        [name]: value,
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleOpenModal = () => {
    setSelectedImages(images);
    setIsOpen(true);
  };

  const handleCloseModal = () => setIsOpen(false);

  const handleApplyImages = () => {
    setImages(selectedImages);
    handleCloseModal();
  };

  const toggleSelect = (filename: string) => {
    const imageObject = images_file.find((i) => i.filename === filename);
    const imageUrl = `/images/${imageObject?.path || filename}`;

    setSelectedImages((prev) =>
      prev.includes(imageUrl)
        ? prev.filter((url) => url !== imageUrl)
        : [...prev, imageUrl]
    );
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Update Blog</h1>

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

        {/* Slug */}
        <div>
          <label className="block font-medium mb-1">Slug</label>
          <input
            name="slug"
            type="text"
            value={form.slug}
            readOnly
            className="w-full input rounded-sm px-3 py-2 bg-gray-100 text-gray-500 border"
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
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block font-medium mb-1">Tags</label>
          <input
            name="tags"
            type="text"
            value={form.tags}
            onChange={handleChange}
            className="w-full input rounded-sm px-3 py-2 border"
          />
        </div>

        {/* Image Picker */}
        <div>
          <label className="block font-medium mb-1">Blog Images</label>
          <button
            type="button"
            onClick={handleOpenModal}
            className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
          >
            <ImageIcon size={16} /> Select Images ({images.length})
          </button>

          {/* {JSON.stringify(images)} */}

       

          {images.length > 0 && (
            <div className="mt-3 grid grid-cols-4 gap-2">
              {images.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  className="w-full h-24 object-cover border rounded-lg"
                />
              ))}
            </div>
          )}
        </div>

        <input type="hidden" name="imagesJSON" value={JSON.stringify(images)} />

        {/* Contents */}
        <div>
          <label className="block font-medium mb-1">Article Contents</label>
          <MarkdownEditor
            name="contents"
            value={form.contents}
            onChange={(v) => setForm((p) => ({ ...p, contents: v }))}
            minHeight="500px"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded shadow hover:bg-blue-700"
        >
          Update Blog
        </button>
      </Form>

      {/* IMAGE MODAL */}
      {isOpen && (
        <section className="w-full h-screen fixed bg-black/30 top-0 left-0 z-[99] flex items-center justify-center">
          <div className="bg-white rounded-xl w-full h-full max-w-[80vw] max-h-[80vh] p-5 flex flex-col">
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold">Select Blog Images</h2>
              <button
                className="p-2 rounded hover:bg-gray-200"
                onClick={handleCloseModal}
              >
                <Minus size={22} />
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
                const active = selectedImages.includes(imageUrl);

                return (
                  <div
                    key={item.filename}
                    onClick={() => toggleSelect(item.filename)}
                    className={`cursor-pointer max-w-[150px] relative rounded-lg overflow-hidden border-4 ${
                      active ? "border-blue-500" : "border-transparent"
                    }`}
                  >
                    <img
                      src={imageUrl}
                      className="w-full h-full object-cover"
                    />
                    {active && (
                      <div className="absolute inset-0 bg-blue-500/30"></div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end pt-3 border-t mt-3">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-2 mr-3 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApplyImages}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Apply ({selectedImages.length})
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
