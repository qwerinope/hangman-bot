import { sequelize } from '../setup.js'
import Game from './game.js';
import User from './user.js';
import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

class Guess extends Model<InferAttributes<Guess>, InferCreationAttributes<Guess>> {
    userId!: ForeignKey<User['userId']>;
    guessId!: string;
    guessedChar!: CreationOptional<string>;
    guessedWord!: CreationOptional<string>;
    isCorrect!: CreationOptional<boolean>;
    gameId!: ForeignKey<Game['gameId']>
}

Guess.init(
    {
        userId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        guessId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true
        },
        guessedChar: {
            type: DataTypes.CHAR(1),
        },
        guessedWord: {
            type: DataTypes.STRING,
        },
        isCorrect: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        gameId: {
            type: DataTypes.UUID
        }
    },
    {
        sequelize,
        modelName: 'Guess',
    }
);
  
export default Guess;
