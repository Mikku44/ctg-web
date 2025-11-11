import { Star, Users, MapPin, Clock, ArrowRight } from "lucide-react";



type TourCardProps = {
  className?: string;
  image: string;
  title: string;
  description: string;
  price: string;
  rating: number;
  duration: string;
  route?: string;
  maxPeople?: number;
  tourType?: string;
};

export function TourCard({
  image,
  title,
  description,
  price,
  rating,
  duration,
  route,
  maxPeople,
  tourType,
  className
}: TourCardProps) {
  return (
    <div draggable="false" className={`group select-none cursor-potiner w-full bg-white h-fit overflow-hidden shadow-md transition-all duration-300 transform hover:-translate-y-2 ${className}`}>
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-[220px] object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {tourType && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
            {tourType}
          </div>
        )}
        
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <div className="bg-white/90 backdrop-blur-md text-gray-800 text-sm font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
            <Clock size={14} className="text-[var(--primary-color)]" />
            {duration}
          </div>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-[var(--primary-color)] transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {(route || maxPeople) && (
          <div className="flex flex-wrap gap-3 mt-4">
            {route && (
              <div className="flex items-center gap-1.5 text-xs text-gray-700 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                <MapPin size={14} className="text-[var(--primary-color)]" />
                <span className="font-medium">{route}</span>
              </div>
            )}
            {maxPeople && (
              <div className="flex items-center gap-1.5 text-xs text-gray-700 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                <Users size={14} className="text-[var(--primary-color)]" />
                <span className="font-medium">Max {maxPeople}</span>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className={
                  i < Math.floor(rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-200"
                }
              />
            ))}
            <span className="text-xs text-gray-500 ml-1.5 font-semibold">
              {rating.toFixed(1)}
            </span>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-500 font-medium">From</p>
            <p className="text-xl font-bold text-[var(--primary-color)]">{price}</p>
          </div>
        </div>

        <a href={`/tours/${title}`}>
          <button className="w-full bg-gradient-to-r from-[var(--primary-color)] to-red-600 text-white font-semibold py-3 
          mt-4 rounded-sm hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group/btn">
            <span>Explore Tour</span>
            <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
          </button>
        </a>
      </div>
    </div>
  );
}