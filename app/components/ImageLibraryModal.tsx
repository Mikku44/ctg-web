import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "~/lib/firebase/config";
import { useEffect, useState } from "react";

export default function ImageLibraryModal({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}) {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (!open) return;

    const fetchImages = async () => {
      const folderRef = ref(storage, "uploads/");
      const res = await listAll(folderRef);

      const urls = await Promise.all(
        res.items.map((item) => getDownloadURL(item))
      );

      setImages(urls);
    };

    fetchImages();
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded shadow max-w-3xl w-full">
        <div className="flex justify-between mb-3">
          <h3 className="text-lg font-bold">Select Image</h3>
          <button className="text-red-500" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 max-h-[400px] overflow-y-auto">
          {images.map((url) => (
            <img
              key={url}
              src={url}
              alt=""
              className="rounded border cursor-pointer hover:opacity-70"
              onClick={() => onSelect(url)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
