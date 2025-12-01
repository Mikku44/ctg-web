import type { Timestamp } from "firebase/firestore";

export interface BookingModel {
  id?: string;          // unique reference
  tour: string;
  tourName: string;
  packageName?: string;
  price?: number;

  firstName: string;
  lastName: string;
  email: string;
  contact: string;
 
  date: string;           // วันที่ไปทริป
  people: number;
  hotel: string;
  special: string;

  totalPrice: number;    
  totalDepositPrice?: number;         // total price
  currency: 'THB' | 'USD';

  status: 'paid' | 'unpaid' | 'complete' | 'invoiced';

  invoice? : {id : string , url : string};  // stripe invoice id and url

  paymentId?: string;         // stripe / promptpay
  paymentDate?: string;         // stripe / promptpay
  paymentMethod?: string;         // stripe / promptpay
  created_at: Timestamp;
  updated_at: Timestamp;
}


export type BookingStatus = 'complete' | 'paid' | 'unpaid';
export const ALL_STATUSES: BookingStatus[] = ['complete', 'paid', 'unpaid'];