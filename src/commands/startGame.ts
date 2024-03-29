import { CacheType, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { createGame, isGameActive } from '../drizzle/gameMgmt.js'

export const command = new SlashCommandBuilder()
    .setName('hangman')
    .setDescription('Play hangman')
    .addStringOption(option =>
        option.setName('input')
            .setDescription('The word the others will need to guess')
            .setRequired(true)
    )

export async function execute(interaction: ChatInputCommandInteraction<CacheType>) {
    const secretword = interaction.options.get('input')?.value!.toString().toLowerCase()

    // The following code is fucking useless but typescript need it
    if (!secretword) return

    if (await isGameActive(interaction)) {
        await interaction.reply("Can't have more than one game active in a single channel.")
        return
    }
    await interaction.reply({ ephemeral: true, content: 'Starting game. Secret word is: ' + secretword + '. Don\'t share it!' })

    if (!interaction.channel) return // FUCK. THIS. AGAIN!!

    try {
        await createGame(secretword, interaction)
    } catch (error) {
        await interaction.editReply('Failed to start hangman.')
        console.error(error)
    }

}
