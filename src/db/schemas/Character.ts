import { relations } from 'drizzle-orm';
import { integer, jsonb, pgTable, primaryKey, text, uniqueIndex, uuid } from 'drizzle-orm/pg-core';
import type { Skill } from '../../utilities/helpers/charHelper';
import { QuestTable } from './Quest';
import { UserTable } from './User';

const CharacterBase = {
	id: uuid('id').primaryKey(),
	userId: text('userId').notNull(),
	fullName: text('fullName').notNull(),
	race: text('race'),
	gender: text('gender'),
	age: integer('age'),
	alignment: text('alignment'),
	size: text('size'),
	characteristics: jsonb('characteristics').notNull().$type<{
		personalityTraits: string;
		ideals: string;
		bonds: string;
		flaws: string;
	}>(),
	stats: jsonb('stats').notNull().$type<{
		str: number;
		dex: number;
		con: number;
		int: number;
		wis: number;
		cha: number;
	}>(),
	savingThrows: jsonb('savingThrows').notNull().$type<{
		str: boolean;
		dex: boolean;
		con: boolean;
		int: boolean;
		wis: boolean;
		cha: boolean;
	}>(),
	skills: jsonb('skills').notNull().$type<{
		acrobatics: Skill;
		animalHandling: Skill;
		arcana: Skill;
		athletics: Skill;
		deception: Skill;
		history: Skill;
		insight: Skill;
		intimidation: Skill;
		investigation: Skill;
		medicine: Skill;
		nature: Skill;
		perception: Skill;
		performance: Skill;
		persuasion: Skill;
		religion: Skill;
		sleightOfHand: Skill;
		stealth: Skill;
		survival: Skill;
	}>(),
	passivePerception: integer('passivePerception').notNull(),
	otherProficiencies: jsonb('otherProficiencies')
		.notNull()
		.$type<{ type: string; bonus: number }[]>(),
	armorClass: integer('armorClass').notNull(),
	initiative: integer('initiative').notNull(),
	speed: integer('speed').notNull(),
	hitPoints: integer('hitPoints').notNull(),
	currentHitPoints: integer('currentHitPoints').notNull(),
	hitDice: text('hitDice').notNull(),
	equipment: jsonb('equipment').notNull().$type<{ name: string; amount: number }[]>(),
	features: jsonb('features').notNull().$type<{ title: string; source: string; desc: string }[]>(),
	notes: text('notes').notNull(),
	additionalInfo: jsonb('additionalInfo').notNull().$type<{ title: string; data: string }[]>(),
	imageUrl: text('imageUrl')
};

export const CharacterTable = pgTable(
	'characters',
	{
		...CharacterBase,
		class: text('class').notNull(),
		background: text('background').notNull(),
		deathSaves: jsonb('deathSaves').notNull().$type<{
			successes: number;
			failures: number;
		}>(),
		attacks: jsonb('attacks').notNull().$type<
			{
				name: string;
				bonus: number;
				damage: string;
				damageType: string;
			}[]
		>(),
		spellcasting: jsonb('spellcasting').notNull().$type<{
			ability: string;
			saveDC: number;
			spellAttackBonus: number;
			spells: {
				name: string;
				level: number;
				school: string;
				castingTime: string;
				range: string;
				components: string;
				duration: string;
				description: string;
				damage: string;
				damageType: string;
			}[];
		}>()
	},
	(characters) => {
		return {
			uniqueIdx: uniqueIndex('unique_idx').on(characters.fullName, characters.userId)
		};
	}
);
export const CharacterTableRelations = relations(CharacterTable, ({ one }) => ({
	user: one(UserTable, { fields: [CharacterTable.userId], references: [UserTable.id] })
}));
export const NPCTable = pgTable(
	'npcs',
	{
		...CharacterBase,
		type: text('type').notNull(),
		occupation: text('occupation').notNull(),
		actions: jsonb('actions').notNull().$type<{ title: string; desc: string }[]>(),
		rpNotes: text('rpNotes').notNull()
	},
	(npcs) => {
		return {
			uniqueIdx: uniqueIndex('unique_idx').on(npcs.fullName, npcs.userId)
		};
	}
);
export const NPCTableRelations = relations(NPCTable, ({ one, many }) => ({
	user: one(UserTable, { fields: [NPCTable.userId], references: [UserTable.id] }),
	quests: many(NPCQuestsTable)
}));
export const NPCQuestsTable = pgTable(
	'npc_quests',
	{
		npcId: uuid('npcId')
			.notNull()
			.references(() => NPCTable.id),
		questId: uuid('questId')
			.notNull()
			.references(() => QuestTable.id)
	},
	(t) => ({
		pk: primaryKey(t.npcId, t.questId)
	})
);
export const NPCQuestsRelations = relations(NPCQuestsTable, ({ one }) => ({
	npc: one(NPCTable, {
		fields: [NPCQuestsTable.npcId],
		references: [NPCTable.id]
	}),
	quest: one(QuestTable, {
		fields: [NPCQuestsTable.questId],
		references: [QuestTable.id]
	})
}));
