import { sql } from "drizzle-orm"
import {
  integer,
  pgSchema,
  pgTable,
  real,
  serial,
  text,
  timestamp,
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
      .references(() => users.id)
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

export type Event = typeof events.$inferSelect
export type Review = typeof reviews.$inferSelect
