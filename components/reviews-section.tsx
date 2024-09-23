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
import { AddReviewButton } from "./add-review-form"
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

type Reviews = ReviewProps[]

type ReviewSectionProps = {
  reviews: Reviews
  eventId: number
  user: User
}

type User = {
  hasPosted: boolean
  name: string
  isAuthenticated: boolean
}
export const ReviewSection = ({
  eventId,
  reviews,
  user
}: ReviewSectionProps) => {
  const [optimisticReviews, addOptimisticReviews] = useOptimistic(
    reviews,
    (
      state,
      { action, newReview }: { action: string; newReview: ReviewProps }
    ) => {
      switch (action) {
        case "delete":
          return state.filter(({ id }) => id !== newReview.id)
        case "update":
          return state.map((review) =>
            review.id === newReview.id ? newReview : review
          )
        default:
          return [...state, newReview]
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
      createdAt: new Date()
    }
  )

  const canEdit = user.isAuthenticated && user.hasPosted

  const handleEdit = (review: ReviewProps) => {
    setCurrentSelectedReview(review)
    setOpen(true)
  }

  const reset = () => {
    setCurrentSelectedReview({
      text: "",
      rating: 0,
      name: "",
      id: 0,
      createdAt: new Date()
    })
    setRating(0)
  }

  const handleDelete = (reviewId: number) => {
    // Logic for handling review deletion
    console.log(`Delete review with ID: ${reviewId}`)
    // Optimistically remove the review from the state
    // addOptimisticReviews((prevReviews) =>
    //   prevReviews.filter((r) => r.id !== reviewId)
    // )
  }

  const handleSubmit = async (formData: FormData) => {
    formData.append("rating", rating.toString())
    if (!canEdit) {
      formData.append("id", eventId.toString())
      addOptimisticReviews({
        action: "create",
        newReview: {
          text: formData.get("text") as string,
          rating,
          name: user.name,
          id: Math.random(),
          createdAt: new Date()
        }
      })
      const { errorMessage } = await create(formData)
      if (errorMessage) {
        console.log("Error:", errorMessage)
      }
    } else {
      formData.append("id", currentSelectedReview.id.toString())
      addOptimisticReviews({
        action: "update",
        newReview: {
          text: formData.get("text") as string,
          rating,
          name: currentSelectedReview.name,
          id: currentSelectedReview.id,
          createdAt: currentSelectedReview.createdAt,
          updatedAt: new Date()
        }
      })
      const { errorMessage } = await edit(formData)
      if (errorMessage) {
        console.log("Error:", errorMessage)
      }
    }
  }

  return (
    <div className="space-y-3">
      <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
        <div className="flex justify-between">
          <SortButtons />
          {!canEdit && (
            <DialogTrigger asChild>
              <Button onClick={() => setOpen(true)}>Leave a review</Button>
            </DialogTrigger>
          )}
        </div>
        {optimisticReviews?.map((review) => (
          <Review key={review.id} review={review}>
            {canEdit && (
              <DropdownMenu
                onOpenChange={(open) => {
                  if (!open) {
                    setRating(currentSelectedReview?.rating)
                  }
                }}
              >
                {review.createdAt !== review.updatedAt && (
                  <span className="text-muted-foreground text-xs">edited</span>
                )}
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
        <DialogContent>
          <form action={handleSubmit} className="space-y-4">
            <Label className="font-bold text-2xl">Leave a review</Label>
            <Textarea
              id="text"
              name="text"
              placeholder="Type your review here."
              defaultValue={currentSelectedReview?.text}
            />
            <StarRating
              defaultValue={currentSelectedReview?.rating}
              rating={rating}
              setRating={setRating}
            />
            <Button type="submit" onClick={() => setOpen(false)}>
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
