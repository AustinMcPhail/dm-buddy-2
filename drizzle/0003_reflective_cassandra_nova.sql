CREATE TABLE IF NOT EXISTS "organizations" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"beleifs" text,
	"goals" text,
	"allies" text,
	"enemies" text,
	"leader" text,
	"type" text,
	"size" text,
	"headquarters" text,
	"authorityFigures" jsonb NOT NULL,
	"knownFor" text,
	"imageURL" text,
	"additionalInfo" jsonb NOT NULL,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "settlements" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"population" text,
	"size" text,
	"type" text,
	"alignment" text,
	"description" text,
	"government" text,
	"authorityFigures" jsonb NOT NULL,
	"languages" text,
	"religion" text,
	"currency" text,
	"economy" text,
	"imageUrl" text,
	"additionalInfo" jsonb NOT NULL,
	"notes" text
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_idx" ON "organizations" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_idx" ON "settlements" ("name");