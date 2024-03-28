import db from './setup.js'
import { user } from './schema.js'
import { eq } from 'drizzle-orm'

export async function userExists(userid: string) {
	const exists = await db.query.user.findFirst({
		where: eq(user.userId, userid)
	})
	if (!exists) return false
	return true
}

export async function createUser(userid: string) {
	await db.insert(user).values({
		userId: userid
	})
}
