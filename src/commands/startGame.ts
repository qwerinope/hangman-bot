import { CacheType, ChatInputCommandInteraction, Message, SlashCommandBuilder } from "discord.js";
import { createGame, isGameActive } from '../sequelize/gameMgmt.js'

export const command = new SlashCommandBuilder()
    .setName('hangman')
    .setDescription('Play hangman')
    .addStringOption(option =>
        option.setName('input')
            .setDescription('The word the others will need to guess')
            .setRequired(true)
    )

export async function execute(interaction:ChatInputCommandInteraction<CacheType>) {
    const secretword = interaction.options.get('input')?.value!.toString().toLowerCase()
    if (await isGameActive(interaction)) {
        await interaction.reply("Can't have more than one game active in a single channel.")
    }
    await interaction.reply('Starting game. Word chosen by: '+interaction.user.username)

    try {
        await createGame(secretword, interaction)
    } catch (error) {
        interaction.editReply('Failed to start hangman.')
        console.error(error)
    }
    
}