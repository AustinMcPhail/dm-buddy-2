<script lang="ts">
	import { goto } from '$app/navigation';
	import PageLayout from '../../../components/common/PageLayout/PageLayout.svelte';
	import CampaignPage from '../../../components/common/wiki/pages/CampaignPage.svelte';
	import ToolbarIi from '../../../components/toolbarV2/ToolbarII.svelte';
	import {
		getCampaign,
		newCampaign,
		type Campaign
	} from '../../../utilities/helpers/campaignHelper';

	export let data;

	const FORM_NAME = 'campaign-form';

	let campaign = getCampaign(+data.id) ?? newCampaign();

	let editing = Number.isNaN(data.id) ?? false;
	let isNew = Number.isNaN(data.id) ?? false;

	const submit = (form: any) => {
		form.preventDefault();
		const values = Object.fromEntries(new FormData(form.target));

		campaign.name = values.name.toString();
		campaign.description = values.description.toString();
		campaign.imageUrl = values.imageUrl.toString();
		campaign.notes = values.notes.toString();
		campaign.additionalInfo = campaign.additionalInfo.filter(
			(a) => a.title !== '' || a.data !== ''
		);

		save(campaign).then((c) => {
			if (isNew) {
				goto(`/campaigns/${c.id}`);
			}
			editing = false;
		});
	};

	function save(campaign: Campaign) {
		return fetch('/api/campaigns', {
			method: 'POST',
			body: JSON.stringify(campaign)
		}).then((res) => res.json());
	}
</script>

<PageLayout windowTitle={`Campaign - ${isNew ? 'NEW' : campaign.name}`}>
	<ToolbarIi slot="sidebar" formName={FORM_NAME} bind:editing />
	{#if campaign !== undefined}
		<CampaignPage {editing} {campaign} {submit} name={FORM_NAME} />
	{/if}
</PageLayout>
