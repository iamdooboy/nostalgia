import db from "@/db"
import { favoriteCounts, reviews, users } from "@/db/schemas/schema"
import { eq } from "drizzle-orm"

export const getReviews = async (eventId: number) => {
  const _reviews = await db
    .select({
      text: reviews.text,
      rating: reviews.rating,
      name: users.email,
      id: reviews.id,
      createdAt: reviews.createdAt,
      edit: reviews.edit,
      favoriteCounts: favoriteCounts.count
    })
    .from(reviews)
    .where(eq(reviews.eventId, eventId))
    .innerJoin(users, eq(reviews.userId, users.id))
    .leftJoin(favoriteCounts, eq(reviews.id, favoriteCounts.reviewId))
  return _reviews
}
