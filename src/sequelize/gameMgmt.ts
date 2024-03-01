import { Game } from './models/index.js'
import { ChatInputCommandInteraction, CacheType } from 'discord.js'

export async function createGame(secretWord:string|any, interaction:ChatInputCommandInteraction<CacheType>) {
    await Game.create({
        creatorId: interaction.user.id,
        secretWord: secretWord.toLowerCase(),
        channelId:interaction.channelId
    })
}

export async function isGameActive(interaction:ChatInputCommandInteraction<CacheType>) {
    const channelId = interaction.channelId

    try {
        const activeGame = await Game.findOne({
            where: {
                channelId: channelId,
                gameOver: false
            }
        })
        return !!activeGame
    } catch (error) {
        console.error(error)
        return false
    }
}