DROP TABLE "favorite_count";--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "favorite_count" integer DEFAULT 0 NOT NULL;