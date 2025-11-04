export interface Tour {
  id: string
  title: string
  slug: string
  description: string
  duration: string
  location: string
  price_from: number

  // detail
  note: string[]
  itinerary:string[]
  program_detail : string
  tour_include : string[]
  not_include : string[]
  cancellation_policy : string[]

  // 

  category_id: string
  featured_image: string
  status: 'draft' | 'published'
  created_at: Date
  updated_at: Date
}

export interface TourImage {
  id: string
  tour_id: string
  image_url: string
  order_index?: number
}

export interface Package {
  id: string
  tour_id: string
  name: string
  description?: string
  price: number
  max_people?: number
  available_dates?: string[] // e.g. ['2025-10-15', '2025-10-22']
  note?: string
}
