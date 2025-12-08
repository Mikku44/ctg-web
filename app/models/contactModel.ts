import type { Timestamp } from "firebase/firestore"

export interface Contact {
    name : string
    mobile : string
    email : string
    subject : string
    content : string
    status ? : "read" | "unread" | "done" | "progress"
    type? : string
    created_at : Timestamp
}