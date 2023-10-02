import { relations } from 'drizzle-orm';
import { pgTable, serial, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';
import { CharacterTable } from './Character';

export const UserTable = pgTable(
	'users',
	{
		id: serial('id').primaryKey(),
		createdAt: timestamp('createdAt').defaultNow().notNull()
	},
	(users) => {
		return {
			uniqueIdx: uniqueIndex('unique_idx').on(users.id)
		};
	}
);
export const UserTableRelations = relations(UserTable, ({ many }) => ({
	characters: many(CharacterTable)
}));
