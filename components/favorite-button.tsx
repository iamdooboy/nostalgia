import { toggle } from "@/actions/reviews"
import { ReviewContext } from "@/context/review-context"
import { Review } from "@/lib/types"
import { User } from "@supabase/supabase-js"
import React, { useContext } from "react"
import { Button } from "./ui/button"

type IconProps = React.HTMLAttributes<SVGElement>

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

  const favoritedByCurrentUser = review.favorites.some(
    (favorite) => favorite.userId === user?.id
  )

  const handleSubmit = async () => {
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

    const favCount = review.favoriteCounts?.count ?? 0

    addOptimisticReviews({
      action: "toggle",
      newReviewData: {
        hasPosted,
        reviews: {
          ...review,
          favorites: favoritedByCurrentUser ? unlike : like,
          favoriteCounts: {
            count: favoritedByCurrentUser ? favCount - 1 : favCount + 1
          }
        }
      }
    })
    const updateUserWithId = toggle.bind(null, review.id, pathToRevalidate)
    updateUserWithId()
  }

  return (
    <form action={handleSubmit}>
      <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
        <HeartIcon
          className="w-4 h-4"
          style={{
            fill: favoritedByCurrentUser ? "currentColor" : "none"
          }}
        />
        <span className="ml-1 text-sm text-muted-foreground">
          {review.favoriteCounts?.count ?? 0}
        </span>
      </Button>
    </form>
  )
}

function HeartIcon(props: IconProps) {
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
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}
