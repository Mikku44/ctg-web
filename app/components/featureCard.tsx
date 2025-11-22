import { Star, Users, MapPin, Clock, ArrowRight, Check } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { formatCurrency } from "~/lib/utils/currencyFormator";
import { RiChatPrivateFill, RiMapPinFill } from "react-icons/ri";
import { FaClock } from "react-icons/fa";


export type TourCardProps = {
  id?: string,
  slug?: string,
  className?: string;
  image: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  duration: string;
  route?: string;
  place_location?: string;
  maxPeople?: number;
  tourType?: string;
  recommended?: boolean;
};

export function TourCard({
  image,
  title,
  slug,
  description,
  price,
  rating,
  duration,
  route,
  place_location,
  maxPeople,
  tourType,
  className,
  recommended
}: TourCardProps) {

  const router = useNavigate();

  return (
    <Link to={`/tours/${slug}`} target="_blank" draggable="false" className={`group select-none cursor-potiner w-full bg-white h-fit
     overflow-hidden border border-zinc-200 transition-all rounded-sm duration-300 ${className}`}>

      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-[220px] object-cover duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

      </div>

      <div className="p-3">
        {tourType && (
          <div className=" text-[10px]  flex gap-1.5 items-center bg-[var(--tertiary-color)] w-fit px-1.5 py-1.5 rounded-sm mb-2 capitalize">
            <RiChatPrivateFill size={16} />{tourType}
          </div>
        )}
        <h3 className="text-base font-bold text-gray-900 leading-tight transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {(place_location || maxPeople) && (
          <div className="mt-4">
            {place_location && (


              <div className=" text-gray-800 text-[13px] font-medium  py-1.5 space-x-1 gap-1.5">
                <RiMapPinFill  size={15} className="min-w-[15px]  inline text-[var(--primary-color)]" />
                <span className="font-medium inline">{place_location}</span>
              </div>
            )}
            {maxPeople && (


              <div className=" text-gray-800 text-[13px] font-medium  py-1.5 space-x-1 gap-1.5">
                <Users size={14} className="min-w-[14px]  text-[var(--primary-color)] inline" />
                <span className="font-medium inline">Max {maxPeople}</span>
              </div>
            )}
          </div>
        )}

        <div className=" text-gray-800 text-[13px] font-medium  py-1.5 space-x-1 gap-1.5">
          <FaClock  size={14} className="min-w-[14px] text-[var(--primary-color)] inline" />
          <span className="font-medium inline">{duration}</span>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          {/* <div className="flex items-center gap-1">
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
          </div> */}

          <div className="text-right flex flex-col items-end w-full">
            <p className="text-xs text-gray-500 font-medium">From</p>
            <div className="flex items-end flex-col">
              <p className="text-sm text-zinc-500 decoration-1 line-through">{formatCurrency(price * 120 / 100)}</p>
              <p className="text-base font-semibold ">{formatCurrency(price)} / traveler</p>
            </div>
            <div className="text-sm text-zinc-500"></div>
             <div className="text-sm mt-1 text-zinc-800"><Check size={16} className="text-sms inline" /> Taxes and additional fees included</div>
          </div>
          
        </div>

     
          <button
          onClick={() => router(`/tours/${slug}`)}
          className="w-full bg-[var(--primary-color)] text-white font-semibold py-3 
          mt-4  hover:shadow-lg  duration-300 flex items-center justify-center gap-2 group/btn">
            <span>Explore Tour</span>
            <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
          </button>

         
      
      </div>
    </Link>
  );
}