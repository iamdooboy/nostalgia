import { Card } from "@/components/ui/card"
import { Review as ReviewProps } from "@/lib/types"
import { Stars } from "./stars"
import { FavoriteButton } from "./favorite-button"
import { getTimeDifference } from "@/lib/utils"

export function Review({
  review,
  children
}: { review: ReviewProps; children: React.ReactNode }) {
  return (
    <Card className="rounded-sm w-full p-4 grid gap-4 transition-all duration-100 hover:[box-shadow:5px_5px_rgb(82_82_82)] [box-shadow:0px_0px_rgb(82_82_82)] hover:-translate-x-[3px] hover:-translate-y-[3px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="grid gap-0.5">
            <div className="font-medium">
              {review?.name.slice(0, review?.name.indexOf("@"))}
              <span className="text-xs text-muted-foreground">
                {" "}
                - {getTimeDifference(review.createdAt)}
              </span>
            </div>
            {review.createdAt !== review.updatedAt && (
              <span className="text-muted-foreground text-xs italic">
                edited
              </span>
            )}
          </div>
        </div>
        {children}
      </div>
      <div className="text-muted-foreground">{review.text}</div>
      <div className="flex items-center justify-between">
        <Stars value={review?.rating} className="justify-start mb-0 mt-2" />
        <FavoriteButton reviewId={review.id} pathToRevalidate="/" />
      </div>
    </Card>
  )
}
