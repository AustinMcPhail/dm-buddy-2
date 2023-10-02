import { relations } from 'drizzle-orm';
import { jsonb, pgTable, primaryKey, text, uniqueIndex, uuid } from 'drizzle-orm/pg-core';
import { QuestTable } from './Quest';
import { SettlementOrganizationTable } from './Settlement';

export const OrganizationTable = pgTable(
	'organizations',
	{
		id: uuid('id').primaryKey(),
		name: text('name').notNull(),
		description: text('description'),
		beleifs: text('beleifs'),
		goals: text('goals'),
		allies: text('allies'),
		enemies: text('enemies'),
		leader: text('leader'),
		type: text('type'),
		size: text('size'),
		headquarters: text('headquarters'),
		notableMembers: jsonb('authorityFigures').notNull().$type<{
			id: number;
			role: string;
		}>(),
		knownFor: text('knownFor'),
		imageURL: text('imageURL'),
		additionalInfo: jsonb('additionalInfo').notNull().$type<{ title: string; data: string }[]>(),
		notes: text('notes')
	},
	(sessions) => {
		return {
			uniqueIdx: uniqueIndex('unique_idx').on(sessions.name)
		};
	}
);
export const OrganizationTableRelations = relations(OrganizationTable, ({ many }) => ({
	settlements: many(SettlementOrganizationTable),
	quests: many(OrganizationQuestsTable)
}));
export const OrganizationQuestsTable = pgTable(
	'organization_quests',
	{
		organizationId: uuid('organizationtId')
			.notNull()
			.references(() => OrganizationTable.id),
		questId: uuid('questId')
			.notNull()
			.references(() => QuestTable.id)
	},
	(t) => ({
		pk: primaryKey(t.organizationId, t.questId)
	})
);
export const OrganizationQuestsRelations = relations(OrganizationQuestsTable, ({ one }) => ({
	organization: one(OrganizationTable, {
		fields: [OrganizationQuestsTable.organizationId],
		references: [OrganizationTable.id]
	}),
	quest: one(QuestTable, {
		fields: [OrganizationQuestsTable.questId],
		references: [QuestTable.id]
	})
}));
