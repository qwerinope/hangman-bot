import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../setup.js';

interface GuessAttributes {
  userId: string;
  guessId?: string;
  guessedLetter?: string;
  guessedWord?: string;
  isCorrect: boolean;
}

class Guess extends Model<GuessAttributes> implements GuessAttributes {
  public userId!: string;
  public guessId!: string;
  public guessedLetter?: string;
  public guessedWord?: string;
  public isCorrect!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Guess.init(
  {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    guessId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    guessedLetter: {
      type: DataTypes.CHAR(1),
    },
    guessedWord: {
      type: DataTypes.STRING,
    },
    isCorrect: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Guess',
  }
);

export default Guess;
