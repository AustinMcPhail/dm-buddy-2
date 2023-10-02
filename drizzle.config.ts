import * as dotenv from 'dotenv';
import type { Config } from 'drizzle-kit';
dotenv.config();

export default {
	schema: './src/db/schema.ts',
	out: './drizzle',
	dbCredentials: {
		connectionString: process.env.POSTGRES_URL_NON_POOLING || ''
	},
	driver: 'pg'
} satisfies Config;
