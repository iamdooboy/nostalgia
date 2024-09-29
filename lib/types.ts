export type Review = {
  eventId: number
  id: number
  rating: number
  userId: string
  text: string
  createdAt: Date
  edit: boolean
  favoriteCount: number
  favorites: {
    id: string
    userId: string
    reviewId: number
  }[]
  author: {
    id: string
    email: string
  }
}

export type Reviews = Review[]

export type ReviewsData = {
  hasPosted: boolean
  reviews: Reviews
}

export type DisplayReview = {
  id: number
  rating: number
  text: string
  edit: boolean
  favoriteCounts?: number
  author: string
}
