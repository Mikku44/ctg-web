import React from "react";
import { Link } from "react-router";

type DesCardProps = {
  image: string;
  title: string;
  description: string;
};

export default function DesCard({ image, title, description }: DesCardProps) {
  return (
    <a href={`/search?query=${title}`} className="w-full group  rounded-xl overflow-hidden duration-300">
      <div className="rounded-xl overflow-hidden h-[180px] group-hover:shadow-md">
        <img
          src={image}
          alt={title}
          className="w-full group-hover:scale-105 h-[180px]  duration-200 object-cover "
        />
      </div>
      <div className="py-3">
        <h3 className="text-[16px] font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    </a>
  );
}
