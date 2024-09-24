import React, { Suspense } from "react"
import { Stars } from "./stars"

import { getReviews } from "@/utils"

export const EventRatings = async ({
  rating,
  eventId
}: { rating: number; eventId: number }) => {
  const reviews = await getReviews(eventId)
  return (
    <div className="flex items-center justify-center md:justify-start gap-2 text-center">
      <div className="text-3xl font-bold text-center mb-1">{rating}</div>
      <Stars value={rating} className="mb-0" />
      <Suspense fallback={<div>Loading...</div>}>
        <div className="text-gray-500">{`(${reviews.length})`}</div>
      </Suspense>
    </div>
  )
}
