import db from './setup.js'
import { ChatInputCommandInteraction, CacheType } from 'discord.js'
import { user, games } from './schema.js'
import { eq, and } from 'drizzle-orm'

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

export async function isUserAllowed(interaction: ChatInputCommandInteraction<CacheType>) {
	const exists = await db.query.games.findFirst({
		where: and(
			eq(games.channelId, interaction.channelId),
			eq(games.status, 'inprogress'),
			eq(games.creatorId, interaction.user.id)
		)
	})
	if (exists === undefined) return true
	return false
}

