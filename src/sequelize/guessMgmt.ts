import { Guess, Game } from './models/index.js'

export async function createGuess(guess:string, channelId:string, userId:string) {
    try {
        const game = await Game.findOne({
            where: {
                channelId: channelId,
                gameOver: false
            }
        })

        if (!game) return {success: false, data: "There is no active game in this channel."}
        // If the guess is only for a single character
        if (guess.length === 1) {
            const isCorrect = game.secretWord.includes(guess.toLowerCase())

            await game.createGuess({
                userId: userId,
                guessedChar: guess.toLowerCase(),
                isCorrect: isCorrect
            }).then(()=>{
                return {success: true, data: {guess, isCorrect}}
            })
        } else {
            const isCorrect = (game.secretWord === guess.toLowerCase())

            await game.createGuess({
                userId: userId,
                guessedWord: guess.toLowerCase(),
                isCorrect: isCorrect
            }).then(()=>{
                return {success: true, data: {guess, isCorrect}}
            })

        }
    } catch (error) {
        return {success: false, data: "Fuck"}
    }
}