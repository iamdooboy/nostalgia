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
import { create } from "@/actions/reviews"

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
    (state, newReview: ReviewProps) => [...state, newReview]
  )
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [text, setText] = useState("")

  const canEdit = user.isAuthenticated && user.hasPosted

  const handleEdit = (review: ReviewProps) => {
    setRating(review.rating)
    setText(review.text)
    setOpen(true)
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
    const reviewData: ReviewProps = {
      text,
      rating,
      name: user.name,
      id: eventId,
      date: new Date()
    }
    if (canEdit) {
      console.log("edit")
    }
    console.log("submit")
    return
    formData.append("rating", value.toString())
    formData.append("id", eventId.toString())

    addOptimisticReviews(reviewData)

    // if (onSubmit) {
    //   onSubmit(reviewData)
    // }

    const { errorMessage } = await create(formData)
    if (errorMessage) {
      console.log("Error:", errorMessage)
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
              <DropdownMenu>
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
                      <FilePenIcon className="size-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DropdownMenuItem onClick={() => handleDelete(review.id)}>
                    <Trash2Icon className="size-4 mr-2" />
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
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <StarRating rating={rating} setRating={setRating} />
            <Button type="submit" onClick={() => setOpen(false)}>
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function FilePenIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  )
}

function Trash2Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  )
}
