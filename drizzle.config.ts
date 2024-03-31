import type { Config } from 'drizzle-kit';

export default {
	driver: 'pg',
	out: 'drizzle',
	schema: './src/drizzle/schema.ts',
	dbCredentials: {
		connectionString: 'postgres://postgres:123password@db:5432/postgres'
	}
} satisfies Config;
