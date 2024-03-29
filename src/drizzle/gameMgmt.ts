import { CacheType, ChatInputCommandInteraction } from 'discord.js';
import { eq, and } from 'drizzle-orm'
import { calculateLives } from './livesMgmt.js'
import db from './setup.js';
import { games } from './schema.js';
import * as messages from '../messages.js'

export async function createGame(secret: string, interaction: ChatInputCommandInteraction<CacheType>) {
	const user = interaction.user.id
	const channel = interaction.channelId
	const lives = calculateLives(secret)

	await db.insert(games).values({
		creatorId: user,
		secretWord: secret.toLowerCase(),
		channelId: channel,
		incorrectGuessesRemaining: lives
	});

	await messages.startingMessage(interaction, secret, lives)

}

export async function isGameActive(interaction: ChatInputCommandInteraction<CacheType>) {
	const exists = await db.query.games.findFirst({
		where: and(
			eq(games.channelId, interaction.channelId),
			eq(games.status, 'inprogress')
		)
	})
	if (exists === undefined) return false
	return true
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

export async function winGame(interaction: ChatInputCommandInteraction<CacheType>) {
	await db.update(games).set({
		status: 'won'
	}).where(
		and(
			eq(games.channelId, interaction.channelId),
			eq(games.status, 'inprogress')
		)
	)
	await messages.winMessage(interaction)
}

export async function loseGame(interaction: ChatInputCommandInteraction<CacheType>) {
	const data = await db.select({
		secret: games.secretWord
	}).from(games).where(
		and(
			eq(games.channelId, interaction.channelId),
			eq(games.status, 'inprogress')
		)
	)

	const { secret } = data[0]

	await db.update(games).set({
		status: 'lost'
	}).where(
		and(
			eq(games.channelId, interaction.channelId),
			eq(games.status, 'inprogress')
		)
	)

	await messages.loseMessage(interaction, secret)
}
