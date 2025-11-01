export interface TourSchedule {
  id: string
  tour_id: string
  date_start: Date
  date_end?: Date
  seats_total: number
  seats_booked: number
  price_override?: number
}
