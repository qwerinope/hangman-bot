import { ChatInputCommandInteraction, CacheType } from 'discord.js';
import { and, eq } from 'drizzle-orm'
import db from './setup.js'
import { winGame } from './gameMgmt.js'
import { correctCharMessage } from '../messages.js'
import { guesses, games } from './schema.js'
import { loseLife } from './livesMgmt.js'

export async function createGuess(interaction: ChatInputCommandInteraction<CacheType>, guess: string) {
	const results = await db.select({
		secretword: games.secretWord,
		gameId: games.gameId,
		lives: games.incorrectGuessesRemaining
	}).from(games).where(
		and(
			eq(games.channelId, interaction.channelId),
			eq(games.status, 'inprogress')
		)
	)

	const { secretword, gameId, lives } = results[0]

	const correct = secretword.includes(guess) || secretword === guess

	if (correct && guess.length === 1) {
		await correctCharMessage(interaction, lives)
	} else if (correct) {
		await winGame(interaction)
	} else {
		await loseLife(interaction, guess.length === 1)
	}

	await db.insert(guesses).values({
		gameId: gameId,
		userId: interaction.user.id,
		guess: guess,
		guessType: guess.length === 1 ? 'char' : 'word',
		isCorrect: correct
	})
}
