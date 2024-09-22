import { sql } from "drizzle-orm"
import {
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
    updatedAt: timestamp("updated_at").defaultNow().notNull()
  },
  (table) => {
    return {
      ratingCheck: sql`CHECK (${table.rating} >= 0 AND ${table.rating} <= 5)`
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
  reviewId: integer("review_id").notNull()
})

export const favoriteCounts = pgTable(
  "favorite_count",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    reviewId: integer("review_id").notNull(),
    count: integer("count").notNull().default(0)
  },
  (table) => ({
    eventIdUniqueIndex: uniqueIndex("eventIdUniqueIndex").on(table.reviewId)
  })
)

export type Event = typeof events.$inferSelect
export type Review = typeof reviews.$inferSelect
export type User = typeof users.$inferSelect
export type Favorite = typeof favorites.$inferSelect
export type FavoriteCount = typeof favoriteCounts.$inferSelect
