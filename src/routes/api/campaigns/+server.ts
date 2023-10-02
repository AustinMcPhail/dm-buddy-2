import { json } from '@sveltejs/kit';
import { createCampaign } from '../../../db/db.js';
import type { Campaign } from '../../../utilities/helpers/campaignHelper/campaignHelper.js';

export async function POST({ request, cookies }) {
	const campaign: Campaign = await request.json();
	const result = await createCampaign({
		userId: '',
		name: campaign.name,
		description: campaign.description,
		imageUrl: campaign.imageUrl,
		notes: campaign.notes,
		additionalInfo: campaign.additionalInfo
	});
	return json(result);
}
