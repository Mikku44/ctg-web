import type { Route } from "./+types/blog";
import ReactMarkdown from "react-markdown";
import NotFound from "~/components/NotFound";
import { Link } from "react-router";
import { blogService } from "~/services/blogService";
import BlogCard from "~/components/BlogCard";
import "~/css/typo.module.css";

// ----------------------
// Loader
// ----------------------
export async function loader({ params }: Route.LoaderArgs) {
  const blog = await blogService.getBySlug(params.slug);

  // Get all blogs for related posts
  const all = await blogService.getAll(50);
  const related = all.blogs.filter((item) => item.slug !== params.slug);

  return {
    blog,
    relatedBlogs: related.slice(0, 3),
  };
}

// ----------------------
// Meta
// ----------------------
export function meta({ loaderData }: Route.MetaArgs) {
  const blog = loaderData?.blog;

  if (!blog) return [];

  return [
    { title: blog.title },
    {
      name: "description",
      content: blog.excerpt || "",
    },
  ];
}

// ----------------------
// Component
// ----------------------
export default function BlogDetail({
  loaderData
}: Readonly<Route.ComponentProps>) {
  const { blog, relatedBlogs } = loaderData;

  if (!blog?.title) return <NotFound />;

  // Format publish date if Firestore Timestamp
  const publishDate =
    typeof blog.publish_at === "string"
      ? blog.publish_at
      : blog.publish_at?.toDate
      ? blog.publish_at.toDate().toLocaleDateString("th-TH")
      : "";

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header Section */}
        <header className="mb-8">
          <nav className="text-sm text-gray-500 mb-6">
            <ol className="flex space-x-2">
              <li>
                <a href="/" className="hover:text-orange-600 transition-colors">
                  Home
                </a>
              </li>
              <li className="before:content-['/'] before:mx-2">
                <a
                  href="/blogs"
                  className="hover:text-orange-600 transition-colors"
                >
                  Blog
                </a>
              </li>
              <li className="before:content-['/'] before:mx-2 text-gray-700 truncate">
                {blog.title}
              </li>
            </ol>
          </nav>

          <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
            {blog.title}
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed mb-6">
            {blog.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-t border-b border-gray-200 py-4">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>Author: {blog.author}</span>
            </div>

            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>Publish at : {publishDate}</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Article Section */}
          <article className="lg:w-2/3">
            {/* Cover image */}
            {blog.images?.length > 0 && (
              <div className="mb-8">
                <img
                  src={blog.images[0]}
                  alt={blog.title}
                  className="w-full h-96 object-cover "
                />
              </div>
            )}

            {/* Blog Content */}
            <div className="prose prose-lg max-w-none ">
              <ReactMarkdown>{blog.contents}</ReactMarkdown>
            </div>

            {/* Tags */}
            <div className="mt-8 flex flex-wrap gap-2">
              {blog.tags
                ?.split(",")
                ?.slice(0, 5)
                ?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 border-blue-800 border text-blue-800 text-sm font-medium hover:bg-blue-200 transition-colors cursor-pointer"
                  >
                    {tag.trim()}
                  </span>
                ))}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
              

              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r 
                overflow-hidden flex items-center justify-center
                from-orange-500 to-orange-600 rounded-full">
                  <img src="/images/thailand3 (6).jpg" alt="creative tour guru author" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{blog.author}</p>
                  <div className="text-sm text-gray-500">
                    Creative tour guru Owner
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Blogs */}
        <section className="mt-16">
          <div className="border-t border-gray-200 pt-12">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Another Tips & Tricks
                </h2>
                
              </div>

              <Link
                to="/blogs"
                className="border border-blue-500 px-4 py-2 text-blue-500 
                hover:bg-blue-500 hover:text-white transition-all"
              >
                See more
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedBlogs.map((item, index) => (
                <BlogCard blog={item} key={index} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
