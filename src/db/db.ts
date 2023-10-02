import { sql } from '@vercel/postgres';
import * as dotenv from 'dotenv';
import { eq, type InferModel } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { uuid } from 'uuidv4';
import type { CharacterTable, NPCTable, QuestTable, SessionTable } from './schema';
import { CampaignTable } from './schemas/Campaign';
import type { OrganizationTable } from './schemas/Organization';
import type { SettlementTable } from './schemas/Settlement';
import { UserTable } from './schemas/User';
dotenv.config();

// Use this object to send drizzle queries to your DB
export const db = drizzle(sql);
export const getUsers = async () => {
	return await db.select().from(UserTable);
};
export const getCampaigns = async () => {
	return await db.select().from(CampaignTable);
};
export const createCampaign = async (create: Omit<NewCampaign, 'id'>) => {
	return await db
		.insert(CampaignTable)
		.values({
			id: uuid(),
			userId: '',
			name: create.name,
			description: create.description,
			imageUrl: create.imageUrl,
			notes: create.notes,
			additionalInfo: create.additionalInfo ?? []
		})
		.returning();
};
export const deleteCampaign = async (campaignId: string) => {
	return await db.delete(CampaignTable).where(eq(CampaignTable.name, campaignId));
};

export const createNpc = async (create: Omit<NewNpc, 'id'>) => {
	return;
};
export const deleteNpc = async (npcId: string) => {
	return;
};
export const getNpcs = async () => {
	return;
};
export const getNpc = async (npcId: string) => {
	return;
};

export type NewCampaign = InferModel<typeof CampaignTable, 'insert'>;
export type NewNpc = InferModel<typeof NPCTable, 'insert'>;
export type NewQuest = InferModel<typeof QuestTable, 'insert'>;
export type NewSession = InferModel<typeof SessionTable, 'insert'>;
export type NewSettlement = InferModel<typeof SettlementTable, 'insert'>;
export type NewOrganization = InferModel<typeof OrganizationTable, 'insert'>;
export type NewCharacter = InferModel<typeof CharacterTable, 'insert'>;
