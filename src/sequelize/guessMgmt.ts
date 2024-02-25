import { Guess, Game } from './models/index.js'

export async function createGuess(guess:string, channelId:string, userId:string) {
    try {
        const game = Game.findOne({
            where: {
                channelId: channelId,
                gameOver: false
            }
        })

        if (!game) return 'No active game exists.'
        // If the guess is only for a single character
        if (guess.length === 1) {
            
        }

        const newguess =await Guess.create({
            userId: userId,
            isCorrect: true
        })

        // Game.addGuess(newguess)
        
        return true
    } catch (error) {
        return false
    }
}