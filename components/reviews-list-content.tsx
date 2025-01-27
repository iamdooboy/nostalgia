"use client"

import { create, edit, remove } from "@/actions/reviews"
import { Dialog } from "@/components/ui/dialog"
import { DropdownMenu } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useReview } from "@/context/review-context"
import { Review as ReviewProps } from "@/lib/types"
import { User } from "@supabase/supabase-js"
import { useState } from "react"
import { ActionMenuDialog } from "./action-menu-dialog"
import { AddReviewButton } from "./add-review-button"
import { AddReviewDialog } from "./add-review-dialog"
import { LoginModal } from "./login-modal"
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
  favoriteCount: 0
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

  //DELETE REVIEW
  const handleDelete = async (reviewId: number, rating: number) => {
    addOptimisticReviews({
      action: "delete",
      newReviewData: {
        hasPosted: true,
        reviews: {
          ...DEFAULT,
          id: reviewId
        }
      }
    })
    const { errorMessage } = await remove(reviewId, eventId, rating)
    setCurrentSelectedReview(DEFAULT)
    setRating(0)
    if (errorMessage) {
      console.log("Error:", errorMessage)
    }
  }

  //SUBMIT/EDIT REVIEW
  const handleSubmit = async (formData: FormData) => {
    formData.append("rating", rating.toString())
    formData.append(
      "id",
      canEdit ? currentSelectedReview.id.toString() : eventId.toString()
    )

    if (canEdit) {
      formData.append("eventId", eventId.toString())
      formData.append("oldRating", currentSelectedReview.rating.toString())
    }

    const newReview: ReviewProps = {
      ...DEFAULT,
      id: canEdit ? currentSelectedReview.id : Math.random(),
      rating,
      text: formData.get("text") as string,
      createdAt: canEdit ? currentSelectedReview.createdAt : new Date(),
      edit: canEdit ? true : false,
      author: {
        id: "",
        email: canEdit
          ? currentSelectedReview.author.email
          : (user?.email as string)
      }
    }

    addOptimisticReviews({
      action: canEdit ? "update" : "create",
      newReviewData: { hasPosted: true, reviews: newReview }
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

  const onOpenChange = (open: boolean) => {
    setCurrentSelectedReview(DEFAULT)
    setRating(0)
    setOpen(open)
  }

  return (
    <Dialog open={open} onOpenChange={(open) => onOpenChange(open)}>
      <div className="space-y-3">
        {!optimisticReviews.hasPosted ? (
          <AddReviewButton setOpen={setOpen} user={user} />
        ) : null}
        <Tabs defaultValue="recent" className="mt-2">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger className="ml-[2px]" value="recent">
              Recent
            </TabsTrigger>
            <TabsTrigger className="mr-[1px]" value="top">
              Top
            </TabsTrigger>
          </TabsList>
          <TabsContent value="recent" className="p-[2px] space-y-1">
            {optimisticReviews.reviews?.map((review) => (
              <Review
                hasPosted={optimisticReviews.hasPosted}
                key={review.id}
                review={review}
                user={user}
              >
                {review.author.id === user?.id && (
                  <DropdownMenu
                    onOpenChange={(open) => {
                      if (!open) {
                        setRating(currentSelectedReview?.rating)
                      }
                    }}
                  >
                    <ActionMenuDialog
                      onDelete={() => handleDelete(review.id, review.rating)}
                      onEdit={() => handleEdit(review)}
                    />
                  </DropdownMenu>
                )}
              </Review>
            ))}
          </TabsContent>
          <TabsContent value="top" className="p-[2px] space-y-1">
            {[...optimisticReviews.reviews]
              .sort((a, b) => b.favoriteCount - a.favoriteCount)
              .map((review) => (
                <Review
                  hasPosted={optimisticReviews.hasPosted}
                  key={review.id}
                  review={review}
                  user={user}
                >
                  {review.author.id === user?.id && (
                    <DropdownMenu
                      onOpenChange={(open) => {
                        if (!open) {
                          setRating(currentSelectedReview?.rating)
                        }
                      }}
                    >
                      <ActionMenuDialog
                        onDelete={() => handleDelete(review.id, review.rating)}
                        onEdit={() => handleEdit(review)}
                      />
                    </DropdownMenu>
                  )}
                </Review>
              ))}
          </TabsContent>
        </Tabs>
        {!!user ? (
          <AddReviewDialog
            handleSubmit={handleSubmit}
            defaultText={currentSelectedReview?.text}
            defaultRating={currentSelectedReview?.rating}
            rating={rating}
            setRating={setRating}
            setOpen={setOpen}
          />
        ) : (
          <LoginModal description="Log in to leave a review" />
        )}
      </div>
    </Dialog>
  )
}
