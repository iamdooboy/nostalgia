import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  real
} from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

// user table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull()
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
    eventId: integer("event_id")
      .references(() => events.id)
      .notNull(),
    userId: integer("user_id")
      .references(() => users.id)
      .notNull(),
    rating: real("rating").notNull(),
    comment: text("comment").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()
  },
  (table) => {
    return {
      ratingCheck: sql`CHECK (${table.rating} >= 0 AND ${table.rating} <= 5)`
    }
  }
)

export type User = typeof users.$inferSelect
export type Event = typeof events.$inferSelect
export type Review = typeof reviews.$inferSelect
