import { Link, useLoaderData, Form, redirect } from "react-router";
import { blogService } from "~/services/blogService";
import type { Route } from "./+types/blog.list";
import type { IBlogModel } from "~/models/blog";

// -------------------------------------
// DELETE ACTION
// -------------------------------------
export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const blogId = formData.get("deleteId")?.toString();

    if (blogId) {
        await blogService.delete(blogId);
    }

    return redirect("/admin/blog/list");
}

// -------------------------------------
// LOADER
// -------------------------------------
export async function loader({ request }: Route.LoaderArgs) {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") || 1);
    const limit = 100;

    const { data, total } = await blogService.getPaged(page, limit);

    return {
        blogs: data,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
    };
}

// -------------------------------------
// PAGE
// -------------------------------------
export default function BlogListPage() {
    const { blogs, page, totalPages } = useLoaderData<typeof loader>();

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold ">All Blogs</h1>
                <Link
                    to="/admin/blog/add"
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                >
                    + Add Blog
                </Link>
            </div>

            {/* Blog Grid */}
            <div className="grid md:grid-cols-3 gap-6">
                {blogs.map((blog: IBlogModel | any) => (
                    <div
                        key={blog.id}
                        className="input rounded-lg shadow-sm p-4 bg-white transition relative"
                    >
                        <Link to={`/blogs/${blog.slug}`}>
                            {/* Thumbnail Image */}
                            {blog.images?.length > 0 && (
                                <img
                                    src={blog.images[0]}
                                    alt={blog.title}
                                    className="w-full h-40 object-cover rounded mb-3"
                                />
                            )}

                            <h2 className="text-xl font-semibold mb-1">{blog.title}</h2>
                            <p className="text-gray-600 text-sm line-clamp-3">
                                {blog.excerpt}
                            </p>

                            <p className="text-xs text-gray-500 mt-2">
                                {blog.author || "Unknown Author"}
                            </p>
                        </Link>

                        {/* Admin Actions */}
                        <div className="flex justify-between items-center mt-4 pt-2">
                            {/* Edit */}
                            <a
                                href={`/admin/blog/update/${blog.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 button px-4 rounded-sm p-2 text-sm hover:underline"
                            >
                                Edit
                            </a>

                            {/* Delete */}
                            <Form method="post">
                                <input type="hidden" name="deleteId" value={blog.id} />
                                <button
                                    type="submit"
                                    className="text-red-600 text-sm hover:underline"
                                    onClick={(e) => {
                                        if (!confirm("Are you sure you want to delete this blog?")) {
                                            e.preventDefault();
                                        }
                                    }}
                                >
                                    Delete
                                </button>
                            </Form>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {/* <div className="flex items-center justify-center gap-3 mt-10">
                {page > 1 && (
                    <Link
                        to={`/blogs?page=${page - 1}`}
                        className="px-4 py-2 border rounded hover:bg-gray-200"
                    >
                        Prev
                    </Link>
                )}

                <span className="text-sm text-gray-600">
                    Page {page} / {totalPages}
                </span>

                {page < totalPages && (
                    <Link
                        to={`/blogs?page=${page + 1}`}
                        className="px-4 py-2 border rounded hover:bg-gray-200"
                    >
                        Next
                    </Link>
                )}
            </div> */}
        </div>
    );
}
