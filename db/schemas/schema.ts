import { relations, sql } from "drizzle-orm"
import { primaryKey } from "drizzle-orm/pg-core"
import {
  boolean,
  integer,
  pgSchema,
  pgTable,
  real,
  serial,
  text,
  timestamp,
  uniqueIndex,
  uuid
} from "drizzle-orm/pg-core"

const authSchema = pgSchema("auth")

export const users = authSchema.table("users", {
  id: uuid("id").primaryKey(),
  email: text("email").notNull()
})

// events table
export const events = pgTable(
  "events",
  {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description"),
    rating: real("rating").default(0).notNull()
  },
  (table) => {
    return {
      ratingCheck: sql`CHECK (${table.rating} >= 0 AND ${table.rating} <= 5)`
    }
  }
)

// reviews table
export const reviews = pgTable(
  "reviews",
  {
    id: serial("id").primaryKey(),
    eventId: integer("event_id").notNull(),
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    rating: real("rating").notNull(),
    text: text("text").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    edit: boolean("edit").default(false).notNull(),
    favoriteCount: integer("favorite_count").notNull().default(0)
  },
  (table) => {
    return {
      ratingCheck: sql`CHECK (${table.rating} >= 0 AND ${table.rating} <= 5)`
    }
  }
)

export const eventReviews = pgTable(
  "event_reviews",
  {
    reviewId: serial("review_id")
      .references(() => reviews.id)
      .notNull(),
    eventId: serial("event_id")
      .references(() => events.id)
      .notNull()
  },
  (table) => {
    return {
      eventIdUniqueIndex: primaryKey({
        columns: [table.eventId, table.reviewId]
      })
    }
  }
)

export const favorites = pgTable("favorites", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  reviewId: integer("review_id")
    .references(() => reviews.id, { onDelete: "cascade" })
    .notNull()
})

//RELATIONS
export const EventRelations = relations(events, ({ one, many }) => ({
  reviews: many(reviews)
}))

export const ReviewRelations = relations(reviews, ({ one, many }) => ({
  author: one(users, {
    fields: [reviews.userId],
    references: [users.id]
  }),
  event: one(events, {
    fields: [reviews.eventId],
    references: [events.id]
  }),
  favorites: many(favorites)
}))

export const FavoriteRelations = relations(favorites, ({ one, many }) => ({
  reviews: one(reviews, {
    fields: [favorites.reviewId],
    references: [reviews.id]
  })
}))

export type Event = typeof events.$inferSelect
export type Review = typeof reviews.$inferSelect
export type User = typeof users.$inferSelect
export type Favorite = typeof favorites.$inferSelect
