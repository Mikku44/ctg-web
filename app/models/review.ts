export interface Review {
  id: string
  tour_id: string
  name: string
  rating: number // 1–5
  comment: string
  approved: boolean
  created_at: Date
}
