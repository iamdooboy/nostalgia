import { Suspense } from "react"
import { Stars } from "./stars"

import { getReviews } from "@/utils"

export const EventRatings = async ({
  rating,
  eventId
}: { rating: number; eventId: number }) => {
  const reviews = await getReviews(eventId)
  return (
    <div className="flex items-center justify-center md:justify-start gap-2 text-center">
      <Stars value={rating} className="mb-0" />
      <div className="text-gray-500">{`(${reviews.length})`}</div>
    </div>
  )
}
