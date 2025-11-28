import {
  doc,
  getDoc,
  getDocs,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "~/lib/firebase/config";
import type { BookingModel } from "~/models/booking";
import { tourService } from "./tourService";


const BOOKINGS_COLLECTION = "bookings";

export const bookingService = {
  // CREATE
  async createBooking(data: Omit<BookingModel, "id" | "created_at" | "updated_at">) {
    const colRef = collection(db, BOOKINGS_COLLECTION);

    const newBooking = {
      ...data,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    };

    const docRef = await addDoc(colRef, newBooking);

    return { id: docRef.id, ...newBooking };
  },

  // GET ALL
  async getAllBookings() {
    const colRef = collection(db, BOOKINGS_COLLECTION);

    // ✅ ใช้ query + getDocs ให้เรียงตาม created_at
    const q = query(colRef, orderBy("created_at", "desc"));
    const snapshot = await getDocs(q);

    // Load all bookings with tourName resolved
    const bookings = await Promise.all(
      snapshot.docs.map(async (docItem) => {
        const data = docItem.data() as BookingModel;

        // Fetch tourName
        let tourName = "";
        let tourSlug = "";
        try {
          if (data.tour) {
            const tour = await tourService.getById(data.tour);
            tourName = tour?.title || "";
            tourSlug = tour?.slug || "";
          }
        } catch (err) {
          console.error("Failed to fetch tour:", err);
        }

        return {
          id: docItem.id,
          ...data,
          tourName,
          tourSlug
        };
      })
    );

    return bookings;
  },
  // GET ONE
  async getBooking(id: string) {
    const docRef = doc(db, BOOKINGS_COLLECTION, id);
    const snap = await getDoc(docRef);

    if (!snap.exists()) return null;


    return {
      id: snap.id,
      ...(snap.data() as BookingModel),
    };
  },

  // UPDATE
  async updateBooking(id: string, data: Partial<BookingModel>) {
    const docRef = doc(db, BOOKINGS_COLLECTION, id);

    const payload = {
      ...data,
      updated_at: serverTimestamp(),
    };

    await updateDoc(docRef, payload);

    return true;
  },

  // DELETE
  async deleteBooking(id: string) {
    const docRef = doc(db, BOOKINGS_COLLECTION, id);
    await deleteDoc(docRef);
    return true;
  },

  // REALTIME LISTEN
  listenBookings(callback: (bookings: BookingModel[]) => void) {
    const colRef = collection(db, BOOKINGS_COLLECTION);
    const q = query(colRef);

    return onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as BookingModel),
      }));
      callback(list);
    });
  }
};
