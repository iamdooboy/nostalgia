"use client"

import { Review as ReviewProps } from "@/lib/types"
import { Ellipsis } from "lucide-react"
import React, { ReactElement } from "react"
import { useOptimistic, useState } from "react"
import { AddReviewButton } from "./add-review-form"
import { Review } from "./review"
import { Stars } from "./stars"
import { Button } from "./ui/button"

type Reviews = ReviewProps[]

type ReviewSectionProps = {
  reviews: Reviews
  children: ReactElement<{ addReviews: (action: ReviewProps) => void }>
  hasPosted: boolean
}

export const ReviewSection = ({
  reviews,
  children,
  hasPosted
}: ReviewSectionProps) => {
  const [sort, setSort] = useState("Recent")
  const [optimisticReviews, addOptimisticReviews] = useOptimistic(
    reviews,
    (state, newReview: ReviewProps) => [...state, newReview]
  )
  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type === AddReviewButton) {
        return React.cloneElement(
          child as React.ReactElement<{
            addReviews: typeof addOptimisticReviews
          }>,
          {
            addReviews: addOptimisticReviews
          }
        )
      }
      return child
    })
  }
  return (
    <div className="space-y-3">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            className="hover:bg-secondary/40 hover:text-muted-foreground"
            variant={sort === "Recent" ? "secondary" : "ghost"}
            onClick={() => setSort("Recent")}
          >
            Recent
          </Button>
          <Button
            className="hover:bg-secondary/40 hover:text-muted-foreground"
            variant={sort === "Top" ? "secondary" : "ghost"}
            onClick={() => setSort("Top")}
          >
            Top
          </Button>
        </div>
        {renderChildren()}
      </div>
      {optimisticReviews?.map((review) => (
        <Review key={review.id} review={review} hasPosted={hasPosted} />
      ))}
    </div>
  )
}
