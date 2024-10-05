import { toggle } from "@/actions/reviews"
import { ReviewContext } from "@/context/review-context"
import { Review } from "@/lib/types"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { User } from "@supabase/supabase-js"
import React, { useContext, useState } from "react"
import { LoginModal } from "./login-modal"
import { Button } from "./ui/button"
import { Dialog, DialogContent } from "./ui/dialog"
import { Icons } from "./ui/icons"

export const FavoriteButton = ({
  hasPosted,
  review,
  pathToRevalidate,
  user
}: {
  hasPosted: boolean
  review: Review
  pathToRevalidate: string
  user: User | null
}) => {
  const { addOptimisticReviews } = useContext(ReviewContext)
  const [open, setOpen] = useState(false)

  const favoritedByCurrentUser = review.favorites.some(
    (favorite) => favorite.userId === user?.id
  )

  const handleSubmit = async () => {
    console.log(user)
    if (!user) {
      setOpen(true)
      return
    }

    const userId = user?.id

    const unlike = [...review.favorites].filter(
      (favorite) => favorite.userId !== userId
    )

    const like = [
      ...review.favorites,
      {
        id: "",
        userId: user?.id ?? "",
        reviewId: 0
      }
    ]

    addOptimisticReviews({
      action: "toggle",
      newReviewData: {
        hasPosted,
        reviews: {
          ...review,
          favorites: favoritedByCurrentUser ? unlike : like,
          favoriteCount: favoritedByCurrentUser
            ? review.favoriteCount - 1
            : review.favoriteCount + 1
        }
      }
    })
    const updateUserWithId = toggle.bind(null, review.id, pathToRevalidate)
    updateUserWithId()
  }

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <form action={handleSubmit}>
          <button className="w-8 h-8 rounded-full flex justify-center items-center ">
            <Icons.HeartIcon
              className="w-4 h-4"
              style={{
                fill: favoritedByCurrentUser ? "currentColor" : "none"
              }}
            />
            <span className="ml-1 text-sm text-muted-foreground">
              {review.favoriteCount}
            </span>
          </button>
        </form>
      </DialogTrigger>
      {!user && <LoginModal description="Log in to favorite a review" />}
    </Dialog>
  )
}
