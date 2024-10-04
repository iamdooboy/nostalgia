import db from "@/db"
import { reviews } from "@/db/schemas/schema"
import { desc, eq } from "drizzle-orm"

export const getReviews = async (eventId: number, sort: string = "recent") => {
  return await db.query.reviews.findMany({
    where: eq(reviews.eventId, eventId),
    with: {
      author: true,
      favorites: true
    },
    orderBy: desc(reviews.favoriteCount)
  })
}
