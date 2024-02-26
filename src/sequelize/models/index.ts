import Game from "./game.js"
import Guess from "./guess.js"
import User from "./user.js"

User.hasMany(Game, {
    foreignKey: 'creatorId'
})

User.hasMany(Guess, {
    foreignKey: 'userId'
})

Game.hasMany(Guess, {
    foreignKey: 'gameId'
})

export {Game, Guess, User}
