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
  setDoc,
  increment,
} from "firebase/firestore";
import { db } from "~/lib/firebase/config";
import type { BookingModel } from "~/models/booking";
import { tourService } from "./tourService";


const BOOKINGS_COLLECTION = "bookings";

export const bookingService = {
  // CREATE
  async createBooking(
    data: Omit<BookingModel, "id" | "created_at" | "updated_at">
  ) {
    const colName = BOOKINGS_COLLECTION;
    const date = new Date();

    // Format date: YYYYMMDD
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    const dateStr = `${y}${m}${d}`; // 20251208

    // TODO: get booking count safely
    const bookingCount = await this.getBookingCountForToday(); // return number

    // Build custom ID
    const customId = `CTG-${dateStr}-${String(bookingCount + 1).padStart(3, "0")}`;

    const newBooking = {
      ...data,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    };

    // Use custom ID
    await setDoc(doc(db, colName, customId), newBooking);

    return { id: customId, ...newBooking };
  },

  async getBookingCountForToday() {
    const counterRef = doc(db, "counters", "bookings");
    const snap = await getDoc(counterRef);

    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, "0");
    const d = String(today.getDate()).padStart(2, "0");
    const todayStr = `${y}-${m}-${d}`; // 2025-12-08
    let newCount = 1;

    if (!snap.exists()) {
      // First time: create counter
      await setDoc(counterRef, { today: todayStr, count: 1 });
      return 1;
    }

    const data = snap.data();

    if (data.today !== todayStr) {
      // New day → reset counter
      await setDoc(counterRef, { today: todayStr, count: 1 });
      return 1;
    }

    // Same day → atomically increment
    await updateDoc(counterRef, {
      count: increment(1)
    });

    // Read updated count
    const updatedSnap = await getDoc(counterRef);
    newCount = updatedSnap?.data()?.count || 1;

    return newCount;
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
  },

  // Line Notification
  async sendLineNotify(booking: BookingModel) {

    // console.log("BOOKING : ", bookingData)
    const base_url =  import.meta.env.BASE_URL
    // const base_url = "http://localhost:5173"

    const text = `แจ้งเตือนการจองจากเว็บ Creative Tour Guru Thailand\nรหัสการจอง : ${booking.id}\nทัวร์ : ${booking.tourName}\nชื่อ : ${booking.firstName + " "  + booking.lastName}\nจำนวนคน : ${booking.people}\nวันที่ : ${booking.date}\nราคารวม : ${booking.totalPrice}\nติดต่อ : ${booking.contact}\nตรวจสอบที่ https://www.creativetourguruthailand.com/admin/bookings`

    const res = await fetch(`${base_url}/api/line-message-api`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({text : text}),
    });

    return res;
  }
};
