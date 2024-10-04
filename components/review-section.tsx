import { getUser } from "@/lib/auth"
import { getReviews } from "@/utils"
import { ReviewsList } from "./reviews-list"
import { ReviewsListContent } from "./reviews-list-content"

export const ReviewSection = async ({
  eventId
}: { eventId: number; sort?: string }) => {
  const user = await getUser()
  const reviews = await getReviews(eventId)

  const reviewsData = {
    hasPosted:
      reviews.filter((review) => review.author.email == user?.email).length > 0,
    reviews
  }
  return (
    <ReviewsList reviewsData={reviewsData}>
      <ReviewsListContent eventId={eventId} user={user} />
    </ReviewsList>
  )
}
