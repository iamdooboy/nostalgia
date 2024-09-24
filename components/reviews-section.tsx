// "use client"

// import { Review as ReviewProps } from "@/lib/types"
// import { Ellipsis } from "lucide-react"
// import React, { ReactElement } from "react"
// import { useOptimistic, useState } from "react"
// import { AddReviewButton } from "./add-review-form"
// import { Review } from "./review"
// import { Stars } from "./stars"
// import { Button } from "./ui/button"

// type Reviews = ReviewProps[]

// type ReviewSectionProps = {
//   reviews: Reviews
//   children: ReactElement<{ addReviews: (action: ReviewProps) => void }>
//   hasPosted: boolean
// }

// export const ReviewSection = ({
//   reviews,
//   children,
//   hasPosted
// }: ReviewSectionProps) => {
//   const [sort, setSort] = useState("Recent")
//   const [optimisticReviews, addOptimisticReviews] = useOptimistic(
//     reviews,
//     (state, newReview: ReviewProps) => [...state, newReview]
//   )
//   const renderChildren = () => {
//     return React.Children.map(children, (child) => {
//       if (React.isValidElement(child) && child.type === AddReviewButton) {
//         return React.cloneElement(
//           child as React.ReactElement<{
//             addReviews: typeof addOptimisticReviews
//           }>,
//           {
//             addReviews: addOptimisticReviews
//           }
//         )
//       }
//       return child
//     })
//   }
//   return (
//     <div className="space-y-3">
//       <div className="flex justify-between">
//         <div className="flex gap-2">
//           <Button
//             className="hover:bg-secondary/40 hover:text-muted-foreground"
//             variant={sort === "Recent" ? "secondary" : "ghost"}
//             onClick={() => setSort("Recent")}
//           >
//             Recent
//           </Button>
//           <Button
//             className="hover:bg-secondary/40 hover:text-muted-foreground"
//             variant={sort === "Top" ? "secondary" : "ghost"}
//             onClick={() => setSort("Top")}
//           >
//             Top
//           </Button>
//         </div>
//         {renderChildren()}
//       </div>
//       {optimisticReviews?.map((review) => (
//         <Review key={review.id} review={review} hasPosted={hasPosted} />
//       ))}
//     </div>
//   )
// }

"use client"

import { Review as ReviewProps } from "@/lib/types"
import { Ellipsis } from "lucide-react"
import React, { ReactElement } from "react"
import { useOptimistic, useState } from "react"
import { AddReviewButton } from "./add-review-button"
import { Review } from "./review"
import { Stars } from "./stars"
import { Button } from "./ui/button"
import { SortButtons } from "./sort-buttons"
import { ActionMenuDialog } from "./action-menu-dialog"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { StarRating } from "./ui/star-rating"
import { create, edit } from "@/actions/reviews"
import { Icons } from "./ui/icons"
import { AddReviewDialog } from "./add-review-dialog"
import { User } from "@supabase/supabase-js"

type Reviews = ReviewProps[]

type ReviewSectionProps = {
  reviews: Reviews
  eventId: number
  user: User | null
}

export const ReviewSection = ({
  eventId,
  reviews,
  user
}: ReviewSectionProps) => {
  const reviewsData = {
    hasPosted:
      reviews.filter((review) => review.name == user?.email).length > 0,
    reviews
  }

  const [optimisticReviews, addOptimisticReviews] = useOptimistic(
    reviewsData,
    (
      state,
      {
        action,
        newReviewData
      }: {
        action?: string
        newReviewData: {
          hasPosted: boolean
          reviews: ReviewProps
        }
      }
    ) => {
      switch (action) {
        case "delete":
          return {
            hasPosted: false,
            reviews: state.reviews.filter(
              ({ id }) => id !== newReviewData.reviews.id
            )
          }
        case "update":
          return {
            hasPosted: true,
            reviews: state.reviews.map((review) =>
              review.id === newReviewData.reviews.id
                ? newReviewData.reviews
                : review
            )
          }
        default:
          return {
            hasPosted: true,
            reviews: [...state.reviews, newReviewData.reviews]
          }
      }
    }
  )

  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [currentSelectedReview, setCurrentSelectedReview] = useState<ReviewProps>(
    {
      text: "",
      rating: 0,
      name: "",
      id: 0,
      createdAt: new Date(),
      edit: false
    }
  )

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

    const newReview = {
      text: formData.get("text") as string,
      rating,
      name: canEdit ? currentSelectedReview.name : (user?.email as string),
      id: canEdit ? currentSelectedReview.id : Math.random(),
      createdAt: canEdit ? currentSelectedReview.createdAt : new Date(),
      edit: canEdit ? true : false
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

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <div className="flex justify-between">
        <SortButtons />
        {!optimisticReviews.hasPosted && <AddReviewButton setOpen={setOpen} />}
      </div>
      {optimisticReviews.reviews?.map((review) => (
        <Review key={review.id} review={review}>
          {canEdit && (
            <DropdownMenu
              onOpenChange={(open) => {
                if (!open) {
                  setRating(currentSelectedReview?.rating)
                }
              }}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 rounded-full"
                >
                  <Ellipsis className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DialogTrigger asChild>
                  <DropdownMenuItem onClick={() => handleEdit(review)}>
                    <Icons.FilePenIcon className="size-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuItem onClick={() => handleDelete(review.id)}>
                  <Icons.Trash2Icon className="size-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
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
    </Dialog>
  )
}
