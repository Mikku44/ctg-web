// --- Tour Model ---
export interface Tour {
  id: string;
  tid? : string; // unique tour identifier
  title: string;
  slug: string;
  description: string;
  duration: string;
  location: string;
  price_from: number;
  prices? : {
    upto_4_people?: number;
    upto_9_people?: number;
  };
  price_note?  : string;

  // details
  note: string[];
  itinerary: string[];
  program_detail: string;
  tour_include: string[];
  not_include: string[];
  cancellation_policy: string[];

  // metadata
  category_id: string;
  featured_image: string;
  status: "draft" | "published";
  created_at: Date;
  updated_at: Date;

  // relations (added)
  images?: TourImage[];    // Related images for the gallery
  packages?: Package[];    // Related package options
  rating?: number;         // Average rating (optional, useful for TourCard)
  tour_type?: string;      // e.g. "Full Day", "Adventure", "Private"

  style? : string;
  pickup? :string;
  short? :string;

  // dinner cruise
  meal ? : string;
  departure ? : string;

  // muti-day tour
  deposit  ?: number;
  

  

  recommended  ?: boolean;
}


export interface TourImage {
  id: string;
  tour_id: string;
  image_url: string;
  order_index?: number;
}


export interface Package {
  id: string;
  tour_id: string;
  name: string;
  description?: string;
  price: number;
  max_people?: number;
  available_dates?: string[]; // e.g. ['2025-10-15', '2025-10-22']
  note?: string;
}
