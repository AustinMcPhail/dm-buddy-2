import { relations } from 'drizzle-orm';
import { pgTable, text, uniqueIndex, uuid } from 'drizzle-orm/pg-core';
import { CampaignTable } from './Campaign';

export const SessionTable = pgTable(
	'sessions',
	{
		id: uuid('id').primaryKey(),
		campaignId: uuid('campaignId').notNull(),
		name: text('name').notNull(),
		description: text('description'),
		imageUrl: text('imageUrl'),
		notes: text('notes')
	},
	(sessions) => {
		return {
			uniqueIdx: uniqueIndex('unique_idx').on(sessions.name)
		};
	}
);
export const SessionTableRelations = relations(SessionTable, ({ one }) => ({
	campaign: one(CampaignTable, {
		fields: [SessionTable.campaignId],
		references: [CampaignTable.id]
	})
}));
