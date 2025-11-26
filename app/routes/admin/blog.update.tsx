// app/routes/blogs.$id.update.tsx

import {
  Form,
  useLoaderData,
  redirect,
  useActionData,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router";
import { useState, useEffect } from "react";
import { blogService } from "~/services/blogService";
import { Minus, Image as ImageIcon } from "lucide-react";
import { images_file } from "public/images/image_files";
import MarkdownEditor from "~/components/MarkdownEditor";

/* --------------------------
   Loader — fetch Blog by ID
--------------------------- */
export async function loader({ params }: LoaderFunctionArgs) {
  const blog = await blogService.getById(params.id!);
  if (!blog) throw new Response("Blog Not Found", { status: 404 });
  return blog;
}

/* --------------------------
   Action — update blog
--------------------------- */
export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const title = formData.get("title")?.toString() || "";
  const slug = formData.get("slug")?.toString() || "";
  const excerpt = formData.get("excerpt")?.toString() || "";
  const tags = formData.get("tags")?.toString() || "";
  const author = formData.get("author")?.toString() || "";
  const contents = formData.get("contents")?.toString() || "";

  // images JSON (hidden)
  const imagesJSON = formData.get("imagesJSON")?.toString() || "[]";
  const images = JSON.parse(imagesJSON);

  if (!title || !slug || !contents)
    return { error: "Title, slug, and contents are required." };

  const updatedBlog = {
    title,
    slug,
    excerpt,
    tags,
    author,
    contents,
    images,
    updated_at: new Date(),
  };

  await blogService.update(params.id!, updatedBlog);

  return redirect(`/blogs/${params.id}`);
};

/* --------------------------
   Component
--------------------------- */
export default function BlogUpdatePage() {
  const blog = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  /* --------------------------
     Form State
  --------------------------- */
  const [form, setForm] = useState({
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt || "",
    tags: blog.tags || "",
    author: blog.author || "",
    contents: blog.contents || "",
  });

  /* --------------------------
     Images State
  --------------------------- */
  const [images, setImages] = useState<string[]>(blog.images || []);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>(blog.images || []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  /* --------------------------
     Modal functions
  --------------------------- */
  const handleOpenModal = () => {
    setSelectedImages(images);
    setIsOpen(true);
  };

  const handleCloseModal = () => setIsOpen(false);

  const toggleSelect = (filename: string) => {
    const file = images_file.find(i => i.filename === filename);
    const imageUrl = `/images/${file?.path || filename}`;

    setSelectedImages(prev =>
      prev.includes(imageUrl)
        ? prev.filter(img => img !== imageUrl)
        : [...prev, imageUrl]
    );
  };

  const handleApplyImages = () => {
    setImages(selectedImages);
    handleCloseModal();
  };

  /* --------------------------
     Page UI
  --------------------------- */
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
            onChange={handleChange}
            className="w-full input rounded-sm px-3 py-2 border"
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
            placeholder="Short summary..."
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
            placeholder="marketing, travel"
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

          {/* Preview */}
          {images.length > 0 && (
            <div className="mt-3 grid grid-cols-4 gap-2">
              {images.map((url, i) => (
                <img key={i} src={url} className="w-full h-24 object-cover rounded-lg border" />
              ))}
            </div>
          )}
        </div>

        <input type="hidden" name="imagesJSON" value={JSON.stringify(images)} />

        {/* Markdown Editor */}
        <div>
          <label className="block font-medium mb-1">Article Contents</label>
          <MarkdownEditor
            name="contents"
            value={form.contents}
            onChange={(val) => setForm(prev => ({ ...prev, contents: val }))}
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

      {/* Modal */}
      {isOpen && (
        <section className="w-full h-screen z-[99] bg-black/30 fixed flex flex-col items-center justify-center top-0 left-0">
          <div className="bg-white rounded-xl w-full h-full p-5 max-w-[80vw] max-h-[80vh] flex flex-col">

            {/* Header */}
            <div className="w-full flex items-center justify-between">
              <div className="text-3xl font-bold">Select Blog Images</div>
              <button onClick={handleCloseModal} className="rounded-sm hover:bg-zinc-200 p-2">
                <Minus size={24} className="text-zinc-500" />
              </button>
            </div>

            <div className="text-sm text-gray-500 mt-2">
              {selectedImages.length} selected
            </div>

            {/* Images grid */}
            <div className="overflow-auto h-[65vh] mt-5 flex flex-wrap gap-3 w-full">
              {images_file.map((item) => {
                const url = `/images/${item.path}`;
                const isSelected = selectedImages.includes(url);

                return (
                  <div
                    key={item.filename}
                    onClick={() => toggleSelect(item.filename)}
                    className={`relative cursor-pointer max-w-[150px] rounded-lg overflow-hidden border-4 ${
                      isSelected ? "border-blue-500" : "border-transparent"
                    }`}
                  >
                    <img src={url} className="w-full h-full object-cover" />
                    {isSelected && <div className="absolute inset-0 bg-blue-500/30"></div>}
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="flex justify-end pt-4 border-t border-gray-200">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-100 mr-3"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyImages}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
