import { CacheType, ChatInputCommandInteraction } from 'discord.js';
import { eq, and } from 'drizzle-orm'
import { calculateLives } from './livesMgmt.js'
import db from './setup.js';
import { games } from './schema.js';
import * as messages from '../messages.js'

export async function createGame(secret: string, interaction: ChatInputCommandInteraction<CacheType>) {
	const user = interaction.user.id
	const channel = interaction.channelId
	try {
		await db.insert(games).values({
			creatorId: user,
			secretWord: secret.toLowerCase(),
			channelId: channel,
			incorrectGuessesRemaining: calculateLives(secret)
		});
	} catch (error) {
		console.error(error)
	}
};

export async function isGameActive(interaction: ChatInputCommandInteraction<CacheType>) {
	const exists = await db.query.games.findFirst({
		where: (games, { eq, and }) => and(
			eq(games.channelId, interaction.channelId),
			eq(games.status, 'inprogress')
		)
	})
	if (exists === undefined) return false
	return true
}

export async function isUserAllowed(interaction: ChatInputCommandInteraction<CacheType>) {
	const exists = await db.query.games.findFirst({
		where: (games, { eq, and }) => and(
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
	await db.update(games).set({
		status: 'lost'
	}).where(
		and(
			eq(games.channelId, interaction.channelId),
			eq(games.status, 'inprogress')
		)
	)
	// TODO: Make it pass the secret instead of 'lol'
	await messages.loseMessage(interaction, 'lol')
}
