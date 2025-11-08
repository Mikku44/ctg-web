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
import type { Contact } from "~/models/contactModel";

const contactRef = collection(db, "contacts");

export const ContactService = {
  // ✅ Create
  async create(contact: Omit<Contact, "created_at">) {
    return await addDoc(contactRef, {
      ...contact,
      created_at: serverTimestamp(), // best practice
    });
  },

  // ✅ Real-time listener (auto update UI)
  listen(callback: (data: (Contact & { id: string })[]) => void) {
    return onSnapshot(contactRef, (snapshot) => {
      const contacts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as (Contact & { id: string })[];
      callback(contacts);
    });
  },

  listenUnread(
    status: string,
    callback: (data: (Contact & { id: string })[]) => void
  ) {
    const q = query(contactRef, where("status", "==", status));

    return onSnapshot(q, (snapshot) => {
      const contacts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as (Contact & { id: string })[];

      callback(contacts);
    });
  },

  // ✅ Normal fetch (if needed)
  async getAll() {
    const snapshot = await getDocs(contactRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as (Contact & { id: string })[];
  },

  async getById(id: string) {
    const snapshot = await getDoc(doc(db, "contacts", id));
    return snapshot.exists() ? ({ id, ...snapshot.data() } as Contact & { id: string }) : null;
  },

  async update(id: string, data: Partial<Omit<Contact, "created_at">>) {
    return await updateDoc(doc(db, "contacts", id), data);
  },

  async delete(id: string) {
    return await deleteDoc(doc(db, "contacts", id));
  },
};
