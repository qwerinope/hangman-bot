import { ChatInputCommandInteraction, CacheType, EmbedBuilder } from 'discord.js'

const visualizerstring = ((visualizer: string) => `\n\`${visualizer}\``)

export const startingMessage = async (interaction: ChatInputCommandInteraction<CacheType>, secret: string, lives: number, visualizer: string) => {
    if (!interaction.channel) return // FU TYPESCRIPT!!!!
    const embed = new EmbedBuilder()
        .setTitle("New game!")
        .setColor(0x0000ff)
        .setDescription(`Secret word selected by: ${interaction.user.username}.\nSecret word has ${secret.length} characters.\nGood luck!\nGuess for the word or characters with the \`/guess\` command.${visualizerstring(visualizer)}`)
        .addFields({ name: "Attempts remaining", value: `You have ${lives} attemps.` })
    await interaction.channel.send({ embeds: [embed] })
}

export const winMessage = async (interaction: ChatInputCommandInteraction<CacheType>) => {
    const correctWordGuess = interaction.options.get('input')?.value!.toString()
    const embed = new EmbedBuilder()
        .setTitle("You win!")
        .setColor(0x00ff00)
        .setDescription(`You win! The answer was:\n\`${correctWordGuess}\``)
    await interaction.reply({ embeds: [embed] })
}

export const loseMessage = async (interaction: ChatInputCommandInteraction<CacheType>, secret: string) => {
    const embed = new EmbedBuilder()
        .setTitle("You lose!")
        .setColor(0xff0000)
        .setDescription(`You lose! The answer was:${visualizerstring(secret)}`)
    await interaction.reply({ embeds: [embed] })
}

export const wrongWordMessage = async (interaction: ChatInputCommandInteraction<CacheType>, lives: number, visualizer: string) => {
    const wrongWordGuess = interaction.options.get('input')?.value!.toString()
    const embed = new EmbedBuilder()
        .setTitle("Wrong! Try again")
        .setColor(0xff0000)
        .setDescription(`The word: \`${wrongWordGuess}\` is wrong!. Try again.${visualizerstring(visualizer)}`)
        .addFields({ name: "Attempts remaining", value: `You have ${lives} attemps left.` })
    await interaction.reply({ embeds: [embed] })
}

export const correctCharMessage = async (interaction: ChatInputCommandInteraction<CacheType>, lives: number, visualizer: string) => {
    const correctCharGuess = interaction.options.get('input')?.value!.toString()
    const embed = new EmbedBuilder()
        .setTitle("Correct!")
        .setColor(0x00ff00)
        .setDescription(`The character: \`${correctCharGuess}\` is correct!.${visualizerstring(visualizer)}`)
        .addFields({ name: "Attempts remaining", value: `You have ${lives} attemps left.` })
    await interaction.reply({ embeds: [embed] })
}

export const wrongCharMessage = async (interaction: ChatInputCommandInteraction<CacheType>, lives: number, visualizer: string) => {
    const wrongCharGuess = interaction.options.get('input')?.value!.toString()
    const embed = new EmbedBuilder()
        .setTitle("Wrong! Try again")
        .setColor(0xff0000)
        .setDescription(`The character: \`${wrongCharGuess}\` is wrong! Try again. ${visualizerstring(visualizer)}`)
        .addFields({ name: "Attempts remaining", value: `You have ${lives} attemps left.` })
    await interaction.reply({ embeds: [embed] })
}
