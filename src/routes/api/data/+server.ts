import { getSession } from '@auth/sveltekit';
import { json } from '@sveltejs/kit';
import { uuid } from 'uuidv4';
import type {
	NewCampaign,
	NewCharacter,
	NewNpc,
	NewQuest,
	NewSession,
	NewSettlement
} from '../../../db/db.js';
import { AuthConfig } from '../../../hooks.server.js';
import type {
	Campaign,
	Quest,
	Session
} from '../../../utilities/helpers/campaignHelper/campaignHelper.js';
import type { Character } from '../../../utilities/helpers/charHelper/charHelper.js';
import type { NPC } from '../../../utilities/helpers/npcHelper/npcHelper.js';
import type { Settlement } from '../../../utilities/helpers/settlementHelper/settlementHelper.js';

export async function POST({ request, cookies }) {
	const userSession = await getSession(request, AuthConfig);
	console.log({
		userSession
	});

	// convert all the local data into cloud data
	const { campaigns, npcs, characters, settlements, quests, sessions } = (await request.json()) as {
		campaigns: Campaign[];
		npcs: NPC[];
		characters: Character[];
		settlements: Settlement[];
		quests: Quest[];
		sessions: Session[];
	};

	const campaignIdMap = convertToUUIDMap(campaigns);
	const questIdMap = convertToUUIDMap(quests);
	const sessionIdMap = convertToUUIDMap(sessions);
	const npcIdMap = convertToUUIDMap(npcs);
	const characterIdMap = convertToUUIDMap(characters);
	const settlementIdMap = convertToUUIDMap(settlements);

	const newCampaigns: NewCampaign[] = campaigns.map((campaign) => {
		return {
			additionalInfo: campaign.additionalInfo,
			description: campaign.description,
			imageUrl: campaign.imageUrl,
			name: campaign.name,
			id: campaignIdMap[campaign.id],
			notes: campaign.notes,
			userId: ''
		};
	});
	const newQuests: NewQuest[] = quests.map((quest) => {
		const campaign = campaigns.find((c) => c.quests.includes(quest.id));
		if (!campaign) throw new Error('Quest does not belong to a campaign');
		return {
			id: questIdMap[quest.id],
			campaignId: campaignIdMap[campaign.id],
			name: quest.name,
			description: quest.description,
			imageUrl: quest.imageUrl,
			notes: quest.notes
		};
	});
	const newNpcs: NewNpc[] = npcs.map((npc) => {
		return {
			id: npcIdMap[npc.id],
			userId: '',
			additionalInfo: npc.additionalInfo,
			alignment: npc.alignment,
			armorClass: npc.armorClass,
			actions: npc.actions,
			characteristics: npc.characteristics,
			currentHitPoints: npc.currentHitPoints,
			equipment: npc.equipment,
			features: npc.features,
			hitDice: npc.hitDice,
			fullName: npc.fullName,
			hitPoints: npc.hitPoints,
			initiative: npc.initiative,
			notes: npc.notes,
			otherProficiencies: npc.otherProficiencies,
			passivePerception: npc.passivePerception,
			occupation: npc.occupation,
			rpNotes: npc.rpNotes,
			savingThrows: npc.savingThrows,
			skills: npc.skills,
			type: npc.type,
			age: npc.age,
			size: npc.size,
			speed: npc.speed,
			gender: npc.gender,
			race: npc.race,
			stats: npc.stats,
			imageUrl: npc.imageUrl
		};
	});

	const newCharacters: NewCharacter[] = characters.map((character) => {
		return {
			id: characterIdMap[character.id],
			userId: '',
			additionalInfo: character.additionalInfo,
			alignment: character.alignment,
			background: character.background,
			armorClass: character.armorClass,
			class: character.class,
			race: character.race,
			attacks: character.attacks,
			characteristics: character.characteristics,
			currentHitPoints: character.currentHitPoints,
			deathSaves: character.deathSaves,
			equipment: character.equipment,
			features: character.features,
			hitDice: character.hitDice,
			imageUrl: character.imageUrl,
			fullName: character.fullName,
			hitPoints: character.hitPoints,
			initiative: character.initiative,
			notes: character.notes,
			otherProficiencies: character.otherProficiencies,
			passivePerception: character.passivePerception,
			spellcasting: character.spellcasting,
			speed: character.speed,
			savingThrows: character.savingThrows,
			skills: character.skills,
			stats: character.stats,
			age: character.age,
			gender: character.gender,
			size: character.size
		};
	});

	const newSettlements: NewSettlement[] = settlements.map((settlement) => {
		return {
			additionalInfo: settlement.additionalInfo,
			description: settlement.description,
			alignment: settlement.alignment,
			authorityFigures: settlement.authorityFigures.map((authorityFigure) => {
				return {
					id: npcIdMap[authorityFigure.id],
					name: authorityFigure.name,
					role: authorityFigure.role,
					type: authorityFigure.type,
					isLinked: authorityFigure.isLinked
				};
			}),
			currency: settlement.currency,
			economy: settlement.economy,
			imageUrl: settlement.imageURL,
			government: settlement.government,
			languages: settlement.languages,
			name: settlement.name,
			notes: settlement.notes,
			population: `${settlement.population}`,
			religion: settlement.religion,
			size: settlement.size,
			type: settlement.type,
			id: settlementIdMap[settlement.id]
		};
	});

	const newSessions: NewSession[] = sessions.map((session) => {
		const campaign = campaigns.find((c) => c.sessions.includes(session.id));
		if (!campaign) throw new Error('Session does not belong to a campaign');
		return {
			id: sessionIdMap[session.id],
			campaignId: campaignIdMap[campaign.id],
			name: session.name,
			description: '',
			imageUrl: '',
			notes: session.notes
		};
	});

	console.log({
		newCampaigns,
		newNpcs,
		newCharacters,
		newSettlements,
		newQuests,
		newSessions
	});
	return json({
		newCampaigns,
		newNpcs,
		newCharacters,
		newSettlements,
		newQuests,
		newSessions
	});
}

function convertToUUIDMap(items: { id: number }[]) {
	return items.reduce((acc, item) => {
		if (item.id === undefined) throw new Error('Item id is undefined');
		acc[item.id] = uuid();
		return acc;
	}, {} as { [key: number]: string });
}
