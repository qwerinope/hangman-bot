import db from './setup.js'
import { games, guesses } from './schema.js'
import { eq, and } from 'drizzle-orm'
import { ChatInputCommandInteraction, CacheType } from 'discord.js'

export async function createPreview(interaction: ChatInputCommandInteraction<CacheType>) {
	const gameIdQuery = await db.select({
		gameId: games.gameId,
		secret: games.secretWord
	}).from(games).where(
		and(
			eq(games.channelId, interaction.channelId),
			eq(games.status, 'inprogress')
		)
	)

	const { gameId, secret } = gameIdQuery[0]

	const characterQuery = await db.query.guesses.findMany({
		where: and(
			eq(guesses.gameId, gameId),
			eq(guesses.isCorrect, true),
			eq(guesses.guessType, 'char')
		),
		columns: {
			guess: true
		}
	})

	const chars = characterQuery.map(item => item.guess).join("")

	const finalString = secret.split("").map(char => chars.includes(char) ? char : '_').join(" ")

	return finalString
}
