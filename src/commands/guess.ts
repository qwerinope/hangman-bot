import { CacheType, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { createGuess } from '../sequelize/guessMgmt.js'

export const command = new SlashCommandBuilder()
    .setName('guess')
    .setDescription('Guess for the current game.')
    .addStringOption(option =>
        option.setName('input')
            .setDescription('Either a word or a letter.')
            .setRequired(true)
    )

export async function execute(interaction:ChatInputCommandInteraction<CacheType>) {
    const guess = interaction.options.get('input')?.value!.toString().toLowerCase()
    // const 
}