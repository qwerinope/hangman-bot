import { CacheType, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { createGuess } from '../drizzle/guessMgmt.js'
import { isGameActive, isUserAllowed } from '../drizzle/gameMgmt.js'

export const command = new SlashCommandBuilder()
    .setName('guess')
    .setDescription('Guess for the current game.')
    .addStringOption(option =>
        option.setName('input')
            .setDescription('Either a word or a letter.')
            .setRequired(true)
    )

export async function execute(interaction: ChatInputCommandInteraction<CacheType>) {
    const guess = interaction.options.get('input')?.value!.toString().toLowerCase()

    if (!await isGameActive(interaction)) {
        await interaction.reply("There is no active game. Start one with /hangman")
        return
    }

    if (!await isUserAllowed(interaction)) {
        await interaction.reply("You made this game, so you aren't allowed to play")
        return
    }

    if (!guess) return // SO FUCKING STUPID IT'S MARKED AS REQUIRED ABOVE FUCKING TYPESCRIPT

    await createGuess(interaction, guess)
}
