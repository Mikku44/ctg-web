
import { Form, useNavigation } from "react-router";
import { useState } from "react";
// import MDEditor from "@uiw/react-md-editor";
import { blogService } from "~/services/blogService";
import type { Route } from "./+types/blog.add";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const data = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    excerpt: formData.get("excerpt") as string,
    tags: formData.get("tags") as string,
    author: formData.get("author") as string,
    contents: formData.get("contents") as string,
    images: formData.getAll("images[]") as string[],
    publish_at: formData.get("publish_at") as string,
  };

  await blogService.create(data);

  return { ok: true };
}

export default function AdminBlogNew() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [coverImage, setCoverImage] = useState("");
  const [content, setContent] = useState<string>("");

  return (
    <main className="max-w-4xl mx-auto pt-10 pb-20 px-5">
      <h1 className="text-3xl font-bold mb-8">➕ เพิ่มบทความใหม่</h1>

      <Form method="post" className="space-y-8">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">ชื่อบทความ</label>
          <input
            name="title"
            className="w-full border p-3 rounded"
            required
            placeholder="เช่น วิธีแก้ท่อตันแบบง่ายๆ"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block mb-1 font-medium">Slug (ลิงก์)</label>
          <input
            name="slug"
            className="w-full border p-3 rounded"
            required
            placeholder="fix-drain-easily"
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block mb-1 font-medium">บทคัดย่อ (Excerpt)</label>
          <textarea
            name="excerpt"
            rows={3}
            className="w-full border p-3 rounded"
            required
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block mb-1 font-medium">Tags (ใช้ comma ,)</label>
          <input
            name="tags"
            className="w-full border p-3 rounded"
            placeholder="ท่อตัน, ทำความสะอาด"
          />
        </div>

        {/* Author */}
        <div>
          <label className="block mb-1 font-medium">ผู้เขียน</label>
          <input
            name="author"
            className="w-full border p-3 rounded"
            required
          />
        </div>

        {/* Publish Date */}
        <div>
          <label className="block mb-1 font-medium">วันที่เผยแพร่</label>
          <input
            type="date"
            name="publish_at"
            className="w-full border p-3 rounded"
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block mb-1 font-medium">ภาพหน้าปก (URL)</label>
          <input
            className="w-full border p-3 rounded mb-3"
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="https://image..."
          />

          {coverImage && (
            <>
              <input type="hidden" name="images[]" value={coverImage} />
              <img
                src={coverImage}
                className="w-full rounded shadow"
                alt="preview"
              />
            </>
          )}
        </div>

        {/* Markdown Editor */}
        <div data-color-mode="light">
          <label className="block mb-1 font-medium">เนื้อหา (Markdown)</label>

          <input type="hidden" name="contents" value={content} />

          {/* <MDEditor value={content} onChange={(val) => setContent(val || "")} /> */}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-orange-600 text-white px-6 py-3 rounded hover:bg-orange-700 transition disabled:opacity-60"
        >
          {isSubmitting ? "กำลังบันทึก..." : "บันทึกบทความ"}
        </button>
      </Form>
    </main>
  );
}
