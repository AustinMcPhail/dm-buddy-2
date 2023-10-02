CREATE TABLE IF NOT EXISTS "organization_quests" (
	"organizationtId" uuid NOT NULL,
	"questId" uuid NOT NULL,
	CONSTRAINT organization_quests_organizationtId_questId PRIMARY KEY("organizationtId","questId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "settlement_npcs" (
	"settlementId" uuid NOT NULL,
	"npcId" uuid NOT NULL,
	CONSTRAINT settlement_npcs_settlementId_npcId PRIMARY KEY("settlementId","npcId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "settlement_organizations" (
	"settlementId" uuid NOT NULL,
	"organizationId" uuid NOT NULL,
	CONSTRAINT settlement_organizations_settlementId_organizationId PRIMARY KEY("settlementId","organizationId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "settlement_quests" (
	"settlementId" uuid NOT NULL,
	"questId" uuid NOT NULL,
	CONSTRAINT settlement_quests_settlementId_questId PRIMARY KEY("settlementId","questId")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization_quests" ADD CONSTRAINT "organization_quests_organizationtId_organizations_id_fk" FOREIGN KEY ("organizationtId") REFERENCES "organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization_quests" ADD CONSTRAINT "organization_quests_questId_quests_id_fk" FOREIGN KEY ("questId") REFERENCES "quests"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "settlement_npcs" ADD CONSTRAINT "settlement_npcs_settlementId_settlements_id_fk" FOREIGN KEY ("settlementId") REFERENCES "settlements"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "settlement_npcs" ADD CONSTRAINT "settlement_npcs_npcId_quests_id_fk" FOREIGN KEY ("npcId") REFERENCES "quests"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "settlement_organizations" ADD CONSTRAINT "settlement_organizations_settlementId_settlements_id_fk" FOREIGN KEY ("settlementId") REFERENCES "settlements"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "settlement_organizations" ADD CONSTRAINT "settlement_organizations_organizationId_organizations_id_fk" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "settlement_quests" ADD CONSTRAINT "settlement_quests_settlementId_settlements_id_fk" FOREIGN KEY ("settlementId") REFERENCES "settlements"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "settlement_quests" ADD CONSTRAINT "settlement_quests_questId_quests_id_fk" FOREIGN KEY ("questId") REFERENCES "quests"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
