import { Link } from "react-router";
import type { IBlogModel } from "~/models/blog";

// Assuming you have access to a clean icon library for formal look (e.g., Lucide Icons)
// If you don't use a library, you can replace these imports with simple text characters (e.g., '🕒', '📍', '👥')
// For this formal example, I will use placeholder names for icons:
// import { Clock, MapPin, Users, ChevronRight, Star } from "lucide-react"; 

interface BlogCardProps {
  blog: IBlogModel & {
    id?: string;
    duration?: string; // e.g., "5 days"
    location?: string; // e.g., "Bangkok to Chiangmai"
    maxPeople?: number; // e.g., 18
    reviews?: number; // e.g., 0
    priceInfo?: string; // e.g., "price depended on no.of people"
  };
}

// Helper component for the icon/text detail lines
// Minimal styling: smaller text, subtle gray color, no border separation
const MinimalDetailLine: React.FC<{ icon: string | React.ReactNode; text: string }> = ({ icon, text }) => (
  <div className="flex items-center space-x-2 text-sm text-gray-600">
    <div className="text-base text-gray-500 w-4 flex-shrink-0">
      {icon} {/* Use a smaller, subtle icon */}
    </div>
    <span>{text}</span>
  </div>
);

export default function BlogCard({ blog }: BlogCardProps) {
  const coverImage =
    blog.images?.length > 0
      ? blog.images[0]
      : "https://dummyimage.com/640x360/eee/aaa?text=No+Image";

  const ChevronRightIcon = <span className="text-xs">→</span>;

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg border border-gray-200 overflow-hidden transition-shadow hover:shadow-md">
      {/* Cover image - Minimal/No special hover effects */}
      <div className="h-48 overflow-hidden">
        <img
          src={coverImage}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      

      {/* Content Section - Increased padding for white space */}
      <div className="p-6">
        <div className=" text-gray-400 mb-2">
        <div className="flex text-sm items-center">
          <svg
            className="w-4 h-4 mr-2 "
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
          <span>Publish at : {blog.publish_at}</span>
        </div>
      </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight">
          {blog.title}
        </h2>


        <div className="text-sm text-zinc-600">{blog.excerpt}</div>


        {/* Review and Price Section - Clean, horizontal alignment */}

      </div>



      <div className="flex items-center gap-2 px-6 mb-2">
        <div className="w-10 h-10 bg-gradient-to-r 
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

      

      {/* Formal Action Button */}
      <Link
        to={`/blogs/${blog.slug}`}
        className="block w-full py-3 px-6 text-center text-sm font-medium  bg-blue-500 text-white hover:opacity-90 transition-colors border-t border-gray-200 uppercase tracking-wider"
      >
        Read more {ChevronRightIcon}
      </Link>
    </div>
  );
}