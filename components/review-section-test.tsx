import { getUser } from "@/lib/auth"
import { getReviews } from "@/utils"
import { ReviewSection } from "./reviews-section"

export const ReviewSectionTest = async ({ eventId }: { eventId: number }) => {
  const reviews = await getReviews(eventId)
  const user = await getUser()
  return (
    <div className="space-y-3">
      <ReviewSection reviews={reviews} eventId={eventId} user={user} />
    </div>
  )
}
