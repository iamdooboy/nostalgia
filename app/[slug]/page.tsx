import { AddReviewButton } from "@/components/add-review-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { StarRating } from "@/components/ui/star-rating"
import db from "@/db"
import { events, reviews, users } from "@/db/schemas/schema"
import { eq } from "drizzle-orm"

export default async function Page({ params }: { params: { slug: string } }) {
  const arr = params.slug.split("-")
  const title = arr
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
  const event = (await db.select().from(events)).find(
    (event) => event.title === title
  )

  if (!event) {
    return (
      <Card className="h-full grid">
        <CardHeader>
          <CardTitle>Event not found</CardTitle>
        </CardHeader>
      </Card>
    )
  }
  const _reviews = await db
    .select({
      text: reviews.text,
      rating: reviews.rating,
      name: users.email,
      id: reviews.id
    })
    .from(reviews)
    .where(eq(reviews.eventId, event.id))
    .innerJoin(users, eq(reviews.userId, users.id))

  return (
    <div className="h-full grid">
      <Card>
        <CardHeader>
          <CardTitle>{event?.title}</CardTitle>
          <CardDescription>{event?.description}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <StarRating
            value={event?.rating}
            disabled
            iconProps={{ className: "fill-yellow-500 stroke-yellow-500" }}
          />
          <AddReviewButton id={event.id} />
        </CardContent>
      </Card>
      <div>
        {_reviews?.map((review) => (
          <Card className="h-full grid" key={review?.id}>
            <CardHeader>
              <CardTitle>{review?.name}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <StarRating
                value={review?.rating}
                disabled
                iconProps={{ className: "fill-yellow-500 stroke-yellow-500" }}
              />
              <Label>{review?.text}</Label>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
