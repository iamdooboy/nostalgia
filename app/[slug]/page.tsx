import { AddReviewButton } from "@/components/add-review-form"
import { EventRatings } from "@/components/event-ratings"
import { ReviewSectionTest } from "@/components/review-section-test"
import { ReviewSection } from "@/components/reviews-section"
import { Stars } from "@/components/stars"
import db from "@/db"
import {
  events,
  favoriteCounts,
  favorites,
  reviews,
  users
} from "@/db/schemas/schema"
import { getUser } from "@/lib/auth"
import { getReviews } from "@/utils"
import { eq, and, sql } from "drizzle-orm"
import { Suspense } from "react"

export default async function Page({ params }: { params: { slug: string } }) {
  const arr = params.slug.split("-")
  const title = arr
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  const event = (await db.select().from(events)).find(
    (event) => event.title === title
  )

  if (!event) {
    // const test = await db.query.reviews.findMany({
    //   where: eq(reviews.eventId, event?.id),
    //   with: {
    //     author: true,
    //     favorites: true
    //   }
    // })

    // console.log(test)

    // const test = await db
    //   .select({
    //     id: reviews.id,
    //     rating: reviews.rating,
    //     text: reviews.text,
    //     createdAt: reviews.createdAt,
    //     edit: reviews.edit,
    //     name: users.email,
    //     favoriteCounts: favoriteCounts.count,
    //     favoritedByCurrentUser: sql<boolean>`CASE WHEN ${favorites.id} IS NOT NULL THEN true ELSE false END`
    //   })
    //   .from(reviews)
    //   .innerJoin(users, eq(reviews.userId, users.id))
    //   .innerJoin(events, eq(reviews.eventId, events.id))
    //   .fullJoin(
    //     favorites,
    //     and(eq(favorites.reviewId, reviews.id), eq(favorites.userId, users.id))
    //   )
    //   .leftJoin(favoriteCounts, eq(favoriteCounts.reviewId, reviews.id))
    //   .where(eq(events.id, event?.id))

    // console.log(test)
    // const results = await getReviews(event.id)
    // const reviews = await results.execute()
    // console.log(reviews)

    return
  }

  // const reviews = await getReviews(event.id)

  // console.log(reviews)

  //  return <div>hello</div>
  return (
    <div className="container min-h-screen mx-auto px-4 py-24 max-w-lg">
      <div className="flex flex-col justify-between md:items-center md:flex-row gap-8 mb-6">
        <img
          src="https://placehold.co/100x100?text=Hello+World"
          alt="Movie Poster"
          className="shadow-lg size-60 h-auto rounded-sm"
        />
        <div className="flex flex-col justify-evenly items-center md:items-start h-full gap-3 pr-6">
          <div className="text-center md:text-left gap-2 flex flex-col">
            <h1 className="text-4xl font-bold">{event?.title}</h1>
            <p className="text-muted-foreground">{event?.description}</p>
          </div>
          <EventRatings rating={event?.rating} eventId={event?.id} />
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ReviewSectionTest eventId={event?.id} />
        {/* <ReviewSection
          reviews={_reviews}
          eventId={event.id}
          user={{
            name,
            isAuthenticated: !!user
          }}
        /> */}

        {/* <ReviewSection reviews={_reviews} hasPosted={hasPosted}>
          <AddReviewButton id={event.id} name={name || ""} />
        </ReviewSection> */}
      </Suspense>
    </div>
  )
}
