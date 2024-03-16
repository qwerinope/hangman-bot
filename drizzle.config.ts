import type { Config } from 'drizzle-kit';

export default {
	driver: 'better-sqlite',
	schema: './src/drizzle/schema.ts',
	dbCredentials: {
		url: './db/data.sqlite'
	}

} satisfies Config;
