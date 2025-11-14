import type { Timestamp } from "firebase/firestore";

export interface Review {
  name: string;
  message: string;
  rating: number;
  tour_id?: string;
  status?: "pending" | "approved" | "rejected";
  created_at: Timestamp | null;
}
