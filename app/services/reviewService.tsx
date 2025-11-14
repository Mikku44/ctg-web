import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "~/lib/firebase/config";
import type { Review } from "~/models/review";


// Collection reference
const reviewsRef = collection(db, "reviews");

export const ReviewsService = {
  // ------------------------------------------------------------
  // ✅ Create Review
  // ------------------------------------------------------------
  async create(review: Omit<Review, "created_at">) {
    return await addDoc(reviewsRef, {
      ...review,
      created_at: serverTimestamp(),
    });
  },

  // ------------------------------------------------------------
  // ✅ Listen Real-time (All)
  // ------------------------------------------------------------
  listen(callback: (data: (Review & { id: string })[]) => void) {
    return onSnapshot(reviewsRef, (snapshot) => {
      const reviews = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as (Review & { id: string })[];

      callback(reviews);
    });
  },

  // ------------------------------------------------------------
  // ✅ Listen by Rating or Status
  // ------------------------------------------------------------
  listenBy(
    field: keyof Review,
    value: any,
    callback: (data: (Review & { id: string })[]) => void
  ) {
    const q = query(reviewsRef, where(field as string, "==", value));

    return onSnapshot(q, (snapshot) => {
      const reviews = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as (Review & { id: string })[];

      callback(reviews);
    });
  },

  // ------------------------------------------------------------
  // ⭐ Optional: Listen Sorted (e.g., newest reviews)
  // ------------------------------------------------------------
  listenSorted(
    callback: (data: (Review & { id: string })[]) => void,
    sortField: keyof Review = "created_at"
  ) {
    const q = query(reviewsRef, orderBy(sortField as string, "desc"));

    return onSnapshot(q, (snapshot) => {
      const reviews = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as (Review & { id: string })[];

      callback(reviews);
    });
  },

  // ------------------------------------------------------------
  // ✅ Get All (Normal fetch)
  // ------------------------------------------------------------
  async getAll() {
    const snapshot = await getDocs(reviewsRef);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as (Review & { id: string })[];
  },

  // ------------------------------------------------------------
  // ✅ Get by ID
  // ------------------------------------------------------------
  async getById(id: string) {
    const snapshot = await getDoc(doc(db, "reviews", id));
    return snapshot.exists()
      ? ({ id, ...snapshot.data() } as Review & { id: string })
      : null;
  },

  // ------------------------------------------------------------
  // ✅ Update
  // ------------------------------------------------------------
  async update(id: string, data: Partial<Omit<Review, "created_at">>) {
    return await updateDoc(doc(db, "reviews", id), data);
  },

  // ------------------------------------------------------------
  // ❌ Delete
  // ------------------------------------------------------------
  async delete(id: string) {
    return await deleteDoc(doc(db, "reviews", id));
  },
};
