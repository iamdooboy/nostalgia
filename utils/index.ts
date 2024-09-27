import db from "@/db"
import {
  events,
  favoriteCounts,
  favorites,
  reviews,
  users
} from "@/db/schemas/schema"
import { User } from "@supabase/supabase-js"
import { eq, and, sql } from "drizzle-orm"

export const getReviews = async (eventId: number) => {
  // const favorite = await db.query.reviews.findMany({
  //   where: and(eq(reviews.eventId, eventId))
  // })
  // const _reviews = await db
  //   .select()
  //   .from(reviews)
  //   .where(eq(reviews.eventId, eventId))
  //   .innerJoin(users, eq(reviews.userId, users.id))
  //   .leftJoin(favoriteCounts, eq(reviews.id, favoriteCounts.reviewId))
  //   .leftJoin(
  //     favorites,
  //     and(eq(favorites.userId, users.id), eq(favorites.reviewId, reviews.id))
  //   )
  // return _reviews
  // return favorite
  // return db
  //   .select({
  //     text: reviews.text,
  //     rating: reviews.rating,
  //     name: users.email,
  //     id: reviews.id,
  //     createdAt: reviews.createdAt,
  //     edit: reviews.edit,
  //     favoriteCounts: favoriteCounts.count,
  //     favoritedByCurrentUser: favorites.userId
  //   })
  //   .from(reviews)
  //   .innerJoin(users, eq(reviews.userId, users.id))
  //   .innerJoin(events, eq(reviews.eventId, events.id))
  //   .leftJoin(
  //     favorites,
  //     and(
  //       eq(favorites.reviewId, reviews.id)
  //       // eq(favorites.userId, reviews.userId)
  //     )
  //   )
  //   .leftJoin(favoriteCounts, eq(favoriteCounts.reviewId, reviews.id))
  //   .where(eq(events.id, eventId))

  // return db
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
  //   .where(eq(events.id, eventId))
  //   .prepare("getReviews")
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
