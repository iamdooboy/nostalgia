import db from "@/db"
import { reviews } from "@/db/schemas/schema"
import { eq } from "drizzle-orm"

export const getReviews = async (eventId: number) => {
  return await db.query.reviews.findMany({
    where: eq(reviews.eventId, eventId),
    with: {
      author: true,
      favorites: true,
      favoriteCounts: {
        columns: { count: true }
      }
    }
  })
}
