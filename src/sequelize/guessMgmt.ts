import { Guess, Game } from './models/index.js'

export async function createGuess(guess:string, channelId:string, userId:string) {
    try {
        const game = await Game.findOne({
            where: {
                channelId: channelId,
                gameOver: false
            }
        })

        if (!game) return 'No active game exists.'
        // If the guess is only for a single character
        if (guess.length === 1) {
            game.createGuess()
        }
        
        return true
    } catch (error) {
        return false
    }
}