import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema.js';
import postgres from 'postgres';

const client = postgres('postgres://postgres:123password@db:5432/postgres');
const db = drizzle(client, {schema});

export default db;
