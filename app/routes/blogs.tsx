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
    { title: "All Articles - Creative Tour Guru" },
    {
      name: "description",
      content:
        "Explore travel tips, guides, reviews, and professional insights from Creative Tour Guru.",
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
            All Articles
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Welcome to the Creative Tour Guru Blog — your go-to space for smart travel tips, cultural insights, and inspiring stories from all across Thailand.
            Here, we share quick guides, insider recommendations, festival highlights, and meaningful travel ideas crafted from real experiences on the road.
            Whether you’re a curious traveler or a passionate explorer, this is where your journey begins.
          </p>
        </header>

        {/* Grid of Cards */}
        {blogs.length === 0 ? (
          <div className="text-center text-gray-600 py-20">
            No articles found.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 items-start gap-6">
            {blogs.map((blog, i) => (
              <BlogCard blog={blog} key={i} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
