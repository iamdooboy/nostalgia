ALTER TABLE "favorite_count" RENAME COLUMN "event_id" TO "review_id";--> statement-breakpoint
ALTER TABLE "favorites" RENAME COLUMN "event_id" TO "review_id";--> statement-breakpoint
DROP INDEX IF EXISTS "eventIdUniqueIndex";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "eventIdUniqueIndex" ON "favorite_count" USING btree ("review_id");