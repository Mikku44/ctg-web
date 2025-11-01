import React from "react";

type DesCardProps = {
  image: string;
  title: string;
  description: string;
};

export default function DesCard({ image, title, description }: DesCardProps) {
  return (
    <div className="w-full bg-white rounded-xl overflow-hidden duration-300">
      <img
        src={image}
        alt={title}
        className="w-full h-[180px] object-cover rounded-xl"
      />
      <div className="py-3">
        <h3 className="text-[16px] font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    </div>
  );
}
