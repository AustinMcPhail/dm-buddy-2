CREATE TABLE IF NOT EXISTS "campaigns" (
	"id" uuid PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"imageUrl" text,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "characters" (
	"id" uuid PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"fullName" text NOT NULL,
	"race" text,
	"gender" text,
	"age" integer,
	"alignment" text,
	"size" text,
	"characteristics" jsonb NOT NULL,
	"stats" jsonb NOT NULL,
	"savingThrows" jsonb NOT NULL,
	"skills" jsonb NOT NULL,
	"passivePerception" integer NOT NULL,
	"otherProficiencies" jsonb NOT NULL,
	"armorClass" integer NOT NULL,
	"initiative" integer NOT NULL,
	"speed" integer NOT NULL,
	"hitPoints" integer NOT NULL,
	"currentHitPoints" integer NOT NULL,
	"hitDice" text NOT NULL,
	"equipment" jsonb NOT NULL,
	"features" jsonb NOT NULL,
	"notes" text NOT NULL,
	"additionalInfo" jsonb NOT NULL,
	"imageUrl" text,
	"class" text NOT NULL,
	"background" text NOT NULL,
	"deathSaves" jsonb NOT NULL,
	"attacks" jsonb NOT NULL,
	"spellcasting" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "npcs" (
	"id" uuid PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"fullName" text NOT NULL,
	"race" text,
	"gender" text,
	"age" integer,
	"alignment" text,
	"size" text,
	"characteristics" jsonb NOT NULL,
	"stats" jsonb NOT NULL,
	"savingThrows" jsonb NOT NULL,
	"skills" jsonb NOT NULL,
	"passivePerception" integer NOT NULL,
	"otherProficiencies" jsonb NOT NULL,
	"armorClass" integer NOT NULL,
	"initiative" integer NOT NULL,
	"speed" integer NOT NULL,
	"hitPoints" integer NOT NULL,
	"currentHitPoints" integer NOT NULL,
	"hitDice" text NOT NULL,
	"equipment" jsonb NOT NULL,
	"features" jsonb NOT NULL,
	"notes" text NOT NULL,
	"additionalInfo" jsonb NOT NULL,
	"imageUrl" text,
	"type" text NOT NULL,
	"occupation" text NOT NULL,
	"actions" jsonb NOT NULL,
	"rpNotes" text NOT NULL,
	"quests" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quests" (
	"id" uuid PRIMARY KEY NOT NULL,
	"campaignId" uuid NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"imageUrl" text,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"campaignId" uuid NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"imageUrl" text,
	"notes" text
);
--> statement-breakpoint
DROP INDEX IF EXISTS "unique_idx";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_idx" ON "campaigns" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_idx" ON "characters" ("fullName","userId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_idx" ON "npcs" ("fullName","userId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_idx" ON "quests" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_idx" ON "sessions" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_idx" ON "users" ("id");--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "name";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "email";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "image";