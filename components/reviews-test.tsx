"use client"

import { ReviewProvider } from "@/context/review-context"
import React from "react"
import { ReviewSection } from "./reviews-section"
import { User } from "@supabase/supabase-js"
import { ReviewsData } from "@/lib/types"

export const ReviewsTest = ({
  reviewsData,
  eventId,
  user
}: {
  reviewsData: ReviewsData
  eventId: number
  user: User | null
}) => {
  return (
    <div className="space-y-3">
      <ReviewProvider reviewsData={reviewsData}>
        <ReviewSection
          reviewsData={reviewsData}
          eventId={eventId}
          user={user}
        />
      </ReviewProvider>
    </div>
  )
}
