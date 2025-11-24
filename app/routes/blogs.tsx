import type { Route } from "./+types/blogs";
import { Link, useLoaderData } from "react-router";
import { blogService } from "~/services/blogService";
import BlogCard from "~/components/BlogCard";

// ----------------------
// Loader
// ----------------------
export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") || 1);
  const limit = 9;

  const { blogs, lastVisible } = await blogService.getAll(limit, page);
  console.log("lastVisible:", blogs);

  return {
    blogs,
    page,
    hasMore: Boolean(lastVisible),
  };
}

// ----------------------
// Meta
// ----------------------
export function meta() {
  return [
    { title: "บทความทั้งหมด - Creative Tour Guru" },
    {
      name: "description",
      content:
        "อ่านบทความ เคล็ดลับ รีวิวท่องเที่ยว และวิธีแก้ปัญหาอย่างมืออาชีพ จาก Creative Tour Guru",
    },
  ];
}

// ----------------------
// Component
// ----------------------
export default function BlogPage() {
  const { blogs, page, hasMore } = useLoaderData<typeof loader>();

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold mb-4 text-gray-900">
            บทความทั้งหมด
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            รวมบทความน่าสนใจ เคล็ดลับ และสาระดีๆ จาก Creative Tour Guru
          </p>
        </header>

        {/* Grid of Cards */}
        {blogs.length === 0 ? (
          <div className="text-center text-gray-600 py-20">
            ไม่พบบทความใดๆ
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog, i) => (
              <BlogCard blog={blog} key={i} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {/* <div className="flex justify-center mt-12 gap-4">
          {page > 1 && (
            <Link
              to={`/blogs?page=${page - 1}`}
              className="px-5 py-2 border rounded-lg bg-white hover:bg-gray-100 text-gray-700"
            >
              ก่อนหน้า
            </Link>
          )}

          {hasMore && (
            <Link
              to={`/blogs?page=${page + 1}`}
              className="px-5 py-2 border rounded-lg bg-white hover:bg-gray-100 text-gray-700"
            >
              ถัดไป
            </Link>
          )}
        </div> */}
      </div>
    </main>
  );
}
