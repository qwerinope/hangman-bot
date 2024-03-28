import { ChatInputCommandInteraction, CacheType } from 'discord.js';
import { and, eq } from 'drizzle-orm'
import db from './setup.js'
import { guesses, games } from './schema.js'

export async function createGuess(interaction: ChatInputCommandInteraction<CacheType>, guess: string) {
	const results = await db.select({
		secretword: games.secretWord,
		gameId: games.gameId
	}).from(games).where(
		and(
			eq(games.channelId, interaction.channelId),
			eq(games.status, 'inprogress')
		)
	)

	const { secretword, gameId } = results[0]

	let correct = false

	if (guess.length === 1) {
		// Guess a character
		if (secretword.includes(guess)) {
			correct = true
			await interaction.reply('Correct! The character ' + guess + ' was in the secret!')
		} else {
			await interaction.reply('Wrong! \'' + guess + '\' is totally wrong you fucking idiot!')
		}

		db.insert(guesses).values({
			gameId: gameId,
			userId: interaction.user.id,
			guessedChar: guess,
			isCorrect: correct
		})
	} else {
		// Guess the secret word
		if (secretword === guess) {
			correct = true
			await interaction.reply('Correct! The secret was \'' + guess + '\'!')
		} else {
			await interaction.reply('Wrong! \'' + guess + '\' is totally wrong you fucking idiot!')
		}
		db.insert(guesses).values({
			gameId: gameId,
			userId: interaction.user.id,
			guessedWord: guess,
			isCorrect: correct
		})
	}
}
