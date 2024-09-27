"use client"

import { create, edit } from "@/actions/reviews"
import { Dialog } from "@/components/ui/dialog"
import { DropdownMenu } from "@/components/ui/dropdown-menu"
import { ReviewProvider, useReview } from "@/context/review-context"
import { Review as ReviewProps, ReviewsData } from "@/lib/types"
import { User } from "@supabase/supabase-js"
import { useState } from "react"
import { ActionMenuDialog } from "./action-menu-dialog"
import { AddReviewButton } from "./add-review-button"
import { AddReviewDialog } from "./add-review-dialog"
import { Review } from "./review"
import { SortButtons } from "./sort-buttons"

const DEFAULT = {
  eventId: 0,
  id: 0,
  rating: 0,
  userId: "",
  text: "",
  createdAt: new Date(),
  edit: false,
  favorites: [],
  author: {
    id: "",
    email: ""
  },
  favoriteCounts: null
}

type ReviewSectionProps = {
  eventId: number
  user: User | null
}

export const ReviewsListContent = ({ eventId, user }: ReviewSectionProps) => {
  const { optimisticReviews, addOptimisticReviews } = useReview()

  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [currentSelectedReview, setCurrentSelectedReview] =
    useState<ReviewProps>(DEFAULT)

  const canEdit = !!user && optimisticReviews.hasPosted

  const handleEdit = (review: ReviewProps) => {
    setCurrentSelectedReview(review)
    setOpen(true)
  }

  const handleDelete = (reviewId: number) => {
    console.log(`Delete review with ID: ${reviewId}`)
  }

  const handleSubmit = async (formData: FormData) => {
    formData.append("rating", rating.toString())
    formData.append(
      "id",
      canEdit ? currentSelectedReview.id.toString() : eventId.toString()
    )

    const test: ReviewProps = {
      eventId: 0,
      id: canEdit ? currentSelectedReview.id : Math.random(),
      rating,
      userId: "",
      text: formData.get("text") as string,
      createdAt: canEdit ? currentSelectedReview.createdAt : new Date(),
      edit: false,
      favorites: [],
      author: {
        id: "",
        email: canEdit
          ? currentSelectedReview.author.email
          : (user?.email as string)
      },
      favoriteCounts: null
    }

    addOptimisticReviews({
      action: canEdit ? "update" : "create",
      newReviewData: { hasPosted: true, reviews: test }
    })

    if (!canEdit) {
      const { errorMessage } = await create(formData)
      if (errorMessage) {
        console.log("Error:", errorMessage)
      }
    } else {
      const { errorMessage } = await edit(formData)
      if (errorMessage) {
        console.log("Error:", errorMessage)
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <div className="space-y-3">
        <div className="flex justify-between">
          <SortButtons />
          {!optimisticReviews.hasPosted && (
            <AddReviewButton setOpen={setOpen} />
          )}
        </div>
        {optimisticReviews.reviews?.map((review) => (
          <Review
            hasPosted={optimisticReviews.hasPosted}
            key={review.id}
            review={review}
            user={user}
          >
            {canEdit && (
              <DropdownMenu
                onOpenChange={(open) => {
                  if (!open) {
                    setRating(currentSelectedReview?.rating)
                  }
                }}
              >
                <ActionMenuDialog
                  onDelete={() => handleDelete(review.id)}
                  onEdit={() => handleEdit(review)}
                />
              </DropdownMenu>
            )}
          </Review>
        ))}
        <AddReviewDialog
          handleSubmit={handleSubmit}
          defaultText={currentSelectedReview?.text}
          defaultRating={currentSelectedReview?.rating}
          rating={rating}
          setRating={setRating}
          setOpen={setOpen}
        />
      </div>
    </Dialog>
  )
}
