import { DataTypes, HasManyCreateAssociationMixin, Model } from 'sequelize';
import User from './user.js'
import Guess from './guess.js'
import { sequelize } from '../setup.js';

interface GameAttributes {
  gameId?: string;
  channelId:string;
  secretWord: string;
  creatorId: string;
  incorrectGuessesRemaining?: number;
  status?: 'ongoing' | 'won' | 'lost';
  gameOver?:boolean;
}

class Game extends Model<GameAttributes> implements GameAttributes {
  public gameId!: string;
  public channelId!: string;
  public secretWord!: string;
  public creatorId!: string;
  public incorrectGuessesRemaining!: number;
  public status!: 'ongoing' | 'won' | 'lost';
  public gameOver!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Game.init({
    gameId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    channelId: {
      type: DataTypes.STRING,
      allowNull: false
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

Game.hasMany(Guess, {
  foreignKey: 'gameId'
})

export default Game