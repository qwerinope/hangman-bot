import { ChatInputCommandInteraction, CacheType } from 'discord.js'

// TODO: Make it use embeds

// TODO: When the game hasn't ended (wrongCharMessage, correctCharMessage, wrongWordMessage, startingMessage) include a visual of the string
// For example: secret = gaming; guessed chars = ['a', 'g'] visual = 'g a _ _ _ g'
// This is probably best done in a different file. I don't want it here. This file shouldn't communicate with the database directly.
// Ideas: function in guessMgmt.ts: getCorrectChars which returns a list of correctly guessed characters.
// function that creates spaces between characters in a string.
// function that replaces all characters not found in getCorrectChars(interaction) with underscores
// have createGame() in gameMgmt.ts call those functions and pass it to here.

export const startingMessage = async (interaction: ChatInputCommandInteraction<CacheType>, secret: string, lives: number) => {
    if (!interaction.channel) return // FU TYPESCRIPT!!!!
    await interaction.channel.send(`New Game! Secret word by: ${interaction.user.username}. Secret word has ${secret.length} characters. You have ${lives} attempts. Good luck!`)
}

export const winMessage = async (interaction: ChatInputCommandInteraction<CacheType>) => {
    const correctWordGuess = interaction.options.get('input')?.value!.toString()
    await interaction.reply("You win! The answer was: \'" + correctWordGuess + "\'!")
}

export const loseMessage = async (interaction: ChatInputCommandInteraction<CacheType>, secret: string) => {
    await interaction.reply("BOOO!! YOU SUUUCKK!! The secret word was: \'" + secret + "\'.")
}

export const wrongWordMessage = async (interaction: ChatInputCommandInteraction<CacheType>, lives: number) => {
    const wrongWordGuess = interaction.options.get('input')?.value!.toString()
    await interaction.reply("The word \'" + wrongWordGuess + "\' isn't it!\nYou have " + lives + " attempts remaining.")
}

export const correctCharMessage = async (interaction: ChatInputCommandInteraction<CacheType>, lives: number) => {
    const correctCharGuess = interaction.options.get('input')?.value!.toString()
    await interaction.reply("The character \'" + correctCharGuess + "\' is found in the word!\nYou have " + lives + " attempts remaining.")
}

export const wrongCharMessage = async (interaction: ChatInputCommandInteraction<CacheType>, lives: number) => {
    const wrongCharGuess = interaction.options.get('input')?.value!.toString()
    await interaction.reply("The character \'" + wrongCharGuess + "\' isn't found in the word!\nYou have " + lives + " attempts remaining.")
}
