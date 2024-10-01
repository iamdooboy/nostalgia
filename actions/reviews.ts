"use server"

import db from "@/db"
import { events, favorites, reviews } from "@/db/schemas/schema"
import { getUser } from "@/lib/auth"
import { getErrorMessage } from "@/lib/utils"
import { and, avg, count, desc, eq, sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const create = async (formData: FormData) => {
  try {
    const user = await getUser()

    if (!user) {
      redirect("/login")
    }

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

export async function toggle(reviewId: number, pathToRevalidate: string) {
  const user = await getUser()

  if (!user) {
    redirect("/login")
  }

  const favorite = await db.query.favorites.findFirst({
    where: and(eq(favorites.userId, user.id), eq(favorites.reviewId, reviewId))
  })

  if (favorite) {
    await db
      .delete(favorites)
      .where(
        and(eq(favorites.userId, user.id), eq(favorites.reviewId, reviewId))
      )
    await db
      .update(reviews)
      .set({
        favoriteCount: sql`${reviews.favoriteCount} - 1`
      })
      .where(eq(reviews.id, reviewId))
  } else {
    await db.insert(favorites).values({
      userId: user.id,
      reviewId
    })
    await db
      .update(reviews)
      .set({
        favoriteCount: sql`${reviews.favoriteCount} + 1`
      })
      .where(eq(reviews.id, reviewId))
  }

  revalidatePath(pathToRevalidate)
}

export async function edit(formData: FormData) {
  try {
    const user = await getUser()
    if (!user) {
      redirect("/login")
    }

    const text = formData.get("text") as string
    const rating = parseInt(formData.get("rating") as string)
    const reviewId = parseInt(formData.get("id") as string)
    const eventId = parseInt(formData.get("eventId") as string)
    const oldRating = parseInt(formData.get("oldRating") as string)

    const [_reviews] = await db
      .select({
        numberOfReviews: count(reviews.id),
        avgRating: avg(reviews.rating)
      })
      .from(reviews)
      .where(eq(reviews.eventId, eventId))

    const totalRating =
      (Number(_reviews.avgRating) || 0) * _reviews.numberOfReviews -
      oldRating +
      rating

    const totalReviews = _reviews.numberOfReviews

    const newAvg = Number((totalRating / totalReviews).toFixed(1))

    await db
      .update(reviews)
      .set({ text, rating, edit: true })
      .where(and(eq(reviews.id, reviewId), eq(reviews.userId, user.id)))

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

export async function remove(
  reviewId: number,
  eventId: number,
  rating: number
) {
  try {
    const user = await getUser()
    if (!user) {
      redirect("/login")
    }

    const [_reviews] = await db
      .select({
        numberOfReviews: count(reviews.id),
        avgRating: avg(reviews.rating)
      })
      .from(reviews)
      .where(eq(reviews.eventId, eventId))

    const totalRating =
      (Number(_reviews.avgRating) || 0) * _reviews.numberOfReviews - rating

    const totalReviews = _reviews.numberOfReviews - 1

    const newAvg =
      totalReviews > 0 ? Number((totalRating / totalReviews).toFixed(1)) : 0

    await db
      .delete(reviews)
      .where(and(eq(reviews.id, reviewId), eq(reviews.userId, user.id)))

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
