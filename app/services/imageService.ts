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

} from "firebase/firestore";
import { db } from "~/lib/firebase/config";
import type { TourImage } from "~/models/tour";


const imageRef = collection(db, "Images");

export const TourImageService = {
  // ✅ Create
  async create(TourImage: Omit<TourImage, "created_at">) {
   
    return await addDoc(imageRef, {
      ...TourImage,
      created_at: serverTimestamp(), // best practice
    });
  },

  // ✅ Real-time listener (auto update UI)
  listen(callback: (data: (TourImage & { id: string })[]) => void) {
    return onSnapshot(imageRef, (snapshot) => {
      const TourImages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as (TourImage & { id: string })[];
      callback(TourImages);
    });
  },

  listenUnread(
    status: string,
    callback: (data: (TourImage & { id: string })[]) => void
  ) {
    const q = query(imageRef, where("status", "==", status));

    return onSnapshot(q, (snapshot) => {
      const TourImages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as (TourImage & { id: string })[];

      callback(TourImages);
    });
  },

  // ✅ Normal fetch (if needed)
  async getAll() {
    const snapshot = await getDocs(imageRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as (TourImage & { id: string })[];
  },

  async getById(id: string) {
    const snapshot = await getDoc(doc(db, "Images", id));
    return snapshot.exists() ? ({ id, ...snapshot.data() } as TourImage & { id: string }) : null;
  },

  async update(id: string, data: Partial<Omit<TourImage, "created_at">>) {
    return await updateDoc(doc(db, "Images", id), data);
  },

  async delete(id: string) {
    return await deleteDoc(doc(db, "Images", id));
  },

  
};
