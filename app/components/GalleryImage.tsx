import type { Key } from "react";
import { v4 as uuidv4 } from "uuid";

export default function ImageInputs({
  images,
  setImages,
  tourId,
}: {
  images: any[];
  setImages: (imgs: any[]) => void;
  tourId?: string;
}) {

  function handleChange(value: string, index: number) {
    const updated = [...images];
    updated[index].image_url = value;

    updated.forEach((img, idx) => (img.order_index = idx));
    setImages(updated);
  }

  function addNewImage() {
    const updated = [...images];

    updated.push({
      id: uuidv4(),
      tour_id: tourId || "",
      image_url: "",
      order_index: updated.length,
    });

    setImages(updated);
  }

  function deleteImage(index: number) {
    const updated = images.filter((_, i) => i !== index);

    // Prevent empty list — always keep at least 1 blank field
    if (updated.length === 0) {
      updated.push({
        id: uuidv4(),
        tour_id: tourId || "",
        image_url: "",
        order_index: 0,
      });
    }

    updated.forEach((img, idx) => (img.order_index = idx));
    setImages(updated);
  }

  return (
    <div className="flex flex-col gap-3">
      {images.map((img: { id: Key; image_url: string }, index: number) => (
        <div key={img.id} className="flex items-center gap-2">
          <input
            className="admin-input flex-1"
            placeholder="https://image.jpg"
            value={img.image_url}
            onChange={(e) => handleChange(e.target.value, index)}
          />

          {/* "-" delete button */}
          <button
            type="button"
            className="px-3 py-1 bg-red-500 text-white rounded"
            onClick={() => deleteImage(index)}
          >
            –
          </button>
        </div>
      ))}

      {/* Global add button at bottom */}
      <button
        type="button"
        className="w-fit px-4 py-2 bg-green-600 text-white rounded"
        onClick={addNewImage}
      >
        + Add Image
      </button>
    </div>
  );
}
