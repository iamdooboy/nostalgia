"use server"

import db from "@/db"
import { events, reviews } from "@/db/schemas/schema"
import { getUser } from "@/lib/auth"
import { getErrorMessage } from "@/lib/utils"
import { avg, count, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const create = async (formData: FormData) => {
  try {
    const user = await getUser()

    const text = formData.get("text") as string
    const rating = parseInt(formData.get("rating") as string)
    const eventId = parseInt(formData.get("id") as string)

    const [_reviews] = await db
      .select({
        numberOfReviews: count(reviews.id),
        avgRating: avg(reviews.rating)
      })
      .from(reviews)
      .where(eq(reviews.eventId, eventId))

    const totalRating =
      (Number(_reviews.avgRating) || 0) * _reviews.numberOfReviews + rating

    const totalReviews = _reviews.numberOfReviews + 1

    const newAvg = Number((totalRating / totalReviews).toFixed(1))

    await db.insert(reviews).values({ text, userId: user.id, rating, eventId })

    await db
      .update(events)
      .set({ rating: newAvg })
      .where(eq(events.id, eventId))

    revalidatePath("/")

    return { errorMessage: null }
  } catch (error) {
    return { errorMessage: getErrorMessage(error) }
  }
}
