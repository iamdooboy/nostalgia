import { AddReviewButton } from "@/components/add-review-form"
import { Stars } from "@/components/stars"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
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
    <div className="container min-h-screen mx-auto px-4 py-24 max-w-lg">
      <div className="flex flex-col justify-center md:items-center md:flex-row gap-8 mb-6">
        <img
          src="https://placehold.co/100x100?text=Hello+World"
          alt="Movie Poster"
          className="shadow-lg size-60 h-auto rounded-sm"
        />
        <div className="flex flex-col justify-evenly items-center md:items-start h-full gap-3">
          <div className="text-center md:text-left gap-2 flex flex-col">
            <h1 className="text-4xl font-bold">{event?.title}</h1>
            <p className="text-muted-foreground">{event?.description}</p>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-2 text-center">
            <div className="text-3xl font-bold text-center">{event.rating}</div>
            <Stars value={event.rating} className="mb-0" />
            <div className="text-gray-500">{`(${_reviews?.length} reviews)`}</div>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="secondary">Top</Button>
            <Button variant="ghost">Recent</Button>
          </div>
          <AddReviewButton id={event.id} />
        </div>
        {_reviews?.map((review) => (
          <div
            key={review?.id}
            className="border rounded-sm flex flex-col gap-2 p-4 transition-all duration-100 hover:[box-shadow:5px_5px_rgb(82_82_82)] [box-shadow:0px_0px_rgb(82_82_82)] hover:-translate-x-[3px] hover:-translate-y-[3px]"
          >
            <p className="text-muted-foreground text-lg">{review?.name}</p>
            <h1 className="text-2xl">{review?.text}</h1>
            <Stars value={review?.rating} className="justify-start mb-0" />
          </div>
        ))}
      </div>
    </div>
  )
}
