import { CacheType, ChatInputCommandInteraction } from 'discord.js';
import db from './setup.js';
import { games } from './schema.js';

export async function createGame(secret: string, interaction: ChatInputCommandInteraction<CacheType>) {
	const user = interaction.user.id
	const channel = interaction.channelId
	try {
		await db.insert(games).values({
			creatorId: user,
			secretWord: secret.toLowerCase(),
			channelId: channel,
		});
		await interaction.editReply('i\'m such a good programmer')
	} catch (error) {
		await interaction.editReply('FUCK')
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
