export interface Booking {
  id: string
  tour_id: string
  package_id?: string
  full_name: string
  email: string
  phone: string
  num_people: number
  booking_date: Date
  travel_date: Date
  total_price: number
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  payment_status: 'unpaid' | 'paid' | 'refunded'
  special_request?: string
  created_at: Date
  updated_at: Date
}

export interface Payment {
  id: string
  booking_id: string
  amount: number
  method: 'transfer' | 'card' | 'cash'
  transaction_id?: string
  paid_at?: Date
  status: 'success' | 'failed' | 'refunded'
}
