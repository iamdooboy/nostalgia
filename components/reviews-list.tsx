"use client"

import { ReviewProvider } from "@/context/review-context"
import { ReviewsData } from "@/lib/types"

export const ReviewsList = ({
  reviewsData,
  children
}: {
  reviewsData: ReviewsData
  children: React.ReactNode
}) => {
  return <ReviewProvider reviewsData={reviewsData}>{children}</ReviewProvider>
}
