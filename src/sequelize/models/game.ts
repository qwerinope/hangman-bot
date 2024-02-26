import { sequelize } from '../setup.js'
import User from './user.js';
import Guess from './guess.js'
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManySetAssociationsMixin, Association, ForeignKey } from "sequelize";

class Game extends Model<InferAttributes<Game>, InferCreationAttributes<Game>> {
    declare gameId: CreationOptional<string>;
    declare channelId: string;
    declare secretWord: string;
    declare creatorId: ForeignKey<User['userId']>;
    declare incorrectGuessesRemaining: CreationOptional<number>;
    declare status: CreationOptional<"ongoing"|"won"|"lost">;
    declare gameOver: CreationOptional<boolean>;

    declare getGuesses: HasManyGetAssociationsMixin<Guess>; // Note the null assertions!
    declare addGuess: HasManyAddAssociationMixin<Guess, number>;
    declare addGuesses: HasManyAddAssociationsMixin<Guess, number>;
    declare setGuesses: HasManySetAssociationsMixin<Guess, number>;
    declare removeGuess: HasManyRemoveAssociationMixin<Guess, number>;
    declare removeGuesses: HasManyRemoveAssociationsMixin<Guess, number>;
    declare hasGuess: HasManyHasAssociationMixin<Guess, number>;
    declare hasGuesses: HasManyHasAssociationsMixin<Guess, number>;
    declare countGuesses: HasManyCountAssociationsMixin;
    declare createGuess: HasManyCreateAssociationMixin<Guess, 'guessId'>;  
    declare static associations: {
        guesses: Association<Game, Guess>
    }
}

Game.init(
    {
        gameId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        channelId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        secretWord: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        creatorId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        incorrectGuessesRemaining: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 10
        },
        status: {
            type: DataTypes.ENUM('ongoing', 'won', 'lost'),
            allowNull: false,
            defaultValue: 'ongoing'
        },
        gameOver: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },
    {
        sequelize,
        modelName: 'Game'
    }
)

Game.beforeSave(async (game: Game) => {
    if (game.status === 'won' || game.status === 'lost') {
      game.gameOver = true
    }
});
  
Game.afterCreate(async (game: Game) => {
    try {
        const user = await User.findOne({where: {userId:game.creatorId}})
        if (user) {
            await user.increment('gamesStarted', {by: 1})
        } else {
            await User.create({
                userId: game.creatorId
            })
        }
    } catch (error) {
        console.error(error)
    }
})

export default Game
