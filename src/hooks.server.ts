import { GITHUB_ID, GITHUB_SECRET } from '$env/static/private';
import GitHub from '@auth/core/providers/github';
import { SvelteKitAuth, type SvelteKitAuthConfig } from '@auth/sveltekit';
import { error, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const apiAuthorization: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/api')) {
		const session = await event.locals.getSession();
		if (!session) {
			throw error(403, 'You must be logged in.');
		}
	}
	return resolve(event);
};

const GitHubProvider = GitHub({
	clientId: GITHUB_ID,
	clientSecret: GITHUB_SECRET,
	authorization: { params: { scope: 'openid' } },
	profile(profile) {
		return {
			id: profile.id.toString(),
			name: profile.name,
			email: profile.email,
			image: profile.avatar_url,
			provider: profile.provider
		};
	}
});

export const AuthConfig: SvelteKitAuthConfig = {
	providers: [GitHubProvider],
	callbacks: {
		session: ({ session, token }) => {
			return {
				...session,
				user: {
					...session.user,
					id: token.sub
				}
			};
		}
	}
};
export const handle = sequence(SvelteKitAuth(AuthConfig), apiAuthorization);
