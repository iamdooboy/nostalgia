CREATE TABLE IF NOT EXISTS "favorite_count" (
	"id" text PRIMARY KEY NOT NULL,
	"event_id" integer NOT NULL,
	"count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "favorites" ADD COLUMN "id" text PRIMARY KEY NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "eventIdUniqueIndex" ON "favorite_count" USING btree ("event_id");