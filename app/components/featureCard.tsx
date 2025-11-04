import { Star } from "lucide-react";

type TourCardProps = {
  className ? :string;
  image: string;
  title: string;
  description: string;
  price: string;
  rating: number; // e.g. 4.5
  duration: string; // e.g. "3 days 2 nights"
};

export default function TourCard({
  image,
  title,
  description,
  price,
  rating,
  duration,
  className
}: TourCardProps) {
  return (
    <div className={`w-full bg-white shadow hover:shadow-lg transition-shadow duration-300 ${className}`}>
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-[180px] object-cover "
        />
        <div className="absolute bottom-2 left-2 bg-white/80 text-gray-800 text-xs px-2 py-1 rounded-md backdrop-blur-sm">
          {duration}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{description}</p>

        <div className="flex md:flex-row flex-col md:items-center justify-between mt-3">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className={
                  i < Math.floor(rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">({rating.toFixed(1)})</span>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500">From</p>
            <p className="text-lg font-semibold text-[var(--primary-color)]">{price}</p>
          </div>
        </div>

        {/* CTA */}
        <a href={`/tours/${"tour-id-slug"}`}>
          <div className="w-full bg-[var(--primary-color)] text-center text-white
           py-2 mt-2 hover:bg-white hover:text-[var(--primary-color)] hover:border-[var(--primary-color)]
            border-2 duration-200">
            Explore
          </div>
        </a>
      </div>
    </div>
  );
}
