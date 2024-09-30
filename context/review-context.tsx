import { Review, ReviewsData } from "@/lib/types"
import { createContext, useContext, useOptimistic } from "react"

type ReviewProviderProps = {
  optimisticReviews: ReviewsData
  addOptimisticReviews: (action: {
    action?: string
    newReviewData: {
      hasPosted: boolean
      reviews: Review
    }
  }) => void
}

export const ReviewContext = createContext<ReviewProviderProps>({
  optimisticReviews: {
    hasPosted: false,
    reviews: []
  },
  addOptimisticReviews: () => {}
})

export const useReview = () => useContext(ReviewContext)

export const ReviewProvider = ({
  children,
  reviewsData
}: { children: React.ReactNode; reviewsData: ReviewsData }) => {
  const [optimisticReviews, addOptimisticReviews] = useOptimistic(
    reviewsData,
    (
      state,
      {
        action,
        newReviewData
      }: {
        action?: string
        newReviewData: {
          hasPosted: boolean
          reviews: Review
        }
      }
    ) => {
      switch (action) {
        case "delete":
          return {
            hasPosted: false,
            reviews: state.reviews.filter(
              ({ id }) => id !== newReviewData.reviews.id
            )
          }
        case "update":
          return {
            hasPosted: true,
            reviews: state.reviews.map((review) =>
              review.id === newReviewData.reviews.id
                ? newReviewData.reviews
                : review
            )
          }
        case "toggle":
          return {
            ...state,
            reviews: state.reviews.map((review) =>
              review.id === newReviewData.reviews.id
                ? newReviewData.reviews
                : review
            )
          }
        case "sort-top":
          return {
            ...state,
            reviews: state.reviews.sort(
              (a, b) => b.favoriteCount - a.favoriteCount
            )
          }
        case "sort-recent":
          return {
            ...state,
            reviews: state.reviews.sort(
              (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
            )
          }
        default:
          return {
            hasPosted: true,
            reviews: [...state.reviews, newReviewData.reviews]
          }
      }
    }
  )
  return (
    <ReviewContext.Provider value={{ optimisticReviews, addOptimisticReviews }}>
      {children}
    </ReviewContext.Provider>
  )
}
