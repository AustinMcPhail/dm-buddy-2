import { relations } from 'drizzle-orm';
import { pgTable, text, uniqueIndex, uuid } from 'drizzle-orm/pg-core';
import { CampaignTable } from './Campaign';
import { SettlementQuestsTable } from './Settlement';

export const QuestTable = pgTable(
	'quests',
	{
		id: uuid('id').primaryKey(),
		campaignId: uuid('campaignId').notNull(),
		name: text('name').notNull(),
		description: text('description'),
		imageUrl: text('imageUrl'),
		notes: text('notes')
	},
	(quests) => {
		return {
			uniqueIdx: uniqueIndex('unique_idx').on(quests.name)
		};
	}
);
export const QuestTableRelations = relations(QuestTable, ({ one, many }) => ({
	campaign: one(CampaignTable, { fields: [QuestTable.campaignId], references: [CampaignTable.id] }),
	settlements: many(SettlementQuestsTable),
	organizations: many(SettlementQuestsTable)
}));
