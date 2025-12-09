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
    await this.sendLineNotify(contact)
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

  
    // Line Notification
    async sendLineNotify(contact : Omit<Contact, "created_at">) {
  
      // console.log("BOOKING : ", bookingData)
      const base_url =  import.meta.env.VITE_BASE_URL
      // console.log("BASE URL : ",base_url)
      // const base_url = "http://localhost:5173"
  
      const text = `แจ้งเตือนการติดต่อจากเว็บ Creative Tour Guru Thailand\nคุณ ${contact.name}\nบริการ : ${contact.type}\nเนื้อหา : ${contact.subject}\nแจ้งว่า ${contact.content}\nโปรดติดต่อกลับ ${contact.email} หรือโทร ${contact.mobile}`
  
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
