import { getUsers } from '../db/db';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const example = await getUsers();
	return {
		session: await event.locals.getSession()
	};
};
