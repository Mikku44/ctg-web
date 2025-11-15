import type { Timestamp } from "firebase/firestore";

export interface BookingModel {
  id?: string;          // unique reference
  tourId: string;
  tourName: string;
  packageName?: string;
  price?: number;

  firstName: string;
  lastName: string;
  email: string;
  phone: string;
 
  tripDate: string;           // วันที่ไปทริป
  people: number;
  hotel: string;
  special: string;

  amount: number;             // total price
  currency: 'THB' | 'USD';

  status: 'paid' | 'unpaid' | 'complete';

  paymentId?: string;         // stripe / promptpay
  created_at: Timestamp;
  updated_at: Timestamp;
}
