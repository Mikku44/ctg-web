import { useState } from "react";
import ImageLibraryModal from "./ImageLibraryModal";


export default function ImagePicker({
  images,
  setImages,
}: {
  images: string[];
  setImages: (list: string[]) => void;
}) {
  const [open, setOpen] = useState(false);

  const removeImage = (img: string) => {
    setImages(images.filter((i) => i !== img));
  };

  return (
    <div>
      <label className="block font-medium mb-1">Images</label>

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="bg-gray-800 text-white px-3 py-1 rounded"
      >
        Select Image
      </button>

      <div className="grid grid-cols-3 gap-3 mt-3">
        {images.map((img) => (
          <div key={img} className="relative">
            <img
              src={img}
              alt=""
              className="rounded border w-full h-28 object-cover"
            />
            <button
              type="button"
              className="absolute top-1 right-1 bg-red-600 text-white text-xs rounded px-1"
              onClick={() => removeImage(img)}
            >
              X
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      <ImageLibraryModal
        open={open}
        onClose={() => setOpen(false)}
        onSelect={(url : string) => {
          setImages([...images, url]);
          setOpen(false);
        }}
      />
    </div>
  );
}
