import { relations } from 'drizzle-orm';
import { jsonb, pgTable, primaryKey, text, uniqueIndex, uuid } from 'drizzle-orm/pg-core';
import { OrganizationTable } from './Organization';
import { QuestTable } from './Quest';

export const SettlementTable = pgTable(
	'settlements',
	{
		id: uuid('id').primaryKey(),
		name: text('name').notNull(),
		population: text('population'),
		size: text('size'),
		type: text('type'),
		alignment: text('alignment'),
		description: text('description'),
		government: text('government'),
		authorityFigures: jsonb('authorityFigures').notNull().$type<
			{
				id: string;
				role: string;
				type: 'npc' | 'character';
				isLinked: boolean;
				name?: string;
			}[]
		>(),
		languages: text('languages'),
		religion: text('religion'),
		currency: text('currency'),
		economy: text('economy'),
		imageUrl: text('imageUrl'),
		additionalInfo: jsonb('additionalInfo').notNull().$type<{ title: string; data: string }[]>(),
		notes: text('notes')
	},
	(sessions) => {
		return {
			uniqueIdx: uniqueIndex('unique_idx').on(sessions.name)
		};
	}
);
export const SettlementTableRelations = relations(SettlementTable, ({ many }) => ({
	organizations: many(SettlementOrganizationTable),
	quests: many(SettlementQuestsTable),
	npcs: many(SettlementNpcsTable)
}));

export const SettlementOrganizationTable = pgTable(
	'settlement_organizations',
	{
		settlementId: uuid('settlementId')
			.notNull()
			.references(() => SettlementTable.id),
		organizationId: uuid('organizationId')
			.notNull()
			.references(() => OrganizationTable.id)
	},
	(t) => ({
		pk: primaryKey(t.settlementId, t.organizationId)
	})
);
export const SettlementOrganizationsRelations = relations(
	SettlementOrganizationTable,
	({ one }) => ({
		settlement: one(SettlementTable, {
			fields: [SettlementOrganizationTable.settlementId],
			references: [SettlementTable.id]
		}),
		organization: one(OrganizationTable, {
			fields: [SettlementOrganizationTable.organizationId],
			references: [OrganizationTable.id]
		})
	})
);
export const SettlementQuestsTable = pgTable(
	'settlement_quests',
	{
		settlementId: uuid('settlementId')
			.notNull()
			.references(() => SettlementTable.id),
		questId: uuid('questId')
			.notNull()
			.references(() => QuestTable.id)
	},
	(t) => ({
		pk: primaryKey(t.settlementId, t.questId)
	})
);
export const SettlementQuestsRelations = relations(SettlementQuestsTable, ({ one }) => ({
	settlement: one(SettlementTable, {
		fields: [SettlementQuestsTable.settlementId],
		references: [SettlementTable.id]
	}),
	quest: one(QuestTable, {
		fields: [SettlementQuestsTable.questId],
		references: [QuestTable.id]
	})
}));
export const SettlementNpcsTable = pgTable(
	'settlement_npcs',
	{
		settlementId: uuid('settlementId')
			.notNull()
			.references(() => SettlementTable.id),
		npcId: uuid('npcId')
			.notNull()
			.references(() => QuestTable.id)
	},
	(t) => ({
		pk: primaryKey(t.settlementId, t.npcId)
	})
);
export const SettlementNpcsRelations = relations(SettlementNpcsTable, ({ one }) => ({
	settlement: one(SettlementTable, {
		fields: [SettlementNpcsTable.settlementId],
		references: [SettlementTable.id]
	}),
	npc: one(QuestTable, {
		fields: [SettlementNpcsTable.npcId],
		references: [QuestTable.id]
	})
}));
