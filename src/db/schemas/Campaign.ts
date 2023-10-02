import { relations } from 'drizzle-orm';
import { jsonb, pgTable, text, uniqueIndex, uuid } from 'drizzle-orm/pg-core';
import { QuestTable } from './Quest';
import { SessionTable } from './Session';
import { UserTable } from './User';

export const CampaignTable = pgTable(
	'campaigns',
	{
		id: uuid('id').primaryKey(),
		userId: text('userId').notNull(),
		name: text('name').notNull(),
		description: text('description'),
		imageUrl: text('imageUrl'),
		notes: text('notes'),
		additionalInfo: jsonb('additionalInfo').notNull().$type<{ title: string; data: string }[]>()
	},
	(campaigns) => {
		return {
			uniqueIdx: uniqueIndex('unique_idx').on(campaigns.name)
		};
	}
);
export const CampaignTableRelations = relations(CampaignTable, ({ many, one }) => ({
	quests: many(QuestTable),
	sessions: many(SessionTable),
	user: one(UserTable, { fields: [CampaignTable.userId], references: [UserTable.id] })
}));
