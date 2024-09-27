import { getUser } from "@/lib/auth"
import { getReviews } from "@/utils"
import { ReviewSection } from "./reviews-section"
import { ReviewProvider } from "@/context/review-context"
import { ReviewsTest } from "./reviews-test"

export const ReviewSectionTest = async ({ eventId }: { eventId: number }) => {
  // const results = await getReviews(eventId)
  // const reviews = await results.execute()
  const user = await getUser()

  const reviews = await getReviews(eventId)

  const reviewsData = {
    hasPosted:
      reviews.filter((review) => review.author.email == user?.email).length > 0,
    reviews
  }
  return <ReviewsTest reviewsData={reviewsData} eventId={eventId} user={user} />
}
